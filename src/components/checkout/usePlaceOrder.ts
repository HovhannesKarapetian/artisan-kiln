'use client';

import { useCallback } from 'react';
import { useAppDispatch, useAppStore } from '@/store/hooks';
import { orderPlaced, submitAttempted, submitStarted } from '@/store/checkoutSlice';
import { selectTotals, selectValidationErrors } from '@/store/selectors';
import { FIELD_ORDER, fieldId } from './fieldIds';

const SUBMIT_DELAY_MS = 900;

/** Validates the whole form; on success simulates a payment request. */
export function usePlaceOrder() {
  const dispatch = useAppDispatch();
  const store = useAppStore();

  return useCallback(() => {
    const state = store.getState();
    if (state.checkout.status !== 'idle') return;
    dispatch(submitAttempted());

    const errors = selectValidationErrors(state);
    const firstInvalid = FIELD_ORDER.find((f) => errors[f]);
    if (firstInvalid) {
      const el = firstInvalid === 'cart'
        ? document.getElementById('cart')
        : document.getElementById(fieldId(firstInvalid));
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (el instanceof HTMLInputElement) el.focus({ preventScroll: true });
      return;
    }

    dispatch(submitStarted());
    const { grandTotalCents } = selectTotals(state);
    window.setTimeout(() => {
      dispatch(
        orderPlaced({
          id: `AK-${Date.now().toString(36).toUpperCase()}`,
          grandTotalCents,
          paymentMethod: state.checkout.paymentMethod,
          email: state.checkout.customer.email.trim(),
        }),
      );
    }, SUBMIT_DELAY_MS);
  }, [dispatch, store]);
}
