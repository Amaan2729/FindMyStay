const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/booking");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
  res.send("Backend working");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api", bookingRoutes);

// database sync
sequelize.sync({ alter:true }).then(() => {

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });

});