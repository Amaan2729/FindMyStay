const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.post("/book", async (req, res) => {

  console.log("BOOK API HIT");

  try {

    const booking = await Booking.create(req.body);

    res.json({
      message: "Booking successful",
      booking
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;