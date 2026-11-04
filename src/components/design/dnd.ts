import { GRID_CELLS, isTileId } from '@/lib/catalog';
import type { TileId } from '@/types';

export const DND_MIME = 'application/x-tile';

export type DragPayload =
  | { source: 'palette'; tileId: TileId }
  | { source: 'cell'; index: number };

export const writePayload = (dt: DataTransfer, payload: DragPayload) => {
  dt.setData(DND_MIME, JSON.stringify(payload));
  dt.effectAllowed = payload.source === 'palette' ? 'copy' : 'move';
};

/** Reads and validates a drag payload; returns null for foreign or malformed data. */
export const readPayload = (dt: DataTransfer): DragPayload | null => {
  try {
    const data: unknown = JSON.parse(dt.getData(DND_MIME));
    if (typeof data !== 'object' || data === null) return null;
    const d = data as Record<string, unknown>;
    if (d.source === 'palette' && isTileId(d.tileId)) return { source: 'palette', tileId: d.tileId };
    if (d.source === 'cell' && typeof d.index === 'number' && d.index >= 0 && d.index < GRID_CELLS) {
      return { source: 'cell', index: d.index };
    }
    return null;
  } catch {
    return null;
  }
};

export const hasTilePayload = (dt: DataTransfer) => dt.types.includes(DND_MIME);
