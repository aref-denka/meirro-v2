'use client';
import { motion } from 'framer-motion';

const chips = [
  { value: '223 ppi', label: 'Pixel density'     },
  { value: '99% P3',  label: 'DCI-P3 colour'     },
  { value: '60 Hz',   label: 'Refresh rate'        },
  { value: 'ΔE < 2',  label: 'Factory calibrated' },
];

export default function ThePanel() {
  return (
    <section
      id="design"
      aria-label="32-inch 6K Nano IPS Black panel — colour accuracy and display technology"
      className="relative bg-[#F7F7F9] py-20 md:py-32 px-6 overflow-hidden"
    >
      <div className="relative max-w-[1100px] mx-auto">

        {/* Eyebrow above the panel */}
        <motion.p
          className="text-[11px] font-semibold tracking-[3px] uppercase text-[#0A0A0C]/45 mb-7"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          The Panel
        </motion.p>

        {/* ── The display card ─────────────────────────────── */}
        <motion.div
          className="relative w-full overflow-hidden"
          style={{
            height: 'clamp(340px, 56vh, 580px)',
            borderRadius: 20,
            background: '#04040A',
            border: '1px solid rgba(0,0,0,0.1)',
            boxShadow:
              '0 40px 100px rgba(0,0,0,0.13), ' +
              '0 4px 16px rgba(0,0,0,0.07)',
          }}
          initial={{ opacity: 0, y: 52, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Aurora inside */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 65% 60% at 20% 55%, rgba(124,92,252,0.55) 0%, transparent 55%), ' +
                'radial-gradient(ellipse 60% 55% at 80% 40%, rgba(196,75,247,0.4) 0%, transparent 55%), ' +
                'radial-gradient(ellipse 45% 40% at 50% 5%,  rgba(124,92,252,0.22) 0%, transparent 50%)',
            }}
          />

          {/* Scan lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 6px)',
              opacity: 0.5,
            }}
          />

          {/* Inner layout: headline top-center, chips bottom */}
          <div className="absolute inset-0 flex flex-col items-center justify-between px-8 md:px-14 py-10 md:py-14">

            {/* Headline */}
            <motion.div
              className="flex-1 flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            >
              <h2
                className="font-black tracking-[-0.05em] leading-[0.93] text-white"
                style={{ fontSize: 'clamp(36px, 6.5vw, 86px)' }}
              >
                32-Inch 6K.<br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #FF6B6B 0%, #FFD93D 22%, #6BCB77 44%, #4D96FF 66%, #A78BFA 83%, #E879F9 100%)' }}
                >
                  Colour
                </span>{' beyond reproach.'}
              </h2>
            </motion.div>

            {/* Chips row */}
            <div className="w-full flex flex-wrap justify-center gap-2 md:gap-3">
              {chips.map(({ value, label }, i) => (
                <motion.div
                  key={value}
                  className="text-center"
                  style={{
                    padding: 'clamp(8px,1.2vw,13px) clamp(14px,2vw,24px)',
                    background: 'rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.45 + i * 0.08,
                  }}
                >
                  <p
                    className="font-bold text-white leading-none"
                    style={{ fontSize: 'clamp(13px, 1.5vw, 16px)', letterSpacing: '-0.01em' }}
                  >
                    {value}
                  </p>
                  <p
                    className="font-normal mt-1 bg-clip-text text-transparent"
                    style={{
                      fontSize: 'clamp(9px, 0.9vw, 11px)',
                      letterSpacing: '0.02em',
                      backgroundImage: 'linear-gradient(90deg, #FF6B6B 0%, #FFD93D 22%, #6BCB77 44%, #4D96FF 66%, #A78BFA 83%, #E879F9 100%)',
                    }}
                  >
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>

        {/* Brief body text below the panel */}
        <motion.p
          className="mt-7 text-[#0A0A0C]/55 font-normal leading-relaxed max-w-xl"
          style={{ fontSize: 'clamp(14px, 1.5vw, 17px)' }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          223 pixels per inch across 32 inches of Nano IPS Black. Factory-calibrated to ΔE&nbsp;&lt;&nbsp;2 per unit.
        </motion.p>

      </div>
    </section>
  );
}
