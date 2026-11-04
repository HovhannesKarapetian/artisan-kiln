'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TileArt from '@/components/tiles/TileArt';
import { GRID_SIZE, TILES } from '@/lib/catalog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { applyTool, clearCell, moveTile, placeTile } from '@/store/gridSlice';
import { hasTilePayload, readPayload, writePayload } from './dnd';

export default function DesignGrid() {
  const dispatch = useAppDispatch();
  const cells = useAppSelector((s) => s.grid.cells);
  const tool = useAppSelector((s) => s.grid.tool);
  const [focusIndex, setFocusIndex] = useState(0);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const cellRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusCell = (i: number) => {
    setFocusIndex(i);
    cellRefs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const row = Math.floor(i / GRID_SIZE);
    const col = i % GRID_SIZE;
    const moves: Record<string, number | undefined> = {
      ArrowRight: col < GRID_SIZE - 1 ? i + 1 : undefined,
      ArrowLeft: col > 0 ? i - 1 : undefined,
      ArrowDown: row < GRID_SIZE - 1 ? i + GRID_SIZE : undefined,
      ArrowUp: row > 0 ? i - GRID_SIZE : undefined,
    };
    if (e.key in moves) {
      e.preventDefault();
      const next = moves[e.key];
      if (next !== undefined) focusCell(next);
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      dispatch(clearCell(i));
    }
  };

  const cursor = tool?.kind === 'eraser' ? 'cursor-cell' : tool ? 'cursor-copy' : 'cursor-default';

  return (
    <div
      role="grid"
      aria-label={`Design grid, ${GRID_SIZE} by ${GRID_SIZE}`}
      aria-rowcount={GRID_SIZE}
      aria-colcount={GRID_SIZE}
      className="grid w-full grid-cols-7 border-2 border-ink bg-paper-deep"
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOverIndex(null);
      }}
    >
      {Array.from({ length: GRID_SIZE }, (_, r) => (
        <div key={r} role="row" className="contents">
          {cells.slice(r * GRID_SIZE, (r + 1) * GRID_SIZE).map((tileId, c) => {
            const i = r * GRID_SIZE + c;
            const label = `Row ${r + 1}, column ${c + 1}: ${tileId ? TILES[tileId].name : 'empty'}`;
            return (
              <div key={i} role="gridcell" className="contents">
                <button
                  ref={(el) => { cellRefs.current[i] = el; }}
                  type="button"
                  tabIndex={i === focusIndex ? 0 : -1}
                  aria-label={label}
                  draggable={tileId !== null}
                  onFocus={() => setFocusIndex(i)}
                  onClick={() => dispatch(applyTool(i))}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    dispatch(clearCell(i));
                  }}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  onDragStart={(e) => writePayload(e.dataTransfer, { source: 'cell', index: i })}
                  onDragOver={(e) => {
                    if (!hasTilePayload(e.dataTransfer)) return;
                    e.preventDefault();
                    setOverIndex(i);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setOverIndex(null);
                    const p = readPayload(e.dataTransfer);
                    if (p?.source === 'palette') dispatch(placeTile({ index: i, tileId: p.tileId }));
                    if (p?.source === 'cell') dispatch(moveTile({ from: p.index, to: i }));
                  }}
                  className={`relative aspect-square overflow-hidden border border-ink/70 bg-paper-dark/70 outline-none transition-colors hover:bg-paper focus-visible:z-10 focus-visible:ring-4 focus-visible:ring-cobalt ${cursor} ${
                    overIndex === i ? 'z-10 ring-4 ring-inset ring-mustard' : ''
                  }`}
                >
                  <AnimatePresence initial={false}>
                    {tileId && (
                      <motion.span
                        key={tileId}
                        className="absolute inset-0"
                        initial={{ scale: 0.4, rotate: -12, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                      >
                        <TileArt tileId={tileId} className="size-full" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
