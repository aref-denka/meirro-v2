'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

/* Hero — simple side-by-side product reveal with gentle scroll motion.
   Left  : front view of the monitor (screen content visible).
   Right : back view (transparent-bg render).
   As the user scrolls past the section the title fades and lifts while
   the image pair parallaxes upward with a slight scale-down — just
   enough motion to feel alive without competing with the rest of the
   page. */

export default function HeroSplit() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Scroll-driven motion — visible but not overpowering.
  // Title runs its animation in the first third of scroll (it leaves
  // the viewport quickly), the images run over a wider range since
  // they're centred and stay visible longer.
  const titleY       = useTransform(scrollYProgress, [0, 0.35], ['0px', '-120px']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.30], [1, 0]);

  const imagesY       = useTransform(scrollYProgress, [0, 0.85], ['0px', '-160px']);
  const imagesScale   = useTransform(scrollYProgress, [0, 0.85], [1, 0.90]);
  const imagesOpacity = useTransform(scrollYProgress, [0.5, 1],  [1, 0.35]);

  return (
    <section
      ref={sectionRef}
      id="display"
      className="relative bg-[#F7F7F9] min-h-screen overflow-hidden flex flex-col"
      aria-label="Meirro Pro — 32-inch 6K monitor"
    >
      {/* Ambient violet bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 20% 40%, rgba(124,92,252,0.05) 0%, transparent 55%), ' +
            'radial-gradient(ellipse 60% 50% at 80% 60%, rgba(196,75,247,0.04) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />

      {/* Title — lifts and fades as the hero scrolls away */}
      <motion.div
        className="relative text-center px-6 z-10 pointer-events-none"
        style={{
          paddingTop: 'clamp(48px, 7vh, 90px)',
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

      {/* Images — gentle parallax + slight zoom-out as the hero leaves */}
      <motion.div
        className="relative flex-1 w-full max-w-[1800px] mx-auto px-6 md:px-10 py-8 md:py-12 flex items-center z-10"
        style={{
          y: imagesY,
          scale: imagesScale,
          opacity: imagesOpacity,
          willChange: 'transform, opacity',
        }}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-full aspect-[3/2]">
            <Image
              src="/hero/front-climber.png"
              alt="Meirro Pro — front view showing alpine climber on screen"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              style={{ objectFit: 'contain' }}
              draggable={false}
            />
          </div>
          <div className="relative w-full aspect-[3/2]">
            <Image
              src="/back.png"
              alt="Meirro Pro — back view with CNC aluminium stand"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              style={{ objectFit: 'contain' }}
              draggable={false}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
