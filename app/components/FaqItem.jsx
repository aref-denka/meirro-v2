'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FaqItem({ question, category, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="rounded-2xl border overflow-hidden transition-colors duration-200"
      style={{
        background: '#FFFFFF',
        borderColor: open ? 'rgba(124,92,252,0.28)' : 'rgba(0,0,0,0.07)',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full text-left flex items-start gap-4 px-6 py-5 hover:bg-black/[0.015] transition-colors duration-200"
      >
        <div className="flex-1 min-w-0">
          {category && (
            <p className="text-[10px] font-semibold tracking-[2.5px] uppercase text-[#7C5CFC] mb-1.5">
              {category}
            </p>
          )}
          <h2 className="text-[16px] md:text-[17px] font-bold tracking-[-0.02em] text-[#0A0A0C] leading-snug">
            {question}
          </h2>
        </div>

        <motion.span
          className="shrink-0 mt-1 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(124,92,252,0.10)' }}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
            <path d="M1 1L5.5 5.5L10 1" stroke="#7C5CFC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 pb-6 pt-1 border-t border-black/[0.05]">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
