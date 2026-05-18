'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

/* Hero — title intro → zoom-out reveal.
   Lands on the "Meirro Pro." title (with scroll hint), like the
   original hero. A small scroll fades the title out and brings up
   the climber render zoomed-in 3×. Continued scrolling pulls the
   render down to 1× so the full monitor and stand come into view. */

export default function HeroZoom() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Title — visible at start, fades out as the zoomed image arrives.
  const titleOpacity = useTransform(scrollYProgress, [0, 0.10, 0.16], [1, 1, 0]);
  const titleY       = useTransform(scrollYProgress, [0, 0.16],        ['0px', '-32px']);

  // Image — fades in just as the title fades out, then scales 3 → 1
  // over the bulk of the scroll, then holds at 1 to the end.
  const imageOpacity = useTransform(scrollYProgress, [0.10, 0.18], [0, 1]);
  const imageScale   = useTransform(scrollYProgress, [0.18, 0.85, 1], [3, 1, 1]);

  // "6K · 32"" stats overlay — fades in with the zoomed image, holds
  // through the bulk of the zoom-out, then fades out before the final
  // caption arrives.
  const specsOpacity = useTransform(
    scrollYProgress,
    [0.12, 0.20, 0.65, 0.76],
    [0, 1, 1, 0]
  );
  const specsY = useTransform(scrollYProgress, [0.12, 0.20], [16, 0]);


  return (
    <section
      ref={sectionRef}
      id="display"
      className="relative"
      style={{ height: '380vh' }}
      aria-label="Meirro Pro — 32-inch 6K monitor"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#F7F7F9] relative">

        {/* Title intro — Meirro Pro. / tagline / scroll hint.
            Fades out as the user starts scrolling. */}
        <motion.div
          className="absolute inset-0 z-20 px-6 flex flex-col items-center justify-center text-center pointer-events-none"
          style={{ opacity: titleOpacity, y: titleY, willChange: 'transform, opacity' }}
        >
          <motion.h1
            className="font-black tracking-[-0.06em] leading-[0.92] text-[#0A0A0C]"
            style={{ fontSize: 'clamp(56px, 10vw, 140px)' }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Meirro Pro.
          </motion.h1>
          <motion.p
            className="mt-5 text-[#0A0A0C]/75 font-normal tracking-[-0.01em]"
            style={{ fontSize: 'clamp(14px, 1.7vw, 19px)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Precision for professionals.
          </motion.p>

          {/* Scroll hint pinned to the bottom of the intro screen */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
        </motion.div>

        {/* The scaling render — anchored on the screen-area of the
            monitor render (≈ 50% / 30% of the image) so the bezels
            and stand grow inward into view as scale decreases. */}
        <motion.div
          className="absolute inset-0"
          style={{
            scale: imageScale,
            opacity: imageOpacity,
            transformOrigin: '50% 30%',
            willChange: 'transform, opacity',
          }}
        >
          <Image
            src="/gallery/front-base.png"
            alt="Meirro Pro — 32-inch 6K monitor displaying alpine ridge climbing"
            fill
            sizes="100vw"
            priority
            style={{ objectFit: 'contain' }}
            draggable={false}
          />
        </motion.div>

        {/* 6K · 32" stats overlay — visible while the image is zoomed in */}
        <motion.div
          className="absolute inset-0 z-20 px-6 flex items-center justify-center pointer-events-none"
          style={{ opacity: specsOpacity, y: specsY, willChange: 'transform, opacity' }}
        >
          <div
            className="flex items-stretch text-white text-center"
            style={{
              gap: 'clamp(28px, 5vw, 80px)',
              filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.45))',
            }}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <span
                className="font-black tracking-[-0.05em] leading-[0.9]"
                style={{ fontSize: 'clamp(72px, 12vw, 180px)' }}
              >
                6K
              </span>
              <span
                className="font-normal uppercase text-white/65"
                style={{ fontSize: 'clamp(10px, 0.9vw, 13px)', letterSpacing: '0.18em' }}
              >
                6144 × 3456
              </span>
            </div>

            <div
              className="self-stretch my-[8%]"
              style={{ width: 1, background: 'rgba(255,255,255,0.25)' }}
              aria-hidden="true"
            />

            <div className="flex flex-col items-center justify-center gap-2">
              <span
                className="font-black tracking-[-0.05em] leading-[0.9]"
                style={{ fontSize: 'clamp(72px, 12vw, 180px)' }}
              >
                32<span style={{ fontSize: '0.55em', verticalAlign: 'super', lineHeight: 1 }}>"</span>
              </span>
              <span
                className="font-normal uppercase text-white/65"
                style={{ fontSize: 'clamp(10px, 0.9vw, 13px)', letterSpacing: '0.18em' }}
              >
                Inches
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
