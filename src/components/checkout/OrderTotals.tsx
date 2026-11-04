'use client';

import AnimatedMoney from '@/components/ui/AnimatedMoney';
import { useAppSelector } from '@/store/hooks';
import { selectTotals } from '@/store/selectors';
import { FREE_SHIPPING_THRESHOLD_CENTS } from '@/lib/pricing';
import { formatUSD } from '@/lib/money';

export default function OrderTotals({ className = '' }: { className?: string }) {
  const { subtotalCents, shippingCents, grandTotalCents } = useAppSelector(selectTotals);
  const toFree = FREE_SHIPPING_THRESHOLD_CENTS - subtotalCents;

  return (
    <div className={className}>
      <dl className="ml-auto w-fit space-y-0.5 text-right font-body text-[15px] font-semibold uppercase">
        {[
          ['Subtotal', subtotalCents],
          ['Shipping', shippingCents],
          ['Grand total', grandTotalCents],
        ].map(([label, cents]) => (
          <div key={label} className="flex justify-end gap-2">
            <dt>{label}:</dt>
            <dd className="flex min-w-[6.5rem] justify-between">
              <span aria-hidden>[</span>
              <AnimatedMoney cents={cents as number} />
              <span aria-hidden>]</span>
            </dd>
          </div>
        ))}
      </dl>
      {subtotalCents > 0 && toFree >= 0 && (
        <p className="mt-1 text-right text-xs text-fern-dark">
          Add {formatUSD(toFree + 1)} more for free shipping
        </p>
      )}
    </div>
  );
}
