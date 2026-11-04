'use client';

import { useAppSelector } from '@/store/hooks';

export default function PlaceOrderButton({ className = '' }: { className?: string }) {
  const submitting = useAppSelector((s) => s.checkout.status === 'submitting');

  return (
    <div className={className}>
      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-ink bg-cobalt px-4 py-2.5 font-body text-xl font-bold uppercase tracking-wide text-paper-light shadow-sketch transition hover:bg-cobalt-dark active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:cursor-wait disabled:opacity-80"
      >
        {submitting && (
          <span className="size-4 animate-spin rounded-full border-2 border-paper-light border-t-transparent" aria-hidden />
        )}
        {submitting ? 'Processing…' : 'Place secure order'}
      </button>
    </div>
  );
}
