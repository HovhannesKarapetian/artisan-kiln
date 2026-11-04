'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TileArt from '@/components/tiles/TileArt';
import { formatUSD } from '@/lib/money';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectTilesNotInCart } from '@/store/selectors';
import { addItem } from '@/store/cartSlice';

export default function AddTileButton() {
  const dispatch = useAppDispatch();
  const available = useAppSelector(selectTilesNotInCart);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        disabled={available.length === 0}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-2 rounded-md border-2 border-ink bg-paper-dark px-2 py-1 text-left font-body text-base font-semibold sm:text-lg uppercase leading-none shadow-sketch transition active:translate-x-px active:translate-y-px active:shadow-none disabled:cursor-not-allowed disabled:opacity-50 xl:text-sm"
      >
        <span className="text-2xl leading-none">+</span>
        <TileArt tileId="cobalt-cross" className="size-7 border border-ink xl:size-6" />
        <span>Add new tile<br />to cart</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Tiles you can add"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-20 mt-2 max-h-72 w-64 overflow-y-auto rounded-md border-2 border-ink bg-paper-light p-1 shadow-sketch"
          >
            {available.map((tile) => (
              <li key={tile.id} role="option" aria-selected={false}>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(addItem({ tileId: tile.id }));
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left hover:bg-paper-dark focus-visible:bg-paper-dark focus-visible:outline-none"
                >
                  <TileArt tileId={tile.id} className="size-8 shrink-0 border border-ink" />
                  <span className="flex-1 text-sm font-semibold uppercase">{tile.name}</span>
                  <span className="text-sm">{formatUSD(tile.priceCents)}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
