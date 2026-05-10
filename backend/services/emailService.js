const nodemailer = require('nodemailer');

// Create transporter with SMTP configuration
const createTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error(
      'Missing email credentials. Set EMAIL_USER and EMAIL_PASS in backend/.env'
    );
  }

  const port = parseInt(process.env.EMAIL_PORT, 10) || 587;
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
};

// Send booking confirmation email
const sendBookingConfirmation = async (bookingData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"FindMyStay" <${process.env.EMAIL_USER}>`,
      to: bookingData.email,
      subject: `Booking Confirmation - ${bookingData.hotelName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c9a96e;">🎉 Booking Confirmed!</h2>

          <div style="background: #f8f5f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Booking Details</h3>
            <p><strong>Hotel:</strong> ${bookingData.hotelName}</p>
            <p><strong>Check-in:</strong> ${new Date(bookingData.checkin).toLocaleDateString()}</p>
            <p><strong>Check-out:</strong> ${new Date(bookingData.checkout).toLocaleDateString()}</p>
            <p><strong>Rooms:</strong> ${bookingData.rooms}</p>
            <p><strong>Guests:</strong> ${bookingData.guests}</p>
            <p><strong>Total Amount:</strong> ₹${bookingData.totalPrice}</p>
            <p><strong>Booking ID:</strong> ${bookingData.id}</p>
          </div>

          <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4>📋 Important Information</h4>
            <ul>
              <li>Please arrive at the hotel by 2:00 PM on your check-in date</li>
              <li>Check-out time is 11:00 AM</li>
              <li>Bring a valid ID proof for verification</li>
              <li>Contact hotel directly for any changes or cancellations</li>
            </ul>
          </div>

          <p style="color: #666; font-size: 14px;">
            Thank you for choosing FindMyStay! We hope you have a wonderful stay.
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            This is an automated email. Please do not reply to this message.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    return { success: false, error: error.message };
  }
};

// Send admin notification email
const sendAdminNotification = async (bookingData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"FindMyStay System" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Booking Alert - ${bookingData.hotelName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc3545;">🆕 New Booking Received</h2>

          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <h3>Booking Details</h3>
            <p><strong>Customer:</strong> ${bookingData.name}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Phone:</strong> ${bookingData.phone}</p>
            <p><strong>Hotel:</strong> ${bookingData.hotelName}</p>
            <p><strong>Check-in:</strong> ${new Date(bookingData.checkin).toLocaleDateString()}</p>
            <p><strong>Check-out:</strong> ${new Date(bookingData.checkout).toLocaleDateString()}</p>
            <p><strong>Rooms:</strong> ${bookingData.rooms}</p>
            <p><strong>Guests:</strong> ${bookingData.guests}</p>
            <p><strong>Total Amount:</strong> ₹${bookingData.totalPrice}</p>
            <p><strong>Booking ID:</strong> ${bookingData.id}</p>
            <p><strong>Booked At:</strong> ${new Date(bookingData.createdAt).toLocaleString()}</p>
          </div>

          <div style="background: #d1ecf1; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Action Required:</strong> Please verify room availability and contact the customer if needed.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return { success: false, error: error.message };
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    const transporter = createTransporter();

    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: `"FindMyStay" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c9a96e;">🔐 Password Reset</h2>

          <div style="background: #f8f5f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>Hello,</p>
            <p>You have requested to reset your password for your FindMyStay account.</p>
            <p>Please click the button below to reset your password:</p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}"
                 style="background: #c9a96e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Reset Password
              </a>
            </div>

            <p><strong>Important:</strong> This link will expire in 1 hour for security reasons.</p>
            <p>If you didn't request this password reset, please ignore this email.</p>
          </div>

          <p style="color: #666; font-size: 14px;">
            If the button doesn't work, copy and paste this link into your browser:
            <br>
            <a href="${resetLink}" style="color: #c9a96e;">${resetLink}</a>
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            This is an automated email. Please do not reply to this message.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error: error.message };
  }
};

// Send welcome email to new users
const sendWelcomeEmail = async (userData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"FindMyStay" <${process.env.EMAIL_USER}>`,
      to: userData.email,
      subject: 'Welcome to FindMyStay! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c9a96e;">Welcome to FindMyStay!</h2>

          <div style="background: #f8f5f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>Hello ${userData.name},</p>
            <p>Welcome to FindMyStay! We're excited to have you join our community of travelers.</p>

            <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4>🚀 Get Started</h4>
              <ul>
                <li>Browse our curated collection of hotels across India</li>
                <li>Book your perfect stay with our easy booking system</li>
                <li>Track your bookings and manage reservations</li>
                <li>Discover exclusive deals and offers</li>
              </ul>
            </div>

            <p>Ready to start your journey? <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" style="color: #c9a96e;">Explore hotels now</a></p>
          </div>

          <p style="color: #666; font-size: 14px;">
            Happy travels! 🌟
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            FindMyStay Team
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendBookingConfirmation,
  sendAdminNotification,
  sendPasswordResetEmail,
  sendWelcomeEmail,
};