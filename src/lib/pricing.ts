import type { CartItem, CartLine, Tile, TileId, Totals } from '@/types';

/** Orders with a subtotal strictly above this get free shipping. */
export const FREE_SHIPPING_THRESHOLD_CENTS = 500_00;
export const SHIPPING_FEE_CENTS = 25_00;

export const calcLineTotal = (quantity: number, priceCents: number): number =>
  Math.round(quantity * priceCents);

export const buildCartLines = (
  items: CartItem[],
  catalog: Record<TileId, Tile>,
): CartLine[] =>
  items.map((item) => {
    const tile = catalog[item.tileId];
    return { ...item, tile, lineTotalCents: calcLineTotal(item.quantity, tile.priceCents) };
  });

export const calcSubtotal = (items: CartItem[], catalog: Record<TileId, Tile>): number =>
  items.reduce((sum, item) => sum + calcLineTotal(item.quantity, catalog[item.tileId].priceCents), 0);

/**
 * $0 when the subtotal is above $500, otherwise $25.
 * An empty cart has nothing to ship, so it is $0 too.
 */
export const calcShipping = (subtotalCents: number): number => {
  if (subtotalCents <= 0) return 0;
  return subtotalCents > FREE_SHIPPING_THRESHOLD_CENTS ? 0 : SHIPPING_FEE_CENTS;
};

export const calcTotals = (items: CartItem[], catalog: Record<TileId, Tile>): Totals => {
  const subtotalCents = calcSubtotal(items, catalog);
  const shippingCents = calcShipping(subtotalCents);
  return { subtotalCents, shippingCents, grandTotalCents: subtotalCents + shippingCents };
};
