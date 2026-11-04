import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CardInfo, CheckoutField, CustomerInfo, PaymentMethod } from '@/types';

export interface PlacedOrder {
  id: string;
  grandTotalCents: number;
  paymentMethod: PaymentMethod;
  email: string;
}

export interface CheckoutState {
  customer: CustomerInfo;
  card: CardInfo;
  paymentMethod: PaymentMethod;
  /** Fields the user has left at least once; their errors are shown. */
  touched: Partial<Record<CheckoutField, boolean>>;
  submitAttempted: boolean;
  status: 'idle' | 'submitting' | 'success';
  placedOrder: PlacedOrder | null;
}

export const createInitialCheckoutState = (): CheckoutState => ({
  customer: { name: '', phone: '', email: '', address: '', notes: '' },
  card: { number: '', expiry: '', cvv: '' },
  paymentMethod: 'card',
  touched: {},
  submitAttempted: false,
  status: 'idle',
  placedOrder: null,
});

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: createInitialCheckoutState,
  reducers: {
    setCustomerField(state, action: PayloadAction<{ field: keyof CustomerInfo; value: string }>) {
      state.customer[action.payload.field] = action.payload.value;
    },
    setCardField(state, action: PayloadAction<{ field: keyof CardInfo; value: string }>) {
      state.card[action.payload.field] = action.payload.value;
    },
    setPaymentMethod(state, action: PayloadAction<PaymentMethod>) {
      state.paymentMethod = action.payload;
    },
    touchField(state, action: PayloadAction<CheckoutField>) {
      state.touched[action.payload] = true;
    },
    submitAttempted(state) {
      state.submitAttempted = true;
    },
    submitStarted(state) {
      state.status = 'submitting';
    },
    orderPlaced(state, action: PayloadAction<PlacedOrder>) {
      state.status = 'success';
      state.placedOrder = action.payload;
    },
    resetCheckout: () => createInitialCheckoutState(),
  },
});

export const {
  setCustomerField,
  setCardField,
  setPaymentMethod,
  touchField,
  submitAttempted,
  submitStarted,
  orderPlaced,
  resetCheckout,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
