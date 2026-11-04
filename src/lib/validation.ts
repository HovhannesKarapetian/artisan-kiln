import type { CardInfo, CustomerInfo, PaymentMethod, ValidationErrors } from '@/types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const digitsOnly = (value: string): string => value.replace(/\D/g, '');

/** Luhn checksum used by all major card networks. */
export const passesLuhn = (digits: string): boolean => {
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let d = Number(digits[i]);
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
};

export const validateName = (v: string): string | undefined => {
  const t = v.trim();
  if (!t) return 'Customer name is required';
  if (t.length < 2) return 'Name is too short';
  return undefined;
};

export const validatePhone = (v: string): string | undefined => {
  if (!v.trim()) return 'Phone is required';
  if (/[^\d\s()+\-.]/.test(v)) return 'Phone may contain only digits, spaces and + - ( )';
  const n = digitsOnly(v).length;
  if (n < 7 || n > 15) return 'Enter a valid phone number';
  return undefined;
};

export const validateEmail = (v: string): string | undefined => {
  const t = v.trim();
  if (!t) return 'Email is required';
  if (!EMAIL_RE.test(t)) return 'Enter a valid email';
  return undefined;
};

export const validateAddress = (v: string): string | undefined => {
  const t = v.trim();
  if (!t) return 'Shipping address is required';
  if (t.length < 5) return 'Address is too short';
  return undefined;
};

export const validateCardNumber = (v: string): string | undefined => {
  const d = digitsOnly(v);
  if (!d) return 'Card number is required';
  if (d.length < 13 || d.length > 19) return 'Card number must have 13–19 digits';
  if (!passesLuhn(d)) return 'Card number is invalid';
  return undefined;
};

export const validateExpiry = (v: string, now: Date = new Date()): string | undefined => {
  if (!v.trim()) return 'Expiration is required';
  const m = /^(\d{2})\s*\/\s*(\d{2})$/.exec(v.trim());
  if (!m) return 'Use MM/YY';
  const month = Number(m[1]);
  const year = 2000 + Number(m[2]);
  if (month < 1 || month > 12) return 'Invalid month';
  // A card is valid through the last day of its expiry month.
  const endOfMonth = new Date(year, month, 1);
  if (endOfMonth <= now) return 'Card has expired';
  return undefined;
};

export const validateCvv = (v: string): string | undefined => {
  if (!v.trim()) return 'CVV is required';
  if (!/^\d{3,4}$/.test(v.trim())) return 'CVV must be 3–4 digits';
  return undefined;
};

export interface CheckoutInput {
  customer: CustomerInfo;
  card: CardInfo;
  paymentMethod: PaymentMethod;
  cartSize: number;
}

/** Validates the whole checkout and returns only the fields that have errors. */
export const validateCheckout = (
  { customer, card, paymentMethod, cartSize }: CheckoutInput,
  now: Date = new Date(),
): ValidationErrors => {
  const errors: ValidationErrors = {
    name: validateName(customer.name),
    phone: validatePhone(customer.phone),
    email: validateEmail(customer.email),
    address: validateAddress(customer.address),
    cart: cartSize === 0 ? 'Add at least one tile to the cart' : undefined,
  };
  if (paymentMethod === 'card') {
    errors['card.number'] = validateCardNumber(card.number);
    errors['card.expiry'] = validateExpiry(card.expiry, now);
    errors['card.cvv'] = validateCvv(card.cvv);
  }
  return Object.fromEntries(
    Object.entries(errors).filter(([, msg]) => Boolean(msg)),
  ) as ValidationErrors;
};

/** "1234567812345678" -> "1234 5678 1234 5678" */
export const formatCardNumber = (v: string): string =>
  digitsOnly(v).slice(0, 19).replace(/(\d{4})(?=\d)/g, '$1 ');

/** "1227" -> "12/27"; keeps a trailing slash while typing. */
export const formatExpiry = (v: string): string => {
  const d = digitsOnly(v).slice(0, 4);
  if (d.length <= 2) return d.length === 2 && v.includes('/') ? `${d}/` : d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
};
