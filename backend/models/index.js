const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Booking = require("./Booking");
const User = require("./User");
const Hotel = require("./Hotel")(sequelize, DataTypes);

module.exports = {
  Booking,
  User,
  Hotel,
};