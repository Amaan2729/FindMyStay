const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

// Support both DATABASE_URL and individual DB_ variables
if (process.env.DATABASE_URL) {
  // If DATABASE_URL is provided, use it
  const dialect = process.env.DB_DIALECT || (() => {
    const url = process.env.DATABASE_URL;
    if (url.startsWith("postgres://") || url.startsWith("postgresql://")) return "postgres";
    if (url.startsWith("mysql://") || url.startsWith("mariadb://")) return "mysql";
    return "mysql";
  })();

  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect,
    logging: process.env.NODE_ENV === 'test' ? false : console.log,
  });
} else if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME) {
  // Otherwise, use individual environment variables
  const dialect = process.env.DB_DIALECT || "mysql";
  
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD || "",
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      dialect,
      logging: process.env.NODE_ENV === 'test' ? false : console.log,
    }
  );
} else {
  throw new Error(
    "Database configuration is missing. Either provide DATABASE_URL or DB_HOST, DB_USER, and DB_NAME environment variables."
  );
}

module.exports = sequelize;