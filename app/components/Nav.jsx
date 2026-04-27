'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = ['Display', 'Design', 'Technology', 'Specs'];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100]"
      animate={{
        background: scrolled || mobileOpen ? 'rgba(247,247,249,0.95)' : 'transparent',
        borderBottom: scrolled || mobileOpen ? '1px solid rgba(0,0,0,0.07)' : '1px solid transparent',
        backdropFilter: scrolled || mobileOpen ? 'blur(24px) saturate(180%)' : 'blur(0px)',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Main bar */}
      <div className="flex items-center justify-between px-6 md:px-10" style={{ height: 52 }}>
        {/* Logo */}
        <span className="text-[17px] font-bold tracking-[-0.04em] text-[#0A0A0C]">
          Meirro
        </span>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[13px] text-[#0A0A0C]/60 hover:text-[#0A0A0C]/90 transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <a
            href="https://clickclack.io/cart/add?id=43946138763300&quantity=1&return_to=%2Fcheckout"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex text-[13px] font-medium text-white px-4 py-1.5 rounded-full transition-opacity duration-200 hover:opacity-80"
            style={{ background: 'linear-gradient(135deg, #7C5CFC 0%, #C44BF7 100%)' }}
            onClick={() => window.gtag?.('event', 'begin_checkout', {
              currency: 'USD',
              value: 1499,
              button_location: 'nav',
              items: [{ item_id: 'MEIRRO-PRO-32', item_name: 'Meirro Pro 32" 6K Monitor', item_brand: 'Meirro', item_category: 'Monitors', price: 1499, quantity: 1 }],
            })}
          >
            Buy with ClickClack
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block h-px bg-[#0A0A0C] origin-center"
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block h-px bg-[#0A0A0C]"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-px bg-[#0A0A0C] origin-center"
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden px-6 pb-6 flex flex-col gap-5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {links.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="text-[16px] text-[#0A0A0C]/70 font-normal"
              >
                {item}
              </a>
            ))}
            <a
              href="https://clickclack.io/cart/add?id=43946138763300&quantity=1&return_to=%2Fcheckout"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setMobileOpen(false);
                window.gtag?.('event', 'begin_checkout', {
                  currency: 'USD',
                  value: 1499,
                  button_location: 'nav_mobile',
                  items: [{ item_id: 'MEIRRO-PRO-32', item_name: 'Meirro Pro 32" 6K Monitor', item_brand: 'Meirro', item_category: 'Monitors', price: 1499, quantity: 1 }],
                });
              }}
              className="inline-flex items-center justify-center text-[14px] font-medium text-white px-6 py-3 rounded-full mt-1"
              style={{ background: 'linear-gradient(135deg, #7C5CFC 0%, #C44BF7 100%)' }}
            >
              Buy with ClickClack — from $1,499
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
