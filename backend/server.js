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
const emailRoutes = require("./routes/email");
const { sendBookingConfirmation, createTransporter } = require("./services/emailService");

const app = express();
const httpServer = createServer(app);


// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || true,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.send("Backend working");
});

// test-mail route moved closer to server start to ensure imports/resolvers are ready

// Routes
app.use("/api/auth", authFirebaseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", bookingRoutes);
app.use("/api/email", emailRoutes);

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

app.get("/test-mail", async (req, res) => {
  try {
    const result = await sendBookingConfirmation({
      id: "TEST123",
      name: "Shruti",
      email: "shruti13032005@gmail.com",
      hotelName: "Test Hotel",
      checkin: new Date(),
      checkout: new Date(),
      rooms: 1,
      totalPrice: 1000,
    });

    console.log("MAIL SENT:", result);

    res.json({
      success: true,
    });
  } catch (error) {
    console.error("MAIL ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

sequelize.sync({ alter: true }).then(() => {
  httpServer
    .listen(PORT, async () => {
      console.log(`FindMyStay backend running on port ${PORT}`);
      try {
        await createTransporter();
      } catch (err) {
        console.error("❌ SMTP startup verification failed:", err.message);
      }
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
