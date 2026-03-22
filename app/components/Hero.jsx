'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ── CSS Monitor Component ─────────────────────────────────── */
function MonitorShape({ rotateY, scale, screenBrightness }) {
  return (
    <motion.div
      className="relative mx-auto select-none"
      style={{ width: 'clamp(280px, 55vw, 680px)', perspective: 1200 }}
    >
      <motion.div style={{ rotateY, scale, transformStyle: 'preserve-3d' }}>

        {/* Monitor body */}
        <div
          className="relative rounded-[10px] overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #e8e8ea 0%, #d0d0d4 100%)',
            border: '1px solid rgba(0,0,0,0.1)',
            padding: '9px 9px 10px',
            boxShadow: '0 40px 120px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.7)',
          }}
        >
          {/* Screen — stays dark, it's a display */}
          <motion.div
            className="relative overflow-hidden bg-[#04040A]"
            style={{ borderRadius: 4, aspectRatio: '16/10' }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse 80% 60% at 30% 60%, #7C5CFC 0%, transparent 50%), radial-gradient(ellipse 70% 60% at 70% 40%, #C44BF7 0%, transparent 50%), radial-gradient(ellipse 50% 50% at 50% 10%, #3B82F6 0%, transparent 50%)',
                opacity: screenBrightness,
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
                opacity: 0.6,
              }}
            />
          </motion.div>

          {/* Camera dot */}
          <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-zinc-400/60" />

          {/* Shimmer sweep on bezel */}
          <div className="shimmer-sweep absolute inset-0 pointer-events-none rounded-[10px]" />
        </div>

        {/* Stand neck */}
        <div className="relative mx-auto mt-0" style={{ width: '14%', height: 0 }}>
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              width: '100%',
              height: 'clamp(32px, 4vw, 56px)',
              background: 'linear-gradient(160deg, #dcdce0, #c8c8cc)',
              clipPath: 'polygon(20% 0%, 80% 0%, 95% 100%, 5% 100%)',
              borderLeft: '1px solid rgba(255,255,255,0.6)',
              borderRight: '1px solid rgba(0,0,0,0.08)',
            }}
          />
        </div>

        {/* Stand base */}
        <div
          className="relative mx-auto"
          style={{
            marginTop: 'clamp(32px, 4vw, 56px)',
            width: '38%',
            height: 'clamp(8px, 1vw, 12px)',
            background: 'linear-gradient(160deg, #dcdce0, #c8c8cc)',
            borderRadius: 6,
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
          }}
        />
      </motion.div>

      {/* Ambient glow under monitor */}
      <motion.div
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '70%', height: 80,
          background: 'radial-gradient(ellipse, rgba(124,92,252,0.2) 0%, transparent 70%)',
          filter: 'blur(20px)',
          opacity: screenBrightness,
        }}
      />
    </motion.div>
  );
}

/* ── Hero Section ──────────────────────────────────────────── */
export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const rotateY         = useTransform(scrollYProgress, [0, 0.6], [12, 0]);
  const scale           = useTransform(scrollYProgress, [0, 0.5], [0.88, 1.0]);
  const titleOpacity    = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const titleY          = useTransform(scrollYProgress, [0, 0.4], [0, -40]);
  const screenBrightness = useTransform(scrollYProgress, [0.1, 0.55], [0, 0.9]);

  return (
    <section
      ref={containerRef}
      id="display"
      className="relative"
      style={{ height: '220vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center bg-[#F7F7F9]">

        {/* Soft violet bloom — very subtle on light */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 20% 40%, rgba(124,92,252,0.06) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 80% 60%, rgba(196,75,247,0.04) 0%, transparent 55%)',
          }}
        />

        {/* Headline */}
        <motion.div
          className="absolute top-[22%] left-0 right-0 text-center z-10 px-6 pointer-events-none"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <motion.p
            className="text-[11px] font-semibold tracking-[3px] uppercase text-[#0A0A0C]/50 mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Introducing
          </motion.p>
          <motion.h1
            className="font-black tracking-[-0.06em] leading-[0.92] text-[#0A0A0C]"
            style={{ fontSize: 'clamp(64px, 12vw, 160px)' }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Meirro Pro.
          </motion.h1>
          <motion.p
            className="mt-5 text-[#0A0A0C]/75 font-normal tracking-[-0.01em]"
            style={{ fontSize: 'clamp(15px, 1.8vw, 20px)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            6K · 120Hz · Thunderbolt 5 · 99% P3
          </motion.p>
        </motion.div>

        {/* Monitor */}
        <motion.div
          className="w-full px-6 z-10"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: 'clamp(60px, 10vh, 100px)' }}
        >
          <MonitorShape
            rotateY={rotateY}
            scale={scale}
            screenBrightness={screenBrightness}
          />
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: titleOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="text-[10px] font-medium tracking-[2.5px] uppercase text-[#0A0A0C]/40">Scroll</span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-[#0A0A0C]/20 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

      </div>
    </section>
  );
}
