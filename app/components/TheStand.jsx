'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function StandVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <img
        src="/back.png"
        alt="Meirro Pro — back view showing the CNC aluminium stand"
        className="block max-w-full max-h-full w-auto h-auto object-contain select-none"
        draggable="false"
      />
    </div>
  );
}

export default function TheStand() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY    = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);
  const textX     = useTransform(scrollYProgress, [0.1, 0.5], [-32, 0]);
  const textOp    = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);
  const lineScale = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);

  return (
    <section
      ref={ref}
      id="technology"
      aria-label="Full aluminium CNC-machined stand and body — Meirro Pro design"
      className="relative min-h-screen overflow-hidden bg-white flex items-center"
      style={{ padding: 'clamp(80px, 12vh, 160px) 0' }}
    >
      {/* Subtle grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '220px 220px',
        }}
      />

      <div className="relative w-full max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Visual */}
        <motion.div
          className="order-2 md:order-1 h-[clamp(360px,50vh,600px)]"
          style={{ y: imageY, willChange: 'transform' }}
        >
          <StandVisual />
        </motion.div>

        {/* Text */}
        <motion.div
          className="order-1 md:order-2"
          style={{ opacity: textOp, x: textX, willChange: 'transform, opacity' }}
        >
          <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#0A0A0C]/50 mb-6">
            Full Aluminium
          </p>

          <h2
            className="font-black tracking-[-0.05em] leading-[1.05] text-[#0A0A0C] mb-6"
            style={{ fontSize: 'clamp(40px, 5.5vw, 72px)' }}
          >
            Aluminum,<br />all the way<br />down
          </h2>

          <p
            className="text-[#0A0A0C]/60 font-normal leading-relaxed mb-8 max-w-md"
            style={{ fontSize: 'clamp(14px, 1.4vw, 16px)' }}
          >
            A display is a tool, and tools earn trust through their materials.
            The chassis and stand are CNC machined from aluminum alloy,
            anodised, and finished to a satin grain — no plastic facades, no
            cosmetic fillers. Precision for professionals, from the billet up.
          </p>

          {/* Animated rule */}
          <motion.div
            className="h-px bg-black/10 mb-8 origin-left"
            style={{ scaleX: lineScale, willChange: 'transform' }}
          />

          <div className="space-y-6">
            {[
              { label: 'Chassis', value: 'CNC aluminum alloy' },
              { label: 'Stand',   value: 'CNC aluminum alloy · solid billet' },
              { label: 'Finish',  value: 'Precision anodised, satin' },
              { label: 'Adjust',  value: 'Height · Tilt · Portrait rotation' },
              { label: 'VESA',    value: '100×100 mm adapter included' },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-6">
                <span className="text-[11px] font-semibold tracking-[1px] uppercase text-[#0A0A0C]/50 w-16 shrink-0 pt-0.5">
                  {label}
                </span>
                <span className="text-[15px] text-[#0A0A0C] font-normal leading-snug">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
