'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCustomerField } from '@/store/checkoutSlice';

export default function NotesField({ className = '' }: { className?: string }) {
  const dispatch = useAppDispatch();
  const value = useAppSelector((s) => s.checkout.customer.notes);

  return (
    <div className={className}>
      <label htmlFor="checkout-notes" className="font-body text-lg font-semibold uppercase leading-tight xl:text-[13px]">
        <span className="xl:hidden">Project name / notes:</span>
        <span className="hidden xl:inline">Project notes:</span>
      </label>
      <textarea
        id="checkout-notes"
        name="notes"
        rows={2}
        maxLength={500}
        value={value}
        onChange={(e) => dispatch(setCustomerField({ field: 'notes', value: e.target.value }))}
        placeholder="Room, pattern ideas, delivery instructions…"
        // Ruled lines like the paper form.
        className="mt-1 w-full resize-none bg-transparent bg-[linear-gradient(transparent_calc(1.75rem-2px),theme(colors.ink.DEFAULT)_calc(1.75rem-2px),theme(colors.ink.DEFAULT)_1.75rem)] bg-[length:100%_1.75rem] bg-local px-1 font-body text-lg leading-7 outline-none placeholder:text-ink-muted/60 focus:bg-paper-light/40 xl:text-sm"
      />
    </div>
  );
}
