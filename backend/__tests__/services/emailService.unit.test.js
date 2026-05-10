const { createTransporter } = require('../../services/emailService');

describe('Email Service - Unit Tests', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('createTransporter', () => {
    it('should throw error when EMAIL_USER is missing', () => {
      delete process.env.EMAIL_USER;
      process.env.EMAIL_PASS = 'password';
      
      expect(() => createTransporter()).toThrow('Missing email credentials');
    });

    it('should throw error when EMAIL_PASS is missing', () => {
      process.env.EMAIL_USER = 'test@example.com';
      delete process.env.EMAIL_PASS;
      
      expect(() => createTransporter()).toThrow('Missing email credentials');
    });

    it('should create transporter with required environment variables', () => {
      process.env.EMAIL_USER = 'test@example.com';
      process.env.EMAIL_PASS = 'testpass';
      process.env.EMAIL_HOST = 'smtp.gmail.com';
      process.env.EMAIL_PORT = '587';

      const transporter = createTransporter();
      expect(transporter).toBeDefined();
      expect(typeof transporter.sendMail).toBe('function');
    });

    it('should use default SMTP host when not provided', () => {
      process.env.EMAIL_USER = 'test@example.com';
      process.env.EMAIL_PASS = 'testpass';
      delete process.env.EMAIL_HOST;
      process.env.EMAIL_PORT = '587';

      const transporter = createTransporter();
      expect(transporter).toBeDefined();
      // Verify it uses default host
      expect(transporter.options.host).toBe('smtp.gmail.com');
    });

    it('should use port 587 as default when not specified', () => {
      process.env.EMAIL_USER = 'test@example.com';
      process.env.EMAIL_PASS = 'testpass';
      process.env.EMAIL_HOST = 'smtp.gmail.com';
      delete process.env.EMAIL_PORT;

      const transporter = createTransporter();
      expect(transporter.options.port).toBe(587);
    });

    it('should set secure flag to true for port 465', () => {
      process.env.EMAIL_USER = 'test@example.com';
      process.env.EMAIL_PASS = 'testpass';
      process.env.EMAIL_HOST = 'smtp.gmail.com';
      process.env.EMAIL_PORT = '465';

      const transporter = createTransporter();
      expect(transporter.options.secure).toBe(true);
    });

    it('should set secure flag to false for port 587', () => {
      process.env.EMAIL_USER = 'test@example.com';
      process.env.EMAIL_PASS = 'testpass';
      process.env.EMAIL_HOST = 'smtp.gmail.com';
      process.env.EMAIL_PORT = '587';

      const transporter = createTransporter();
      expect(transporter.options.secure).toBe(false);
    });
  });
});
