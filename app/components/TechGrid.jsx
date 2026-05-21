'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cards = [
  {
    id: 'resolution',
    eyebrow: '6K',
    value: '6K',
    unit: '',
    detail: '6144 × 3456 pixels\n224 ppi · 60Hz',
    accent: 'rgba(124,92,252,0.07)',
    span: 'col-span-1 md:col-span-2',
    tall: true,
  },
  {
    id: 'glass',
    eyebrow: 'The Glass',
    value: 'Glossy',
    unit: '',
    detail: 'Anti-Glare · Deep Blacks',
    accent: 'rgba(196,75,247,0.06)',
    span: 'col-span-1',
    tall: false,
  },
  {
    id: 'aluminium',
    eyebrow: 'Full Aluminium',
    value: 'Alu',
    unit: '',
    detail: 'CNC anodized aluminum alloy\nEvery surface machined',
    accent: 'rgba(124,92,252,0.05)',
    span: 'col-span-1',
    tall: false,
  },
  {
    id: 'price',
    eyebrow: 'Starting From',
    value: '$1,299',
    unit: '',
    detail: 'Stand included',
    accent: 'rgba(124,92,252,0.04)',
    span: 'col-span-1 md:col-span-2',
    tall: false,
  },
  {
    id: 'size',
    eyebrow: '32 Inches',
    value: '32"',
    unit: '',
    detail: 'Nano IPS Black · 16:9\nFully laminated AR glass',
    accent: 'rgba(196,75,247,0.06)',
    span: 'col-span-1',
    tall: false,
  },
  {
    id: 'gamut',
    eyebrow: 'DCI-P3',
    value: '98%',
    unit: '',
    detail: '10-bit · 1.07B colours\nWide-gamut professional',
    accent: 'rgba(196,75,247,0.05)',
    span: 'col-span-1',
    tall: false,
    explainer: 'The colour range used for cinema and HDR video. 98% means what you see on screen matches what the director graded.',
  },
  {
    id: 'calibration',
    eyebrow: 'Factory Calibrated',
    value: 'ΔE<2',
    unit: '',
    detail: 'Per-unit calibration\nReport in every box',
    accent: 'rgba(124,92,252,0.05)',
    span: 'col-span-1',
    tall: false,
    explainer: 'Delta E measures colour accuracy. Below 2 is invisible to the human eye — every unit ships with its own verification report.',
  },
  {
    id: 'adobergb',
    eyebrow: 'Adobe RGB',
    value: '99%',
    unit: '',
    detail: 'Wide-gamut coverage\nPrint · photo workflows',
    accent: 'rgba(124,92,252,0.04)',
    span: 'col-span-1',
    tall: false,
    explainer: 'A wider colour gamut built for print and photo work. 99% means on-screen colours match the final printed result.',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function TechCard({ card }) {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const hasExplainer = !!card.explainer;
  const open = hasExplainer && (hovered || pinned);

  useEffect(() => {
    if (!pinned) return;
    const onDocClick = () => setPinned(false);
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [pinned]);

  return (
    <motion.div
      variants={cardVariants}
      className={`glow-card relative rounded-2xl overflow-hidden cursor-default ${card.span} ${card.tall ? 'sm:row-span-2' : ''}`}
      style={{
        background: `${card.accent}, rgba(255,255,255,0.85)`,
        border: '1px solid rgba(0,0,0,0.07)',
        backdropFilter: 'blur(20px)',
        padding: 'clamp(20px, 3vw, 32px)',
        minHeight: card.tall ? 'clamp(240px, 30vw, 340px)' : 'clamp(140px, 18vw, 200px)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') setHovered(false); }}
    >
      {/* Eyebrow */}
      <p className="text-[10px] font-semibold tracking-[2px] uppercase text-[#0A0A0C]/50 mb-auto">
        {card.eyebrow}
      </p>

      {/* Value */}
      <div className={`${card.tall ? 'mt-8' : 'mt-6'}`}>
        <div className="flex items-baseline gap-2 leading-none">
          <span
            className="font-black tracking-[-0.05em] text-[#0A0A0C]"
            style={{
              fontSize: card.tall
                ? 'clamp(64px, 8vw, 96px)'
                : card.id === 'price'
                  ? 'clamp(32px, 4vw, 52px)'
                  : 'clamp(44px, 5.5vw, 68px)',
            }}
          >
            {card.value}
          </span>
          {card.unit && (
            <span
              className="font-light text-[#0A0A0C]/55"
              style={{ fontSize: card.tall ? 'clamp(22px, 2.8vw, 34px)' : 'clamp(16px, 2vw, 24px)' }}
            >
              {card.unit}
            </span>
          )}
        </div>

        {/* Detail */}
        <p className="text-[12px] font-normal text-[#0A0A0C]/75 mt-3 leading-relaxed whitespace-pre-line">
          {card.detail}
        </p>
      </div>

      {/* Corner indicator: info button for jargon cards, dot otherwise */}
      {hasExplainer ? (
        <button
          type="button"
          aria-label={`Learn more about ${card.eyebrow}`}
          aria-expanded={open}
          onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHovered(true); }}
          onClick={(e) => { e.stopPropagation(); setPinned((p) => !p); }}
          className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center transition-colors z-20 ${
            open ? 'text-white/85' : 'text-[#0A0A0C]/50 hover:text-[#0A0A0C]/85'
          }`}
          style={{
            background: open ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.05)',
            border: open ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <span
            className="text-[11px] leading-none italic font-semibold select-none"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif', transform: 'translateY(-0.5px)' }}
          >
            i
          </span>
        </button>
      ) : (
        <div
          className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full"
          style={{ background: 'rgba(124,92,252,0.25)' }}
        />
      )}

      {/* Explainer overlay */}
      {hasExplainer && (
        <AnimatePresence>
          {open && (
            <motion.div
              key="explainer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-10 flex items-center"
              style={{
                background: 'rgba(15,15,20,0.94)',
                backdropFilter: 'blur(8px)',
                padding: 'clamp(20px, 3vw, 32px)',
              }}
            >
              <div className="pr-8">
                <p className="text-[10px] font-semibold tracking-[2px] uppercase text-white/55 mb-2">
                  {card.eyebrow}
                </p>
                <p className="text-[12px] leading-relaxed text-white/90">
                  {card.explainer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

export default function TechGrid() {
  return (
    <section id="specs" aria-label="Key specifications — 6K resolution, 32-inch size, aluminium build, $1,299 price" className="relative bg-[#F0F0F4] py-24 md:py-36 px-6">

      {/* Very faint violet bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(124,92,252,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-[1100px] mx-auto">

        {/* Header */}
        <motion.div
          className="mb-14 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#0A0A0C]/50 mb-4">
            Technical Grid
          </p>
          <h2
            className="font-black tracking-[-0.05em] leading-[0.94] text-[#0A0A0C]"
            style={{ fontSize: 'clamp(40px, 5.5vw, 70px)' }}
          >
            The numbers<br />that matter.
          </h2>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {cards.map((card) => (
            <TechCard key={card.id} card={card} />
          ))}
        </motion.div>

        {/* Link to full specs */}
        <motion.div
          className="mt-8 flex justify-end"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href="/specs"
            className="group inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[2px] uppercase text-[#0A0A0C]/55 hover:text-[#0A0A0C] transition-colors duration-200"
          >
            All Specs
            <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
