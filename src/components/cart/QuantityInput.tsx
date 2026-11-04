'use client';

import { useEffect, useState } from 'react';
import { QUANTITY_MIN } from '@/lib/catalog';

interface Props {
  value: number;
  label: string;
  onCommit: (value: number) => void;
}

/**
 * Number field that lets the user clear it while typing and only
 * commits a valid quantity (on change when valid, normalized on blur).
 */
export default function QuantityInput({ value, label, onCommit }: Props) {
  const [draft, setDraft] = useState(String(value));

  useEffect(() => setDraft(String(value)), [value]);

  const commit = (raw: string) => {
    const n = Number.parseInt(raw, 10);
    if (Number.isFinite(n)) onCommit(n);
    else setDraft(String(value));
  };

  return (
    <label className="inline-flex items-center font-body text-lg font-semibold xl:text-xl">
      <span aria-hidden className="text-2xl font-light">[</span>
      <span className="sr-only">{label}</span>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={draft}
        maxLength={4}
        onChange={(e) => {
          const next = e.target.value.replace(/\D/g, '');
          setDraft(next);
          const n = Number.parseInt(next, 10);
          if (n >= QUANTITY_MIN) onCommit(n);
        }}
        onBlur={(e) => commit(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowUp') { e.preventDefault(); onCommit(value + 1); }
          if (e.key === 'ArrowDown') { e.preventDefault(); onCommit(value - 1); }
        }}
        className="w-12 bg-transparent text-center outline-none focus:bg-paper-light focus:ring-2 focus:ring-cobalt/50 xl:w-11"
      />
      <span aria-hidden className="text-2xl font-light">]</span>
    </label>
  );
}
