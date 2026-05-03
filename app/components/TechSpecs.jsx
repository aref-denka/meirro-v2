'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const specGroups = [
  {
    category: 'Display',
    specs: [
      { label: 'Panel Type',      value: 'Nano IPS Black' },
      { label: 'Resolution',      value: '6144 × 3456 (6K)' },
      { label: 'Pixel Density',   value: '223 ppi' },
      { label: 'Refresh Rate',    value: '60 Hz' },
      { label: 'Brightness',      value: '500 nits typical' },
      { label: 'Contrast',        value: '2,000:1' },
      { label: 'Response Time',   value: 'GTG 8 ms' },
    ],
  },
  {
    category: 'Colour',
    specs: [
      { label: 'Colour Space',    value: 'sRGB · DCI-P3' },
      { label: 'Coverage',        value: '99% sRGB · 99% DCI-P3' },
      { label: 'Calibration',     value: 'Factory, per-unit' },
      { label: 'Delta E',         value: 'ΔE < 2' },
      { label: 'Bit Depth',       value: '10-bit (1.07 billion colours)' },
    ],
  },
  {
    category: 'Connectivity',
    specs: [
      { label: 'USB-C Upstream',    value: '× 1, UHBR20, 80 Gbps' },
      { label: 'USB-C Downstream',  value: '× 4, USB 2.0, 480 Mbps' },
      { label: 'USB-PD',            value: 'Up to 100 W' },
      { label: 'Compatible',        value: 'Thunderbolt 4/5 · USB4' },
    ],
  },
  {
    category: 'Physical',
    specs: [
      { label: 'Size',            value: '32.0" diagonal' },
      { label: 'Weight',          value: '8.92 kg (panel only)' },
      { label: 'Stand Material',  value: 'CNC anodized aluminum alloy' },
      { label: 'VESA',            value: '100 × 100 mm' },
    ],
  },
];

const rowVariants = {
  hidden: { opacity: 0, x: -16 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const groupVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.06 } },
};

export default function TechSpecs() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.3'] });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={ref}
      id="specs-table"
      aria-label="Full technical specifications for Meirro Pro 32-inch 6K monitor"
      className="relative bg-white py-28 md:py-40 px-6 overflow-hidden"
    >
      {/* Blueprint grid overlay */}
      <div className="blueprint-grid absolute inset-0 opacity-[0.6]" />

      <div className="relative max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="mb-20">
          <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#0A0A0C]/50 mb-5">
            Technical Specifications
          </p>
          <div className="flex items-end justify-between gap-8">
            <h2
              className="font-black tracking-[-0.05em] leading-[0.94] text-[#0A0A0C]"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
            >
              Every number.<br />Accounted for.
            </h2>
            <motion.div
              className="hidden md:block h-px bg-black/10 flex-1 mb-3 origin-left"
              style={{ scaleX: lineWidth, transformOrigin: 'left' }}
            />
          </div>
        </div>

        {/* Spec groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
          {specGroups.map((group) => (
            <motion.div
              key={group.category}
              variants={groupVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.p
                variants={rowVariants}
                className="text-[10px] font-semibold tracking-[2.5px] uppercase text-[#0A0A0C]/45 mb-6 pb-3 border-b border-black/[0.06]"
              >
                {group.category}
              </motion.p>

              <div>
                {group.specs.map(({ label, value }) => (
                  <motion.div
                    key={label}
                    variants={rowVariants}
                    className="spec-row flex items-baseline justify-between gap-6 py-3 border-b border-black/[0.05] cursor-default rounded-sm px-2 -mx-2"
                  >
                    <span className="text-[11px] font-semibold tracking-[0.5px] uppercase text-[#0A0A0C]/55 shrink-0 w-28">
                      {label}
                    </span>
                    <span className="text-[14px] text-[#0A0A0C] font-normal text-right leading-snug">
                      {value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="mt-16 text-[11px] text-[#0A0A0C]/55 font-normal leading-relaxed max-w-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Specifications subject to change without notice. All measurements are approximate.
          Colour accuracy figures based on factory calibration of production units.
        </motion.p>

      </div>
    </section>
  );
}
