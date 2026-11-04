'use client';

import { useEffect } from 'react';
import DesignGrid from './DesignGrid';
import DesignPalette from './DesignPalette';
import TileArt from '@/components/tiles/TileArt';
import { EraserIcon } from '@/components/ui/icons';
import { TILES } from '@/lib/catalog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearGrid, clearTool, fillEmpty, resetGrid, toggleEraser } from '@/store/gridSlice';

const btn =
  'rounded border-2 border-ink bg-paper-light px-2 py-0.5 text-xs font-bold uppercase shadow-sketch-sm transition hover:bg-paper active:translate-x-px active:translate-y-px active:shadow-none disabled:cursor-not-allowed disabled:opacity-40';

export default function DesignTool({ className = '' }: { className?: string }) {
  const dispatch = useAppDispatch();
  const tool = useAppSelector((s) => s.grid.tool);
  const filled = useAppSelector((s) => s.grid.cells.filter(Boolean).length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && dispatch(clearTool());
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dispatch]);

  const status =
    tool?.kind === 'tile'
      ? `${TILES[tool.tileId].name} selected — click cells to place it`
      : tool?.kind === 'eraser'
        ? 'Eraser — click tiles to remove them'
        : 'Pick a tile, or drag one onto the grid. Right-click clears a cell.';

  return (
    <section
      aria-labelledby="design-heading"
      className={`grid-cols-[minmax(0,1fr)_7.5rem] overflow-hidden rounded-md border-2 border-ink bg-paper-light/50 shadow-sketch ${className}`}
    >
      <div className="flex min-w-0 flex-col">
        <header className="border-b-2 border-ink bg-paper-dark/60 px-3 py-2 text-center">
          <h2 id="design-heading" className="font-body text-lg font-bold uppercase leading-tight">
            Visualize your order:
          </h2>
          <p className="text-sm font-semibold">Drag and drop tiles here to create patterns.</p>
        </header>

        <div className="p-3 pb-2">
          <DesignGrid />
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 border-t-2 border-ink px-3 py-2">
          <p className="flex min-w-0 flex-1 items-center gap-2 text-xs font-semibold" aria-live="polite">
            {tool?.kind === 'tile' && <TileArt tileId={tool.tileId} className="size-5 shrink-0 border border-ink" />}
            <span className="truncate">{status}</span>
          </p>
          <span className="text-xs text-ink-muted">{filled}/49</span>
          <button type="button" className={`${btn} inline-flex items-center gap-1 ${tool?.kind === 'eraser' ? 'bg-mustard-light' : ''}`} aria-pressed={tool?.kind === 'eraser'} onClick={() => dispatch(toggleEraser())}>
            <EraserIcon className="size-3.5" /> Eraser
          </button>
          <button
            type="button"
            className={btn}
            disabled={tool?.kind !== 'tile'}
            onClick={() => tool?.kind === 'tile' && dispatch(fillEmpty(tool.tileId))}
          >
            Fill empty
          </button>
          <button type="button" className={btn} onClick={() => dispatch(clearGrid())}>Clear</button>
          <button type="button" className={btn} onClick={() => dispatch(resetGrid())}>Reset</button>
        </div>
      </div>

      <DesignPalette />
    </section>
  );
}
