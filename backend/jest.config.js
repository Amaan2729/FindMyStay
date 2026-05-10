module.exports = {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  verbose: true,
  collectCoverageFrom: [
    "**/*.js",
    "!**/node_modules/**",
    "!**/__tests__/**",
    "!**/jest.config.js",
    "!**/server.js",
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  testTimeout: 10000,
  setupFilesAfterEnv: ["<rootDir>/__tests__/setup.js"],
  maxWorkers: 1, // Run tests sequentially to avoid DB conflicts
};
