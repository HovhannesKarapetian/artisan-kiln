import { describe, expect, it } from 'vitest';
import { TILES, INITIAL_CART } from './catalog';
import { calcLineTotal, calcShipping, calcSubtotal, calcTotals } from './pricing';

describe('calcLineTotal', () => {
  it('multiplies quantity by unit price', () => {
    expect(calcLineTotal(150, 2800)).toBe(420000);
  });
});

describe('calcSubtotal', () => {
  it('sums quantity * unit price across the cart', () => {
    // 150*28 + 75*30 + 200*26 + 50*29 = 4200 + 2250 + 5200 + 1450
    expect(calcSubtotal(INITIAL_CART, TILES)).toBe(13100_00);
  });

  it('is 0 for an empty cart', () => {
    expect(calcSubtotal([], TILES)).toBe(0);
  });
});

describe('calcShipping', () => {
  it('charges $25 at or below $500', () => {
    expect(calcShipping(1)).toBe(25_00);
    expect(calcShipping(266_00)).toBe(25_00);
    expect(calcShipping(500_00)).toBe(25_00);
  });

  it('is free strictly above $500', () => {
    expect(calcShipping(500_01)).toBe(0);
    expect(calcShipping(13100_00)).toBe(0);
  });

  it('is 0 when there is nothing to ship', () => {
    expect(calcShipping(0)).toBe(0);
  });
});

describe('calcTotals', () => {
  it('adds shipping to the subtotal for small orders', () => {
    const totals = calcTotals([{ tileId: 'ocean-wave', quantity: 5 }], TILES);
    expect(totals).toEqual({ subtotalCents: 140_00, shippingCents: 25_00, grandTotalCents: 165_00 });
  });

  it('has grand total equal to subtotal for large orders', () => {
    const totals = calcTotals(INITIAL_CART, TILES);
    expect(totals.grandTotalCents).toBe(totals.subtotalCents);
  });
});
