'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CartIcon, UserIcon } from '@/components/ui/icons';
import { useAppSelector } from '@/store/hooks';
import { selectCartCount } from '@/store/selectors';

const NAV = [
  { label: 'Home', mobile: false },
  { label: 'Shop', mobile: true },
  { label: 'Collections', mobile: true },
  { label: 'About us', mobile: true },
  { label: 'FAQ', mobile: false },
  { label: 'Gallery', mobile: false },
  { label: 'Blog', mobile: false },
];

export default function Header() {
  const count = useAppSelector(selectCartCount);

  return (
    <header className="sticky top-0 z-30 border-b-2 border-ink bg-paper-dark/95 backdrop-blur">
      <div className="mx-auto flex h-12 max-w-[1440px] items-center gap-3 px-3 sm:px-4 xl:h-9">
        <div className="hidden shrink-0 gap-1.5 sm:flex" aria-hidden>
          <span className="size-3 rounded-full border border-ink bg-terracotta" />
          <span className="size-3 rounded-full border border-ink bg-mustard" />
          <span className="size-3 rounded-full border border-ink bg-fern" />
        </div>

        <nav aria-label="Main" className="min-w-0 flex-1">
          <ul className="flex items-center justify-center gap-4 sm:gap-7 xl:gap-6">
            {NAV.map(({ label, mobile }) => (
              <li key={label} className={mobile ? '' : 'hidden xl:block'}>
                <a
                  href="#"
                  className="font-body text-[15px] font-semibold uppercase tracking-wide text-ink underline-offset-4 hover:underline sm:text-lg xl:text-base"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#cart" className="relative shrink-0 text-ink" aria-label={`Cart, ${count} items`}>
          <CartIcon className="size-7" />
          <AnimatePresence mode="popLayout">
            <motion.span
              key={count}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              className="absolute -right-1.5 -top-1.5 grid size-[18px] place-items-center rounded-full border border-ink bg-mustard text-[11px] font-bold leading-none"
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </a>

        <div className="flex shrink-0 items-center gap-1.5">
          <UserIcon className="size-7 text-cobalt" />
          <span className="hidden rounded-md border border-ink bg-cobalt px-2 py-0.5 text-sm font-semibold text-paper-light xl:inline">
            A. Smith
          </span>
          <a
            href="#"
            className="rounded-md border border-ink bg-cobalt px-2.5 py-0.5 text-base font-semibold text-paper-light xl:hidden"
          >
            Log In
          </a>
        </div>
      </div>
    </header>
  );
}
