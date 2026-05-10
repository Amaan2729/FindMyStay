const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { verifyFirebaseToken } = require("../middleware/firebaseAuth");
const { sendWelcomeEmail } = require("../services/emailService");

// Sign up route - Firebase
router.post("/signup", verifyFirebaseToken, async (req, res) => {
  try {
    const { uid, email, name } = req.body;

    // Check if user already exists
    let user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Create new user in database
    user = await User.create({
      email,
      name,
      firebaseUid: uid, // Store Firebase UID
    });

    // Send welcome email (don't fail signup if email fails)
    try {
      await sendWelcomeEmail({
        email: user.email,
        name: user.name,
      });
    } catch (emailError) {
      console.warn("Failed to send welcome email:", emailError.message);
    }

    res.status(201).json({
      message: "User created successfully!",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login route - Firebase
router.post("/login", verifyFirebaseToken, async (req, res) => {
  try {
    const { uid, email } = req.body;

    // Find or create user in database
    let user = await User.findOne({ where: { email } });

    if (!user) {
      // Create user if doesn't exist
      user = await User.create({
        email,
        name: email.split("@")[0],
        firebaseUid: uid,
      });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        firebaseUid: user.firebaseUid,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get current user
router.get("/me", verifyFirebaseToken, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.user.email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        firebaseUid: user.firebaseUid,
      },
    });
  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Admin endpoint: get list of all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["id", "name", "email"] });
    const usersWithRole = users.map((user) => {
      const safeUser = user.toJSON ? user.toJSON() : user;
      const role = safeUser.email === (process.env.ADMIN_EMAIL || "admin@findmystay.com") ? "Admin" : "Guest";
      return { ...safeUser, role };
    });

    res.json(usersWithRole);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Unable to fetch users" });
  }
});

module.exports = router;
