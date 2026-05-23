const nodemailer = require('nodemailer');

const getEmailAddress = () => process.env.EMAIL_FROM || process.env.EMAIL_USER;

let cachedTransporter = null;

const createTransporter = async () => {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.EMAIL_PORT, 10) || 587;
  const secure = port === 465;

  if (!user || !pass) {
    throw new Error('Missing email credentials. Set EMAIL_USER and EMAIL_PASS in backend/.env');
  }

  console.log('🔧 Creating Gmail SMTP transporter...');
  console.log('  Host:', host);
  console.log('  Port:', port);
  console.log('  Secure:', secure);
  console.log('  User:', user);

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    pool: true,
    logger: true,
    debug: true,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
  });

  try {
    await cachedTransporter.verify();
    console.log('✅ SMTP READY');
  } catch (verifyError) {
    cachedTransporter = null;
    console.error('❌ SMTP verification failed:', verifyError.message);
    throw verifyError;
  }

  return cachedTransporter;
};

const sendBookingConfirmation = async (bookingData) => {
  if (!bookingData || !bookingData.email) {
    throw new Error('sendBookingConfirmation requires bookingData.email');
  }

  const transporter = await createTransporter();

  const mailOptions = {
    from: `"FindMyStay" <${getEmailAddress()}>`,
    to: bookingData.email,
    subject: `Booking Confirmation - ${bookingData.hotelName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #1a73e8;">Booking Confirmed!</h2>
        <p>Hi ${bookingData.name || 'Guest'},</p>
        <p>Your booking has been confirmed for <strong>${bookingData.hotelName}</strong>.</p>
        <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #e0e0e0;"><strong>Booking ID</strong></td>
            <td style="padding: 8px; border: 1px solid #e0e0e0;">${bookingData.id}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e0e0e0;"><strong>Hotel</strong></td>
            <td style="padding: 8px; border: 1px solid #e0e0e0;">${bookingData.hotelName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e0e0e0;"><strong>Check-in</strong></td>
            <td style="padding: 8px; border: 1px solid #e0e0e0;">${new Date(bookingData.checkin).toLocaleDateString()}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e0e0e0;"><strong>Check-out</strong></td>
            <td style="padding: 8px; border: 1px solid #e0e0e0;">${new Date(bookingData.checkout).toLocaleDateString()}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e0e0e0;"><strong>Rooms</strong></td>
            <td style="padding: 8px; border: 1px solid #e0e0e0;">${bookingData.rooms}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e0e0e0;"><strong>Total Price</strong></td>
            <td style="padding: 8px; border: 1px solid #e0e0e0;">₹${bookingData.totalPrice}</td>
          </tr>
        </table>
        <p>If you need to change or cancel your booking, please contact us directly.</p>
        <p style="color: #666; font-size: 14px;">Thanks for choosing FindMyStay.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
        <p style="color: #999; font-size: 12px;">This is an automated email. Please do not reply.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Booking confirmation email sent:', info.messageId);
    return {
      success: true,
      messageId: info.messageId,
      info,
    };
  } catch (err) {
    console.error('❌ Failed to send booking confirmation:', err && err.stack ? err.stack : err);
    return { success: false, error: err && err.message ? err.message : String(err) };
  }
};

const sendAdminNotification = async (bookingData) => {
  if (!bookingData) {
    throw new Error('sendAdminNotification requires bookingData');
  }

    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
  if (!adminEmail) {
    throw new Error('Missing ADMIN_NOTIFICATION_EMAIL, ADMIN_EMAIL, or EMAIL_USER in .env');
  }

  const transporter = await createTransporter();

  const mailOptions = {
    from: `"FindMyStay System" <${getEmailAddress()}>`,
    to: adminEmail,
    subject: `New Booking Received - ${bookingData.hotelName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #d93025;">New Booking Notification</h2>
        <p>A new booking has been created in FindMyStay.</p>
        <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #e0e0e0;"><strong>Booking ID</strong></td>
            <td style="padding: 8px; border: 1px solid #e0e0e0;">${bookingData.id}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e0e0e0;"><strong>Customer</strong></td>
            <td style="padding: 8px; border: 1px solid #e0e0e0;">${bookingData.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e0e0e0;"><strong>Email</strong></td>
            <td style="padding: 8px; border: 1px solid #e0e0e0;">${bookingData.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e0e0e0;"><strong>Phone</strong></td>
            <td style="padding: 8px; border: 1px solid #e0e0e0;">${bookingData.phone || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e0e0e0;"><strong>Hotel</strong></td>
            <td style="padding: 8px; border: 1px solid #e0e0e0;">${bookingData.hotelName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e0e0e0;"><strong>Check-in</strong></td>
            <td style="padding: 8px; border: 1px solid #e0e0e0;">${new Date(bookingData.checkin).toLocaleDateString()}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e0e0e0;"><strong>Check-out</strong></td>
            <td style="padding: 8px; border: 1px solid #e0e0e0;">${new Date(bookingData.checkout).toLocaleDateString()}</td>
          </tr>
        </table>
        <p>Please verify the booking and follow up if required.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
        <p style="color: #999; font-size: 12px;">This notification was generated automatically.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification email sent:', info.messageId);
    return {
      success: true,
      messageId: info.messageId,
      info,
    };
  } catch (err) {
    console.error('❌ Failed to send admin notification:', err && err.stack ? err.stack : err);
    return { success: false, error: err && err.message ? err.message : String(err) };
  }
};

const sendWelcomeEmail = async (userData) => {
  if (!userData || !userData.email) {
    throw new Error('sendWelcomeEmail requires userData.email');
  }

  const transporter = await createTransporter();
  const mailOptions = {
    from: `"FindMyStay" <${getEmailAddress()}>`,
    to: userData.email,
    subject: 'Welcome to FindMyStay! 🎉',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #1a73e8;">Welcome to FindMyStay!</h2>
        <p>Hi ${userData.name || 'Traveler'},</p>
        <p>Thanks for joining FindMyStay. We're excited to help you book the perfect stay.</p>
        <div style="background: #f8f5f0; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p><strong>What you can do next:</strong></p>
          <ul>
            <li>Browse hotels across top destinations</li>
            <li>Book rooms with instant confirmation</li>
            <li>Manage reservations from your dashboard</li>
          </ul>
        </div>
        <p><a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" style="color: #1a73e8;">Start exploring hotels now</a></p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
        <p style="color: #999; font-size: 12px;">This is an automated email from FindMyStay.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent:', info.messageId);
    return {
      success: true,
      messageId: info.messageId,
      info,
    };
  } catch (err) {
    console.error('❌ Failed to send welcome email:', err && err.stack ? err.stack : err);
    return { success: false, error: err && err.message ? err.message : String(err) };
  }
};

module.exports = {
  createTransporter,
  sendBookingConfirmation,
  sendAdminNotification,
  sendWelcomeEmail,
};
