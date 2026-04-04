'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('meirro-cookies')) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('meirro-cookies', 'accepted');
    if (window.gtag) {
      window.gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted' });
      window.gtag('event', 'page_view');
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-5 left-5 z-[999] select-none"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── Outer bezel — aluminium ───────────────────── */}
          <div
            style={{
              width: 300,
              background: 'linear-gradient(160deg, #e8e8ea 0%, #d0d0d4 100%)',
              borderRadius: 10,
              padding: '6px 6px 7px',
              boxShadow:
                '0 24px 60px rgba(0,0,0,0.24), ' +
                '0 0 0 1px rgba(255,255,255,0.7), ' +
                '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {/* Camera dot */}
            <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-zinc-400/60" />

            {/* ── Inner screen ─────────────────────────────── */}
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: 6, background: '#04040A' }}
            >
              {/* Aurora glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 70% at 15% 65%, rgba(124,92,252,0.3) 0%, transparent 55%), ' +
                    'radial-gradient(ellipse 65% 60% at 85% 30%, rgba(196,75,247,0.18) 0%, transparent 55%)',
                }}
              />

              {/* Scan lines */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
                }}
              />

              {/* Shimmer sweep */}
              <div className="shimmer-sweep absolute inset-0 pointer-events-none" />

              {/* Content */}
              <div className="relative px-4 py-4">

                {/* Eyebrow */}
                <p className="text-[8px] font-semibold tracking-[2.5px] uppercase text-white/30 mb-2.5">
                  Privacy · Meirro
                </p>

                {/* Body */}
                <p className="text-[11px] text-white/65 leading-relaxed font-normal mb-1">
                  We use required, performance and marketing cookies to measure,
                  analyse and personalise your experience.
                </p>

                {/* Expandable detail */}
                <AnimatePresence>
                  {showDetail && (
                    <motion.p
                      className="text-[10px] text-white/40 leading-relaxed font-normal mt-1"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      Required cookies keep the site functional. Performance cookies
                      help us improve speed and reliability. Marketing cookies let us
                      show relevant content. You can withdraw consent at any time.
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Links row */}
                <div className="flex gap-2.5 mt-2 mb-3">
                  <button
                    onClick={() => setShowDetail((v) => !v)}
                    className="text-[9px] font-medium text-white/35 hover:text-white/60 transition-colors underline underline-offset-2"
                  >
                    {showDetail ? 'Less' : 'Read more'}
                  </button>
                  <span className="text-white/20 text-[9px]">·</span>
                  <a
                    href="#"
                    className="text-[9px] font-medium text-white/35 hover:text-white/60 transition-colors underline underline-offset-2"
                  >
                    Privacy policy
                  </a>
                </div>

                {/* Buttons */}
                <div className="flex gap-1.5">
                  <motion.button
                    onClick={accept}
                    className="flex-1 py-2 rounded text-[11px] font-semibold text-white"
                    style={{ background: 'linear-gradient(135deg, #7C5CFC 0%, #C44BF7 100%)' }}
                    whileHover={{ opacity: 0.88 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                  >
                    Accept all
                  </motion.button>
                  <motion.button
                    onClick={accept}
                    className="px-3 py-2 rounded text-[11px] font-medium text-white/55 hover:text-white/80 transition-colors"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                  >
                    Necessary
                  </motion.button>
                </div>

              </div>
            </div>
          </div>

          {/* ── Stand neck ────────────────────────────────── */}
          <div className="flex flex-col items-center">
            <div
              style={{
                width: 34,
                height: 10,
                background: 'linear-gradient(160deg, #dcdce0, #c8c8cc)',
                clipPath: 'polygon(18% 0%, 82% 0%, 94% 100%, 6% 100%)',
                border: '1px solid rgba(255,255,255,0.5)',
              }}
            />
            {/* Stand base */}
            <div
              style={{
                width: 90,
                height: 5,
                background: 'linear-gradient(160deg, #dcdce0, #c8c8cc)',
                borderRadius: 3,
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
