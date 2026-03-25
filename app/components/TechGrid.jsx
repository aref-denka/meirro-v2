'use client';
import { motion } from 'framer-motion';

const cards = [
  {
    id: 'resolution',
    eyebrow: '6K Retina',
    value: '6K',
    unit: '',
    detail: '6016 × 3384 pixels\n218 ppi · 120Hz ProMotion',
    accent: 'rgba(124,92,252,0.07)',
    span: 'col-span-1 md:col-span-2',
    tall: true,
  },
  {
    id: 'size',
    eyebrow: '32 Inches',
    value: '32"',
    unit: '',
    detail: 'IPS panel · 16:10\nFull-width precision glass',
    accent: 'rgba(196,75,247,0.06)',
    span: 'col-span-1',
    tall: false,
  },
  {
    id: 'aluminium',
    eyebrow: 'Full Aluminium',
    value: 'Alu',
    unit: '',
    detail: 'CNC 6061-T6\nEvery surface machined',
    accent: 'rgba(124,92,252,0.05)',
    span: 'col-span-1',
    tall: false,
  },
  {
    id: 'price',
    eyebrow: 'Starting From',
    value: '$1,499',
    unit: '',
    detail: 'Stand + calibration included\nComparable 6K panels: from $3,299',
    accent: 'rgba(124,92,252,0.04)',
    span: 'col-span-1 md:col-span-2',
    tall: false,
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

export default function TechGrid() {
  return (
    <section id="specs" aria-label="Key specifications — 6K resolution, 32-inch size, aluminium build, $1,499 price" className="relative bg-[#F0F0F4] py-24 md:py-36 px-6">

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
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              className={`glow-card relative rounded-2xl overflow-hidden cursor-default ${card.span} ${card.tall ? 'row-span-2' : ''}`}
              style={{
                background: `${card.accent}, rgba(255,255,255,0.85)`,
                border: '1px solid rgba(0,0,0,0.07)',
                backdropFilter: 'blur(20px)',
                padding: 'clamp(20px, 3vw, 32px)',
                minHeight: card.tall ? 'clamp(240px, 30vw, 340px)' : 'clamp(140px, 18vw, 200px)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}
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

              {/* Corner accent dot */}
              <div
                className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full"
                style={{ background: 'rgba(124,92,252,0.25)' }}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
