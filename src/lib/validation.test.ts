import { describe, expect, it } from 'vitest';
import {
  formatCardNumber,
  formatExpiry,
  passesLuhn,
  validateCardNumber,
  validateCheckout,
  validateCvv,
  validateEmail,
  validateExpiry,
  validatePhone,
} from './validation';

const NOW = new Date(2026, 10, 4); // 4 Nov 2026

describe('field validators', () => {
  it('validates email', () => {
    expect(validateEmail('')).toBeDefined();
    expect(validateEmail('a@b')).toBeDefined();
    expect(validateEmail('a.smith@kiln.com')).toBeUndefined();
  });

  it('validates phone', () => {
    expect(validatePhone('')).toBeDefined();
    expect(validatePhone('12ab345')).toBeDefined();
    expect(validatePhone('123')).toBeDefined();
    expect(validatePhone('+1 (555) 123-4567')).toBeUndefined();
  });

  it('checks the Luhn checksum', () => {
    expect(passesLuhn('4242424242424242')).toBe(true);
    expect(passesLuhn('4242424242424241')).toBe(false);
  });

  it('validates card numbers', () => {
    expect(validateCardNumber('')).toBeDefined();
    expect(validateCardNumber('1234')).toBeDefined();
    expect(validateCardNumber('1234 4556 7723 8990')).toBeDefined();
    expect(validateCardNumber('4242 4242 4242 4242')).toBeUndefined();
  });

  it('validates expiry against the current date', () => {
    expect(validateExpiry('13/27', NOW)).toBeDefined();
    expect(validateExpiry('10/26', NOW)).toBe('Card has expired');
    expect(validateExpiry('11/26', NOW)).toBeUndefined();
    expect(validateExpiry('1227', NOW)).toBeDefined();
  });

  it('validates CVV', () => {
    expect(validateCvv('12')).toBeDefined();
    expect(validateCvv('123')).toBeUndefined();
    expect(validateCvv('1234')).toBeUndefined();
  });
});

describe('validateCheckout', () => {
  const customer = {
    name: 'A. Smith',
    phone: '+1 555 123 4567',
    email: 'a.smith@kiln.com',
    address: '12 Clay Street, Portland',
    notes: '',
  };
  const card = { number: '4242 4242 4242 4242', expiry: '12/28', cvv: '123' };

  it('passes for a complete card order', () => {
    expect(validateCheckout({ customer, card, paymentMethod: 'card', cartSize: 2 }, NOW)).toEqual({});
  });

  it('flags required fields and an empty cart', () => {
    const errors = validateCheckout(
      { customer: { ...customer, name: '', email: '' }, card, paymentMethod: 'card', cartSize: 0 },
      NOW,
    );
    expect(Object.keys(errors).sort()).toEqual(['cart', 'email', 'name']);
  });

  it('ignores card fields for other payment methods', () => {
    const empty = { number: '', expiry: '', cvv: '' };
    expect(validateCheckout({ customer, card: empty, paymentMethod: 'paypal', cartSize: 1 }, NOW)).toEqual({});
    expect(
      Object.keys(validateCheckout({ customer, card: empty, paymentMethod: 'card', cartSize: 1 }, NOW)),
    ).toHaveLength(3);
  });
});

describe('formatters', () => {
  it('groups card digits by four', () => {
    expect(formatCardNumber('1234a5678 1234 5678')).toBe('1234 5678 1234 5678');
  });

  it('formats expiry as MM/YY', () => {
    expect(formatExpiry('1')).toBe('1');
    expect(formatExpiry('12')).toBe('12');
    expect(formatExpiry('12/')).toBe('12/');
    expect(formatExpiry('1227')).toBe('12/27');
  });
});
