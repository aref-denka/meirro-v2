'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/* ── Hero Section ──────────────────────────────────────────────
   Two stacked screens:
     1. Clean title — "Meirro Pro." + "Precision for professionals."
     2. Combo render — front + back side-by-side, shown at natural size
   No 3D flip, no scroll-driven monitor; the static combo image carries
   the product reveal.
*/
export default function Hero() {
  // Parallax for the huge spec numerals on Screen 2 — they drift apart
  // (6K further left, 32" further right) as the user scrolls through the
  // section. Skipped for users with reduced-motion preference: numerals
  // stay pinned at their flex-edge positions.
  const screen2Ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: screen2Ref,
    offset: ['start end', 'end start'],
  });
  const x6K = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ['0vw', '0vw'] : ['7vw',  '-38vw'],
  );
  const x32 = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ['0vw', '0vw'] : ['-7vw', '38vw'],
  );

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

      {/* Screen 2 — spec numerals + combo render */}
      <div ref={screen2Ref} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background numerals — desktop only, drift apart on scroll behind the monitor */}
        <div
          aria-hidden="true"
          className="hidden md:flex absolute inset-0 mx-auto max-w-[1400px] items-center justify-between pointer-events-none select-none px-[2vw] -translate-y-[6vh]"
        >
          <motion.span
            className="font-black tracking-[-0.08em] leading-none"
            style={{
              fontSize: 'clamp(160px, 32vw, 480px)',
              color: 'rgba(10,10,12,0.22)',
              x: x6K,
              willChange: 'transform',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            6K
          </motion.span>
          <motion.span
            className="font-black tracking-[-0.08em] leading-none"
            style={{
              fontSize: 'clamp(160px, 32vw, 480px)',
              color: 'rgba(10,10,12,0.22)',
              x: x32,
              willChange: 'transform',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            32
            <span style={{ fontSize: '0.55em', verticalAlign: 'super', lineHeight: 1 }}>&quot;</span>
          </motion.span>
        </div>

        {/* Inline spec callout — mobile only, sits above the image */}
        <motion.div
          className="flex md:hidden items-stretch gap-5 mb-5 font-black tracking-[-0.06em] leading-none text-[#0A0A0C]"
          style={{ fontSize: 'clamp(36px, 11vw, 72px)' }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>6K</span>
          <span aria-hidden="true" className="w-px self-stretch bg-[#0A0A0C]/20 my-[0.12em]" />
          <span>
            32
            <span style={{ fontSize: '0.55em', verticalAlign: 'super', lineHeight: 1 }}>&quot;</span>
          </span>
        </motion.div>

        {/* Monitor — foreground, covers the middle of the numerals on desktop */}
        <motion.img
          src="/hero/combo.webp"
          alt="Meirro Pro — front and back view"
          width={2000}
          height={1427}
          decoding="async"
          loading="lazy"
          className="relative z-10 block w-full h-auto max-w-7xl max-h-[68vh] md:max-h-[92vh] object-contain select-none px-6"
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
