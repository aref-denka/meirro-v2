'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const creators = [
  {
    name: '9to5Mac',
    initials: '9M',
    byline: 'Fernando Silva',
    quote: 'The Meirro Pro is the best true Studio Display alternative that I have tested.',
    link: 'https://9to5mac.com/2026/07/25/hands-on-the-meirro-pro-6k-might-be-the-best-apple-studio-display-alternative-yet-video/',
    linkLabel: 'Read review →',
  },
  {
    name: 'Gala Studio',
    initials: 'GS',
    byline: 'Ao',
    // Verbatim fragment from Ao's email thread — do not extend into a fuller
    // sentence; the rest of that thread was pre-use expectation, not a verdict.
    quote: 'A substantial upgrade.',
    link: 'https://www.instagram.com/reel/DbMccsEv632/',
    linkLabel: 'Watch film →',
  },
  {
    name: 'Pete Matheson',
    initials: 'PM',
    byline: '',
    // From 5:32 of the video review. Removals only — dropped a false-start
    // "This is," and one filler "like". His hedge "essentially" is kept
    // deliberately: cutting it would strengthen the claim past what he said.
    quote:
      'If you were planning to buy a Pro Display XDR, this is the only one you can now get that essentially is as close to what would be the Pro Display XDR.',
    link: 'https://www.youtube.com/watch?v=N5D_WHNv6XY',
    linkLabel: 'Watch review →',
  },
];

function CreatorCard({ creator }) {
  return (
    <div className="creator-card flex-shrink-0 w-[320px] md:w-[360px] flex flex-col rounded-2xl p-6 gap-5">
      {/* Avatar */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-[14px] font-bold text-white/60 flex-shrink-0"
        style={{ background: 'rgba(124,92,252,0.25)', border: '1px solid rgba(124,92,252,0.3)' }}
      >
        {creator.initials}
      </div>

      {/* Quote, or an unquoted note when we have no verbatim line to attribute */}
      {creator.quote ? (
        <p className="text-[14px] text-white/80 leading-relaxed font-normal flex-1">
          &ldquo;{creator.quote}&rdquo;
        </p>
      ) : (
        <p className="text-[14px] text-white/30 leading-relaxed font-normal italic flex-1">
          {creator.note || 'Review coming soon.'}
        </p>
      )}

      {/* Name + byline + link */}
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <p className="text-[13px] font-semibold text-white tracking-[-0.01em]">{creator.name}</p>
          {creator.byline && (
            <p className="text-[11px] text-white/40 font-normal mt-0.5">{creator.byline}</p>
          )}
        </div>
        {creator.link && (
          <a
            href={creator.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium text-white/50 hover:text-white/90 transition-colors duration-200 whitespace-nowrap"
            style={{ letterSpacing: '0.02em' }}
          >
            {creator.linkLabel}
          </a>
        )}
      </div>
    </div>
  );
}

function MarqueeStrip({ items, direction = 'left', speed = 40 }) {
  // Repeat enough times to fill wide screens smoothly. The keyframes travel
  // -50%, so half the track must be at least one viewport wide — 4 copies of 3
  // cards (~2250px) covers up to a 2K viewport without a visible seam.
  const repeated = [...items, ...items, ...items, ...items];
  const duration = (items.length * 380) / speed;

  const viewportRef = useRef(null);
  const [running, setRunning] = useState(false);

  // A 60s linear transform repaints every frame for as long as it runs, even
  // far offscreen. Pause it unless the strip is actually near the viewport.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting), {
      rootMargin: '200px 0px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={viewportRef} className="marquee-viewport overflow-hidden w-full">
      <div
        className="marquee-track flex gap-4"
        style={{
          width: 'max-content',
          willChange: running ? 'transform' : 'auto',
          animationName: direction === 'left' ? 'marquee-right' : 'marquee-left',
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationPlayState: running ? 'running' : 'paused',
        }}
      >
        {repeated.map((creator, i) => (
          <CreatorCard key={`${creator.name}-${i}`} creator={creator} />
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section
      id="reviews"
      aria-label="Creator reviews for Meirro Pro 32-inch 6K monitor"
      className="relative py-28 md:py-40 overflow-hidden scroll-mt-[52px]"
      style={{ background: '#04040A' }}
    >
      {/* Aurora background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 15% 60%, rgba(124,92,252,0.45) 0%, transparent 55%), ' +
            'radial-gradient(ellipse 60% 50% at 85% 35%, rgba(196,75,247,0.32) 0%, transparent 55%), ' +
            'radial-gradient(ellipse 50% 40% at 50% 10%, rgba(124,92,252,0.18) 0%, transparent 50%)',
        }}
      />

      {/* Header */}
      <div className="relative px-6 max-w-[1100px] mx-auto mb-16">
        <motion.p
          className="text-[11px] font-semibold tracking-[3px] uppercase text-white/40 mb-5"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          Creator Reviews
        </motion.p>
        <motion.h2
          className="font-black tracking-[-0.05em] leading-[0.94] text-white"
          style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          Reviewed by the<br />people who notice.
        </motion.h2>
      </div>

      {/* Marquee strip */}
      <div className="relative flex flex-col gap-4">
        <MarqueeStrip items={creators} direction="left" speed={18} />
      </div>

      {/* Edge fade masks */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40"
        style={{ background: 'linear-gradient(to right, #04040A, transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40"
        style={{ background: 'linear-gradient(to left, #04040A, transparent)' }}
      />
    </section>
  );
}
