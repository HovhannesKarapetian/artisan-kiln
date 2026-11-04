'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { formatUSD } from '@/lib/money';

/** A money value that briefly slides in whenever it changes. */
export default function AnimatedMoney({ cents, className }: { cents: number; className?: string }) {
  return (
    <span className={`relative inline-flex overflow-hidden ${className ?? ''}`} aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={cents}
          initial={{ y: '70%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-70%', opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {formatUSD(cents)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
