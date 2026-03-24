'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ── Stand — shared between front and back ─────────────────── */
function Stand() {
  return (
    <>
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
    </>
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
          6016 × 3384
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
    <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
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
      <Stand />
    </div>
  );
}

/* ── Back face: Full Aluminium ──────────────────────────────── */
function MonitorBack() {
  return (
    <div
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <div
        className="relative rounded-[10px] overflow-hidden"
        style={{
          background: 'linear-gradient(155deg, #e4e4e8 0%, #d2d2d6 35%, #c8c8cc 70%, #d0d0d4 100%)',
          border: '1px solid rgba(0,0,0,0.1)',
          padding: '9px 9px 10px',
          boxShadow: '0 40px 120px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.7)',
        }}
      >
        {/* Back panel */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 4,
            aspectRatio: '16/10',
            background: 'linear-gradient(155deg, #dcdce0 0%, #c8c8cc 50%, #c4c4c8 100%)',
          }}
        >
          {/* Brushed-metal horizontal lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'repeating-linear-gradient(0deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 1px, transparent 1px, transparent 4px)',
            }}
          />

          {/* Vertical highlight streaks */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: '28%', width: '3%',
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.48), transparent)',
            }}
          />
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: '63%', width: '1.5%',
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)',
            }}
          />

          {/* Centre branding block — wordmark + ports only */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ gap: 'clamp(6px, 0.9vw, 12px)' }}
          >
            {/* Wordmark */}
            <p
              className="font-semibold uppercase"
              style={{
                fontSize: 'clamp(6px, 0.85vw, 11px)',
                letterSpacing: '0.3em',
                color: 'rgba(0,0,0,0.22)',
              }}
            >
              Meirro
            </p>

            {/* Port row */}
            <div
              className="flex items-center"
              style={{ gap: 'clamp(3px, 0.45vw, 6px)' }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 'clamp(9px, 1.5vw, 18px)',
                    height: 'clamp(5px, 0.85vw, 10px)',
                    borderRadius: 2,
                    background: 'rgba(0,0,0,0.13)',
                    border: '1px solid rgba(0,0,0,0.08)',
                  }}
                />
              ))}
            </div>
            <p
              className="font-medium uppercase"
              style={{
                fontSize: 'clamp(4px, 0.52vw, 6px)',
                letterSpacing: '0.15em',
                color: 'rgba(0,0,0,0.18)',
              }}
            >
              Thunderbolt 5 × 3
            </p>
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
      <Stand />
    </div>
  );
}

/* ── Flip container ─────────────────────────────────────────── */
function MonitorShape({ rotateY, scale }) {
  return (
    <motion.div
      className="relative mx-auto select-none"
      style={{ width: 'clamp(280px, 55vw, 680px)', perspective: 1200 }}
    >
      <motion.div
        style={{ rotateY, scale, transformStyle: 'preserve-3d', position: 'relative' }}
      >
        <MonitorFront />
        <MonitorBack />
      </motion.div>

      {/* Ambient glow — outside the flip, stays still */}
      <div
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '70%',
          height: 80,
          background: 'radial-gradient(ellipse, rgba(124,92,252,0.18) 0%, transparent 70%)',
          filter: 'blur(20px)',
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

  // Full 180° flip over the middle portion of the scroll
  const rotateY      = useTransform(scrollYProgress, [0.08, 0.72], [0, 180]);
  const scale        = useTransform(scrollYProgress, [0, 0.5],      [0.88, 1.0]);

  // Front title fades out as the flip begins
  const titleOpacity = useTransform(scrollYProgress, [0, 0.18],     [1, 0]);
  const titleY       = useTransform(scrollYProgress, [0, 0.18],     [0, -28]);

  // "Full Aluminium" label fades in once the back is fully revealed
  const backTextOp   = useTransform(scrollYProgress, [0.68, 0.88],  [0, 1]);
  const backTextY    = useTransform(scrollYProgress, [0.68, 0.88],  [24, 0]);

  return (
    <section
      ref={containerRef}
      id="display"
      className="relative"
      style={{ height: '280vh' }}
      aria-label="Meirro Pro — 32-inch 6K Retina monitor"
    >
      <div className="sticky top-0 h-screen overflow-hidden relative bg-[#F7F7F9]">

        {/* Ambient violet bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 20% 40%, rgba(124,92,252,0.06) 0%, transparent 55%), ' +
              'radial-gradient(ellipse 60% 50% at 80% 60%, rgba(196,75,247,0.04) 0%, transparent 55%)',
          }}
        />

        {/* Front title — fades out as flip begins */}
        <motion.div
          className="absolute top-[5%] left-0 right-0 text-center z-10 px-6 pointer-events-none"
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
            32 inches · 6K Retina
          </motion.p>
        </motion.div>

        {/* Monitor — absolutely positioned so it never overlaps the title */}
        <motion.div
          className="absolute top-[33%] w-full px-6 z-10"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <MonitorShape rotateY={rotateY} scale={scale} />
        </motion.div>

        {/* Back label — "Full Aluminium." appears after flip */}
        <motion.div
          className="absolute bottom-[12%] left-0 right-0 text-center z-10 px-6 pointer-events-none"
          style={{ opacity: backTextOp, y: backTextY }}
        >
          <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#0A0A0C]/45 mb-3">
            The Case
          </p>
          <p
            className="font-black tracking-[-0.05em] leading-none text-[#0A0A0C]"
            style={{ fontSize: 'clamp(28px, 4vw, 54px)' }}
          >
            Full Aluminium.
          </p>
          <p
            className="mt-2 text-[#0A0A0C]/55 font-normal"
            style={{ fontSize: 'clamp(13px, 1.4vw, 17px)' }}
          >
            CNC-machined 6061-T6 · Aerospace grade · Every surface.
          </p>
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
