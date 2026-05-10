const admin = require("firebase-admin");
require("dotenv").config();

// Initialize Firebase Admin SDK
try {
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  });
  console.log("Firebase Admin SDK initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase Admin SDK:", error);
}

// Get Auth instance
const auth = admin.auth();

module.exports = { admin, auth };
