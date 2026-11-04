'use client';

import AnimatedMoney from '@/components/ui/AnimatedMoney';
import { useAppSelector } from '@/store/hooks';
import { selectTotals } from '@/store/selectors';

export default function CartTotals() {
  const { subtotalCents, shippingCents, grandTotalCents } = useAppSelector(selectTotals);
  const rows = [
    { label: 'Subtotal', cents: subtotalCents, strong: false },
    { label: 'Shipping', cents: shippingCents, strong: false },
    { label: 'Grand total', cents: grandTotalCents, strong: true },
  ];

  return (
    <dl className="grid grid-cols-[auto_minmax(6.5rem,auto)] items-stretch">
      {rows.map(({ label, cents, strong }, i) => (
        <div key={label} className="contents">
          <dt className="flex items-center justify-end pr-2 font-body text-base font-bold uppercase sm:text-lg xl:text-sm">
            {label}:
          </dt>
          <dd
            className={`flex items-center justify-between border-2 border-ink px-1.5 py-0.5 font-body text-base font-semibold sm:text-lg xl:text-sm ${
              i === 0 ? '' : 'border-t-0'
            } ${
              strong ? 'bg-paper-deep' : 'bg-paper-light/60'
            }`}
          >
            <span aria-hidden>[</span>
            <AnimatedMoney cents={cents} />
            <span aria-hidden>]</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
