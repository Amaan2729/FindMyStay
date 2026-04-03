const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ 
      message: "User created successfully!", 
      user: { id: newUser.id, name: newUser.name, email: newUser.email } 
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    res.json({ message: "Login successful", user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@findmystay.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@123";

// Admin sign-in route
router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return res.json({ message: "Admin login successful", admin: { email } });
    }

    return res.status(401).json({ message: "Invalid admin credentials" });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Admin end-point: get list of all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["id", "name", "email"] });
    const usersWithRole = users.map((user) => {
      const safeUser = user.toJSON ? user.toJSON() : user;
      const role = safeUser.email === ADMIN_EMAIL ? "Admin" : "Guest";
      return { ...safeUser, role };
    });
    res.json(usersWithRole);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Unable to fetch users" });
  }
});

module.exports = router;