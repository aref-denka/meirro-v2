'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ── Stand — shared between front and back ─────────────────── */
function Stand() {
  return (
    <div className="relative mx-auto mt-0 flex flex-col items-center" style={{ width: '60%' }}>
      {/* Pillar */}
      <div
        className="relative overflow-hidden"
        style={{
          width: 'clamp(36px, 7.5vw, 90px)',
          height: 'clamp(42px, 5.4vw, 76px)',
          background: 'linear-gradient(135deg, #ededf0 0%, #d8d9dc 50%, #c4c5c9 100%)',
          borderRadius: '3px 3px 0 0',
          border: '1px solid rgba(0,0,0,0.07)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.95), inset -1px 0 0 rgba(0,0,0,0.05)',
        }}
      >
        {/* Brushed sheen */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 14px)',
          }}
        />
        {/* Right edge highlight */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: '76%',
            width: '3%',
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)',
          }}
        />
        {/* Cable cutout (oblong) — lower half of pillar */}
        <div
          className="absolute left-1/2"
          style={{
            top: '62%',
            transform: 'translate(-50%, -50%)',
            width: '52%',
            height: '32%',
            borderRadius: 9999,
            background:
              'radial-gradient(ellipse at 50% 30%, #1c1c20 0%, #0a0a0c 70%, #050506 100%)',
            boxShadow:
              'inset 0 3px 6px rgba(0,0,0,0.75), 0 1px 0 rgba(255,255,255,0.45)',
          }}
        />
      </div>

      {/* Base */}
      <div
        className="relative"
        style={{
          width: 'clamp(100px, 18vw, 200px)',
          height: 'clamp(9px, 1.2vw, 16px)',
          background: 'linear-gradient(180deg, #dadbde 0%, #b8b9bd 100%)',
          borderRadius: '3px 3px 10px 10px',
          border: '1px solid rgba(0,0,0,0.07)',
          boxShadow:
            '0 6px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.85), inset 0 -1px 0 rgba(0,0,0,0.08)',
          marginTop: -1,
        }}
      />
    </div>
  );
}

/* ── Screen content: 6K · 32" displayed on the monitor ─────── */
function ScreenContent() {
  return (
    <div className="absolute inset-0 flex">

      {/* Left — 6K */}
      <div className="flex-1 flex flex-col items-center justify-center gap-1.5">
        <span
          className="font-black tracking-[-0.06em] leading-none text-white"
          style={{ fontSize: 'clamp(24px, 4.8vw, 66px)' }}
        >
          6K
        </span>
        <span
          className="font-normal uppercase text-white/40"
          style={{ fontSize: 'clamp(5px, 0.72vw, 9px)', letterSpacing: '0.14em' }}
        >
          6144 × 3456
        </span>
      </div>

      {/* Centre rule */}
      <div
        className="self-stretch my-[20%]"
        style={{ width: 1, background: 'rgba(255,255,255,0.1)' }}
      />

      {/* Right — 32" */}
      <div className="flex-1 flex flex-col items-center justify-center gap-1.5">
        <span
          className="font-black tracking-[-0.06em] leading-none text-white"
          style={{ fontSize: 'clamp(24px, 4.8vw, 66px)' }}
        >
          32<span style={{ fontSize: '0.52em', verticalAlign: 'super', lineHeight: 1 }}>"</span>
        </span>
        <span
          className="font-normal uppercase text-white/40"
          style={{ fontSize: 'clamp(5px, 0.72vw, 9px)', letterSpacing: '0.14em' }}
        >
          Inches
        </span>
      </div>

    </div>
  );
}

/* ── Front face ─────────────────────────────────────────────── */
function MonitorFront() {
  return (
    <div
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'translateZ(9px)',
      }}
    >
      <div
        className="relative rounded-[10px] overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #e8e8ea 0%, #d0d0d4 100%)',
          border: '1px solid rgba(0,0,0,0.1)',
          padding: '9px 9px 10px',
          boxShadow: '0 40px 120px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.7)',
        }}
      >
        {/* Screen */}
        <div
          className="relative overflow-hidden bg-[#04040A]"
          style={{ borderRadius: 4, aspectRatio: '16/10' }}
        >
          {/* Aurora glow behind the stats */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 55% 55% at 25% 60%, rgba(124,92,252,0.38) 0%, transparent 55%), ' +
                'radial-gradient(ellipse 50% 50% at 75% 40%, rgba(196,75,247,0.26) 0%, transparent 55%)',
            }}
          />
          {/* Subtle scan lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
            }}
          />
          <ScreenContent />
        </div>

        {/* Camera dot */}
        <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-zinc-400/60" />
        {/* Bezel shimmer */}
        <div className="shimmer-sweep absolute inset-0 pointer-events-none rounded-[10px]" />
      </div>
    </div>
  );
}

/* ── Back face: Full Aluminium with cheese-grater vents ─────── */
function MonitorBack() {
  return (
    <div
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'rotateY(180deg) translateZ(9px)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <div
        className="relative rounded-[10px] overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #ededf0 0%, #d8d9dc 40%, #cccdd0 75%, #d4d5d8 100%)',
          border: '1px solid rgba(0,0,0,0.1)',
          padding: '9px 9px 10px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.05), 0 0 0 1px rgba(255,255,255,0.7)',
        }}
      >
        {/* Back chassis area */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 4,
            aspectRatio: '16/10',
            background: 'linear-gradient(165deg, #e4e5e8 0%, #ceced2 50%, #c4c5c8 100%)',
          }}
        >
          {/* Top vent band — hex-packed cheese grater */}
          <svg
            className="absolute top-0 left-0 right-0 pointer-events-none"
            width="100%"
            style={{ height: '33.33%' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="hero-back-vents-top" width="14" height="24" patternUnits="userSpaceOnUse">
                <circle cx="7"  cy="6"  r="3.2" fill="rgba(0,0,0,0.6)" />
                <circle cx="0"  cy="18" r="3.2" fill="rgba(0,0,0,0.6)" />
                <circle cx="14" cy="18" r="3.2" fill="rgba(0,0,0,0.6)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-back-vents-top)" />
          </svg>

          {/* Bottom vent band — hex-packed cheese grater */}
          <svg
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            width="100%"
            style={{ height: '33.33%' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="hero-back-vents-bot" width="14" height="24" patternUnits="userSpaceOnUse">
                <circle cx="7"  cy="6"  r="3.2" fill="rgba(0,0,0,0.6)" />
                <circle cx="0"  cy="18" r="3.2" fill="rgba(0,0,0,0.6)" />
                <circle cx="14" cy="18" r="3.2" fill="rgba(0,0,0,0.6)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-back-vents-bot)" />
          </svg>

          {/* MEIRRO wordmark — left of centre */}
          <p
            className="absolute font-bold uppercase"
            style={{
              top: '50%',
              left: '8%',
              transform: 'translateY(-50%)',
              fontSize: 'clamp(8px, 1.3vw, 18px)',
              letterSpacing: '0.18em',
              color: 'rgba(0,0,0,0.7)',
            }}
          >
            Meirro
          </p>

          {/* Port row — right of centre */}
          <div
            className="absolute flex items-center"
            style={{
              top: '50%',
              right: '8%',
              transform: 'translateY(-50%)',
              gap: 'clamp(3px, 0.55vw, 7px)',
            }}
          >
            {/* Lightning bolt — power input indicator */}
            <svg
              viewBox="0 0 9 12"
              style={{
                width:  'clamp(6px, 0.85vw, 10px)',
                height: 'clamp(8px, 1.15vw, 14px)',
                marginRight: 'clamp(1px, 0.25vw, 4px)',
              }}
            >
              <path
                d="M5.4 0.3 L0.7 6.4 H3.2 L2.4 11.4 L8 4.6 H5.2 L6 0.3 Z"
                fill="rgba(0,0,0,0.55)"
              />
            </svg>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  width:  'clamp(8px, 1.3vw, 17px)',
                  height: 'clamp(3px, 0.5vw,  6px)',
                  borderRadius: 2,
                  background: 'rgba(0,0,0,0.55)',
                  border: '1px solid rgba(0,0,0,0.2)',
                }}
              />
            ))}
          </div>

          {/* Bezel shimmer on back too */}
          <div className="shimmer-sweep absolute inset-0 pointer-events-none" />
        </div>

        {/* Top machining mark */}
        <div
          className="absolute top-[5px] left-1/2 -translate-x-1/2"
          style={{ width: '28%', height: 2, background: 'rgba(0,0,0,0.07)', borderRadius: 1 }}
        />
      </div>
    </div>
  );
}

/* ── Edge panels — give the screen body visible thickness ───── */
function MonitorEdges() {
  const sideGradient =
    'linear-gradient(180deg, #dadbde 0%, #c4c5c9 50%, #b6b7bb 100%)';
  const topBottomGradient =
    'linear-gradient(90deg, #dadbde 0%, #c4c5c9 50%, #b6b7bb 100%)';
  return (
    <>
      {/* Right edge — rotateY(-90deg) so its outward normal is +x */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: '-9px',
          width: '18px',
          height: '100%',
          background: sideGradient,
          transform: 'rotateY(-90deg)',
          pointerEvents: 'none',
        }}
      />
      {/* Left edge — rotateY(+90deg) so its outward normal is -x */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-9px',
          width: '18px',
          height: '100%',
          background: sideGradient,
          transform: 'rotateY(90deg)',
          pointerEvents: 'none',
        }}
      />
      {/* Top edge — rotateX(+90deg) so its outward normal is -y */}
      <div
        style={{
          position: 'absolute',
          top: '-9px',
          left: 0,
          width: '100%',
          height: '18px',
          background: topBottomGradient,
          transform: 'rotateX(90deg)',
          pointerEvents: 'none',
        }}
      />
      {/* Bottom edge — rotateX(-90deg) so its outward normal is +y */}
      <div
        style={{
          position: 'absolute',
          bottom: '-9px',
          left: 0,
          width: '100%',
          height: '18px',
          background: topBottomGradient,
          transform: 'rotateX(-90deg)',
          pointerEvents: 'none',
        }}
      />
    </>
  );
}

/* ── Flip container ─────────────────────────────────────────── */
function MonitorShape({ rotateY, scale, glowOpacity }) {
  return (
    <motion.div
      className="relative mx-auto select-none"
      style={{ width: 'clamp(280px, 55vw, 680px)', perspective: 1200 }}
    >
      <motion.div
        style={{ scale, transformOrigin: 'top center', willChange: 'transform' }}
      >
        <motion.div
          style={{ rotateY, transformStyle: 'preserve-3d', position: 'relative', willChange: 'transform' }}
        >
          {/* Case 3D box — width × case-height. Stand sits below it. */}
          <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
            <MonitorFront />
            <MonitorBack />
            <MonitorEdges />
          </div>
          {/* Stand — rotates with the flip */}
          <Stand />
        </motion.div>
      </motion.div>

      {/* Ambient glow — outside the flip, fades with the section bloom */}
      <motion.div
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '70%',
          height: 80,
          background: 'radial-gradient(ellipse, rgba(124,92,252,0.18) 0%, transparent 70%)',
          filter: 'blur(20px)',
          opacity: glowOpacity,
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

  // Full 180° flip across the middle of the scroll
  const rotateY      = useTransform(scrollYProgress, [0.12, 0.72], [0, 180]);
  // Gentle grow during intro, hold through the flip, then a small shrink on
  // the back-face hold so the stand has clearance on shorter viewports.
  const scale        = useTransform(
    scrollYProgress,
    [0, 0.5, 0.72, 0.86],
    [0.88, 1.0, 1.0, 0.84],
  );

  // Front title fades out as the flip begins
  const titleOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const titleY       = useTransform(scrollYProgress, [0, 0.22], [0, -28]);

  // After the back face has been on screen long enough to read, glide the
  // whole monitor up and fade it out so the next section flows in without
  // a dead grey gap.
  const monitorY       = useTransform(scrollYProgress, [0.78, 1.0], ['0vh', '-18vh']);
  const monitorOpacity = useTransform(scrollYProgress, [0.85, 0.98], [1, 0]);

  // Violet/grey ambient bloom fades out by the time the flip lands on the
  // back face — so the seam into the next white section reads as seamless.
  const bloomOpacity   = useTransform(scrollYProgress, [0.45, 0.72], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="display"
      className="relative"
      style={{ height: '320vh' }}
      aria-label="Meirro Pro — 32-inch 6K monitor"
    >
      <div className="sticky top-0 h-screen overflow-hidden relative bg-[#F7F7F9]">

        {/* Ambient violet bloom — fades out before the back face arrives so
            the seam into the next white section stays seamless. */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: bloomOpacity,
            background:
              'radial-gradient(ellipse 70% 60% at 20% 40%, rgba(124,92,252,0.06) 0%, transparent 55%), ' +
              'radial-gradient(ellipse 60% 50% at 80% 60%, rgba(196,75,247,0.04) 0%, transparent 55%)',
          }}
        />

        {/* Front title — fades out as flip begins */}
        <motion.div
          className="absolute top-[10%] md:top-[5%] left-0 right-0 text-center z-10 px-6 pointer-events-none"
          style={{ opacity: titleOpacity, y: titleY }}
        >
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
        </motion.div>

        {/* Monitor — absolutely positioned so it never overlaps the title */}
        <motion.div
          className="absolute top-[36%] w-full px-6 z-10"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div style={{ y: monitorY, opacity: monitorOpacity, willChange: 'transform, opacity' }}>
            <MonitorShape rotateY={rotateY} scale={scale} glowOpacity={bloomOpacity} />
          </motion.div>
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
