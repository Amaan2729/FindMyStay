# FindMyStay - Testing Framework & Debugging Guide

## 📋 Table of Contents

1. [Overview](#overview)
2. [Backend Testing](#backend-testing)
3. [Frontend Testing](#frontend-testing)
4. [Debugging Guide](#debugging-guide)
5. [Best Practices](#best-practices)
6. [Running Tests](#running-tests)
7. [Troubleshooting](#troubleshooting)

---

## Overview

This project implements a comprehensive testing framework using:

- **Backend**: Jest for unit and integration tests
- **Frontend**: Vitest + React Testing Library for component tests
- **Debugging**: VS Code debugger configurations for both backend and frontend

### Testing Pyramid

```
        ⬆️
    E2E Tests (Selenium, Cypress)
    ↑
    Integration Tests (API endpoints, Database)
    ↑
    Unit Tests (Functions, Components, Services)
```

---

## Backend Testing

### Test Types

#### 1. Unit Tests
Unit tests verify individual functions and services in isolation.

**Location**: `backend/__tests__/services/`, `backend/__tests__/utilities/`

**Example**: Email Service Unit Test
```javascript
describe('Email Service - Unit Tests', () => {
  describe('createTransporter', () => {
    it('should throw error when EMAIL_USER is missing', () => {
      delete process.env.EMAIL_USER;
      expect(() => createTransporter()).toThrow('Missing email credentials');
    });
  });
});
```

**Techniques Used**:
- Environment variable mocking
- Mock data with realistic scenarios
- Edge case testing
- Error handling verification

#### 2. Integration Tests
Integration tests verify how multiple components work together.

**Location**: `backend/__tests__/integration/`

**Example**: API Integration Test
```javascript
describe('API Integration Tests', () => {
  describe('GET / - Health Check', () => {
    it('should return 200 OK', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
    });
  });
});
```

**Techniques Used**:
- Supertest for HTTP requests
- Real endpoint testing
- Response validation
- Status code verification

#### 3. Model Tests
Unit tests for data models and validation.

**Location**: `backend/__tests__/models/`

**Example**: User Model Test
```javascript
describe('User Model', () => {
  describe('User validation', () => {
    it('should validate email format', () => {
      const validEmails = ['user@example.com', 'test.user@domain.co.uk'];
      validEmails.forEach(email => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        expect(isValid).toBe(true);
      });
    });
  });
});
```

### Running Backend Tests

```bash
# Install dependencies (if needed)
cd backend
npm install

# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run with coverage report
npm run test:coverage

# Debug tests
npm run test:debug
```

### Backend Test Coverage

Coverage thresholds (defined in jest.config.js):
- Branches: 50%
- Functions: 50%
- Lines: 50%
- Statements: 50%

To view coverage report:
```bash
npm run test:coverage
# Opens coverage/index.html
```

### Mocking in Backend Tests

**Mock Data**: `backend/__tests__/mocks/mockData.js`
```javascript
const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  password: 'hashedPassword123',
  firebaseUid: null
};
```

**Mock Transporter**: `backend/__tests__/mocks/mockTransporter.js`
```javascript
const mockTransporter = {
  sendMail: jest.fn((mailOptions, callback) => {
    callback(null, { messageId: 'mock-message-id' });
  })
};
```

---

## Frontend Testing

### Test Types

#### 1. Unit Tests
Test individual functions and utilities.

**Location**: `frontend/src/test/`

**Example**: Authentication Service Test
```javascript
describe('Authentication Utilities', () => {
  describe('Email validation', () => {
    it('should validate email format', () => {
      const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
      
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('invalid-email')).toBe(false);
    });
  });
});
```

#### 2. Component Tests
Test React components with React Testing Library.

**Example**: Star Rating Component Test
```javascript
describe('StarRating Component', () => {
  describe('Star display', () => {
    it('should calculate number of filled stars', () => {
      const getFilledStars = (rating) => Math.floor(rating);
      expect(getFilledStars(2.7)).toBe(2);
    });
  });
});
```

#### 3. Service Tests
Test custom hooks and services.

**Example**: Firestore Service Test
```javascript
describe('FirestoreService', () => {
  describe('Data validation', () => {
    it('should validate hotel data structure', () => {
      const validateHotel = (hotel) => {
        return hotel.id && hotel.name && hotel.city && hotel.price;
      };
      
      const validHotel = { id: 1, name: 'Grand', city: 'NY', price: 150 };
      expect(validateHotel(validHotel)).toBe(true);
    });
  });
});
```

### Running Frontend Tests

```bash
# Install dependencies (if needed)
cd frontend
npm install

# Run tests in watch mode
npm run test

# Run tests once
npm run test -- --run

# Run with UI dashboard
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Frontend Test Setup

**Setup File**: `frontend/src/test/setup.js`
- Configures jsdom environment
- Mocks browser APIs (localStorage, matchMedia)
- Sets up React Testing Library

---

## Debugging Guide

### VS Code Debugging Configurations

Available debug configurations in `.vscode/launch.json`:

#### 1. Backend - Node Debug
Debug the Node.js backend server.

**Steps**:
1. Set breakpoints in backend code
2. Press `F5` or go to Run → Start Debugging
3. Select "Backend - Node Debug"
4. Server starts with debugger attached
5. Use Debug Console to inspect variables

**Features**:
- Step through code
- Watch expressions
- Debug console
- Call stack inspection

#### 2. Backend - Jest Tests
Debug Jest test files.

**Steps**:
1. Press `F5`
2. Select "Backend - Jest Tests"
3. Tests run with debugger attached
4. Set breakpoints in test files

#### 3. Backend - Specific Test File
Debug a single test file (useful for large projects).

**Steps**:
1. Open the test file
2. Press `F5`
3. Select "Backend - Specific Test File"
4. Only that test file runs

#### 4. Frontend - Vite Dev Server
Debug frontend during development.

**Steps**:
1. Press `F5`
2. Select "Frontend - Vite Dev Server"
3. Dev server starts on localhost:5173
4. Open http://localhost:5173 in browser

#### 5. Frontend - Vitest Tests
Debug frontend tests.

**Steps**:
1. Press `F5`
2. Select "Frontend - Vitest Tests"
3. Tests run in watch mode with debugger

#### 6. Full Stack Debug
Debug both backend and frontend simultaneously.

**Steps**:
1. Press `F5`
2. Select "Full Stack Debug"
3. Both servers start with debuggers attached

### Debugging Techniques

#### 1. Breakpoints
```javascript
// Set breakpoint by clicking line number in VS Code
function calculateTotal(price, quantity) {
  const total = price * quantity; // Click here to set breakpoint
  return total;
}
```

#### 2. Debug Console
In the Debug Console:
```javascript
// Inspect variables
> user
{ name: 'John', email: 'john@example.com' }

// Execute code
> user.name
'John'

// Call functions
> calculateTotal(100, 5)
500
```

#### 3. Watch Expressions
Right-click on variable → Add to Watch
Monitor variable changes during execution

#### 4. Logpoints
Right-click breakpoint → Edit breakpoint → "Logpoint"
Logs message without stopping execution:
```javascript
// Logpoint: User logged in: {user.name}
```

#### 5. Conditional Breakpoints
Right-click breakpoint → Edit breakpoint → Condition:
```javascript
// Only pause when count > 10
count > 10

// Only pause for specific user
user.email === 'admin@example.com'
```

### Debug Output Examples

**Before Debug**:
```
POST /api/booking 200 45ms
```

**With Debugger**:
```
📍 Paused at booking.js:23

Variables:
- bookingData: { hotelId: 1, userId: 5, ... }
- totalPrice: 1500
- status: 'confirmed'

Stack:
> createBooking (booking.js:23)
  POST handler (routes/booking.js:15)
  express middleware
```

---

## Best Practices

### 1. Test Organization

**DO**:
```javascript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid data', () => {});
    it('should throw error with invalid email', () => {});
  });
  
  describe('updateUser', () => {
    it('should update existing user', () => {});
  });
});
```

**DON'T**:
```javascript
it('test 1', () => {});
it('test 2', () => {});
```

### 2. Test Naming

**DO**:
```javascript
it('should return 200 status and user data when valid id provided', () => {});
```

**DON'T**:
```javascript
it('works', () => {});
it('test get user', () => {});
```

### 3. Arrange-Act-Assert (AAA) Pattern

```javascript
it('should calculate total price correctly', () => {
  // Arrange
  const pricePerNight = 150;
  const nights = 5;
  const rooms = 2;
  
  // Act
  const total = calculateTotal(pricePerNight, nights, rooms);
  
  // Assert
  expect(total).toBe(1500);
});
```

### 4. Mock External Dependencies

```javascript
// Mock email service
jest.mock('../services/emailService', () => ({
  sendEmail: jest.fn().mockResolvedValue({ success: true })
}));

// Now tests don't actually send emails
```

### 5. Use Factories for Test Data

```javascript
const createMockUser = (overrides = {}) => ({
  id: 1,
  name: 'John',
  email: 'john@example.com',
  ...overrides
});

// Usage
const admin = createMockUser({ role: 'admin' });
const user = createMockUser({ name: 'Jane' });
```

### 6. Test Both Happy and Unhappy Paths

```javascript
describe('sendBookingEmail', () => {
  it('should send email successfully', async () => {
    // Happy path
    const result = await sendBookingEmail(validData);
    expect(result.success).toBe(true);
  });
  
  it('should throw error when email is invalid', async () => {
    // Unhappy path
    await expect(sendBookingEmail(invalidData)).rejects.toThrow();
  });
});
```

### 7. Test Edge Cases

```javascript
describe('calculateNights', () => {
  it('should handle same-day checkout', () => {
    expect(calculateNights('2024-05-15', '2024-05-15')).toBe(0);
  });
  
  it('should handle single night', () => {
    expect(calculateNights('2024-05-15', '2024-05-16')).toBe(1);
  });
  
  it('should handle long stays', () => {
    expect(calculateNights('2024-05-15', '2024-06-15')).toBe(31);
  });
});
```

---

## Running Tests

### Quick Commands

```bash
# Backend
cd backend
npm test                 # Run all tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
npm run test:debug     # Debug mode

# Frontend
cd frontend
npm test               # Watch mode
npm run test -- --run  # Run once
npm run test:ui       # UI dashboard
npm run test:coverage # Coverage report
```

### CI/CD Integration

Add to your CI pipeline:
```yaml
# GitHub Actions example
- name: Run tests
  run: npm test -- --run --coverage

- name: Upload coverage
  uses: codecov/codecov-action@v3
```

---

## Troubleshooting

### Issue: Tests hang or timeout

**Solution**:
```bash
# Backend: Set timeout in jest.config.js
testTimeout: 10000

# Frontend: Set timeout in vitest.config.js
testTimeout: 10000

# Or set per test
it('test name', async () => {}, 30000); // 30 second timeout
```

### Issue: Cannot find module in tests

**Solution**:
```javascript
// Use proper path resolution
const path = require('path');
const { setup } = require(path.join(__dirname, '../..', 'setup'));
```

### Issue: Database conflicts in tests

**Solution**:
- Jest config has `maxWorkers: 1` to run tests sequentially
- Use separate databases for testing

### Issue: Mock not working

**Solution**:
```javascript
// Clear mock before each test
beforeEach(() => {
  jest.clearAllMocks();
});
```

### Issue: Debugging not connecting

**Solution**:
1. Ensure port 9229 is available
2. Check firewall settings
3. Restart VS Code
4. Use `--inspect-brk` in package.json scripts

---

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [VS Code Debugging](https://code.visualstudio.com/docs/editor/debugging)
- [Supertest](https://github.com/visionmedia/supertest)

---

## Next Steps

1. **Run existing tests**:
   ```bash
   cd backend
   npm install
   npm test
   ```

2. **Write more tests** for your specific features

3. **Set up CI/CD** to run tests automatically

4. **Increase coverage** gradually to meet your targets

5. **Use debugging** when tests fail to understand why

---

Happy Testing! 🧪✨
