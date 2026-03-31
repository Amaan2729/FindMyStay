const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("findmystay", "root", "12345678", {
  host: "localhost",
  dialect: "mysql",
});

sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch(err => console.error("Database error:", err));

module.exports = sequelize;