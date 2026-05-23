const nodemailer = require("nodemailer");

let cachedTransporter = null;

const getEmailAddress = () =>
  process.env.EMAIL_FROM || process.env.EMAIL_USER;

/**
 * Create SMTP transporter (Render + Gmail safe)
 */
const createTransporter = async () => {
  if (cachedTransporter) return cachedTransporter;

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error("Missing EMAIL_USER or EMAIL_PASS in environment");
  }

  cachedTransporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT, 10) || 587,
    secure: false, // IMPORTANT for Render + Gmail
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  console.log("✅ SMTP Transporter Ready");

  return cachedTransporter;
};

/**
 * BOOKING CONFIRMATION EMAIL
 */
const sendBookingConfirmation = async (bookingData) => {
  if (!bookingData?.email) {
    throw new Error("sendBookingConfirmation requires bookingData.email");
  }

  const transporter = await createTransporter();

  const mailOptions = {
    from: `"FindMyStay" <${getEmailAddress()}>`,
    to: bookingData.email,
    subject: `Booking Confirmation - ${bookingData.hotelName}`,
    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Booking Confirmed!</h2>
        <p>Hi ${bookingData.name || "Guest"},</p>

        <p><b>Hotel:</b> ${bookingData.hotelName}</p>
        <p><b>Booking ID:</b> ${bookingData.id}</p>
        <p><b>Check-in:</b> ${new Date(bookingData.checkin).toLocaleDateString()}</p>
        <p><b>Check-out:</b> ${new Date(bookingData.checkout).toLocaleDateString()}</p>
        <p><b>Rooms:</b> ${bookingData.rooms}</p>
        <p><b>Total:</b> ₹${bookingData.totalPrice}</p>

        <br/>
        <p>Thanks for booking with FindMyStay 🙌</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Booking email sent:", info.messageId);

    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("❌ Booking email failed:", err.message);
    return { success: false, error: err.message };
  }
};

/**
 * ADMIN NOTIFICATION EMAIL
 */
const sendAdminNotification = async (bookingData) => {
  const adminEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.ADMIN_EMAIL ||
    process.env.EMAIL_USER;

  if (!adminEmail) {
    throw new Error("Admin email not configured");
  }

  const transporter = await createTransporter();

  const mailOptions = {
    from: `"FindMyStay System" <${getEmailAddress()}>`,
    to: adminEmail,
    subject: `New Booking - ${bookingData.hotelName}`,
    html: `
      <h2>New Booking Received</h2>
      <p><b>User:</b> ${bookingData.name}</p>
      <p><b>Email:</b> ${bookingData.email}</p>
      <p><b>Hotel:</b> ${bookingData.hotelName}</p>
      <p><b>ID:</b> ${bookingData.id}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Admin email sent:", info.messageId);

    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("❌ Admin email failed:", err.message);
    return { success: false, error: err.message };
  }
};

/**
 * WELCOME EMAIL
 */
const sendWelcomeEmail = async (userData) => {
  if (!userData?.email) {
    throw new Error("sendWelcomeEmail requires userData.email");
  }

  const transporter = await createTransporter();

  const mailOptions = {
    from: `"FindMyStay" <${getEmailAddress()}>`,
    to: userData.email,
    subject: "Welcome to FindMyStay 🎉",
    html: `
      <h2>Welcome ${userData.name || "User"}!</h2>
      <p>Thanks for joining FindMyStay.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Welcome email sent:", info.messageId);

    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("❌ Welcome email failed:", err.message);
    return { success: false, error: err.message };
  }
};

module.exports = {
  createTransporter,
  sendBookingConfirmation,
  sendAdminNotification,
  sendWelcomeEmail,
};