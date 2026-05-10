const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const missingEnv = [];
if (!process.env.EMAIL_USER) missingEnv.push('EMAIL_USER');
if (!process.env.EMAIL_PASS) missingEnv.push('EMAIL_PASS');

if (missingEnv.length > 0) {
  console.error('❌ Email credentials are missing: ' + missingEnv.join(', '));
  console.error('Please copy backend/.env.example to backend/.env and set your EMAIL_USER and EMAIL_PASS values.');
  process.exit(1);
}

// Import email service AFTER env is loaded
const {
  sendBookingConfirmation,
  sendAdminNotification,
  sendWelcomeEmail,
} = require('./services/emailService');

// Test email functionality
async function testEmails() {
  console.log('🧪 Testing Email Functionality...\n');

  // Test booking data
  const testBooking = {
    id: 'TEST-123',
    hotelName: 'Test Hotel',
    name: 'John Doe',
    email: process.env.EMAIL_USER,
    phone: '+91-9876543210',
    checkin: new Date().toISOString().split('T')[0],
    checkout: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    rooms: 2,
    guests: 4,
    totalPrice: 8500,
    createdAt: new Date().toISOString(),
  };

  const testUser = {
    name: 'Test User',
    email: process.env.EMAIL_USER,
  };

  try {
    console.log('📧 Sending booking confirmation email...');
    const bookingResult = await sendBookingConfirmation(testBooking);
    console.log('✅ Booking confirmation:', bookingResult.success ? 'Sent' : 'Failed');

    console.log('📧 Sending admin notification email...');
    const adminResult = await sendAdminNotification(testBooking);
    console.log('✅ Admin notification:', adminResult.success ? 'Sent' : 'Failed');

    console.log('📧 Sending welcome email...');
    const welcomeResult = await sendWelcomeEmail(testUser);
    console.log('✅ Welcome email:', welcomeResult.success ? 'Sent' : 'Failed');

    console.log('\n🎉 Email testing completed!');
    console.log('Check inbox + spam folder 📩');

  } catch (error) {
    console.error('❌ Email testing failed:', error.message);

    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check backend/.env file');
    console.log('2. Use Gmail App Password (NOT normal password)');
    console.log('3. Enable 2-Step Verification');
    console.log('4. Ensure EMAIL_USER and EMAIL_PASS are correct');
  }
}

// Run test
testEmails();