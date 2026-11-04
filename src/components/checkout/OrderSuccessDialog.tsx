'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TileArt from '@/components/tiles/TileArt';
import { formatUSD } from '@/lib/money';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetCheckout } from '@/store/checkoutSlice';
import { resetCart } from '@/store/cartSlice';
import type { PaymentMethod } from '@/types';

const METHOD_LABEL: Record<PaymentMethod, string> = {
  card: 'credit/debit card',
  paypal: 'PayPal',
  applepay: 'Apple Pay',
  bank: 'bank transfer',
};

export default function OrderSuccessDialog() {
  const dispatch = useAppDispatch();
  const order = useAppSelector((s) => s.checkout.placedOrder);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    dispatch(resetCart());
    dispatch(resetCheckout());
  };

  useEffect(() => {
    if (!order) return;
    buttonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      // Keep focus inside the dialog: it has a single focusable element.
      if (e.key === 'Tab') { e.preventDefault(); buttonRef.current?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  return (
    <AnimatePresence>
      {order && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-success-title"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className="w-full max-w-sm rounded-lg border-2 border-ink bg-paper p-6 text-center shadow-sketch"
          >
            <div className="mb-3 flex justify-center gap-1.5" aria-hidden>
              {(['ocean-wave', 'forest-fern', 'terracotta-dot', 'yellow-star'] as const).map((id, i) => (
                <motion.span key={id} initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 + i * 0.07 }}>
                  <TileArt tileId={id} className="size-9 border-2 border-ink" />
                </motion.span>
              ))}
            </div>
            <h2 id="order-success-title" className="font-display text-2xl uppercase">Order placed!</h2>
            <p className="mt-2">
              Order <b>{order.id}</b> for <b>{formatUSD(order.grandTotalCents)}</b> via {METHOD_LABEL[order.paymentMethod]}.
            </p>
            <p className="mt-1 text-sm text-ink-muted">A confirmation is on its way to {order.email}.</p>
            <button
              ref={buttonRef}
              type="button"
              onClick={close}
              className="mt-5 rounded-md border-2 border-ink bg-cobalt px-5 py-2 font-bold uppercase text-paper-light shadow-sketch hover:bg-cobalt-dark"
            >
              Start a new order
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
