'use client';
import { motion } from 'framer-motion';

/* ── Hero Section ──────────────────────────────────────────────
   Two stacked screens:
     1. Clean title — "Meirro Pro." + "Precision for professionals."
     2. Combo render — front + back side-by-side, shown at natural size
   No 3D flip, no scroll-driven monitor; the static combo image carries
   the product reveal.
*/
export default function Hero() {
  return (
    <section
      id="display"
      className="relative bg-[#F7F7F9]"
      aria-label="Meirro Pro — 32-inch 6K monitor"
    >
      {/* Screen 1 — title only */}
      <div className="relative h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.h1
          className="font-black tracking-[-0.06em] leading-[0.92] text-[#0A0A0C]"
          style={{ fontSize: 'clamp(64px, 12vw, 160px)' }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Meirro Pro.
        </motion.h1>
        <motion.p
          className="mt-5 text-[#0A0A0C]/75 font-normal tracking-[-0.01em]"
          style={{ fontSize: 'clamp(15px, 1.8vw, 20px)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Precision for professionals.
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="text-[10px] font-medium tracking-[2.5px] uppercase text-[#0A0A0C]/40">
            Scroll
          </span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-[#0A0A0C]/20 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* Screen 2 — combo render (front + back) */}
      <div className="relative h-screen flex items-center justify-center px-6">
        <motion.img
          src="/hero/combo.png"
          alt="Meirro Pro — front and back view"
          className="block w-full h-auto max-w-6xl max-h-[80vh] object-contain select-none"
          draggable={false}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </section>
  );
}
