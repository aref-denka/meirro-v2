'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ── Stand — flat aluminium plate with a real cable cutout, on a wide base.
   Each face is an inline SVG using fill-rule="evenodd" so the cable hole
   is a genuine geometric cutout (CSS mask-image proved unreliable). Plate
   thickness PLATE_T and base depth BASE_T are tuned to match the side
   view in the reference renders: plate is thin (a slab), base is deeper
   (a heavier footprint).
   translateZ(-10px) on the outer container keeps the stand just behind
   the monitor's back face in 3D space. */

// Path for a plate face:
//   Outer outline: rounded rectangle, radius 11 at top, radius 3 at bottom.
//   Inner cutout: rounded rectangle, radius 9, sized 52×50 sitting at y 175–225.
// Two subpaths + fillRule="evenodd" → fill between them, hole inside.
// viewBox 100×260 matches the plate's 11.5vw × 30vw aspect ratio.
const PLATE_PATH =
  'M 12 1 L 88 1 A 11 11 0 0 1 99 12 L 99 257 A 3 3 0 0 1 96 260 L 4 260 ' +
  'A 3 3 0 0 1 1 257 L 1 12 A 11 11 0 0 1 12 1 Z ' +
  'M 33 175 L 67 175 A 9 9 0 0 1 76 184 L 76 216 A 9 9 0 0 1 67 225 L 33 225 ' +
  'A 9 9 0 0 1 24 216 L 24 184 A 9 9 0 0 1 33 175 Z';

const PLATE_T = 15;             // plate thickness (px) — rectangular column in side view
const BASE_T  = 100;            // base depth (px) — long horizontal footprint in side view

const plateEdgeBgY = 'linear-gradient(180deg, #d4d5d8 0%, #b8b9bc 50%, #a4a5a8 100%)';
const plateEdgeBgX = 'linear-gradient(90deg, #d4d5d8 0%, #b8b9bc 50%, #a4a5a8 100%)';

const baseFaceBg = 'linear-gradient(180deg, #ebecef 0%, #c8c9cc 55%, #b0b1b4 100%)';
const baseEdgeBg = 'linear-gradient(180deg, #d4d5d8 0%, #b4b5b8 100%)';
const baseTopBg  = 'linear-gradient(90deg, #dadbde 0%, #c4c5c8 50%, #b2b3b6 100%)';

function PlateFaceSVG({ gradientId }) {
  return (
    <svg
      viewBox="0 0 100 260"
      preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3f4f6" />
          <stop offset="45%" stopColor="#e6e7ea" />
          <stop offset="100%" stopColor="#d4d5d8" />
        </linearGradient>
        <linearGradient id={`${gradientId}-sheen`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="14%" stopColor="rgba(255,255,255,0)" />
          <stop offset="86%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
        </linearGradient>
      </defs>
      <path
        d={PLATE_PATH}
        fillRule="evenodd"
        fill={`url(#${gradientId})`}
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="0.7"
      />
      <path
        d={PLATE_PATH}
        fillRule="evenodd"
        fill={`url(#${gradientId}-sheen)`}
      />
    </svg>
  );
}

function Stand() {
  return (
    <div
      className="relative mx-auto flex flex-col items-center"
      style={{
        width: '60%',
        marginTop: 'calc(-1 * clamp(90px, 17vw, 210px))',
        transform: 'translateZ(-35px)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Plate — 3D box with a real see-through cutout on both faces */}
      <div
        className="relative"
        style={{
          width: 'clamp(58px, 11.5vw, 135px)',
          height: 'clamp(180px, 30vw, 360px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front face */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translateZ(${PLATE_T / 2}px)`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <PlateFaceSVG gradientId="plateGradF" />
        </div>

        {/* Back face — mirrored */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `rotateY(180deg) translateZ(${PLATE_T / 2}px)`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <PlateFaceSVG gradientId="plateGradB" />
        </div>

        {/* Right edge */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: `-${PLATE_T / 2}px`,
            width: `${PLATE_T}px`,
            height: '100%',
            background: plateEdgeBgY,
            transform: 'rotateY(-90deg)',
            pointerEvents: 'none',
          }}
        />
        {/* Left edge */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: `-${PLATE_T / 2}px`,
            width: `${PLATE_T}px`,
            height: '100%',
            background: plateEdgeBgY,
            transform: 'rotateY(90deg)',
            pointerEvents: 'none',
          }}
        />
        {/* Top edge */}
        <div
          style={{
            position: 'absolute',
            top: `-${PLATE_T / 2}px`,
            left: 0,
            width: '100%',
            height: `${PLATE_T}px`,
            background: plateEdgeBgX,
            transform: 'rotateX(90deg)',
            pointerEvents: 'none',
          }}
        />
        {/* Bottom edge */}
        <div
          style={{
            position: 'absolute',
            bottom: `-${PLATE_T / 2}px`,
            left: 0,
            width: '100%',
            height: `${PLATE_T}px`,
            background: plateEdgeBgX,
            transform: 'rotateX(-90deg)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Base — 3D slab, wider than the plate and noticeably deeper */}
      <div
        className="relative"
        style={{
          width: 'clamp(115px, 20vw, 240px)',
          height: 'clamp(7px, 1vw, 12px)',
          transformStyle: 'preserve-3d',
          marginTop: -1,
        }}
      >
        {/* Front face */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: baseFaceBg,
            borderRadius: '2px 2px 7px 7px',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow:
              '0 8px 28px rgba(0,0,0,0.16), ' +
              'inset 0 1px 0 rgba(255,255,255,0.95), ' +
              'inset 0 -1px 0 rgba(0,0,0,0.1)',
            transform: `translateZ(${BASE_T / 2}px)`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        />
        {/* Back face */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: baseFaceBg,
            borderRadius: '2px 2px 7px 7px',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)',
            transform: `rotateY(180deg) translateZ(${BASE_T / 2}px)`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        />
        {/* Top face */}
        <div
          style={{
            position: 'absolute',
            top: `-${BASE_T / 2}px`,
            left: 0,
            width: '100%',
            height: `${BASE_T}px`,
            background: baseTopBg,
            transform: 'rotateX(90deg)',
            pointerEvents: 'none',
          }}
        />
        {/* Right edge */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: `-${BASE_T / 2}px`,
            width: `${BASE_T}px`,
            height: '100%',
            background: baseEdgeBg,
            transform: 'rotateY(-90deg)',
            pointerEvents: 'none',
          }}
        />
        {/* Left edge */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: `-${BASE_T / 2}px`,
            width: `${BASE_T}px`,
            height: '100%',
            background: baseEdgeBg,
            transform: 'rotateY(90deg)',
            pointerEvents: 'none',
          }}
        />
      </div>
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
          background: 'linear-gradient(160deg, #efeff2 0%, #d4d5d8 100%)',
          border: '1px solid rgba(0,0,0,0.1)',
          padding: 'clamp(2px, 0.45vw, 5px)',
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
          background: 'linear-gradient(160deg, #f3f4f6 0%, #e0e1e4 40%, #d4d5d8 75%, #dadbde 100%)',
          border: '1px solid rgba(0,0,0,0.1)',
          padding: 'clamp(2px, 0.45vw, 5px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.05), 0 0 0 1px rgba(255,255,255,0.7)',
        }}
      >
        {/* Back chassis area */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 4,
            aspectRatio: '16/10',
            background: 'linear-gradient(165deg, #ebecef 0%, #d4d5d8 50%, #cccdd0 100%)',
          }}
        >
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

          {/* Apple-style IEC C5 / 三孔梅花 plum-blossom AC inlet
              — three overlapping circular lobes with round pin holes,
              the shape Apple uses on the MacBook power-brick socket. */}
          <svg
            viewBox="0 0 22 20"
            className="absolute"
            style={{
              top: '50%',
              left: '26%',
              transform: 'translateY(-50%)',
              width: 'clamp(11px, 1.9vw, 21px)',
              height: 'clamp(10px, 1.7vw, 19px)',
              overflow: 'visible',
            }}
          >
            {/* Three overlapping lobes form the cloverleaf recess */}
            <circle cx="7"  cy="6.5"  r="4.5" fill="rgba(20,20,22,0.92)" />
            <circle cx="15" cy="6.5"  r="4.5" fill="rgba(20,20,22,0.92)" />
            <circle cx="11" cy="13.5" r="4.5" fill="rgba(20,20,22,0.92)" />
            {/* Round pin holes — live, neutral, earth */}
            <circle cx="7"  cy="6.5"  r="1.1" fill="rgba(0,0,0,0.98)" />
            <circle cx="15" cy="6.5"  r="1.1" fill="rgba(0,0,0,0.98)" />
            <circle cx="11" cy="13.5" r="1.1" fill="rgba(0,0,0,0.98)" />
          </svg>

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

      </div>
    </div>
  );
}

/* ── Edge panels — give the screen body visible thickness ───── */
function MonitorEdges() {
  const sideGradient =
    'linear-gradient(180deg, #e2e3e6 0%, #c8c9cc 50%, #b8b9bc 100%)';
  const topBottomGradient =
    'linear-gradient(90deg, #e2e3e6 0%, #c8c9cc 50%, #b8b9bc 100%)';
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

/* ── Hinge — circular pivot bridging the case back to the stand plate.
   Rendered as a flat disc with its face along the +X axis (rotateY(90)
   internally), so it appears as a full circle only at the side view
   during the flip — fills the visible z-gap between case back and
   plate front. */
function MonitorHinge() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width:  'clamp(18px, 2.8vw, 30px)',
        height: 'clamp(18px, 2.8vw, 30px)',
        borderRadius: '50%',
        background:
          'radial-gradient(circle at 35% 35%, #ebecef 0%, #c8c9cc 55%, #a4a5a8 100%)',
        border: '1px solid rgba(0,0,0,0.16)',
        boxShadow:
          'inset -2px -2px 4px rgba(0,0,0,0.12), ' +
          'inset 2px 2px 4px rgba(255,255,255,0.5)',
        transform: 'translate(-50%, -50%) translateZ(-18px) rotateY(90deg)',
        pointerEvents: 'none',
      }}
    />
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
            <MonitorHinge />
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
