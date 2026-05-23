// ✅ IMPORTS
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Hotel = require("../models/index").Hotel;
const sequelize = require("../config/db");
const { Op } = require("sequelize");
const transporter = require("../config/email");

const TOTAL_ROOMS = 10;


// ✅ 0. GET ALL HOTELS
router.get("/hotels", async (req, res) => {
  try {
    const hotels = await Hotel.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ 1. GET HOTEL BY ID
router.get("/hotels/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ 2. CHECK AVAILABILITY API
router.post("/check-availability", async (req, res) => {
  try {
    const { hotelName, checkin, checkout } = req.body;

    const bookings = await Booking.findAll({
      where: {
        hotelName,
        // ✅ FIXED overlap logic
        [Op.and]: [
          { checkin: { [Op.lt]: checkout } },
          { checkout: { [Op.gt]: checkin } },
        ],
      },
    });

    // ✅ FIXED number conversion
    const bookedRooms = bookings.reduce(
      (sum, b) => sum + parseInt(b.rooms),
      0
    );

    res.json({
      // ✅ prevent negative
      availableRooms: Math.max(TOTAL_ROOMS - bookedRooms, 0),
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ 3. BOOK API - Improved error handling
router.post("/book", async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { hotelName, checkin, checkout, rooms } = req.body;

    // ✅ convert to number
    const requestedRooms = parseInt(rooms);

    // ✅ Validate request
    if (!hotelName || !checkin || !checkout || !requestedRooms) {
      await t.rollback();
      return res.status(400).json({
        error: "Missing required booking fields",
      });
    }

    const bookings = await Booking.findAll({
      where: {
        hotelName,
        // ✅ FIXED overlap logic
        [Op.and]: [
          { checkin: { [Op.lt]: checkout } },
          { checkout: { [Op.gt]: checkin } },
        ],
      },
      transaction: t,
    });

    const bookedRooms = bookings.reduce(
      (sum, b) => sum + parseInt(b.rooms),
      0
    );

    // ✅ validation
    if (bookedRooms + requestedRooms > TOTAL_ROOMS) {
      await t.rollback();
      return res.status(400).json({
        error: "Not enough rooms available",
        // ✅ prevent negative
        availableRooms: Math.max(TOTAL_ROOMS - bookedRooms, 0),
      });
    }

    console.log("📝 Booking payload received:", {
      hotelName,
      checkin,
      checkout,
      rooms: requestedRooms,
      name: req.body.name,
      email: req.body.email,
    });

    // ✅ Validate email before creating booking
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!req.body.email || !emailRegex.test(req.body.email)) {
      await t.rollback();
      return res.status(400).json({
        error: "Valid email address is required",
      });
    }

    const booking = await Booking.create(
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        hotelName: req.body.hotelName,
        checkin: req.body.checkin,
        checkout: req.body.checkout,
        guests: parseInt(req.body.guests, 10) || 1,
        rooms: parseInt(req.body.rooms, 10) || 1,
        totalPrice: parseInt(req.body.totalPrice, 10) || 0,
      },
      {
        transaction: t,
        fields: [
          "name",
          "email",
          "phone",
          "hotelName",
          "checkin",
          "checkout",
          "guests",
          "rooms",
          "totalPrice",
        ],
      }
    );

    await t.commit();
    console.log("✅ Booking created in database with ID:", booking.id);

    try {
      console.log("Sending emails...");

      // Mail to user
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: "Booking Confirmed",
        html: `
          <h2>Booking Confirmed</h2>
          <p>Hotel: ${hotelName}</p>
          <p>Name: ${req.body.name}</p>
        `,
      });

      console.log("✅ User mail sent");

      // Mail to admin
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: "New Booking Received",
        html: `
          <h2>New Booking</h2>
          <p>User: ${req.body.name}</p>
          <p>Hotel: ${hotelName}</p>
        `,
      });

      console.log("✅ Admin mail sent");
    } catch (err) {
      console.log("❌ Mail sending failed:", err);
    }

    try {
      const io = req.app.get("io");
      if (io) {
        io.emit("bookingUpdate", {
          bookingId: booking.id,
          hotelName: booking.hotelName,
          user: booking.name,
          rooms: booking.rooms,
          checkin: booking.checkin,
          checkout: booking.checkout,
          totalPrice: booking.totalPrice,
          createdAt: booking.createdAt,
        });
        console.log("📡 Real-time notification emitted for booking", booking.id);
      }
    } catch (socketErr) {
      console.warn("⚠️ Failed to emit socket notification:", socketErr.message);
    }

    return res.status(201).json({
      success: true,
      booking,
    });

  } catch (err) {
    await t.rollback();
    console.error("❌ Booking route failed:", err.message);
    console.error("Stack trace:", err.stack);
    
    // Return detailed error for debugging
    res.status(500).json({
      error: err.message || "Booking failed",
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  }
});

// Admin endpoint: get all bookings
router.get("/admin/bookings", async (req, res) => {
  try {
    const bookings = await Booking.findAll({ order: [["createdAt", "DESC"]] });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch bookings" });
  }
});

// ✅ EXPORT
module.exports = router;