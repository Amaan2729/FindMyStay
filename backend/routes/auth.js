const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import your Sequelize model

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // 2. Create the user in MySQL
    // Note: In a real project, you should hash the password using 'bcrypt' here!
    const newUser = await User.create({
      name,
      email,
      password 
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

module.exports = router;