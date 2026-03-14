const { Booking } = require("../models");

const root = {
  bookings: async () => {
    const all = await Booking.findAll();
    // map snake_case DB fields to camelCase
    return all.map(b => ({
      id: b.id,
      name: b.name,
      email: b.email,
      phone: b.phone,
      hotelName: b.hotel_name,
      checkin: b.checkin,
      checkout: b.checkout,
      guests: b.guests,
      rooms: b.rooms,
      totalPrice: b.total_price,
    }));
  },
  booking: async ({ id }) => {
    const b = await Booking.findByPk(id);
    if (!b) return null;
    return {
      id: b.id,
      name: b.name,
      email: b.email,
      phone: b.phone,
      hotelName: b.hotel_name,
      checkin: b.checkin,
      checkout: b.checkout,
      guests: b.guests,
      rooms: b.rooms,
      totalPrice: b.total_price,
    };
  },
  createBooking: async (args) => {
    const newBooking = await Booking.create({
      name: args.name,
      email: args.email,
      phone: args.phone,
      hotel_name: args.hotelName,
      checkin: args.checkin,
      checkout: args.checkout,
      guests: args.guests,
      rooms: args.rooms,
      total_price: args.totalPrice,
    });
    return {
      id: newBooking.id,
      name: newBooking.name,
      email: newBooking.email,
      phone: newBooking.phone,
      hotelName: newBooking.hotel_name,
      checkin: newBooking.checkin,
      checkout: newBooking.checkout,
      guests: newBooking.guests,
      rooms: newBooking.rooms,
      totalPrice: newBooking.total_price,
    };
  },
};

module.exports = root;