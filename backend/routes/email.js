const express = require("express");
const router = express.Router();
const {
  sendBookingConfirmation,
  sendAdminNotification,
  sendWelcomeEmail,
  createTransporter,
} = require("../services/emailService");

// Test SMTP transport and send a booking confirmation test email
router.post("/test", async (req, res) => {
  const { email, name } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email address is required" });
  }

  try {
    await createTransporter();

    const result = await sendBookingConfirmation({
      hotelName: "FindMyStay Test Hotel",
      checkin: new Date().toISOString(),
      checkout: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      rooms: 1,
      guests: 1,
      totalPrice: 1000,
      id: "TEST-EMAIL-001",
      email,
      name: name || "Test User",
    });

    return res.json({ success: result.success, messageId: result.messageId, error: result.error });
  } catch (error) {
    console.error("Email test failed:", error);
    return res.status(500).json({ error: error.message });
  }
});

// Test admin notification email separately
router.post("/test-admin", async (req, res) => {
  const { name } = req.body;
  const targetAdminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

  if (!targetAdminEmail) {
    return res.status(500).json({ error: "ADMIN_EMAIL or EMAIL_USER must be configured to test admin notifications" });
  }

  try {
    const result = await sendAdminNotification({
      hotelName: "FindMyStay Test Hotel",
      checkin: new Date().toISOString(),
      checkout: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      rooms: 1,
      guests: 1,
      totalPrice: 1000,
      id: "TEST-ADMIN-001",
      email: targetAdminEmail,
      name: name || "Test Admin",
      phone: "0000000000",
      createdAt: new Date().toISOString(),
    });

    return res.json({ success: result.success, messageId: result.messageId, error: result.error });
  } catch (error) {
    console.error("Admin email test failed:", error);
    return res.status(500).json({ error: error.message });
  }
});

// Test welcome email separately
router.post("/test-welcome", async (req, res) => {
  const { email, name } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email address is required" });
  }

  try {
    const result = await sendWelcomeEmail({
      email,
      name: name || "Test User",
    });
    return res.json({ success: result.success, messageId: result.messageId, error: result.error });
  } catch (error) {
    console.error("Welcome email test failed:", error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
