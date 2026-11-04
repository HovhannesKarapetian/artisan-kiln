'use client';

import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CardDetails from './CardDetails';
import { AppleIcon, BankIcon, CardIcon, PaypalIcon } from '@/components/ui/icons';
import { formatUSD } from '@/lib/money';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPaymentMethod } from '@/store/checkoutSlice';
import { selectTotals } from '@/store/selectors';
import type { PaymentMethod } from '@/types';

interface Option {
  value: PaymentMethod;
  label: string;
  icon: ReactNode;
  /** Desktop placement: inline radio above the details panel, or a large box below. */
  desktop: 'inline' | 'box';
  order: string;
}

const OPTIONS: Option[] = [
  { value: 'card', label: 'Credit/Debit card', icon: <CardIcon className="h-7 w-10 sm:h-8 sm:w-12" />, desktop: 'inline', order: 'xl:order-1' },
  { value: 'paypal', label: 'PayPal', icon: <PaypalIcon className="h-8 w-7 xl:h-5 xl:w-4" />, desktop: 'inline', order: 'xl:order-2' },
  {
    value: 'applepay',
    label: 'Apple Pay',
    icon: (
      <span className="inline-flex items-center rounded-md border-2 border-ink px-1.5 text-2xl font-semibold leading-none xl:border-0 xl:text-3xl">
        <AppleIcon className="mr-0.5 h-6 w-5 xl:h-7 xl:w-6" />Pay
      </span>
    ),
    desktop: 'box',
    order: 'xl:order-4',
  },
  { value: 'bank', label: 'Bank transfer', icon: <BankIcon className="size-9" />, desktop: 'box', order: 'xl:order-5' },
];

const radio =
  'peer size-5 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-ink bg-paper-light checked:bg-ink checked:shadow-[inset_0_0_0_3px_theme(colors.paper.light)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt xl:size-4';

function MethodNote({ method, totalCents }: { method: Exclude<PaymentMethod, 'card'>; totalCents: number }) {
  const total = formatUSD(totalCents);
  if (method === 'paypal') return <p>You will be redirected to PayPal to approve the payment of <b>{total}</b>.</p>;
  if (method === 'applepay') return <p>Confirm the payment of <b>{total}</b> with Face ID or Touch ID after placing the order.</p>;
  return (
    <div className="space-y-0.5">
      <p>Transfer <b>{total}</b> within 5 business days. Your order number is the payment reference.</p>
      <p className="font-mono text-xs">The Artisan Kiln Ltd · IBAN GB00 KILN 0000 1234 5678 90</p>
    </div>
  );
}

export default function PaymentMethods({ className = '' }: { className?: string }) {
  const dispatch = useAppDispatch();
  const method = useAppSelector((s) => s.checkout.paymentMethod);
  const { grandTotalCents } = useAppSelector(selectTotals);

  return (
    <fieldset className={`min-w-0 ${className}`}>
      <legend className="mb-0 inline-block rounded-t-md border-2 border-b-0 border-ink bg-paper-dark px-2 py-0.5 font-body text-xl font-bold uppercase xl:mb-2 xl:rounded-md xl:border-b-2 xl:text-base">
        Select payment method:
      </legend>

      <div className="grid grid-cols-4 border-2 border-ink xl:grid-cols-2 xl:gap-2 xl:border-0">
        {OPTIONS.map((opt, i) => {
          const checked = method === opt.value;
          const inline = opt.desktop === 'inline';
          return (
            <label
              key={opt.value}
              className={`relative flex cursor-pointer flex-col items-center justify-between gap-1 px-1 py-2 text-center transition-colors ${opt.order} ${
                i > 0 ? 'border-l-2 border-ink' : ''
              } ${checked ? 'bg-paper-deep' : 'bg-paper-light/40 hover:bg-paper-dark/60'} ${
                inline
                  ? 'xl:flex-row xl:justify-start xl:gap-2 xl:border-0 xl:bg-transparent xl:p-0 xl:hover:bg-transparent'
                  : 'xl:rounded-md xl:border-2 xl:border-ink xl:px-2 xl:py-3'
              }`}
            >
              <span className={`flex w-full items-center justify-center gap-2 ${inline ? 'xl:w-auto' : ''}`}>
                <input
                  type="radio"
                  name="payment-method"
                  value={opt.value}
                  checked={checked}
                  onChange={() => dispatch(setPaymentMethod(opt.value))}
                  className={`${radio} ${inline ? '' : 'xl:absolute xl:left-2 xl:top-3'}`}
                />
                <span className={`grid h-10 place-items-center ${opt.value === 'card' ? 'xl:hidden' : ''} ${inline ? 'xl:h-auto' : ''}`}>
                  {opt.icon}
                </span>
              </span>
              <span className="font-body text-[15px] font-semibold uppercase leading-tight xl:text-sm">{opt.label}</span>
            </label>
          );
        })}

        <div className="col-span-4 border-t-2 border-ink xl:order-3 xl:col-span-2 xl:border-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={method}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="bg-paper-dark/50 p-3 text-sm xl:rounded-md xl:border-2 xl:border-ink">
                {method === 'card' ? <CardDetails /> : <MethodNote method={method} totalCents={grandTotalCents} />}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </fieldset>
  );
}
