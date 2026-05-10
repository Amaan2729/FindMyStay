const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "unique_email"
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true // Optional for Firebase auth users
    },
    firebaseUid: {
      type: DataTypes.STRING,
      //unique: true,
      allowNull: true // Optional, only for Firebase auth users
    }
  },
  {
    timestamps: false // disables createdAt and updatedAt
  }
);

module.exports = User;