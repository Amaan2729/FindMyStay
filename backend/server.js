const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const sequelize = require("./config/db");

const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlRoot = require("./graphql/resolvers");

const authRoutes = require("./routes/auth");
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
app.use("/api/auth", authRoutes);
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

// Database sync and start server
sequelize.sync({ alter: true }).then(() => {
  httpServer.listen(5000, () => {
    console.log("Server running on port 5000 with Socket.IO");
  });
});
// testing commit