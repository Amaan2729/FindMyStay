import { describe, it, expect } from 'vitest';

describe('Authentication Utilities', () => {
  describe('Email validation', () => {
    it('should validate email format', () => {
      const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('test.user@domain.co.uk')).toBe(true);
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });

  describe('Password strength', () => {
    it('should validate password strength', () => {
      const validatePassword = (password) => {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
      };

      expect(validatePassword('StrongPass123')).toBe(true);
      expect(validatePassword('weak')).toBe(false);
      expect(validatePassword('nouppercase123')).toBe(false);
      expect(validatePassword('NOLOWERCASE123')).toBe(false);
    });
  });

  describe('Token management', () => {
    it('should check token expiration', () => {
      const isTokenExpired = (expiryTime) => {
        return Date.now() > expiryTime;
      };

      const futureTime = Date.now() + 3600000; // 1 hour from now
      const pastTime = Date.now() - 3600000; // 1 hour ago

      expect(isTokenExpired(futureTime)).toBe(false);
      expect(isTokenExpired(pastTime)).toBe(true);
    });
  });

  describe('User data sanitization', () => {
    it('should sanitize user input', () => {
      const sanitizeInput = (input) => {
        return String(input).trim().replace(/[<>]/g, '');
      };

      expect(sanitizeInput('  hello  ')).toBe('hello');
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
    });
  });
});
