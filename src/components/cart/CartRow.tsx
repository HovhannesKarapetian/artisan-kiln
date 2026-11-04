'use client';

import { motion } from 'framer-motion';
import TileArt from '@/components/tiles/TileArt';
import { AddIcon, TrashIcon } from '@/components/ui/icons';
import QuantityInput from './QuantityInput';
import { formatUSD } from '@/lib/money';
import { QUANTITY_STEP } from '@/lib/catalog';
import { useAppDispatch } from '@/store/hooks';
import { changeQuantityBy, removeItem, setQuantity } from '@/store/cartSlice';
import type { CartLine } from '@/types';

const cell = 'border-2 border-ink px-1 text-center align-middle';

export default function CartRow({ line }: { line: CartLine }) {
  const dispatch = useAppDispatch();
  const { tile, quantity } = line;

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      className="bg-paper-light/60"
    >
      <td className={`${cell} py-1.5`}>
        <div
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('application/x-tile', JSON.stringify({ source: 'palette', tileId: tile.id }));
            e.dataTransfer.effectAllowed = 'copy';
          }}
          className="flex flex-col items-center gap-1 xl:cursor-grab"
          title="Drag onto the design grid"
        >
          <TileArt tileId={tile.id} className="size-12 border-2 border-ink xl:size-11" />
          <span className="text-[13px] font-semibold uppercase leading-tight xl:text-xs">{tile.name}</span>
        </div>
      </td>
      <td className={`${cell} p-1.5`}>
        <TileArt tileId={tile.id} variant="swatch" className="mx-auto aspect-square w-full max-w-24 xl:max-w-[60px]" />
      </td>
      <td className={cell}>
        <QuantityInput
          value={quantity}
          label={`Quantity of ${tile.name}, square feet`}
          onCommit={(q) => dispatch(setQuantity({ tileId: tile.id, quantity: q }))}
        />
      </td>
      <td className={`${cell} whitespace-nowrap font-body text-lg font-semibold xl:text-base`}>
        <span aria-hidden className="text-2xl font-light">[</span>
        {formatUSD(tile.priceCents)}
        <span aria-hidden className="text-2xl font-light">]</span>
      </td>
      <td className={cell}>
        <div className="flex items-start justify-center gap-1">
          <button
            type="button"
            onClick={() => dispatch(changeQuantityBy({ tileId: tile.id, delta: QUANTITY_STEP }))}
            className="group flex flex-col items-center rounded p-0.5 hover:bg-paper-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-cobalt"
            aria-label={`Add ${QUANTITY_STEP} sq. ft. of ${tile.name}`}
            title={`+${QUANTITY_STEP} sq. ft.`}
          >
            <AddIcon className="h-6 w-7 transition-transform group-active:scale-90" />
            <span className="text-[11px] font-semibold uppercase xl:text-[10px]">Add</span>
          </button>
          <button
            type="button"
            onClick={() => dispatch(removeItem(tile.id))}
            className="group flex flex-col items-center rounded p-0.5 hover:bg-paper-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-cobalt"
            aria-label={`Remove ${tile.name} from cart`}
          >
            <TrashIcon className="size-6 transition-transform group-active:scale-90" />
            <span className="text-[11px] font-semibold uppercase xl:text-[10px]">Remove</span>
          </button>
        </div>
      </td>
    </motion.tr>
  );
}
