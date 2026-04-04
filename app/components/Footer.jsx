'use client';
import { motion } from 'framer-motion';

const cols = [
  {
    heading: 'Product',
    links: ['The Display', 'The Stand', 'Technical Specs', 'In the Box', 'Compare'],
  },
  {
    heading: 'Support',
    links: ['Getting Started', 'Connectivity Guide', 'Calibration', 'Warranty', 'Contact'],
  },
  {
    heading: 'Company',
    links: ['About', 'Careers', 'Press Kit', 'Blog', 'Legal'],
  },
];

export default function Footer() {
  return (
    <footer
      id="order"
      className="relative bg-[#F0F0F4] border-t border-black/[0.07] overflow-hidden"
    >
      {/* Blueprint grid */}
      <div className="blueprint-grid absolute inset-0 opacity-[0.5]" />

      {/* Order CTA band */}
      <div id="order" className="relative border-b border-black/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#0A0A0C]/50 mb-4">
              Available Now
            </p>
            <h2
              className="font-black tracking-[-0.05em] leading-[0.94] text-[#0A0A0C]"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
            >
              Meirro Pro.<br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #7C5CFC 0%, #C44BF7 100%)' }}
              >
                Order today.
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 shrink-0">
            <motion.a
              href="https://clickclack.io/cart/add?id=43946138763300&quantity=1&return_to=%2Fcheckout"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white text-[15px]"
              style={{ background: 'linear-gradient(135deg, #7C5CFC 0%, #C44BF7 100%)' }}
              whileHover={{ scale: 1.03, opacity: 0.92 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              Buy with ClickClack — from $1,499
            </motion.a>
            <p className="text-[12px] text-[#0A0A0C]/60 text-center font-normal">
              Opens ClickClack's secure checkout · Ships in 5–7 business days
            </p>
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="relative max-w-[1100px] mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand column */}
        <div>
          <span className="text-[18px] font-bold tracking-[-0.04em] text-[#0A0A0C] block mb-4">
            Meirro
          </span>
          <p className="text-[13px] text-[#0A0A0C]/75 font-normal leading-relaxed">
            Precision display engineering for professionals who demand more.
          </p>
        </div>

        {/* Link columns */}
        {cols.map((col) => (
          <div key={col.heading}>
            <p className="text-[10px] font-semibold tracking-[2px] uppercase text-[#0A0A0C]/50 mb-5">
              {col.heading}
            </p>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[13px] text-[#0A0A0C]/70 hover:text-[#0A0A0C] transition-colors duration-200 font-normal"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-black/[0.05]">
        <div className="max-w-[1100px] mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#0A0A0C]/45 font-light">
            © 2026 Meirro Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-[11px] text-[#0A0A0C]/18 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-black/10 inline-block" />
            <span>REV 2026.1 · CNC 6061-T6 · ISO 9001</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
