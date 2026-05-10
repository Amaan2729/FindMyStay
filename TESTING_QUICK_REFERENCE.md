# Testing Quick Reference

## Common Testing Patterns

### 1. Testing Async Functions

```javascript
// Backend (Jest)
describe('Database operations', () => {
  it('should fetch user by ID', async () => {
    const user = await User.findById(1);
    expect(user).toBeDefined();
    expect(user.name).toBe('John');
  });

  it('should reject with error on invalid ID', async () => {
    await expect(User.findById(-1)).rejects.toThrow();
  });
});

// Frontend (Vitest)
it('should load hotels', async () => {
  const hotels = await firestoreService.getHotels();
  expect(hotels).toHaveLength(5);
});
```

### 2. Testing API Endpoints

```javascript
const request = require('supertest');
const app = require('../app');

describe('Booking API', () => {
  it('POST /api/bookings - should create booking', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .send({
        hotelId: 1,
        checkin: '2024-05-15',
        checkout: '2024-05-20'
      })
      .expect(201);
    
    expect(response.body).toHaveProperty('id');
    expect(response.body.status).toBe('confirmed');
  });

  it('GET /api/bookings/:id - should get booking', async () => {
    const response = await request(app)
      .get('/api/bookings/1')
      .expect(200);
    
    expect(response.body).toHaveProperty('hotelId');
  });
});
```

### 3. Testing Error Handling

```javascript
describe('Error handling', () => {
  it('should handle database connection error', async () => {
    jest.spyOn(db, 'query').mockRejectedValue(
      new Error('Connection failed')
    );

    await expect(getHotels()).rejects.toThrow('Connection failed');
  });

  it('should return 400 for invalid input', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .send({ /* invalid data */ })
      .expect(400);
    
    expect(response.body).toHaveProperty('error');
  });
});
```

### 4. Testing with Fixtures

```javascript
describe('Hotel Service', () => {
  let hotel;

  beforeEach(() => {
    hotel = {
      id: 1,
      name: 'Test Hotel',
      city: 'Test City',
      price: 100
    };
  });

  afterEach(() => {
    hotel = null;
  });

  it('should create hotel', () => {
    const result = createHotel(hotel);
    expect(result).toHaveProperty('id');
  });
});
```

### 5. Testing React Hooks

```javascript
import { renderHook, act } from '@testing-library/react';
import { useFirestore } from '../hooks/useFirestore';

describe('useFirestore', () => {
  it('should fetch hotels on mount', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFirestore());
    
    await waitForNextUpdate();
    
    expect(result.current.hotels).toHaveLength(5);
  });
});
```

### 6. Testing Context

```javascript
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../context/AuthContext';

describe('AuthContext', () => {
  it('should provide user data', () => {
    const user = { id: 1, name: 'John' };
    
    render(
      <AuthContext.Provider value={{ user }}>
        <UserDisplay />
      </AuthContext.Provider>
    );
    
    expect(screen.getByText('John')).toBeInTheDocument();
  });
});
```

### 7. Testing Form Submission

```javascript
import { render, screen, fireEvent } from '@testing-library/react';

describe('LoginForm', () => {
  it('should submit form with valid data', async () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });
});
```

### 8. Testing Snapshots

```javascript
import { render } from '@testing-library/react';

describe('HotelCard', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <HotelCard hotel={mockHotel} />
    );
    expect(container).toMatchSnapshot();
  });
});
```

## Debugging Commands

### Backend

```bash
# Debug specific test
npm run test:debug -- emailService.test.js

# Debug with breakpoints
# 1. Set breakpoint in VS Code
# 2. Run: npm run test:debug
# 3. Open chrome://inspect in Chrome
```

### Frontend

```bash
# Debug in browser DevTools
npm run dev
# Open http://localhost:5173
# Press F12 for DevTools

# Debug tests in VS Code
npm run test:debug
```

## Coverage Goals

| Metric      | Target | Current |
|------------|--------|---------|
| Statements | 80%    | -       |
| Branches   | 75%    | -       |
| Functions  | 80%    | -       |
| Lines      | 80%    | -       |

## Common Assertions

```javascript
// Equality
expect(value).toBe(expected);              // Exact match
expect(value).toEqual(expected);           // Deep equality
expect(value).toStrictEqual(expected);     // Strict equality

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// Numbers
expect(value).toBeGreaterThan(5);
expect(value).toBeGreaterThanOrEqual(5);
expect(value).toBeLessThan(5);
expect(value).toBeLessThanOrEqual(5);
expect(value).toBeCloseTo(4.9);

// Arrays
expect(array).toHaveLength(3);
expect(array).toContain(item);
expect(array).toEqual([1, 2, 3]);

// Objects
expect(object).toHaveProperty('name');
expect(object).toHaveProperty('name', 'John');

// Errors
expect(fn).toThrow();
expect(fn).toThrow('Error message');
expect(promise).rejects.toThrow();

// Strings
expect(string).toMatch(/regex/);
expect(string).toMatch('substring');
expect(string).toHaveLength(5);

// Mocks
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith(arg1, arg2);
expect(mockFn).toHaveBeenCalledTimes(2);
```

## Tips & Tricks

1. **Skip tests temporarily**:
   ```javascript
   it.skip('should work', () => {});
   ```

2. **Run only one test**:
   ```javascript
   it.only('should work', () => {});
   ```

3. **Focus on specific describe block**:
   ```javascript
   describe.only('Feature', () => {});
   ```

4. **Mark test as TODO**:
   ```javascript
   it.todo('should implement feature');
   ```

5. **Increase timeout for slow tests**:
   ```javascript
   it('should work', () => {}, 30000); // 30 seconds
   ```

---

For more examples, check the actual test files in `backend/__tests__/` and `frontend/src/test/`
