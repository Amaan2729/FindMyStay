const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("findmystay", "root", "12345678", {
  host: "localhost",
  dialect: "mysql",
});

if (process.env.NODE_ENV !== "test" && process.env.DISABLE_DB_CONNECTION !== "true") {
  sequelize.authenticate()
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Database error:", err));
}

module.exports = sequelize;