'use client';

import { AnimatePresence } from 'framer-motion';
import CartRow from './CartRow';
import CartTotals from './CartTotals';
import AddTileButton from './AddTileButton';
import TileArt from '@/components/tiles/TileArt';
import { useAppSelector } from '@/store/hooks';
import { selectCartLines, selectVisibleError } from '@/store/selectors';

const th = 'border-2 border-ink bg-paper-dark px-1 py-2 text-center align-middle font-body text-[15px] font-semibold uppercase leading-tight xl:text-xs';

export default function CartSection({ className = '' }: { className?: string }) {
  const lines = useAppSelector(selectCartLines);
  const cartError = useAppSelector((s) => selectVisibleError(s, 'cart'));

  return (
    <section id="cart" aria-labelledby="cart-heading" className={className}>
      <h2 id="cart-heading" className="sr-only whitespace-nowrap font-display uppercase xl:not-sr-only xl:!whitespace-nowrap xl:mb-2 xl:text-2xl xl:leading-none">
        Shopping Cart &amp; Design Tool
      </h2>

      <table className="w-full table-fixed border-collapse">
        <colgroup>
          <col className="w-[23%]" />
          <col className="w-[23%]" />
          <col className="w-[17%]" />
          <col className="w-[18%]" />
          <col className="w-[19%]" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className={th}>Tile collection</th>
            <th scope="col" className={th}>Item</th>
            <th scope="col" className={th}>
              Quantity<br /><span className="normal-case">(sq. ft.)</span>
            </th>
            <th scope="col" className={th}>Unit price<br />($)</th>
            <th scope="col" className={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence initial={false}>
            {lines.map((line) => (
              <CartRow key={line.tileId} line={line} />
            ))}
          </AnimatePresence>
          {lines.length === 0 && (
            <tr>
              <td colSpan={5} className="border-2 border-ink bg-paper-light/60 px-3 py-6 text-center font-body text-lg">
                Your cart is empty — add a tile below.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {cartError && (
        <p role="alert" className="mt-1 text-sm font-semibold text-danger">{cartError}</p>
      )}

      <div className="mt-2 flex flex-wrap items-start justify-between gap-x-2 gap-y-3">
        <div className="flex items-center gap-2">
          <TileArt tileId="cobalt-cross" className="hidden size-12 -rotate-12 border-2 border-ink shadow-sketch sm:block xl:size-10" />
          <AddTileButton />
        </div>
        <CartTotals />
      </div>
    </section>
  );
}
