'use client';
import { motion } from 'framer-motion';

const callouts = [
  {
    eyebrow: 'The Case',
    title:   'Full Aluminium.',
    detail:  'CNC anodized aluminum alloy. Every surface.',
  },
  {
    eyebrow: 'The Glass',
    title:   'Anti-Glare Glossy.',
    detail:  'Fully-laminated anti-glare coating. Deep blacks, minimum glare.',
  },
  {
    eyebrow: 'The Ports',
    title:   'Your monitor is the dock.',
    detail:  '1× USB4 upstream · 80 Gbps · 96 W · 4× USB-C downstream',
  },
];

export default function FeatureCallouts() {
  return (
    <section
      id="build"
      aria-label="Meirro Pro — case, glass, and ports highlights"
      className="relative bg-[#F7F7F9] py-20 md:py-28 px-6"
    >
      <div className="relative max-w-3xl mx-auto flex flex-col gap-14 md:gap-20 text-center">
        {callouts.map(({ eyebrow, title, detail }, i) => (
          <motion.div
            key={eyebrow}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
          >
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#0A0A0C]/45 mb-3">
              {eyebrow}
            </p>
            <p
              className="font-black tracking-[-0.05em] leading-[1.02] text-[#0A0A0C] md:whitespace-nowrap"
              style={{ fontSize: 'clamp(28px, 3.8vw, 48px)' }}
            >
              {title}
            </p>
            <p
              className="mt-3 text-[#0A0A0C]/55 font-normal leading-relaxed mx-auto md:whitespace-nowrap"
              style={{ fontSize: 'clamp(13px, 1.4vw, 17px)' }}
            >
              {detail}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
