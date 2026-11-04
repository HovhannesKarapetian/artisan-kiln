'use client';

import type { InputHTMLAttributes } from 'react';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string;
  label: string;
  error?: string;
  className?: string;
}

/** "LABEL: ________" style input from the mockup, with an inline error. */
export default function LineField({ id, label, error, className = '', ...input }: Props) {
  const errorId = `${id}-error`;
  return (
    <div className={`min-w-0 ${className}`}>
      <div className="flex items-end gap-2">
        <label htmlFor={id} className="shrink-0 whitespace-nowrap font-body text-lg font-semibold uppercase leading-tight xl:text-[13px]">
          {label}:
        </label>
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`min-w-0 flex-1 border-b-2 bg-transparent px-1 pb-0.5 font-body text-lg leading-tight outline-none transition-colors placeholder:text-ink-muted/60 focus:border-cobalt focus:bg-paper-light/70 xl:text-sm ${
            error ? 'border-danger' : 'border-ink'
          }`}
          {...input}
        />
      </div>
      {error && (
        <p id={errorId} className="mt-0.5 text-right text-xs font-semibold text-danger">{error}</p>
      )}
    </div>
  );
}
