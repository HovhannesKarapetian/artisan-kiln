import { describe, expect, it } from 'vitest';
import { makeStore } from './index';
import { addItem, changeQuantityBy, removeItem, setQuantity } from './cartSlice';
import { applyTool, clearGrid, moveTile, placeTile, selectTile, toggleEraser } from './gridSlice';
import { selectTotals } from './selectors';
import { GRID_CELLS, QUANTITY_MAX } from '@/lib/catalog';

describe('cart slice', () => {
  it('starts with the four mockup tiles', () => {
    const store = makeStore();
    expect(store.getState().cart.items.map((i) => i.tileId)).toEqual([
      'ocean-wave', 'forest-fern', 'terracotta-dot', 'yellow-star',
    ]);
  });

  it('updates totals when quantity changes and items are removed', () => {
    const store = makeStore();
    store.dispatch(removeItem('forest-fern'));
    store.dispatch(removeItem('terracotta-dot'));
    store.dispatch(removeItem('yellow-star'));
    store.dispatch(setQuantity({ tileId: 'ocean-wave', quantity: 10 }));
    expect(selectTotals(store.getState())).toEqual({
      subtotalCents: 280_00, shippingCents: 25_00, grandTotalCents: 305_00,
    });
  });

  it('clamps quantity', () => {
    const store = makeStore();
    store.dispatch(setQuantity({ tileId: 'ocean-wave', quantity: 0 }));
    expect(store.getState().cart.items[0].quantity).toBe(1);
    store.dispatch(changeQuantityBy({ tileId: 'ocean-wave', delta: 1e6 }));
    expect(store.getState().cart.items[0].quantity).toBe(QUANTITY_MAX);
  });

  it('adds new tiles and merges existing ones', () => {
    const store = makeStore();
    store.dispatch(addItem({ tileId: 'night-dove' }));
    store.dispatch(addItem({ tileId: 'ocean-wave', quantity: 5 }));
    const items = store.getState().cart.items;
    expect(items).toHaveLength(5);
    expect(items.find((i) => i.tileId === 'ocean-wave')?.quantity).toBe(155);
  });
});

describe('grid slice', () => {
  it('has 49 cells', () => {
    expect(makeStore().getState().grid.cells).toHaveLength(GRID_CELLS);
  });

  it('places the selected tile on click and erases with the eraser', () => {
    const store = makeStore();
    store.dispatch(selectTile('night-dove'));
    store.dispatch(applyTool(48));
    expect(store.getState().grid.cells[48]).toBe('night-dove');
    store.dispatch(toggleEraser());
    store.dispatch(applyTool(48));
    expect(store.getState().grid.cells[48]).toBeNull();
  });

  it('deselects when the same tile is picked twice', () => {
    const store = makeStore();
    store.dispatch(selectTile('night-dove'));
    store.dispatch(selectTile('night-dove'));
    expect(store.getState().grid.tool).toBeNull();
  });

  it('swaps cells on move and ignores out-of-range indexes', () => {
    const store = makeStore();
    store.dispatch(clearGrid());
    store.dispatch(placeTile({ index: 0, tileId: 'ocean-wave' }));
    store.dispatch(moveTile({ from: 0, to: 10 }));
    expect(store.getState().grid.cells[0]).toBeNull();
    expect(store.getState().grid.cells[10]).toBe('ocean-wave');
    store.dispatch(placeTile({ index: 99, tileId: 'ocean-wave' }));
    expect(store.getState().grid.cells).toHaveLength(GRID_CELLS);
  });
});
