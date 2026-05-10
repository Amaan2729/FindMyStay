import { describe, it, expect } from 'vitest';

describe('FirestoreService', () => {
  describe('Data validation', () => {
    it('should validate hotel data structure', () => {
      const validateHotel = (hotel) => {
        return (
          hotel.id &&
          hotel.name &&
          hotel.city &&
          hotel.price &&
          typeof hotel.price === 'number'
        );
      };

      const validHotel = {
        id: 1,
        name: 'Grand Hotel',
        city: 'New York',
        price: 150
      };

      const invalidHotel = {
        id: 1,
        name: 'Grand Hotel',
        city: 'New York'
        // Missing price
      };

      expect(validateHotel(validHotel)).toBe(true);
      expect(validateHotel(invalidHotel)).toBe(false);
    });

    it('should validate booking data structure', () => {
      const validateBooking = (booking) => {
        return (
          booking.userId &&
          booking.hotelId &&
          booking.checkin &&
          booking.checkout &&
          new Date(booking.checkin) < new Date(booking.checkout)
        );
      };

      const validBooking = {
        userId: 1,
        hotelId: 1,
        checkin: '2024-05-15',
        checkout: '2024-05-20'
      };

      const invalidBooking = {
        userId: 1,
        hotelId: 1,
        checkin: '2024-05-20',
        checkout: '2024-05-15' // Checkout before checkin
      };

      expect(validateBooking(validBooking)).toBe(true);
      expect(validateBooking(invalidBooking)).toBe(false);
    });

    it('should parse hotel data correctly', () => {
      const parseHotel = (data) => {
        return {
          id: data.id,
          name: String(data.name || '').trim(),
          city: String(data.city || '').trim(),
          price: Number(data.price) || 0,
          rating: Number(data.rating) || 0
        };
      };

      const rawData = {
        id: 1,
        name: '  Grand Hotel  ',
        city: 'new york',
        price: '150.99',
        rating: '4.5'
      };

      const parsed = parseHotel(rawData);

      expect(parsed.name).toBe('Grand Hotel');
      expect(parsed.city).toBe('new york');
      expect(parsed.price).toBe(150.99);
      expect(parsed.rating).toBe(4.5);
    });
  });

  describe('Date handling', () => {
    it('should calculate number of nights', () => {
      const calculateNights = (checkin, checkout) => {
        const start = new Date(checkin);
        const end = new Date(checkout);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      };

      expect(calculateNights('2024-05-15', '2024-05-20')).toBe(5);
      expect(calculateNights('2024-05-15', '2024-05-16')).toBe(1);
    });

    it('should calculate total price', () => {
      const calculateTotal = (pricePerNight, nights, rooms = 1) => {
        return pricePerNight * nights * rooms;
      };

      expect(calculateTotal(150, 5)).toBe(750);
      expect(calculateTotal(150, 5, 2)).toBe(1500);
    });
  });
});
