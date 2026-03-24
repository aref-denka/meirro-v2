'use client';
import { motion } from 'framer-motion';

const stats = [
  { value: '218',  unit: 'ppi',  label: 'Pixel density'     },
  { value: '99%',  unit: 'P3',   label: 'DCI-P3 colour'     },
  { value: '120',  unit: 'Hz',   label: 'ProMotion'         },
  { value: 'ΔE<1', unit: '',     label: 'Factory calibrated' },
];

export default function ThePanel() {
  return (
    <section
      id="display-quality"
      aria-label="32-inch 6K Retina panel — colour accuracy and display technology"
      className="relative bg-white py-28 md:py-44 px-6 overflow-hidden"
    >
      {/* Very faint violet bloom at top */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '60%',
          background:
            'radial-gradient(ellipse 60% 55% at 50% 0%, rgba(124,92,252,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-[900px] mx-auto text-center">

        {/* Eyebrow */}
        <motion.p
          className="text-[11px] font-semibold tracking-[3px] uppercase text-[#0A0A0C]/45 mb-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          The Panel
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="font-black tracking-[-0.05em] leading-[0.93] text-[#0A0A0C]"
          style={{ fontSize: 'clamp(44px, 7vw, 92px)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          32-Inch 6K Retina.<br />Colour beyond reproach.
        </motion.h2>

        {/* Body */}
        <motion.p
          className="mt-7 text-[#0A0A0C]/60 font-normal leading-relaxed mx-auto"
          style={{ fontSize: 'clamp(15px, 1.7vw, 18px)', maxWidth: 480 }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
        >
          218 pixels per inch across 32 inches of IPS.
          99% DCI-P3, factory-calibrated to ΔE&nbsp;&lt;&nbsp;1 per unit.
        </motion.p>

        {/* Violet accent line — grows in from center */}
        <motion.div
          className="mx-auto mt-14 mb-14"
          style={{
            height: 3,
            width: '100%',
            borderRadius: 99,
            background: 'linear-gradient(90deg, transparent 0%, #7C5CFC 30%, #C44BF7 70%, transparent 100%)',
            originX: '50%',
            boxShadow: '0 0 18px rgba(124,92,252,0.35)',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
        />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map(({ value, unit, label }, i) => (
            <motion.div
              key={value}
              className="flex flex-col items-center py-10 px-4"
              style={{
                borderRight: i < stats.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none',
              }}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1 + i * 0.09,
              }}
            >
              {/* Number */}
              <div className="flex items-baseline gap-1 leading-none mb-3">
                <span
                  className="font-black tracking-[-0.04em] bg-clip-text text-transparent"
                  style={{
                    fontSize: 'clamp(38px, 5.5vw, 68px)',
                    backgroundImage: 'linear-gradient(135deg, #7C5CFC 0%, #C44BF7 100%)',
                  }}
                >
                  {value}
                </span>
                {unit && (
                  <span
                    className="font-light text-[#0A0A0C]/40"
                    style={{ fontSize: 'clamp(15px, 2vw, 24px)' }}
                  >
                    {unit}
                  </span>
                )}
              </div>
              {/* Label */}
              <p className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[#0A0A0C]/40">
                {label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
