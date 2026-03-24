'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ThePanel() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const screenScale   = useTransform(scrollYProgress, [0.05, 0.55], [0.62, 1.0]);
  const screenRadius  = useTransform(scrollYProgress, [0.05, 0.55], [16, 0]);
  const screenOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const wallpaperOp   = useTransform(scrollYProgress, [0.10, 0.45], [0, 1]);
  const textOpacity   = useTransform(scrollYProgress, [0.55, 0.72], [0, 1]);
  const textY         = useTransform(scrollYProgress, [0.55, 0.72], [30, 0]);
  const overlayOp     = useTransform(scrollYProgress, [0.55, 0.75], [0, 0.65]);

  return (
    <section ref={ref} id="design" className="relative" style={{ height: '300vh' }} aria-label="32-inch 6K Retina panel — colour accuracy and display technology">
      {/* Light background before screen fills */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-[#F7F7F9]">

        {/* Violet aurora (appears as screen fills) */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 30% 60%, #7C5CFC 0%, transparent 50%), radial-gradient(ellipse 70% 60% at 70% 40%, #C44BF7 0%, transparent 50%), radial-gradient(ellipse 50% 50% at 50% 10%, #3B82F6 0%, transparent 50%)',
            opacity: wallpaperOp,
          }}
        />

        {/* Screen panel scales to fill viewport */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{
            scale: screenScale,
            borderRadius: screenRadius,
            opacity: screenOpacity,
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 30% 60%, #5B21B6 0%, transparent 50%), radial-gradient(ellipse 70% 60% at 70% 40%, #7C3AED 0%, transparent 50%), radial-gradient(ellipse 50% 50% at 50% 10%, #1D4ED8 0%, transparent 50%), #04040A',
              opacity: wallpaperOp,
            }}
          />
          {/* Scan lines */}
          <div
            className="absolute inset-0"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 6px)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>

        {/* Dark overlay + text once screen is full */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'rgba(0,0,0,0.55)', opacity: overlayOp }}
        />

        <motion.div
          className="relative z-10 text-center px-6 max-w-3xl"
          style={{ opacity: textOpacity, y: textY }}
        >
          <p className="text-[11px] font-semibold tracking-[3px] uppercase text-white/40 mb-5">
            The Panel
          </p>
          <h2
            className="font-black tracking-[-0.05em] leading-[0.94] text-white mb-6"
            style={{ fontSize: 'clamp(48px, 8vw, 100px)' }}
          >
            32-Inch 6K Retina.<br />Colour beyond reproach.
          </h2>
          <p className="text-white/80 font-normal leading-relaxed mx-auto" style={{ fontSize: 'clamp(15px, 1.8vw, 19px)', maxWidth: 520 }}>
            218 pixels per inch across 32 inches of IPS. 99% DCI-P3. Factory-calibrated to ΔE&nbsp;&lt;&nbsp;1 per unit.
            What you see is exactly what was intended.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
