'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

/* Hero — scroll-driven 3D card flip.
   Two stacked <Image> faces (front and back) share a card; the card's
   rotateY is bound to scrollYProgress, so as the user scrolls the
   sticky-pinned section the card rotates from 0° (front) to 180°
   (back). `backface-visibility: hidden` on each face hides the
   away-facing side so only one image is ever visible. */

export default function HeroFlip() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Card flip: 0° (front) → 180° (back) over the middle of the scroll
  const rotateY = useTransform(scrollYProgress, [0.15, 0.72], [0, 180]);

  // Subtle breathing scale during the flip
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.9], [0.94, 1, 0.96]);

  // Title fades out as the flip begins
  const titleOpacity = useTransform(scrollYProgress, [0, 0.20], [1, 0]);
  const titleY       = useTransform(scrollYProgress, [0, 0.20], [0, -28]);

  // Card slides up + fades at the end of the section
  const cardY       = useTransform(scrollYProgress, [0.88, 1.0], ['0vh', '-14vh']);
  const cardOpacity = useTransform(scrollYProgress, [0.92, 1.0], [1, 0]);

  // Ambient bloom fades out around the time the back face arrives
  const bloomOpacity = useTransform(scrollYProgress, [0.50, 0.75], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="display"
      className="relative"
      style={{ height: '280vh' }}
      aria-label="Meirro Pro — 32-inch 6K monitor"
    >
      <div className="sticky top-0 h-screen overflow-hidden relative bg-[#F7F7F9]">

        {/* Ambient bloom */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: bloomOpacity,
            background:
              'radial-gradient(ellipse 70% 60% at 20% 40%, rgba(124,92,252,0.06) 0%, transparent 55%), ' +
              'radial-gradient(ellipse 60% 50% at 80% 60%, rgba(196,75,247,0.04) 0%, transparent 55%)',
          }}
        />

        {/* Title — fades out as flip begins */}
        <motion.div
          className="absolute top-[10%] md:top-[5%] left-0 right-0 text-center z-20 px-6 pointer-events-none"
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

        {/* Flip card — perspective parent, then rotating inner */}
        <motion.div
          className="absolute top-[22%] left-0 right-0 flex items-center justify-center z-10 px-6"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '70%' }}
        >
          <motion.div
            className="relative w-full h-full"
            style={{
              maxWidth: 'min(880px, 92vw)',
              perspective: 1800,
              y: cardY,
              opacity: cardOpacity,
              willChange: 'transform, opacity',
            }}
          >
            <motion.div
              className="relative w-full h-full"
              style={{
                rotateY,
                scale,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              {/* Front face — front of the monitor */}
              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <Image
                  src="/hero/front.png"
                  alt="Meirro Pro — front view"
                  fill
                  sizes="(max-width: 768px) 92vw, 880px"
                  priority
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                  draggable={false}
                />
              </div>

              {/* Back face — pre-rotated 180° so it reads forward when the
                  card lands at the end of the flip */}
              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <Image
                  src="/hero/back.png"
                  alt="Meirro Pro — back view"
                  fill
                  sizes="(max-width: 768px) 92vw, 880px"
                  priority
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                  draggable={false}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
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
