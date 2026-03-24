const Booking = require("../models/Booking");

module.exports = {
  bookings: async () => {
    const bookings = await Booking.findAll();

      return bookings.map((b) => ({
      id: b.id,
      name: b.name,
      hotelName: b.hotelName,
      totalPrice: b.totalPrice
    }));
  }
};