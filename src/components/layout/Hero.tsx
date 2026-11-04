import TileArt from '@/components/tiles/TileArt';
import type { TileId } from '@/types';

const LEFT: TileId[] = ['cobalt-compass', 'terracotta-dot', 'fern-medallion'];
const RIGHT: TileId[] = ['cobalt-cross', 'floral-rosette', 'mustard-lattice'];

const TileRow = ({ ids }: { ids: TileId[] }) => (
  <div className="flex gap-1 sm:gap-1.5" aria-hidden>
    {ids.map((id) => (
      <TileArt key={id} tileId={id} className="size-6 border-2 border-ink sm:size-8" />
    ))}
  </div>
);

const TempleIcon = () => (
  <svg viewBox="0 0 48 52" className="hidden h-14 w-12 xl:block" aria-hidden>
    <path d="M24 2 3 12v4h42v-4Z" className="fill-fern stroke-ink" strokeWidth="2" strokeLinejoin="round" />
    {[8, 17, 26, 35].map((x) => (
      <rect key={x} x={x} y="18" width="5" height="14" className="fill-fern stroke-ink" strokeWidth="1.5" />
    ))}
    <path d="M5 33h38v16H5Z" className="fill-mustard stroke-ink" strokeWidth="2" />
    <path d="M16 49V41a8 8 0 0 1 16 0v8" className="fill-paper-light stroke-ink" strokeWidth="2" />
  </svg>
);

const KilnIcon = () => (
  <svg viewBox="0 0 48 52" className="hidden h-14 w-12 xl:block" aria-hidden>
    <path d="M6 50V22a18 18 0 0 1 36 0v28Z" className="fill-terracotta stroke-ink" strokeWidth="2" />
    <path d="M14 50V28a10 10 0 0 1 20 0v22Z" className="fill-paper-light stroke-ink" strokeWidth="2" />
    <path d="M24 46c-5 0-6-4-4-8 1 2 2 2 2 2 0-4 2-7 5-9-1 4 3 6 3 10 0 3-2 5-6 5Z" className="fill-mustard stroke-terracotta-dark" strokeWidth="1.5" />
  </svg>
);

export default function Hero() {
  return (
    <div className="flex items-center justify-center gap-6 px-4 pt-5 xl:pt-4">
      <TempleIcon />
      <div className="text-center">
        <h1 className="font-display text-[clamp(1.75rem,7.4vw,3rem)] uppercase leading-none tracking-tight text-ink xl:text-[40px]">
          Ceramic Tile Order Form
        </h1>
        <div className="mt-2 flex items-center justify-center gap-2 sm:gap-5">
          <TileRow ids={LEFT} />
          <p className="whitespace-nowrap font-body text-lg font-bold uppercase tracking-wide sm:text-2xl">The Artisan Kiln</p>
          <TileRow ids={RIGHT} />
        </div>
      </div>
      <KilnIcon />
    </div>
  );
}
