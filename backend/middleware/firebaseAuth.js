const { auth } = require("../config/firebase");

// Middleware to verify Firebase ID token
const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.warn("⚠️ Firebase auth: No token provided");
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    console.log("🔐 Verifying Firebase token...");
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    console.log("✅ Firebase token verified for user:", decodedToken.email);
    next();
  } catch (error) {
    console.error("❌ Firebase token verification failed:", error.message);
    
    // Provide detailed error information
    let errorMessage = "Invalid or expired token";
    if (error.code === "auth/argument-error") {
      errorMessage = "Invalid token format";
    } else if (error.code === "auth/id-token-expired") {
      errorMessage = "Token has expired";
    } else if (error.message.includes("decoded token is not a valid JWT")) {
      errorMessage = "Invalid token format - not a valid JWT";
    }
    
    return res.status(401).json({ 
      error: errorMessage,
      code: error.code 
    });
  }
};

module.exports = { verifyFirebaseToken };
