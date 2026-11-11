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
  try {
    const {
      name,
      email,
      phone,
      hotelName,
      checkin,
      checkout,
      guests,
      rooms,
      totalPrice,
        paymentMethod,
        paymentStatus,
        transactionId,
    } = req.body;
      // Ensure payment fields have sensible defaults
      const pm = paymentMethod || "card";
      const ps = paymentStatus || (pm === "payAtHotel" ? "Pending" : "Paid");
      let tx = transactionId || null;
      if (ps === "Paid" && !tx) {
        tx = "TXN" + Math.floor(Math.random() * 1000000);
      }

      const booking = await Booking.create({
        name,
        email,
        phone,
        hotelName,
        checkin,
        checkout,
        guests,
        rooms,
        totalPrice,
        paymentMethod: pm,
        paymentStatus: ps,
        transactionId: tx,
      });

    console.log("✅ Booking saved");

    try {
      console.log("📩 Sending booking emails...");

      // USER MAIL
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Booking Confirmation - FindMyStay",
        html: `
          <h2>Booking Confirmed</h2>
          <p>Hello ${name},</p>
          <p>Thank you for booking with FindMyStay. Your reservation details are below:</p>
          <ul>
            <li><strong>Hotel:</strong> ${hotelName}</li>
            <li><strong>Check-in:</strong> ${checkin}</li>
            <li><strong>Check-out:</strong> ${checkout}</li>
            <li><strong>Guests:</strong> ${guests}</li>
            <li><strong>Rooms:</strong> ${rooms}</li>
            <li><strong>Total Price:</strong> ₹${totalPrice}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Payment Method:</strong> ${pm}</li>
            <li><strong>Payment Status:</strong> ${ps}</li>
            ${tx ? `<li><strong>Transaction ID:</strong> ${tx}</li>` : ""}
          </ul>
          <p>If you have any questions, reply to this email or contact our support team.</p>
          <p>We look forward to hosting you!</p>
        `,
      });

      console.log("✅ User mail sent");

      // ADMIN MAIL
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL,
        subject: "New Booking Received",
        html: `
          <h2>New Booking Received</h2>
          <p>A new booking has been created with these details:</p>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Hotel:</strong> ${hotelName}</li>
            <li><strong>Check-in:</strong> ${checkin}</li>
            <li><strong>Check-out:</strong> ${checkout}</li>
            <li><strong>Guests:</strong> ${guests}</li>
            <li><strong>Rooms:</strong> ${rooms}</li>
            <li><strong>Total Price:</strong> ₹${totalPrice}</li>
            <li><strong>Booking ID:</strong> ${booking.id}</li>
            <li><strong>Payment Method:</strong> ${pm}</li>
            <li><strong>Payment Status:</strong> ${ps}</li>
            ${tx ? `<li><strong>Transaction ID:</strong> ${tx}</li>` : ""}
          </ul>
          <p>Please review the booking and contact the user or hotel if any details need adjustment.</p>
        `,
      });

      console.log("✅ Admin mail sent");
    } catch (mailErr) {
      console.log("❌ Mail Error:", mailErr);
    }

    return res.status(201).json({
      success: true,
      booking,
    });
  } catch (err) {
    console.log("❌ Booking Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
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