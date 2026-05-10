// Mock data for testing

const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  password: 'hashedPassword123',
  firebaseUid: null
};

const mockFirebaseUser = {
  id: 2,
  name: 'Jane Smith',
  email: 'jane@example.com',
  password: null,
  firebaseUid: 'firebase_uid_123'
};

const mockHotel = {
  id: 1,
  name: 'Grand Hotel',
  city: 'New York',
  price: 150,
  rating: 4.5,
  image: 'hotel.jpg',
  description: 'A luxurious hotel'
};

const mockBooking = {
  id: 1,
  userId: 1,
  hotelId: 1,
  checkin: '2024-05-15',
  checkout: '2024-05-20',
  rooms: 2,
  guests: 4,
  totalPrice: 1500,
  status: 'confirmed'
};

const mockBookingConfirmationEmail = {
  email: 'john@example.com',
  hotelName: 'Grand Hotel',
  checkin: '2024-05-15',
  checkout: '2024-05-20',
  rooms: 2,
  guests: 4,
  totalPrice: 1500,
  id: 'BOOKING_123'
};

module.exports = {
  mockUser,
  mockFirebaseUser,
  mockHotel,
  mockBooking,
  mockBookingConfirmationEmail
};
