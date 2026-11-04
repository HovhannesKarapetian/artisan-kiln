import type { CartItem, GridCell, Tile, TileId } from '@/types';

export const TILES: Record<TileId, Tile> = {
  'ocean-wave': { id: 'ocean-wave', name: 'Ocean Wave', priceCents: 2800 },
  'forest-fern': { id: 'forest-fern', name: 'Forest Fern', priceCents: 3000 },
  'terracotta-dot': { id: 'terracotta-dot', name: 'Terracotta Dot', priceCents: 2600 },
  'yellow-star': { id: 'yellow-star', name: 'Yellow Star', priceCents: 2900 },
  'floral-rosette': { id: 'floral-rosette', name: 'Floral Rosette', priceCents: 3200 },
  'cobalt-compass': { id: 'cobalt-compass', name: 'Cobalt Compass', priceCents: 3400 },
  'fern-medallion': { id: 'fern-medallion', name: 'Fern Medallion', priceCents: 3100 },
  'mustard-lattice': { id: 'mustard-lattice', name: 'Mustard Lattice', priceCents: 2700 },
  'cobalt-cross': { id: 'cobalt-cross', name: 'Cobalt Cross', priceCents: 3300 },
  'mustard-herringbone': { id: 'mustard-herringbone', name: 'Mustard Herringbone', priceCents: 2400 },
  'fern-chevron': { id: 'fern-chevron', name: 'Fern Chevron', priceCents: 2400 },
  'cobalt-swallow': { id: 'cobalt-swallow', name: 'Cobalt Swallow', priceCents: 3600 },
  'terracotta-arch': { id: 'terracotta-arch', name: 'Terracotta Arch', priceCents: 3000 },
  'night-dove': { id: 'night-dove', name: 'Night Dove', priceCents: 3800 },
};

export const TILE_IDS = Object.keys(TILES) as TileId[];

export const isTileId = (value: unknown): value is TileId =>
  typeof value === 'string' && value in TILES;

/** Cart contents shown in the mockup. */
export const INITIAL_CART: CartItem[] = [
  { tileId: 'ocean-wave', quantity: 150 },
  { tileId: 'forest-fern', quantity: 75 },
  { tileId: 'terracotta-dot', quantity: 200 },
  { tileId: 'yellow-star', quantity: 50 },
];

export const GRID_SIZE = 7;
export const GRID_CELLS = GRID_SIZE * GRID_SIZE;

/** Starting pattern of the design grid, close to the mockup (row by row). */
const S = null;
export const INITIAL_GRID: GridCell[] = [
  'terracotta-arch', 'cobalt-compass', 'mustard-lattice', 'cobalt-cross', S, S, S,
  'cobalt-compass', 'terracotta-dot', 'yellow-star', 'cobalt-compass', S, S, S,
  'terracotta-dot', 'forest-fern', 'fern-medallion', 'forest-fern', S, S, S,
  'forest-fern', 'terracotta-dot', 'forest-fern', 'ocean-wave', S, S, S,
  'cobalt-cross', 'terracotta-dot', 'ocean-wave', 'yellow-star', S, S, S,
  'ocean-wave', 'yellow-star', 'forest-fern', S, S, S, S,
  S, S, S, S, S, S, S,
];

export const QUANTITY_MIN = 1;
export const QUANTITY_MAX = 9999;
export const QUANTITY_STEP = 10;
export const NEW_ITEM_QUANTITY = 10;
