const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const missingEnv = [];
if (!process.env.EMAIL_USER) missingEnv.push('EMAIL_USER');
if (!process.env.EMAIL_PASS) missingEnv.push('EMAIL_PASS');

if (missingEnv.length > 0) {
  console.error('Email credentials are missing: ' + missingEnv.join(', '));
  console.error('Please copy backend/.env.example to backend/.env and set your EMAIL_USER and EMAIL_PASS values.');
  process.exit(1);
}

const {
  assertEmailSent,
  sendBookingConfirmation,
  sendAdminNotification,
  sendWelcomeEmail,
} = require('./services/emailService');

async function testEmails() {
  console.log('Testing email functionality...\n');

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
    console.log('Sending booking confirmation email...');
    assertEmailSent(await sendBookingConfirmation(testBooking), 'Booking confirmation');
    console.log('Booking confirmation: Sent');

    console.log('Sending admin notification email...');
    assertEmailSent(await sendAdminNotification(testBooking), 'Admin notification');
    console.log('Admin notification: Sent');

    console.log('Sending welcome email...');
    assertEmailSent(await sendWelcomeEmail(testUser), 'Welcome email');
    console.log('Welcome email: Sent');

    console.log('\nEmail testing completed. Check inbox and spam folder.');
  } catch (error) {
    console.error('Email testing failed:', error.message);

    console.log('\nTroubleshooting:');
    console.log('1. Check backend/.env file.');
    console.log('2. For Gmail, use an App Password, not your normal Gmail password.');
    console.log('3. Enable 2-Step Verification on the Gmail account.');
    console.log('4. Ensure EMAIL_USER and EMAIL_PASS are correct.');
    process.exitCode = 1;
  }
}

testEmails();
