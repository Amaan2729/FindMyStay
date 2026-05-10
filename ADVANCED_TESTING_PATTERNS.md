# Advanced Testing Patterns

## Integration Testing Scenarios

### 1. Complete Booking Flow

```javascript
describe('Complete Booking Flow - Integration Test', () => {
  it('should complete full booking workflow', async () => {
    // Step 1: User logs in
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@example.com', password: 'password' });
    
    const token = loginRes.body.token;

    // Step 2: User searches hotels
    const hotelsRes = await request(app)
      .get('/api/hotels')
      .query({ city: 'New York', checkin: '2024-05-15' })
      .set('Authorization', `Bearer ${token}`);

    expect(hotelsRes.body).toHaveLength(3);

    // Step 3: User gets hotel details
    const hotelId = hotelsRes.body[0].id;
    const hotelRes = await request(app)
      .get(`/api/hotels/${hotelId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(hotelRes.body).toHaveProperty('reviews');

    // Step 4: User creates booking
    const bookingRes = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        hotelId,
        checkin: '2024-05-15',
        checkout: '2024-05-20',
        rooms: 2,
        guests: 4
      });

    expect(bookingRes.status).toBe(201);
    const bookingId = bookingRes.body.id;

    // Step 5: User retrieves booking
    const getBookingRes = await request(app)
      .get(`/api/bookings/${bookingId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(getBookingRes.body.status).toBe('confirmed');

    // Step 6: Verify email was sent
    expect(mockEmailService.sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'user@example.com',
        subject: expect.stringContaining('Booking Confirmation')
      })
    );
  });
});
```

### 2. Error Handling in Integration

```javascript
describe('Error Handling - Integration Test', () => {
  it('should handle payment failure gracefully', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .send({
        hotelId: 1,
        checkin: '2024-05-15',
        checkout: '2024-05-20'
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('Invalid payment');

    // Verify booking was not created
    const bookings = await Booking.findAll();
    expect(bookings).toHaveLength(0);
  });

  it('should handle duplicate booking prevention', async () => {
    const bookingData = {
      hotelId: 1,
      userId: 1,
      checkin: '2024-05-15',
      checkout: '2024-05-20',
      rooms: 1
    };

    // First booking succeeds
    const res1 = await createBooking(bookingData);
    expect(res1.status).toBe(201);

    // Second overlapping booking fails
    const res2 = await createBooking({
      ...bookingData,
      checkin: '2024-05-17',
      checkout: '2024-05-22'
    });
    expect(res2.status).toBe(409);
    expect(res2.body.error).toContain('already booked');
  });
});
```

### 3. Database State Management

```javascript
describe('Database Transactions', () => {
  beforeEach(async () => {
    // Seed test data
    await seedTestData();
  });

  afterEach(async () => {
    // Clean up test data
    await clearTestData();
  });

  it('should rollback on transaction failure', async () => {
    const initialCount = await Hotel.count();

    try {
      await transactionTest();
    } catch (error) {
      // Expected to fail
    }

    const finalCount = await Hotel.count();
    expect(finalCount).toBe(initialCount); // No changes
  });
});
```

### 4. Concurrent Request Handling

```javascript
describe('Concurrent Requests', () => {
  it('should handle multiple simultaneous bookings', async () => {
    const bookingPromises = [];

    for (let i = 0; i < 10; i++) {
      bookingPromises.push(
        request(app)
          .post('/api/bookings')
          .send({
            hotelId: 1,
            userId: i,
            checkin: '2024-05-15',
            checkout: '2024-05-20'
          })
      );
    }

    const results = await Promise.all(bookingPromises);

    // All should succeed (or fail appropriately if room unavailable)
    results.forEach(res => {
      expect([201, 409]).toContain(res.status);
    });
  });
});
```

## End-to-End Testing Patterns

### 1. User Journey

```javascript
describe('User Journey - E2E', () => {
  it('should complete full user journey from signup to booking', async () => {
    // 1. User signs up
    const signupRes = await request(app)
      .post('/api/auth/signup')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'StrongPass123'
      });

    expect(signupRes.status).toBe(201);
    const userId = signupRes.body.user.id;

    // 2. User logs in
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john@example.com',
        password: 'StrongPass123'
      });

    const token = loginRes.body.token;

    // 3. Browse hotels
    const hotelsRes = await request(app)
      .get('/api/hotels')
      .query({ city: 'NYC', checkin: '2024-06-01' });

    expect(hotelsRes.body.length).toBeGreaterThan(0);

    // 4. Make booking
    const bookingRes = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        hotelId: hotelsRes.body[0].id,
        checkin: '2024-06-01',
        checkout: '2024-06-05',
        guests: 2,
        rooms: 1
      });

    expect(bookingRes.status).toBe(201);

    // 5. Verify booking appears in user profile
    const profileRes = await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(profileRes.body.bookings).toContainEqual(
      expect.objectContaining({
        id: bookingRes.body.id,
        status: 'confirmed'
      })
    );
  });
});
```

### 2. Stress Testing

```javascript
describe('Stress Testing', () => {
  it('should handle high load of concurrent bookings', async () => {
    const startTime = Date.now();
    const concurrentRequests = 50;

    const promises = Array.from({ length: concurrentRequests }, (_, i) =>
      request(app)
        .post('/api/bookings')
        .send({
          hotelId: 1,
          userId: i,
          checkin: '2024-06-01',
          checkout: '2024-06-05'
        })
    );

    const results = await Promise.all(promises);
    const endTime = Date.now();

    const successCount = results.filter(r => r.status === 201).length;
    const responseTime = endTime - startTime;

    console.log(`Processed ${successCount} bookings in ${responseTime}ms`);
    expect(responseTime).toBeLessThan(10000); // Should complete in 10 seconds
    expect(successCount).toBeGreaterThan(0);
  });
});
```

## Frontend Integration Testing

### 1. Component Integration

```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BookingFlow } from '../BookingFlow';
import { AuthContext } from '../context/AuthContext';

describe('Booking Flow - Component Integration', () => {
  it('should complete booking flow', async () => {
    const user = { id: 1, email: 'test@example.com' };

    render(
      <AuthContext.Provider value={{ user, isAuthenticated: true }}>
        <BookingFlow />
      </AuthContext.Provider>
    );

    // Select destination
    const destInput = screen.getByPlaceholderText(/destination/i);
    fireEvent.change(destInput, { target: { value: 'New York' } });

    // Select dates
    const checkinInput = screen.getByLabelText(/check-in/i);
    fireEvent.change(checkinInput, { target: { value: '2024-06-01' } });

    // Search
    const searchBtn = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchBtn);

    // Wait for hotels to load
    await waitFor(() => {
      expect(screen.getByText(/Grand Hotel/)).toBeInTheDocument();
    });

    // Book hotel
    const bookBtn = screen.getByRole('button', { name: /book/i });
    fireEvent.click(bookBtn);

    // Verify success
    await waitFor(() => {
      expect(screen.getByText(/booking confirmed/i)).toBeInTheDocument();
    });
  });
});
```

### 2. API Mocking

```javascript
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/hotels', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: 'Hotel 1', price: 100 },
        { id: 2, name: 'Hotel 2', price: 150 }
      ])
    );
  }),

  rest.post('/api/bookings', (req, res, ctx) => {
    return res(
      ctx.json({
        id: 'booking-123',
        status: 'confirmed'
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Hotel Search with MSW', () => {
  it('should display hotels from API', async () => {
    render(<HotelSearch />);

    await waitFor(() => {
      expect(screen.getByText('Hotel 1')).toBeInTheDocument();
      expect(screen.getByText('Hotel 2')).toBeInTheDocument();
    });
  });
});
```

## Performance Testing

### 1. Response Time Testing

```javascript
describe('Performance - Response Times', () => {
  it('GET /api/hotels should respond within 100ms', async () => {
    const startTime = performance.now();
    await request(app).get('/api/hotels');
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(100);
  });

  it('POST /api/bookings should respond within 500ms', async () => {
    const startTime = performance.now();
    await request(app).post('/api/bookings').send(bookingData);
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(500);
  });
});
```

### 2. Memory Usage

```javascript
describe('Memory Usage', () => {
  it('should not leak memory on multiple requests', async () => {
    const initialMemory = process.memoryUsage().heapUsed;

    for (let i = 0; i < 1000; i++) {
      await request(app).get('/api/hotels');
    }

    const finalMemory = process.memoryUsage().heapUsed;
    const memoryIncrease = finalMemory - initialMemory;

    // Should not increase memory significantly
    expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024); // 10MB
  });
});
```

---

These patterns cover most real-world testing scenarios. Adapt them to your specific use cases!
