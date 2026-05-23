const nodemailer = require("nodemailer");

console.log("🔧 Creating Gmail SMTP transporter...");
console.log("  User:", process.env.EMAIL_USER);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Email Error:", error);
  } else {
    console.log("✅ SMTP READY");
  }
});

module.exports = transporter;
