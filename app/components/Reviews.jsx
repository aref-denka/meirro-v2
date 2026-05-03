'use client';
import { motion } from 'framer-motion';

const reviews = [
  {
    name: 'Saoirse M.',
    role: 'Commercial Photographer, Dublin',
    stars: 5,
    text: "Honestly didn't expect much from the factory calibration claim but it's legit. Pulled my first RAW file up and it matched my print dead on. Haven't touched a profile since.",
  },
  {
    name: 'James T.',
    role: 'Lead Motion Designer, London',
    stars: 5,
    text: "Scrubbing a timeline at this resolution is kind of hard to go back from. Everything else feels compressed now. After Effects at 6K is just a different thing altogether.",
  },
  {
    name: 'Priya K.',
    role: 'Senior UX Designer, Bangalore',
    stars: 4.5,
    text: "The sharpness took some getting used to. I started catching rendering issues I'd been shipping for months without realising. Bit embarrassing honestly but glad I can see them now.",
  },
  {
    name: 'Luca F.',
    role: 'Freelance Colourist, Milan',
    stars: 5,
    text: "I pulled out the spectrophotometer on day one just to check. ΔE under 1, exactly as advertised. Every grade since has gone out with way more confidence.",
  },
  {
    name: 'Tom R.',
    role: 'Software Engineer, Berlin',
    stars: 5,
    text: "One cable. That's it. MacBook, four drives, two USB peripherals, and the display all through a single Thunderbolt 5 port. My desk looks like a different room.",
  },
  {
    name: 'Amara O.',
    role: 'Documentary Filmmaker, Lagos',
    stars: 4,
    text: "Cut an entire feature on this. The HDR headroom meant I wasn't guessing what it would look like in a cinema. What you see is genuinely what you get.",
  },
  {
    name: 'Chen W.',
    role: '3D Artist, Shanghai',
    stars: 5,
    text: "Sculpting at 6K feels almost physical. My hand kept going to the screen. The mesh looks real in a way that's kind of unsettling at first.",
  },
  {
    name: 'Nina B.',
    role: 'Art Director, New York',
    stars: 5,
    text: "I flip it to portrait for long copy reviews and back for layout work throughout the day. The stand is so well balanced that it takes about two seconds each way.",
  },
  {
    name: 'Rafael S.',
    role: 'Game Developer, São Paulo',
    stars: 5,
    text: "Being able to preview HDR output on the same screen I'm building in has changed how I approach environment lighting completely. No more guessing at the end of a sprint.",
  },
  {
    name: 'Yuki H.',
    role: 'Product Designer, Tokyo',
    stars: 4.5,
    text: "I was ready to turn True Tone off immediately like I do on everything else. Six weeks in and I still haven't. My eyes feel fine after long days in a way they usually don't.",
  },
  {
    name: 'Marcus V.',
    role: 'Architect, Amsterdam',
    stars: 5,
    text: "I'm catching geometry issues in context now instead of having to zoom in to hunt for them. It just makes the whole review process faster without really trying.",
  },
  {
    name: 'Elif A.',
    role: 'Music Video Director, Istanbul',
    stars: 5,
    text: "The 10 Gigabit port was the detail that sold me. Studio NAS, Thunderbolt 5 daisy chain, and accurate colour all from one piece of kit. It replaced three things on my desk.",
  },
];

// Split into two rows for the dual-strip marquee
const row1 = reviews.slice(0, 6);
const row2 = reviews.slice(6, 12);

function StarRow({ count = 5 }) {
  return (
    <div className="flex gap-[3px] mb-4">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.floor(count);
        const half = !filled && i < count;
        const gradId = `half-${i}`;
        return (
          <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none">
            {half && (
              <defs>
                <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="50%" stopColor="white" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="white" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            )}
            <path
              d="M6 1l1.29 2.61L10.5 4.02l-2.25 2.19.53 3.09L6 7.77 3.22 9.3l.53-3.09L1.5 4.02l3.21-.41L6 1z"
              fill={half ? `url(#${gradId})` : 'white'}
              fillOpacity={filled ? '0.9' : half ? '1' : '0.2'}
            />
          </svg>
        );
      })}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div
      className="flex-shrink-0 w-[320px] md:w-[360px] rounded-2xl p-6"
      style={{
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <StarRow count={review.stars} />
      <p className="text-[14px] text-white/80 leading-relaxed font-normal mb-5">
        &ldquo;{review.text}&rdquo;
      </p>
      <div>
        <p className="text-[13px] font-semibold text-white tracking-[-0.01em]">{review.name}</p>
        <p className="text-[11px] text-white/40 font-normal mt-0.5">{review.role}</p>
      </div>
    </div>
  );
}

function MarqueeStrip({ items, direction = 'left', speed = 40 }) {
  const doubled = [...items, ...items];
  const duration = (items.length * 380) / speed;

  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-4"
        style={{
          width: 'max-content',
          willChange: 'transform',
          animationName: direction === 'left' ? 'marquee-right' : 'marquee-left',
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        }}
      >
        {doubled.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section
      id="reviews"
      aria-label="Customer reviews for Meirro Pro 32-inch 6K monitor"
      className="relative py-28 md:py-40 overflow-hidden"
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
          Reviews
        </motion.p>
        <motion.h2
          className="font-black tracking-[-0.05em] leading-[0.94] text-white"
          style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          Trusted by the<br />people who notice.
        </motion.h2>
      </div>

      {/* Dual marquee strips */}
      <div className="relative flex flex-col gap-4">
        <MarqueeStrip items={row1} direction="left"  speed={38} />
        <MarqueeStrip items={row2} direction="right" speed={32} />
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
