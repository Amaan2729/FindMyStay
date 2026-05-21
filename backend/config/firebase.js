const admin = require("firebase-admin");
require("dotenv").config();

const getRequiredEnv = (key) => {
  const value = process.env[key];
  if (!value || !value.trim()) {
    throw new Error(`Missing Firebase environment variable: ${key}`);
  }
  return value.trim();
};

const normalizePrivateKey = (key) => {
  return key
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/\\n/g, "\n")
    .trim();
};

let firebaseApp;
let authInstance;

const initializeFirebase = () => {
  try {
    // Check if Firebase is already initialized
    if (admin.apps.length > 0) {
      console.log("Firebase Admin SDK already initialized");
      return admin.app();
    }

    const projectId = getRequiredEnv("FIREBASE_PROJECT_ID");
    const clientEmail = getRequiredEnv("FIREBASE_CLIENT_EMAIL");
    const privateKey = normalizePrivateKey(getRequiredEnv("FIREBASE_PRIVATE_KEY"));

    // Validate private key format
    if (!privateKey.includes("-----BEGIN PRIVATE KEY-----")) {
      console.error("ERROR: FIREBASE_PRIVATE_KEY missing '-----BEGIN PRIVATE KEY-----'");
      throw new Error("FIREBASE_PRIVATE_KEY must include a complete private key with BEGIN marker");
    }
    
    if (!privateKey.includes("-----END PRIVATE KEY-----")) {
      console.error("ERROR: FIREBASE_PRIVATE_KEY missing '-----END PRIVATE KEY-----'");
      throw new Error("FIREBASE_PRIVATE_KEY must include a complete private key with END marker");
    }

    console.log("Initializing Firebase Admin SDK...");
    console.log("Project ID:", projectId);
    console.log("Client Email:", clientEmail);

    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });

    console.log("✅ Firebase Admin SDK initialized successfully");
    return firebaseApp;
  } catch (error) {
    console.error("❌ Firebase initialization failed:", error.message);
    throw error;
  }
};

// Initialize Firebase
initializeFirebase();

// Get Auth instance
const auth = admin.auth();

module.exports = { admin, auth, initializeFirebase };
