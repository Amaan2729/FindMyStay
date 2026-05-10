// Setup file for all tests
require('dotenv').config({ path: '.env.test' });

// Suppress console logs during tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  // Keep error for debugging
  error: console.error,
};

// Set test environment
process.env.NODE_ENV = 'test';
process.env.EMAIL_USER = 'test@example.com';
process.env.EMAIL_PASS = 'testpass';
process.env.EMAIL_HOST = 'smtp.gmail.com';
process.env.EMAIL_PORT = '587';
