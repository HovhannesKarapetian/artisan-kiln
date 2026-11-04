import type { CheckoutField } from '@/types';

/** DOM id for each validated field, used to focus the first invalid one. */
export const fieldId = (field: CheckoutField) => `checkout-${field.replace('.', '-')}`;

/** Order in which errors are focused on submit (visual order on mobile). */
export const FIELD_ORDER: CheckoutField[] = [
  'name', 'phone', 'email', 'address', 'cart', 'card.number', 'card.expiry', 'card.cvv',
];
