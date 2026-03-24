'use client';
import { motion } from 'framer-motion';

const stats = [
  { value: '218',  unit: 'ppi',  label: 'Pixel density'      },
  { value: '99%',  unit: 'P3',   label: 'DCI-P3 colour'      },
  { value: '120',  unit: 'Hz',   label: 'ProMotion adaptive'  },
  { value: 'ΔE<1', unit: '',     label: 'Factory calibrated'  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function ThePanel() {
  return (
    <section
      id="design"
      aria-label="32-inch 6K Retina panel — colour accuracy and display technology"
      className="relative bg-white py-24 md:py-36 px-6 overflow-hidden"
    >
      {/* Subtle violet bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 0%, rgba(124,92,252,0.06) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-[1100px] mx-auto">

        {/* Header */}
        <motion.div
          className="mb-14 md:mb-20 max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#0A0A0C]/50 mb-5">
            The Panel
          </p>
          <h2
            className="font-black tracking-[-0.05em] leading-[0.94] text-[#0A0A0C] mb-6"
            style={{ fontSize: 'clamp(40px, 5.5vw, 70px)' }}
          >
            32-Inch 6K Retina.<br />Colour beyond reproach.
          </h2>
          <p
            className="text-[#0A0A0C]/65 font-normal leading-relaxed"
            style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', maxWidth: 520 }}
          >
            218 pixels per inch across 32 inches of IPS. 99% DCI-P3,
            factory-calibrated to ΔE&nbsp;&lt;&nbsp;1 per unit.
            What you see is exactly what was intended.
          </p>
        </motion.div>

        {/* Animated divider */}
        <motion.div
          className="h-px bg-black/10 mb-14 md:mb-20 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Stat grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/[0.06] rounded-2xl overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map(({ value, unit, label }) => (
            <motion.div
              key={value}
              variants={itemVariants}
              className="flex flex-col justify-between bg-white px-8 py-10 cursor-default"
              style={{ minHeight: 'clamp(140px, 18vw, 200px)' }}
            >
              <p className="text-[11px] font-semibold tracking-[2px] uppercase text-[#0A0A0C]/40">
                {label}
              </p>
              <div className="flex items-baseline gap-1.5 leading-none mt-6">
                <span
                  className="font-black tracking-[-0.04em] text-[#0A0A0C]"
                  style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
                >
                  {value}
                </span>
                {unit && (
                  <span
                    className="font-light text-[#0A0A0C]/50"
                    style={{ fontSize: 'clamp(16px, 2vw, 26px)' }}
                  >
                    {unit}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
