import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, TileId } from '@/types';
import { INITIAL_CART, NEW_ITEM_QUANTITY, QUANTITY_MAX, QUANTITY_MIN } from '@/lib/catalog';

export interface CartState {
  items: CartItem[];
}

export const clampQuantity = (q: number): number => {
  if (!Number.isFinite(q)) return QUANTITY_MIN;
  return Math.min(QUANTITY_MAX, Math.max(QUANTITY_MIN, Math.round(q)));
};

export const createInitialCartState = (): CartState => ({
  items: INITIAL_CART.map((i) => ({ ...i })),
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: createInitialCartState,
  reducers: {
    setQuantity(state, action: PayloadAction<{ tileId: TileId; quantity: number }>) {
      const item = state.items.find((i) => i.tileId === action.payload.tileId);
      if (item) item.quantity = clampQuantity(action.payload.quantity);
    },
    changeQuantityBy(state, action: PayloadAction<{ tileId: TileId; delta: number }>) {
      const item = state.items.find((i) => i.tileId === action.payload.tileId);
      if (item) item.quantity = clampQuantity(item.quantity + action.payload.delta);
    },
    removeItem(state, action: PayloadAction<TileId>) {
      state.items = state.items.filter((i) => i.tileId !== action.payload);
    },
    /** Adds a tile to the cart, or increases its quantity if it is already there. */
    addItem(state, action: PayloadAction<{ tileId: TileId; quantity?: number }>) {
      const { tileId, quantity = NEW_ITEM_QUANTITY } = action.payload;
      const existing = state.items.find((i) => i.tileId === tileId);
      if (existing) existing.quantity = clampQuantity(existing.quantity + quantity);
      else state.items.push({ tileId, quantity: clampQuantity(quantity) });
    },
    resetCart: () => createInitialCartState(),
  },
});

export const { setQuantity, changeQuantityBy, removeItem, addItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
