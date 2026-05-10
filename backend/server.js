 // Handles API routes, database connection, and real-time updates
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
// Socket.IO handles real-time booking updates between users
const sequelize = require("./config/db");
const { Hotel, Booking, User } = require("./models");

const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlRoot = require("./graphql/resolvers");

const authRoutes = require("./routes/auth");
const authFirebaseRoutes = require("./routes/authFirebase");
const bookingRoutes = require("./routes/booking");

const app = express();
const httpServer = createServer(app);


// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.send("Backend working");
});

// Routes
// app.use("/api/auth", authRoutes); // Removed - using Firebase auth now
app.use("/api/auth", authFirebaseRoutes);
app.use("/api", bookingRoutes);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlRoot,
    graphiql: true, // Enables interactive UI
  })
);

// ----- SOCKET.IO INTEGRATION -----
const io = new Server(httpServer, {
  cors: { origin: "*" }, // change "*" to your frontend URL in production
});
app.set("io", io); // allow routes to emit through io


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Listen for new bookings from clients
  socket.on("newBooking", (bookingData) => {
    console.log("New booking received:", bookingData);

    // Emit confirmation to the user who booked
    socket.emit("bookingConfirmed", { status: "success", ...bookingData });

    // Broadcast to other connected users (admins/others)
    socket.broadcast.emit("bookingUpdate", bookingData);
  });

  // Optionally, listen for other events, e.g., check availability
  socket.on("checkAvailability", (hotelId) => {
    // Example logic (replace with real DB check)
    const available = true;
    socket.emit("availabilityStatus", { hotelId, available });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Database sync and start 
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  httpServer
    .listen(PORT, () => {
      console.log(`FindMyStay backend running on port ${PORT}`);
    })
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Stop the process using that port or set PORT to a free port before retrying.`);
      } else {
        console.error("Server error:", err);
      }
      process.exit(1);
    });
});
// testing commit
