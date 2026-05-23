const nodemailer = require("nodemailer");

let cachedTransporter = null;

// ✅ Create Transporter (SAFE FOR RENDER)
const createTransporter = async () => {
  if (cachedTransporter) return cachedTransporter;

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const host = process.env.EMAIL_HOST || "smtp.gmail.com";
  const port = Number(process.env.EMAIL_PORT) || 587;

  if (!user || !pass) {
    throw new Error("Missing EMAIL_USER or EMAIL_PASS in env");
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass, // 🔥 MUST BE Gmail App Password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // ⚠️ IMPORTANT: DO NOT BLOCK APP IF VERIFY FAILS
  try {
    await cachedTransporter.verify();
    console.log("✅ SMTP READY");
  } catch (err) {
    console.log("⚠️ SMTP verify warning (ignored):", err.message);
  }

  return cachedTransporter;
};

// ==========================
// ✅ BOOKING EMAIL
// ==========================
const sendBookingConfirmation = async (bookingData) => {
  try {
    const transporter = await createTransporter();

    const info = await transporter.sendMail({
      from: `"FindMyStay" <${process.env.EMAIL_USER}>`,
      to: bookingData.email,
      subject: `Booking Confirmation - ${bookingData.hotelName}`,
      html: `
        <h2>Booking Confirmed 🎉</h2>
        <p>Hi ${bookingData.name || "Guest"},</p>

        <p>Your booking is confirmed at <b>${bookingData.hotelName}</b></p>

        <ul>
          <li>Check-in: ${bookingData.checkin}</li>
          <li>Check-out: ${bookingData.checkout}</li>
          <li>Rooms: ${bookingData.rooms}</li>
          <li>Total: ₹${bookingData.totalPrice}</li>
        </ul>

        <p>Thanks for choosing FindMyStay 🙌</p>
      `,
    });

    console.log("✅ Booking email sent:", info.messageId);
    return { success: true };
  } catch (err) {
    console.log("❌ Booking email failed:", err.message);
    return { success: false, error: err.message };
  }
};

// ==========================
// ✅ ADMIN EMAIL
// ==========================
const sendAdminNotification = async (bookingData) => {
  try {
    const transporter = await createTransporter();

    const info = await transporter.sendMail({
      from: `"FindMyStay System" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: "New Booking Received",
      html: `
        <h2>New Booking Alert 🚨</h2>
        <p>Name: ${bookingData.name}</p>
        <p>Email: ${bookingData.email}</p>
        <p>Hotel: ${bookingData.hotelName}</p>
        <p>Rooms: ${bookingData.rooms}</p>
        <p>Total: ₹${bookingData.totalPrice}</p>
      `,
    });

    console.log("✅ Admin email sent:", info.messageId);
    return { success: true };
  } catch (err) {
    console.log("❌ Admin email failed:", err.message);
    return { success: false, error: err.message };
  }
};

// ==========================
module.exports = {
  sendBookingConfirmation,
  sendAdminNotification,
};