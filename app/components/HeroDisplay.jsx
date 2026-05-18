'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

/* Hero — Apple Studio Display–style product showcase.
   A single high-quality render of the monitor sits centred in the
   viewport. On landing it fades in and scales up; on scroll it
   parallaxes upward, slightly shrinks, and fades — giving it the
   feeling of a "live" piece of hardware rather than a flat picture.
   A subtle radial pulse over the screen area adds the "the display
   is on" cue. */

export default function HeroDisplay() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Scroll-driven motion for the whole monitor block
  const monitorY       = useTransform(scrollYProgress, [0, 1],      ['0px', '-130px']);
  const monitorScale   = useTransform(scrollYProgress, [0, 1],      [1, 0.93]);
  const monitorOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.35]);

  // Title slides up and fades faster than the monitor
  const titleY       = useTransform(scrollYProgress, [0, 0.35], ['0px', '-90px']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3],  [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="display"
      className="relative bg-[#F7F7F9] min-h-screen overflow-hidden flex flex-col items-center"
      aria-label="Meirro Pro — 32-inch 6K monitor"
    >
      {/* Ambient violet bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(124,92,252,0.05) 0%, transparent 55%), ' +
            'radial-gradient(ellipse 60% 50% at 80% 70%, rgba(196,75,247,0.04) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />

      {/* Title — fades and lifts on scroll */}
      <motion.div
        className="relative text-center px-6 z-10 pointer-events-none"
        style={{
          paddingTop: 'clamp(40px, 7vh, 90px)',
          y: titleY,
          opacity: titleOpacity,
          willChange: 'transform, opacity',
        }}
      >
        <motion.h1
          className="font-black tracking-[-0.06em] leading-[0.92] text-[#0A0A0C]"
          style={{ fontSize: 'clamp(48px, 8vw, 110px)' }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Meirro Pro.
        </motion.h1>
        <motion.p
          className="mt-4 text-[#0A0A0C]/75 font-normal tracking-[-0.01em]"
          style={{ fontSize: 'clamp(14px, 1.6vw, 18px)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Precision for professionals.
        </motion.p>
      </motion.div>

      {/* Monitor — landing scale-in + scroll parallax */}
      <motion.div
        className="relative flex-1 w-full max-w-[1500px] mx-auto px-6 md:px-10 py-6 md:py-10 flex items-center justify-center z-10"
        style={{
          y: monitorY,
          scale: monitorScale,
          opacity: monitorOpacity,
          willChange: 'transform, opacity',
        }}
      >
        <motion.div
          className="relative w-full"
          style={{ aspectRatio: '3 / 2' }}
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* The render itself */}
          <Image
            src="/gallery/front-base.png"
            alt="Meirro Pro — 32-inch 6K monitor showing alpine ridge climbing"
            fill
            sizes="(max-width: 768px) 100vw, 1500px"
            priority
            style={{ objectFit: 'contain' }}
            draggable={false}
          />

          {/* Subtle screen-glow pulse over the upper portion of the image
              (where the display sits in the render). Read as "the screen
              is on" without trying to nail the exact bezel coordinates. */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: '4%',
              left: '12%',
              right: '12%',
              height: '55%',
              background:
                'radial-gradient(ellipse at center, rgba(124,92,252,0.18) 0%, rgba(196,75,247,0.08) 45%, transparent 75%)',
              filter: 'blur(28px)',
              mixBlendMode: 'screen',
            }}
            animate={{ opacity: [0.45, 0.85, 0.45] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            aria-hidden="true"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
