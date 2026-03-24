const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Booking = sequelize.define("Booking", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  hotelName: DataTypes.STRING,
  checkin: DataTypes.DATE,
  checkout: DataTypes.DATE,
  guests: DataTypes.INTEGER,
  rooms: DataTypes.INTEGER,
  totalPrice: DataTypes.INTEGER
});

module.exports = Booking;