// Mock nodemailer transporter for testing

const mockTransporter = {
  sendMail: jest.fn((mailOptions, callback) => {
    if (callback) {
      callback(null, { messageId: 'mock-message-id' });
    }
    return Promise.resolve({ messageId: 'mock-message-id' });
  }),
  verify: jest.fn((callback) => {
    if (callback) {
      callback(null, true);
    }
    return Promise.resolve(true);
  })
};

module.exports = mockTransporter;
