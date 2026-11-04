'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import TileArt from '@/components/tiles/TileArt';
import { TILE_IDS, TILES } from '@/lib/catalog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCell, selectTile } from '@/store/gridSlice';
import { hasTilePayload, readPayload, writePayload } from './dnd';

export default function DesignPalette() {
  const dispatch = useAppDispatch();
  const tool = useAppSelector((s) => s.grid.tool);
  const [dropActive, setDropActive] = useState(false);

  return (
    <div
      className={`flex min-h-0 flex-col border-l-2 border-ink bg-paper-dark/60 transition-colors ${dropActive ? 'bg-terracotta-light/40' : ''}`}
      // Dropping a grid tile back on the palette removes it from the grid.
      onDragOver={(e) => {
        if (!hasTilePayload(e.dataTransfer)) return;
        e.preventDefault();
        setDropActive(true);
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setDropActive(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDropActive(false);
        const p = readPayload(e.dataTransfer);
        if (p?.source === 'cell') dispatch(clearCell(p.index));
      }}
    >
      <h3 id="palette-heading" className="border-b-2 border-ink px-2 py-2 text-center font-body text-lg font-bold uppercase leading-none">
        Design palette
      </h3>
      <ul
        aria-labelledby="palette-heading"
        className="grid min-h-0 flex-1 grid-cols-2 content-start gap-2 overflow-y-auto p-2 [scrollbar-color:theme(colors.cobalt.DEFAULT)_transparent]"
      >
        {TILE_IDS.map((id) => {
          const active = tool?.kind === 'tile' && tool.tileId === id;
          return (
            <motion.li key={id} whileHover={{ scale: 1.06, rotate: -2 }} whileTap={{ scale: 0.94 }}>
              <button
                type="button"
                draggable
                onDragStart={(e) => writePayload(e.dataTransfer, { source: 'palette', tileId: id })}
                onClick={() => dispatch(selectTile(id))}
                aria-pressed={active}
                aria-label={`${TILES[id].name}${active ? ' (selected)' : ''}`}
                title={TILES[id].name}
                className={`block aspect-square w-full cursor-grab overflow-hidden rounded-sm border-2 border-ink shadow-sketch-sm outline-none focus-visible:ring-4 focus-visible:ring-cobalt active:cursor-grabbing ${
                  active ? 'ring-4 ring-mustard ring-offset-2 ring-offset-paper-dark' : ''
                }`}
              >
                <TileArt tileId={id} className="size-full" />
              </button>
            </motion.li>
          );
        })}
      </ul>
      <p className="border-t-2 border-ink px-2 py-1 text-center text-[11px] leading-tight text-ink-muted">
        Drop a grid tile here to remove it
      </p>
    </div>
  );
}
