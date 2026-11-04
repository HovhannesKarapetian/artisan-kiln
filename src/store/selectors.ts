import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { TILES } from '@/lib/catalog';
import { buildCartLines, calcTotals } from '@/lib/pricing';
import { validateCheckout } from '@/lib/validation';
import type { CheckoutField } from '@/types';

const selectCartItems = (s: RootState) => s.cart.items;

export const selectCartLines = createSelector(selectCartItems, (items) => buildCartLines(items, TILES));
export const selectTotals = createSelector(selectCartItems, (items) => calcTotals(items, TILES));
export const selectCartCount = (s: RootState) => s.cart.items.length;

export const selectTilesNotInCart = createSelector(selectCartItems, (items) => {
  const inCart = new Set(items.map((i) => i.tileId));
  return Object.values(TILES).filter((t) => !inCart.has(t.id));
});

export const selectValidationErrors = createSelector(
  [
    (s: RootState) => s.checkout.customer,
    (s: RootState) => s.checkout.card,
    (s: RootState) => s.checkout.paymentMethod,
    (s: RootState) => s.cart.items.length,
  ],
  (customer, card, paymentMethod, cartSize) =>
    validateCheckout({ customer, card, paymentMethod, cartSize }),
);

/** The error for a field, only once the field was touched or a submit was attempted. */
export const selectVisibleError = (s: RootState, field: CheckoutField): string | undefined => {
  const shown = s.checkout.submitAttempted || s.checkout.touched[field];
  return shown ? selectValidationErrors(s)[field] : undefined;
};
