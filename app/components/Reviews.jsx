'use client';
import { motion } from 'framer-motion';

const creators = [
  {
    name: 'Oliur (UltraLinx)',
    location: 'United Kingdom',
    quote:
      'It delivers 85% of the Pro Display XDR experience at less than a third of the price. For people who want 6K resolution and that premium aesthetic without selling a kidney, this thing is brilliant.',
    link: 'https://www.youtube.com/watch?v=Y30aZsxhJy8&t=9s&pp=ygUFb2xpdXI%3D',
  },
  {
    name: 'Sam Cambetis',
    location: 'Australia',
    quote:
      'The picture quality is stunning... this is exactly what people were talking about when they said they wanted a standalone Surface Studio monitor. Both the monitor and stand feel very solid and sturdy.',
    link: '#',
  },
  {
    name: 'Matt KC',
    location: 'USA',
    quote:
      "From a design standpoint, I'm already sold. It's fully metal, the ports are nicely laid out, and the 6K resolution is super sharp. It's a stellar monitor that you just can't beat for the price.",
    link: 'https://www.youtube.com/watch?v=EYMI7MsnT1o&pp=ygUHbWF0dCBrYw%3D%3D',
  },
  {
    name: 'Sam Beckman',
    location: 'United Kingdom',
    quote:
      "If you want 6K resolution and professional-grade color accuracy but only want to pay a fair price, this is exactly the right address. It's a price-performance counterweight to the industry standard.",
    link: 'https://www.youtube.com/watch?v=Hx_MDHdFNRE&t=39s&pp=ygULc2FtIGJlY2ttYW4%3D',
  },
  {
    name: 'Underserial',
    location: 'Germany',
    quote:
      "Step into the future of visual excellence where studio-grade clarity meets everyday accessibility. It's the perfect blend of premium craftsmanship and high-resolution brilliance.",
    link: 'https://www.youtube.com/watch?v=25p0SSGbaGE',
  },
  {
    name: 'TSP Hungary',
    location: 'Hungary',
    quote: '',
    link: '#',
  },
];

const row1 = creators.slice(0, 3);
const row2 = creators.slice(3, 6);

function CreatorCard({ creator }) {
  const initials = creator.name
    .split(/[\s(]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

  return (
    <div
      className="flex-shrink-0 w-[320px] md:w-[360px] flex flex-col rounded-2xl p-6 gap-5"
      style={{
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Avatar */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-[14px] font-bold text-white/60 flex-shrink-0"
        style={{ background: 'rgba(124,92,252,0.25)', border: '1px solid rgba(124,92,252,0.3)' }}
      >
        {initials}
      </div>

      {/* Quote */}
      {creator.quote ? (
        <p className="text-[14px] text-white/80 leading-relaxed font-normal flex-1">
          &ldquo;{creator.quote}&rdquo;
        </p>
      ) : (
        <p className="text-[14px] text-white/30 leading-relaxed font-normal italic flex-1">
          Review coming soon.
        </p>
      )}

      {/* Name + location + link */}
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <p className="text-[13px] font-semibold text-white tracking-[-0.01em]">{creator.name}</p>
          <p className="text-[11px] text-white/40 font-normal mt-0.5">{creator.location}</p>
        </div>
        <a
          href={creator.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-medium text-white/50 hover:text-white/90 transition-colors duration-200 whitespace-nowrap"
          style={{ letterSpacing: '0.02em' }}
        >
          Watch review →
        </a>
      </div>
    </div>
  );
}

function MarqueeStrip({ items, direction = 'left', speed = 40 }) {
  // Repeat enough times to fill wide screens smoothly
  const repeated = [...items, ...items, ...items, ...items];
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

      {/* Dual marquee strips */}
      <div className="relative flex flex-col gap-4">
        <MarqueeStrip items={row1} direction="left"  speed={18} />
        <MarqueeStrip items={row2} direction="right" speed={14} />
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
