'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-10"
      style={{ height: 52 }}
      animate={{
        background: scrolled ? 'rgba(247,247,249,0.88)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.07)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'blur(0px)',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Logo */}
      <span className="text-[17px] font-bold tracking-[-0.04em] text-[#0A0A0C]">
        Meirro
      </span>

      {/* Links */}
      <div className="hidden md:flex items-center gap-7">
        {['Display', 'Design', 'Technology', 'Specs'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[13px] text-[#0A0A0C]/60 hover:text-[#0A0A0C]/90 transition-colors duration-200"
          >
            {item}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#order"
        className="text-[13px] font-medium text-white px-4 py-1.5 rounded-full transition-opacity duration-200 hover:opacity-80"
        style={{ background: 'linear-gradient(135deg, #7C5CFC 0%, #C44BF7 100%)' }}
      >
        Order
      </a>
    </motion.nav>
  );
}
