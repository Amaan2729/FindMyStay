import { describe, it, expect } from 'vitest';

describe('StarRating Component', () => {
  describe('Rating validation', () => {
    it('should validate rating is between 0 and 5', () => {
      const validateRating = (rating) => {
        return rating >= 0 && rating <= 5;
      };

      expect(validateRating(0)).toBe(true);
      expect(validateRating(2.5)).toBe(true);
      expect(validateRating(5)).toBe(true);
      expect(validateRating(-1)).toBe(false);
      expect(validateRating(6)).toBe(false);
    });

    it('should round rating to one decimal place', () => {
      const roundRating = (rating) => {
        return Math.round(rating * 10) / 10;
      };

      expect(roundRating(4.567)).toBe(4.6);
      expect(roundRating(3.14)).toBe(3.1);
      expect(roundRating(5.0)).toBe(5.0);
    });
  });

  describe('Star display', () => {
    it('should calculate number of filled stars', () => {
      const getFilledStars = (rating) => Math.floor(rating);

      expect(getFilledStars(0)).toBe(0);
      expect(getFilledStars(2.7)).toBe(2);
      expect(getFilledStars(5)).toBe(5);
    });

    it('should calculate half star', () => {
      const hasHalfStar = (rating) => {
        const decimal = rating % 1;
        return decimal >= 0.25 && decimal < 0.75;
      };

      expect(hasHalfStar(2.5)).toBe(true);
      expect(hasHalfStar(3.2)).toBe(false);
      expect(hasHalfStar(3.8)).toBe(false);
    });
  });
});
