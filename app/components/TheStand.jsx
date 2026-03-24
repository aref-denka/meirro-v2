'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

  const StandVisual = () => (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="relative"
        style={{
          width: 'clamp(220px, 38vw, 460px)',
          height: 'clamp(300px, 52vw, 620px)',
        }}
      >
        {/* Main body — silver/aluminum on light bg */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #e2e2e6 0%, #d0d0d4 30%, #d8d8dc 60%, #c8c8cc 100%)',
            border: '1px solid rgba(255,255,255,0.9)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.06)',
          }}
        >
          {/* Brushed metal lines */}
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0"
              style={{
                top: `${(i / 28) * 100}%`,
                height: 1,
                background: `rgba(255,255,255,${0.4 + (i % 3) * 0.15})`,
              }}
            />
          ))}

          {/* Vertical highlight streak */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: '30%', width: '4%',
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)',
            }}
          />
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: '65%', width: '2%',
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)',
            }}
          />

          {/* Machining mark — top */}
          <div
            className="absolute top-8 left-1/2 -translate-x-1/2"
            style={{
              width: '40%', height: 3,
              background: 'rgba(0,0,0,0.06)',
              borderRadius: 2,
            }}
          />

          {/* Hinge mechanism */}
          <div className="absolute top-1/2 -translate-y-1/2 right-8 flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-black/10" />
            ))}
          </div>

          {/* Engraved text */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
            style={{ width: '70%' }}
          >
            <p className="text-[9px] tracking-[2.5px] uppercase text-black/20 font-medium">
              Meirro Pro · CNC 6061-T6
            </p>
          </div>
        </div>

        {/* Ambient shadow below */}
        <div
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '80%', height: 40,
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.1) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
      </div>
    </div>
  );

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
          style={{ y: imageY }}
        >
          <StandVisual />
        </motion.div>

        {/* Text */}
        <motion.div
          className="order-1 md:order-2"
          style={{ opacity: textOp, x: textX }}
        >
          <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#0A0A0C]/50 mb-6">
            The Stand
          </p>

          <h2
            className="font-black tracking-[-0.05em] leading-[0.94] text-[#0A0A0C] mb-8"
            style={{ fontSize: 'clamp(40px, 5.5vw, 72px)' }}
          >
            CNC-milled.<br />Endlessly<br />adjustable.
          </h2>

          {/* Animated rule */}
          <motion.div
            className="h-px bg-black/10 mb-8 origin-left"
            style={{ scaleX: lineScale }}
          />

          <div className="space-y-6">
            {[
              { label: 'Material', value: '6061-T6 Aerospace Aluminium' },
              { label: 'Finish',   value: 'Precision anodised, satin' },
              { label: 'Adjust',   value: 'Height · Tilt · Portrait rotation' },
              { label: 'VESA',     value: '100×100 mm adapter included' },
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
