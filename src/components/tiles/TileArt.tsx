import { useId, type ReactElement } from 'react';
import type { TileId } from '@/types';

/* Every motif is drawn in a 40x40 box. Colors come from tailwind.config.js via fill-/stroke- classes. */

const starPoints = (cx: number, cy: number, points: number, outer: number, inner: number) =>
  Array.from({ length: points * 2 }, (_, i) => {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / points) * i - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }).join(' ');

const Bg = ({ className }: { className: string }) => <rect width="40" height="40" className={className} />;

const fernLeaves = Array.from({ length: 6 }, (_, i) => {
  const t = 0.14 + i * 0.14;
  return { x: 5 + 30 * t, y: 35 - 30 * t };
});

const MOTIFS: Record<TileId, () => ReactElement> = {
  'ocean-wave': () => (
    <>
      <Bg className="fill-paper-light" />
      {[6, 16, 26, 36].map((y) => (
        <path
          key={y}
          d={`M-2 ${y} Q3 ${y - 5} 8 ${y} T18 ${y} T28 ${y} T38 ${y} T48 ${y}`}
          className="fill-none stroke-cobalt"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      ))}
    </>
  ),
  'forest-fern': () => (
    <>
      <Bg className="fill-paper-light" />
      <line x1="4" y1="36" x2="36" y2="4" className="stroke-fern-dark" strokeWidth="1.6" />
      {fernLeaves.map(({ x, y }) => (
        <g key={x}>
          <ellipse cx={x + 4} cy={y + 4} rx="6" ry="2.2" transform={`rotate(45 ${x + 4} ${y + 4})`} className="fill-fern" />
          <ellipse cx={x - 4} cy={y - 4} rx="6" ry="2.2" transform={`rotate(45 ${x - 4} ${y - 4})`} className="fill-fern" />
        </g>
      ))}
    </>
  ),
  'terracotta-dot': () => (
    <>
      <Bg className="fill-paper-light" />
      {[
        [9, 9, 5.5], [31, 9, 5.5], [20, 20, 6], [9, 31, 5.5], [31, 31, 5.5],
        [20, 3, 2.5], [20, 37, 2.5], [3, 20, 2.5], [37, 20, 2.5],
      ].map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} className="fill-terracotta" />
      ))}
    </>
  ),
  'yellow-star': () => (
    <>
      <Bg className="fill-paper-light" />
      <polygon points={starPoints(20, 20, 6, 15, 6.5)} className="fill-mustard" />
      {[[0, 0], [40, 0], [0, 40], [40, 40]].map(([x, y]) => (
        <polygon key={`${x}-${y}`} points={starPoints(x, y, 6, 7, 3)} className="fill-mustard" />
      ))}
    </>
  ),
  'floral-rosette': () => (
    <>
      <Bg className="fill-paper-light" />
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse key={i} cx="20" cy="11" rx="4" ry="8" transform={`rotate(${i * 60} 20 20)`} className="fill-terracotta" />
      ))}
      <circle cx="20" cy="20" r="4" className="fill-mustard" />
      {[[0, 0], [40, 0], [0, 40], [40, 40]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="6" className="fill-fern" />
      ))}
    </>
  ),
  'cobalt-compass': () => (
    <>
      <Bg className="fill-paper-light" />
      {[[0, 0], [40, 0], [0, 40], [40, 40]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="11" className="fill-cobalt" />
      ))}
      <path d="M20 4 Q22.5 17.5 36 20 Q22.5 22.5 20 36 Q17.5 22.5 4 20 Q17.5 17.5 20 4Z" className="fill-fern" />
      <circle cx="20" cy="20" r="2.5" className="fill-paper-light" />
    </>
  ),
  'fern-medallion': () => (
    <>
      <Bg className="fill-paper-light" />
      <polygon points="20,3 37,20 20,37 3,20" className="fill-fern" />
      <polygon points="20,10 30,20 20,30 10,20" className="fill-paper-light" />
      <circle cx="20" cy="20" r="4" className="fill-terracotta" />
      {[[0, 0, '8,0 0,8'], [40, 0, '32,0 40,8'], [0, 40, '0,32 8,40'], [40, 40, '32,40 40,32']].map(([x, y, p]) => (
        <polygon key={`${x}-${y}`} points={`${x},${y} ${p}`} className="fill-fern-dark" />
      ))}
    </>
  ),
  'mustard-lattice': () => (
    <>
      <Bg className="fill-paper-light" />
      <polygon points={starPoints(20, 20, 8, 14, 8)} className="fill-mustard" />
      <circle cx="20" cy="20" r="4" className="fill-paper-light" />
      {[[0, 0], [40, 0], [0, 40], [40, 40]].map(([x, y]) => (
        <polygon key={`${x}-${y}`} points={starPoints(x, y, 8, 8, 4.5)} className="fill-mustard-dark" />
      ))}
    </>
  ),
  'cobalt-cross': () => (
    <>
      <Bg className="fill-paper-light" />
      {[[0, 0], [40, 0], [0, 40], [40, 40]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="9" className="fill-terracotta" />
      ))}
      <path d="M6 6 Q20 14 34 6 Q26 20 34 34 Q20 26 6 34 Q14 20 6 6Z" className="fill-cobalt" />
      <circle cx="20" cy="20" r="3.5" className="fill-paper-light" />
    </>
  ),
  'mustard-herringbone': () => (
    <>
      <Bg className="fill-mustard" />
      {[0, 10, 20, 30, 40].map((y) => (
        <path key={y} d={`M0 ${y} L10 ${y - 8} L20 ${y} L30 ${y - 8} L40 ${y}`} className="fill-none stroke-mustard-dark" strokeWidth="2.4" />
      ))}
    </>
  ),
  'fern-chevron': () => (
    <>
      <Bg className="fill-fern" />
      {[4, 14, 24, 34, 44].map((y) => (
        <path key={y} d={`M0 ${y} L10 ${y - 8} L20 ${y} L30 ${y - 8} L40 ${y}`} className="fill-none stroke-fern-light" strokeWidth="2.4" />
      ))}
    </>
  ),
  'cobalt-swallow': () => (
    <>
      <Bg className="fill-paper-light" />
      <path d="M6 24 Q15 15 22 19 Q27 8 37 5 Q31 16 27 23 Q22 31 11 31 Q15 27 6 24Z" className="fill-cobalt" />
      <path d="M18 27 L13 36 L20 30Z" className="fill-cobalt-dark" />
      <circle cx="11" cy="23.5" r="1" className="fill-paper-light" />
    </>
  ),
  'terracotta-arch': () => (
    <>
      <Bg className="fill-terracotta" />
      <circle cx="0" cy="40" r="24" className="fill-none stroke-paper-light" strokeWidth="6" />
      <circle cx="40" cy="0" r="10" className="fill-mustard" />
    </>
  ),
  'night-dove': () => (
    <>
      <Bg className="fill-cobalt-dark" />
      <path d="M7 24 Q13 14 23 16 L35 9 L30 20 Q26 30 14 30 L9 35 L11 28 Q6 27 7 24Z" className="fill-paper-light" />
      <path d="M17 20 Q22 17 27 19 Q23 23 17 20Z" className="fill-cobalt-light" />
      <circle cx="11" cy="23" r="1" className="fill-cobalt-dark" />
    </>
  ),
};

interface TileArtProps {
  tileId: TileId;
  /** "motif" draws one tile; "swatch" repeats it 2x2 like a laid surface. */
  variant?: 'motif' | 'swatch';
  className?: string;
}

export default function TileArt({ tileId, variant = 'motif', className }: TileArtProps) {
  const patternId = `tile-${useId().replace(/:/g, '')}`;
  const Motif = MOTIFS[tileId];

  if (variant === 'motif') {
    return (
      <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
        <Motif />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={patternId} width="20" height="20" patternUnits="userSpaceOnUse">
          <g transform="scale(0.5)">
            <Motif />
          </g>
        </pattern>
      </defs>
      <rect width="40" height="40" fill={`url(#${patternId})`} />
    </svg>
  );
}
