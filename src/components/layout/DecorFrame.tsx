import TileArt from '@/components/tiles/TileArt';
import type { TileId } from '@/types';

/** Purely decorative side borders of tiles and leaves, as in the mockup. */
const LEFT: TileId[] = ['night-dove', 'terracotta-arch', 'fern-medallion', 'cobalt-swallow', 'terracotta-arch', 'cobalt-compass'];
const RIGHT: TileId[] = ['mustard-lattice', 'cobalt-cross', 'terracotta-arch', 'fern-chevron', 'floral-rosette', 'terracotta-arch'];

const Leaf = ({ flip = false }: { flip?: boolean }) => (
  <svg viewBox="0 0 40 90" className={`h-24 w-10 ${flip ? '-scale-x-100' : ''}`} aria-hidden>
    <path d="M20 88 C20 60 18 30 22 2" className="fill-none stroke-fern-dark" strokeWidth="2" />
    {[12, 26, 40, 54, 68].map((y) => (
      <g key={y}>
        <ellipse cx="12" cy={y} rx="9" ry="3.5" transform={`rotate(-30 12 ${y})`} className="fill-fern" />
        <ellipse cx="29" cy={y + 6} rx="9" ry="3.5" transform={`rotate(30 29 ${y + 6})`} className="fill-fern-light" />
      </g>
    ))}
  </svg>
);

const Column = ({ ids, side }: { ids: TileId[]; side: 'left' | 'right' }) => (
  <div
    className={`pointer-events-none absolute inset-y-0 hidden w-14 flex-col items-center justify-around py-10 xl:flex ${
      side === 'left' ? 'left-0' : 'right-0'
    }`}
    aria-hidden
  >
    {ids.map((id, i) => (
      <div key={`${id}-${i}`} className="flex flex-col items-center gap-2">
        <TileArt tileId={id} className="size-10 rotate-3 border-2 border-ink opacity-90" />
        {i % 2 === 0 && <Leaf flip={side === 'right'} />}
      </div>
    ))}
  </div>
);

export default function DecorFrame() {
  return (
    <>
      <Column ids={LEFT} side="left" />
      <Column ids={RIGHT} side="right" />
      {/* Small corner tiles on mobile */}
      <div className="pointer-events-none absolute left-0 top-16 xl:hidden" aria-hidden>
        <TileArt tileId="fern-medallion" className="size-8 -translate-x-2 border-2 border-ink" />
      </div>
      <div className="pointer-events-none absolute right-0 top-16 xl:hidden" aria-hidden>
        <TileArt tileId="terracotta-arch" className="size-8 translate-x-2 border-2 border-ink" />
      </div>
    </>
  );
}
