const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: {
      connectTimeout: 60000
    }
  }
);

if (
  process.env.NODE_ENV !== "test" &&
  process.env.DISABLE_DB_CONNECTION !== "true"
) {
  sequelize.authenticate()
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Database error:", err));
}

module.exports = sequelize;