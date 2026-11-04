'use client';

import { fieldId } from './fieldIds';
import { MastercardMark, VisaMark } from '@/components/ui/icons';
import { formatCardNumber, formatExpiry } from '@/lib/validation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCardField, touchField } from '@/store/checkoutSlice';
import { selectVisibleError } from '@/store/selectors';
import type { CardInfo } from '@/types';

const FORMAT: Record<keyof CardInfo, (v: string) => string> = {
  number: formatCardNumber,
  expiry: formatExpiry,
  cvv: (v) => v.replace(/\D/g, '').slice(0, 4),
};

function BoxInput({ field, label, showLabel, ...rest }: {
  field: keyof CardInfo;
  label: string;
  showLabel?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const dispatch = useAppDispatch();
  const key = `card.${field}` as const;
  const value = useAppSelector((s) => s.checkout.card[field]);
  const error = useAppSelector((s) => selectVisibleError(s, key));
  const id = fieldId(key);

  return (
    <div className="min-w-0">
      <label htmlFor={id} className={showLabel ? 'mb-0.5 block text-xs font-bold uppercase' : 'sr-only'}>
        {label}
      </label>
      <input
        id={id}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => dispatch(setCardField({ field, value: FORMAT[field](e.target.value) }))}
        onBlur={() => dispatch(touchField(key))}
        className={`w-full rounded border-2 bg-paper-light px-2 py-1 font-body text-base tracking-wide outline-none placeholder:text-xs placeholder:uppercase placeholder:text-ink-muted focus:border-cobalt xl:text-sm ${
          error ? 'border-danger' : 'border-ink'
        }`}
        {...rest}
      />
      {error && <p id={`${id}-error`} className="mt-0.5 text-[11px] font-semibold text-danger">{error}</p>}
    </div>
  );
}

export default function CardDetails() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5" aria-label="Visa and Mastercard accepted">
        <VisaMark />
        <MastercardMark />
      </div>
      <BoxInput field="number" label="Card number" showLabel inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" maxLength={23} />
      <div className="grid grid-cols-2 gap-2">
        <BoxInput field="expiry" label="Expiration (MM/YY)" inputMode="numeric" autoComplete="cc-exp" placeholder="Expiration / MM/YY" maxLength={5} />
        <BoxInput field="cvv" label="CVV" inputMode="numeric" autoComplete="cc-csc" placeholder="CVV" maxLength={4} type="password" />
      </div>
    </div>
  );
}
