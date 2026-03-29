// ✅ IMPORTS
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const sequelize = require("../config/db");
const { Op } = require("sequelize");

const TOTAL_ROOMS = 10;


// ✅ 1. CHECK AVAILABILITY API
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


// ✅ 2. BOOK API
router.post("/book", async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { hotelName, checkin, checkout, rooms } = req.body;

    // ✅ convert to number
    const requestedRooms = parseInt(rooms);

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

    const booking = await Booking.create(req.body, { transaction: t });

    await t.commit();

    res.json({
      message: "Booking successful",
      booking,
    });

  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
});


// ✅ EXPORT
module.exports = router;