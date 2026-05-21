const { Sequelize } = require("sequelize");
require("dotenv").config();

const dialect = process.env.DB_DIALECT || (() => {
  const url = process.env.DATABASE_URL || "";
  if (url.startsWith("postgres://") || url.startsWith("postgresql://")) return "postgres";
  if (url.startsWith("mysql://") || url.startsWith("mariadb://")) return "mysql";
  return "mysql";
})();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect,
});

module.exports = sequelize;