'use client';

import LineField from './LineField';
import { fieldId } from './fieldIds';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCustomerField, touchField } from '@/store/checkoutSlice';
import { selectVisibleError } from '@/store/selectors';
import type { CustomerInfo } from '@/types';

type Field = Exclude<keyof CustomerInfo, 'notes'>;

function useField(field: Field) {
  const dispatch = useAppDispatch();
  const value = useAppSelector((s) => s.checkout.customer[field]);
  const error = useAppSelector((s) => selectVisibleError(s, field));
  return {
    id: fieldId(field),
    name: field,
    value,
    error,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(setCustomerField({ field, value: e.target.value })),
    onBlur: () => dispatch(touchField(field)),
  };
}

export default function CustomerFields({ className = '' }: { className?: string }) {
  const name = useField('name');
  const phone = useField('phone');
  const email = useField('email');
  const address = useField('address');

  return (
    <fieldset className={`min-w-0 space-y-3 xl:space-y-1.5 ${className}`}>
      <legend className="sr-only">Customer details</legend>
      <LineField label="Customer name" autoComplete="name" required {...name} />
      <div className="grid grid-cols-[1fr_1.15fr] gap-3 sm:gap-4 xl:gap-2">
        <LineField label="Phone" type="tel" autoComplete="tel" inputMode="tel" required {...phone} />
        <LineField label="Email" type="email" autoComplete="email" inputMode="email" required {...email} />
      </div>
      <LineField label="Shipping address" autoComplete="street-address" required {...address} />
    </fieldset>
  );
}
