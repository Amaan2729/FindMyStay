const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db"); // your Sequelize setup
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

// Mount auth routes
app.use("/api/auth", authRoutes);

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
});