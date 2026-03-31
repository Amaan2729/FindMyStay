const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("findmystay_db", "root", "Amaan@123", {
  host: "localhost",
  dialect: "mysql",
});

sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch(err => console.error("Database error:", err));

module.exports = sequelize;