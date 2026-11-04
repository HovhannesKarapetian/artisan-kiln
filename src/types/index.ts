/** Identifiers of every tile available in the catalog. */
export type TileId =
  | 'ocean-wave'
  | 'forest-fern'
  | 'terracotta-dot'
  | 'yellow-star'
  | 'floral-rosette'
  | 'cobalt-compass'
  | 'fern-medallion'
  | 'mustard-lattice'
  | 'cobalt-cross'
  | 'mustard-herringbone'
  | 'fern-chevron'
  | 'cobalt-swallow'
  | 'terracotta-arch'
  | 'night-dove';

export interface Tile {
  id: TileId;
  name: string;
  /** Price per square foot, in cents. */
  priceCents: number;
}

export interface CartItem {
  tileId: TileId;
  /** Quantity in square feet. */
  quantity: number;
}

/** A cart item joined with its catalog data. */
export interface CartLine extends CartItem {
  tile: Tile;
  lineTotalCents: number;
}

export interface Totals {
  subtotalCents: number;
  shippingCents: number;
  grandTotalCents: number;
}

/** A single grid cell: a tile or empty. */
export type GridCell = TileId | null;

/** What a click on a grid cell does. */
export type DesignTool = { kind: 'tile'; tileId: TileId } | { kind: 'eraser' } | null;

export type PaymentMethod = 'card' | 'paypal' | 'applepay' | 'bank';

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

export interface CardInfo {
  number: string;
  expiry: string;
  cvv: string;
}

export type CheckoutField = keyof CustomerInfo | `card.${keyof CardInfo}` | 'cart';

export type ValidationErrors = Partial<Record<CheckoutField, string>>;
