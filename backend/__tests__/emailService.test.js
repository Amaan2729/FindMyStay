const { createTransporter } = require("../services/emailService");

describe("emailService", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("throws when SMTP credentials are missing", () => {
    delete process.env.EMAIL_USER;
    delete process.env.EMAIL_PASS;
    expect(() => createTransporter()).toThrow("Missing email credentials");
  });

  it("creates a transporter when SMTP credentials are provided", () => {
    process.env.EMAIL_USER = "test@example.com";
    process.env.EMAIL_PASS = "secret";
    process.env.EMAIL_HOST = "smtp.example.com";
    process.env.EMAIL_PORT = "587";

    const transporter = createTransporter();
    expect(transporter).toBeDefined();
    expect(typeof transporter.sendMail).toBe("function");
  });
});
