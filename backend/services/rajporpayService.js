module.exports = {
  createPaymentLink: async () => {
    throw new Error(
      "RajporPay is no longer supported in this project. Use Razorpay payment routes from backend/routes/payment.js instead."
    );
  },
  verifyPaymentStatus: async () => {
    throw new Error(
      "RajporPay is no longer supported in this project. Use Razorpay payment routes from backend/routes/payment.js instead."
    );
  },
};
