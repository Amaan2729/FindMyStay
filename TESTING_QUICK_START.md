# 🚀 Testing Quick Start Guide

## Get Running in 5 Minutes

### Step 1: Install Dependencies (2 min)

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Run Tests (1 min)

**Backend:**
```bash
cd backend
npm test
```

You should see:
```
PASS  __tests__/services/emailService.unit.test.js
PASS  __tests__/integration/api.integration.test.js
PASS  __tests__/models/User.test.js
PASS  __tests__/utilities/validators.test.js

Test Suites: 4 passed, 4 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        2.456 s
```

**Frontend:**
```bash
cd frontend
npm test
```

You should see:
```
PASS  src/test/StarRating.test.js
PASS  src/test/firestoreService.test.js
PASS  src/test/authService.test.js

Test Suites: 3 passed, 3 total
Tests:       15 passed, 15 total
Time:        1.234 s
```

### Step 3: View Coverage (1 min)

**Backend:**
```bash
npm run test:coverage
```

Opens `backend/coverage/index.html` in browser

**Frontend:**
```bash
npm run test:coverage
```

Opens `frontend/coverage/index.html` in browser

### Step 4: Start Debugging (1 min)

**Option A: Debug Server**
1. Open `backend/routes/booking.js`
2. Click line number to set breakpoint
3. Press `F5` → Select "Backend - Node Debug"
4. Make request to API → Hits breakpoint!

**Option B: Debug Tests**
1. Open `backend/__tests__/services/emailService.unit.test.js`
2. Click line number to set breakpoint
3. Press `F5` → Select "Backend - Jest Tests"
4. Tests run, hit breakpoint!

**Option C: Debug Frontend**
1. Press `F5` → Select "Frontend - Vite Dev Server"
2. Open http://localhost:5173
3. Press `F12` for DevTools
4. Inspect and debug!

---

## Available Commands

### Backend
```bash
npm test                 # Run all tests
npm run test:watch     # Watch mode (re-run on change)
npm run test:coverage  # Generate coverage report
npm run test:debug     # Debug mode with breakpoints
```

### Frontend
```bash
npm test                # Watch mode
npm test -- --run      # Run once
npm run test:ui       # Open visual UI
npm run test:coverage # Generate coverage report
```

---

## 5-Minute Challenges

Try these to get familiar:

### Challenge 1: Run All Tests (1 min)
```bash
cd backend && npm test
cd frontend && npm test
```
✅ Success: All tests pass!

### Challenge 2: Generate Coverage Report (1 min)
```bash
cd backend && npm run test:coverage
# View backend/coverage/index.html
```
✅ Success: Coverage report loads!

### Challenge 3: Debug a Test (3 min)
1. Open `backend/__tests__/services/emailService.unit.test.js`
2. Find line 19 (first test)
3. Click line number to set breakpoint
4. Press F5 → Select "Backend - Jest Tests"
5. See test pause at breakpoint
✅ Success: Debugger works!

---

## Common Quick Tasks

### Watch Tests as You Code
```bash
cd backend
npm run test:watch
# Tests re-run when you save files
```

### Run Single Test File
```bash
cd backend
npm test -- emailService.unit.test.js
```

### Run Tests Matching Pattern
```bash
cd backend
npm test -- --testNamePattern="email"
# Only runs tests with "email" in name
```

### Debug Specific Test
1. Open test file
2. Add `it.only(...)` around test
3. Press F5 → Select debug config
4. Only that test runs with debugger

### Check Coverage by File
```bash
cd backend
npm run test:coverage
# Open coverage/index.html
# Click on file names to see uncovered lines
```

---

## Essential Concepts in 30 Seconds

### Unit Test
Tests one function in isolation:
```javascript
it('should validate email', () => {
  expect(validateEmail('test@example.com')).toBe(true);
});
```

### Integration Test
Tests multiple components together:
```javascript
it('should complete booking', async () => {
  const res = await request(app).post('/api/bookings').send(data);
  expect(res.status).toBe(201);
});
```

### Mock
Replaces real function with fake:
```javascript
jest.mock('../services/email');
emailService.send.mockResolvedValue({ success: true });
```

### Breakpoint
Pauses code execution at line:
```
1. Click line number in VS Code
2. Line gets red dot
3. Run debugger (F5)
4. Code pauses at breakpoint
```

---

## File Structure Explained

```
FindMyStay/
├── backend/
│   ├── __tests__/                    # All backend tests
│   │   ├── setup.js                 # Test configuration
│   │   ├── services/                # Service tests
│   │   ├── integration/             # API tests
│   │   ├── models/                  # Model tests
│   │   ├── utilities/               # Utility function tests
│   │   └── mocks/                   # Mock data
│   ├── jest.config.js               # Jest configuration
│   └── package.json                 # npm scripts
│
├── frontend/
│   ├── src/
│   │   └── test/                    # All frontend tests
│   │       ├── setup.js             # Test configuration
│   │       ├── authService.test.js
│   │       ├── firestoreService.test.js
│   │       └── StarRating.test.js
│   ├── vitest.config.js             # Vitest configuration
│   └── package.json                 # npm scripts
│
├── .vscode/
│   └── launch.json                  # Debug configurations
│
└── Documentation/
    ├── TESTING_FRAMEWORK_GUIDE.md           # 📖 Complete guide
    ├── TESTING_QUICK_REFERENCE.md          # ⚡ Quick patterns
    ├── ADVANCED_TESTING_PATTERNS.md        # 🚀 Advanced stuff
    ├── TESTING_IMPLEMENTATION_SUMMARY.md   # 📋 What's done
    ├── TESTING_CHECKLIST.md                # ✅ Todo list
    └── TESTING_QUICK_START.md              # 👈 You are here
```

---

## Troubleshooting - 30 Second Fixes

### ❌ "npm: command not found"
```bash
# Install Node.js from nodejs.org
node --version  # Should show v14+
```

### ❌ Tests timeout
```bash
# Increase timeout
npm test -- --testTimeout=30000
```

### ❌ "Cannot find module"
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### ❌ Debugger won't connect
```bash
# Kill existing debugger session
# Restart VS Code (Ctrl+Shift+P → Reload Window)
```

---

## Next Steps

### Immediate (Today)
1. ✅ Install dependencies
2. ✅ Run tests
3. ✅ View coverage
4. ✅ Try debugging

### Short-term (This Week)
1. 📖 Read `TESTING_FRAMEWORK_GUIDE.md`
2. 🧪 Write 5 new test cases
3. 🐛 Debug a failing test
4. 📊 Check coverage report

### Medium-term (This Month)
1. 💯 Increase coverage to 60%+
2. 🎯 Write integration tests
3. 🚀 Setup GitHub Actions
4. 👥 Train team on testing

---

## Key Files to Know

| File | Purpose |
|------|---------|
| `TESTING_FRAMEWORK_GUIDE.md` | **Read this first!** Complete guide with examples |
| `TESTING_QUICK_REFERENCE.md` | Common patterns and assertions |
| `jest.config.js` | Backend test configuration |
| `vitest.config.js` | Frontend test configuration |
| `.vscode/launch.json` | Debugging configurations |
| `.env.test` | Test environment variables |

---

## Quick Facts

✨ **20 Backend Tests** - Services, Models, Utilities, Integration
✨ **15 Frontend Tests** - Components, Services, Utilities
✨ **6 Debug Configs** - Backend, Frontend, Tests, Full Stack
✨ **4 Guide Documents** - Framework, Quick Ref, Advanced, Checklist
✨ **100% Setup Complete** - Ready to use immediately!

---

## 🎯 Success Checklist

- [ ] Dependencies installed
- [ ] Tests running successfully
- [ ] All tests passing
- [ ] Coverage reports generated
- [ ] Debugging works
- [ ] Ready to write more tests!

---

## 💡 Pro Tips

1. **Use `.only` for single test**:
   ```javascript
   it.only('test this', () => {});
   ```

2. **Watch mode is your friend**:
   ```bash
   npm run test:watch
   # Auto-runs on file save
   ```

3. **Debug in browser too**:
   ```bash
   npm run dev
   # Press F12 → DevTools
   ```

4. **Check coverage gaps**:
   ```bash
   npm run test:coverage
   # Open coverage/index.html
   # Red lines = not tested
   ```

---

## 🚀 You're Ready!

Everything is set up. Now it's time to:

1. Write more tests
2. Debug with confidence
3. Improve code quality
4. Ship better software

**Start now:**
```bash
cd backend
npm test
```

**Need help?**
→ Check `TESTING_FRAMEWORK_GUIDE.md`
→ Search `TESTING_QUICK_REFERENCE.md`
→ Review test examples in `__tests__/`

---

Happy Testing! 🧪✨

*P.S. The best time to write tests is when writing code. The second best time is now!*
