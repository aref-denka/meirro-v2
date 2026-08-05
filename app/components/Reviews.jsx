'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Thumbnails and avatars are served first-party from /public/creators so no
// request fires to Google or Meta before the cookie banner is answered, and so
// nothing breaks when a CDN URL rotates its hash.
const creators = [
  {
    name: '9to5Mac',
    initials: '9M',
    avatar: '/creators/9to5mac-avatar.png',
    // Still from 9to5Mac's video cut of this review; the link goes to the
    // written hands-on, which is where the quote below comes from.
    thumb: '/creators/9to5mac-review.jpg',
    byline: 'Fernando Silva',
    quote: 'The Meirro Pro is the best true Studio Display alternative that I have tested.',
    link: 'https://9to5mac.com/2026/07/25/hands-on-the-meirro-pro-6k-might-be-the-best-apple-studio-display-alternative-yet-video/',
    linkLabel: 'Read review →',
  },
  {
    name: 'Gala Studio',
    initials: 'GS',
    avatar: '/creators/gala-studio-avatar.jpg',
    byline: 'Ao',
    // Still from the Instagram Reel — portrait source, so it takes the
    // blur-fill path below rather than being cropped to 16:9.
    portrait: true,
    thumb: '/creators/gala-studio-review.jpg',
    // Ao's own wording, supplied from the partnership thread.
    quote: 'Stunning 6K resolution. Finally, colors that match our photos.',
    link: 'https://www.instagram.com/reel/DbMccsEv632/',
    linkLabel: 'Watch film →',
  },
  {
    name: 'Pete Matheson',
    initials: 'PM',
    avatar: '/creators/pete-matheson-avatar.jpg',
    thumb: '/creators/pete-matheson-review.jpg',
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
  const body = (
    <>
      {/* Thumbnail — full-bleed to the card edges, clipped by the card's radius.
          Falls back to a brand gradient so a card without artwork still matches
          the others structurally instead of reading as a broken image. */}
      {creator.link ? (
        <div className="relative flex-shrink-0">
          {creator.thumb ? (
            creator.portrait ? (
              // Vertical source (Reel / Short) in a 16:9 slot. object-cover would
              // throw away most of the frame, so contain the whole thing and fill
              // the dead sides with a blurred, scaled copy of itself — reads as
              // deliberate rather than letterboxed. The blur rasterises once, so
              // it costs nothing per frame while the strip moves.
              <div className="relative w-full aspect-video overflow-hidden">
                <img
                  src={creator.thumb}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl opacity-60"
                />
                <img
                  src={creator.thumb}
                  alt={`${creator.name}'s review of the Meirro Pro`}
                  loading="lazy"
                  decoding="async"
                  className="relative h-full w-full object-contain"
                />
              </div>
            ) : (
              <img
                src={creator.thumb}
                alt={`${creator.name}'s review of the Meirro Pro`}
                width={480}
                height={270}
                loading="lazy"
                decoding="async"
                className="w-full aspect-video object-cover"
              />
            )
          ) : (
            <div
              className="w-full aspect-video"
              style={{
                background:
                  'linear-gradient(135deg, rgba(124,92,252,0.55) 0%, rgba(196,75,247,0.4) 100%)',
              }}
            />
          )}
          {/* Play affordance */}
          <span
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover:opacity-100 opacity-90"
            aria-hidden="true"
          >
            <span
              className="flex items-center justify-center w-11 h-11 rounded-full transition-transform duration-200 group-hover:scale-110"
              style={{
                background: 'rgba(10,10,12,0.55)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
            >
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                <path d="M11 6.13397C11.6667 6.51887 11.6667 7.48113 11 7.86603L1.5 13.3496C0.833333 13.7345 0 13.2534 0 12.4836L0 1.51641C0 0.746609 0.833333 0.265484 1.5 0.650384L11 6.13397Z" fill="white" />
              </svg>
            </span>
          </span>
        </div>
      ) : null}

      <div className="flex flex-col gap-5 p-6 flex-1">
        {/* Avatar — real image where we have one, initials otherwise */}
        {creator.avatar ? (
          <img
            src={creator.avatar}
            alt=""
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}
          />
        ) : (
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-[14px] font-bold text-white/60 flex-shrink-0"
            style={{ background: 'rgba(124,92,252,0.25)', border: '1px solid rgba(124,92,252,0.3)' }}
          >
            {creator.initials}
          </div>
        )}

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

        {/* Name + byline + link affordance */}
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <div>
            <p className="text-[13px] font-semibold text-white tracking-[-0.01em]">{creator.name}</p>
            {creator.byline && (
              <p className="text-[11px] text-white/40 font-normal mt-0.5">{creator.byline}</p>
            )}
          </div>
          {creator.link && (
            <span
              className="text-[11px] font-medium text-white/50 group-hover:text-white/90 transition-colors duration-200 whitespace-nowrap"
              style={{ letterSpacing: '0.02em' }}
            >
              {creator.linkLabel}
            </span>
          )}
        </div>
      </div>
    </>
  );

  const shell =
    'creator-card group flex-shrink-0 w-[320px] md:w-[360px] flex flex-col rounded-2xl overflow-hidden';

  // The whole card is the click target when there's somewhere to go — a 320px
  // card is a far better affordance than an 11px text link.
  return creator.link ? (
    <a
      href={creator.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${creator.name} — ${creator.linkLabel.replace(/\s*→$/, '')}`}
      className={`${shell} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70`}
    >
      {body}
    </a>
  ) : (
    <div className={shell}>{body}</div>
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
