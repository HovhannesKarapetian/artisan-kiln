import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  'aria-hidden': true,
  focusable: false,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...props,
});

export const CartIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...base(p)}>
    <path d="M2 3h3l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h9.2a1.5 1.5 0 0 0 1.5-1.1L21 7H6" />
    <circle cx="9" cy="20" r="1.4" />
    <circle cx="18" cy="20" r="1.4" />
  </svg>
);

export const UserIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...base(p)}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3.5" />
    <path d="M5.5 19a7.5 7.5 0 0 1 13 0" />
  </svg>
);

export const AddIcon = (p: IconProps) => (
  <svg viewBox="0 0 28 24" {...base({ strokeWidth: 1.6, ...p })}>
    <rect x="1" y="2" width="18" height="18" rx="3" className="fill-fern" stroke="#1F1B16" />
    <path d="M10 6.5v9M5.5 11h9" stroke="#FBF7EC" strokeWidth="2.4" />
    <path d="M20 11h6m-2.5-3 3 3-3 3" stroke="#1F1B16" />
  </svg>
);

export const TrashIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...base({ strokeWidth: 1.6, ...p })}>
    <path d="M5 7h14l-1.2 13a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8Z" className="fill-terracotta" stroke="#1F1B16" />
    <rect x="3" y="4" width="18" height="3" rx="1" className="fill-terracotta-dark" stroke="#1F1B16" />
    <path d="M9.5 4V2.5h5V4" stroke="#1F1B16" />
    <path d="M9 13.5h6" stroke="#FBF7EC" strokeWidth="2.2" />
  </svg>
);

export const EraserIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...base(p)}>
    <path d="m7 21-4.3-4.3a1 1 0 0 1 0-1.4l10-10a1 1 0 0 1 1.4 0l6.6 6.6a1 1 0 0 1 0 1.4L13 21Z" />
    <path d="M22 21H7M5 11l9 9" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const CardIcon = (p: IconProps) => (
  <svg viewBox="0 0 48 32" {...base({ strokeWidth: 2, ...p })}>
    <rect x="2" y="2" width="44" height="28" rx="4" />
    <path d="M2 10h44" strokeWidth="5" />
    <circle cx="34" cy="22" r="3" />
    <circle cx="38.5" cy="22" r="3" />
  </svg>
);

export const PaypalIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 28" aria-hidden focusable="false" {...p}>
    <path d="M7.2 26H2.4L6.3 1h8.4c4.6 0 7.4 2.4 6.6 6.9-.9 5.4-4.6 7.6-9.4 7.6H9.4Z" fill="#253B80" />
    <path d="M10 27.5H6.2l1.4-9h3.6c4 0 7.4-2 8.2-6.5.3-1.6.1-2.9-.4-3.9 2.6 1.2 3.6 3.6 3 6.6-.8 4.6-4 6.9-8.3 6.9h-2.6Z" fill="#179BD7" />
  </svg>
);

export const AppleIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 28" aria-hidden focusable="false" fill="currentColor" {...p}>
    <path d="M19.6 14.9c0-3 2.5-4.5 2.6-4.6-1.4-2.1-3.6-2.4-4.4-2.4-1.9-.2-3.6 1.1-4.6 1.1-.9 0-2.4-1.1-3.9-1-2 0-3.9 1.2-5 3-2.1 3.7-.5 9.2 1.5 12.2 1 1.5 2.2 3.1 3.8 3 1.5-.1 2.1-1 3.9-1s2.3 1 3.9.9c1.6 0 2.7-1.5 3.7-3 1.2-1.7 1.6-3.3 1.7-3.4-.1 0-3.2-1.2-3.2-4.8ZM16.6 6c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.6.8-3.5 1.8-.8.9-1.5 2.3-1.3 3.7 1.3.1 2.7-.7 3.6-1.7Z" />
  </svg>
);

export const BankIcon = (p: IconProps) => (
  <svg viewBox="0 0 32 32" aria-hidden focusable="false" {...p}>
    <path d="M16 2 2 9v3h28V9Z" className="fill-fern" stroke="#1F1B16" strokeWidth="1.5" strokeLinejoin="round" />
    {[6, 12, 18, 24].map((x) => (
      <rect key={x} x={x} y="13" width="3" height="11" className="fill-fern" stroke="#1F1B16" strokeWidth="1.2" />
    ))}
    <rect x="2" y="25" width="28" height="4" className="fill-fern-dark" stroke="#1F1B16" strokeWidth="1.5" />
  </svg>
);

export const VisaMark = () => (
  <span className="inline-flex h-6 items-center rounded-sm border border-ink bg-white px-1.5 font-display text-[13px] font-bold italic tracking-tight text-[#1A1F71]">
    VISA
  </span>
);

export const MastercardMark = () => (
  <span className="inline-flex h-6 items-center rounded-sm border border-ink bg-white px-1" aria-hidden>
    <svg viewBox="0 0 30 18" className="h-4 w-7">
      <circle cx="11" cy="9" r="7.5" fill="#EB001B" />
      <circle cx="19" cy="9" r="7.5" fill="#F79E1B" fillOpacity=".9" />
    </svg>
  </span>
);
