'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const chapters = [
  { label: 'Display', selector: '#display' },
  { label: 'Ports',   selector: '#build' },
  { label: 'Panel',   selector: '#design' },
  { label: 'Alu',     selector: '#technology' },
  { label: 'Specs',   selector: '#specs' },
  { label: 'Gallery', selector: '#gallery' },
];

export default function ScrollBar() {
  const spring = useSpring(0, { stiffness: 120, damping: 24 });
  const trackRef = useRef(null);
  const dragging = useRef(false);
  const [positions, setPositions] = useState({});
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(-1);

  const scrollToFraction = (fraction) => {
    const el = document.documentElement;
    const maxScroll = el.scrollHeight - el.clientHeight;
    window.scrollTo({ top: fraction * maxScroll, behavior: 'instant' });
  };

  const fractionFromEvent = (e) => {
    const rect = trackRef.current.getBoundingClientRect();
    return Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
  };

  // Compute each chapter's vertical fraction (0–1) along the page scroll.
  useEffect(() => {
    const measure = () => {
      const el = document.documentElement;
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 0) return;
      const next = {};
      chapters.forEach(({ label, selector }) => {
        const target = document.querySelector(selector);
        if (target) next[label] = target.offsetTop / maxScroll;
      });
      setPositions(next);
    };
    measure();
    window.addEventListener('resize', measure);
    // Re-measure after first paint settles (images/fonts loaded).
    const t = setTimeout(measure, 500);
    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const fraction = el.scrollTop / (el.scrollHeight - el.clientHeight);
      if (dragging.current) {
        spring.jump(fraction);
      } else {
        spring.set(fraction);
      }
      // Find the active chapter — last one whose offsetTop is at or above viewport center.
      const center = el.scrollTop + el.clientHeight / 2;
      let idx = 0;
      chapters.forEach(({ selector }, i) => {
        const target = document.querySelector(selector);
        if (target && target.offsetTop <= center) idx = i;
      });
      setActiveIdx(idx);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [spring]);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current) return;
      const fraction = fractionFromEvent(e);
      spring.jump(fraction);
      scrollToFraction(fraction);
    };
    const onMouseUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [spring]);

  const handleMouseDown = (e) => {
    dragging.current = true;
    const fraction = fractionFromEvent(e);
    spring.jump(fraction);
    scrollToFraction(fraction);
  };

  const onChapterClick = (selector) => {
    const target = document.querySelector(selector);
    if (target) window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
  };

  return (
    <div
      className="hidden md:flex fixed right-3 top-1/2 -translate-y-1/2 z-[200] flex-col items-center select-none"
      style={{ height: '60vh' }}
    >
      {/* Track — clickable/draggable */}
      <div
        ref={trackRef}
        className="relative flex-1 rounded-full cursor-pointer"
        style={{ width: 6, background: 'rgba(0,0,0,0.08)' }}
        onMouseDown={handleMouseDown}
      >
        {/* Fill */}
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 rounded-full origin-top"
          style={{
            scaleY: spring,
            background: 'linear-gradient(180deg, #7C5CFC 0%, #C44BF7 100%)',
          }}
        />

        {/* Chapter dots + labels — dots sit on the track, labels fade in only
            for the active section or on hover. */}
        {chapters.map(({ label, selector }, i) => {
          const pos = positions[label];
          if (pos == null) return null;
          const isActive = i === activeIdx;
          const isHovered = i === hoveredIdx;
          const showLabel = isActive || isHovered;
          return (
            <button
              key={label}
              type="button"
              onClick={(e) => { e.stopPropagation(); onChapterClick(selector); }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(-1)}
              className="absolute flex items-center justify-end cursor-pointer"
              style={{
                top: `${pos * 100}%`,
                right: -7,           // center the dot on the 6px track
                transform: 'translateY(-50%)',
                width: 20,
                height: 20,
              }}
              aria-label={`Jump to ${label}`}
            >
              {/* Label — fades in only when active or hovered */}
              <motion.span
                className="absolute right-full mr-2.5 font-medium whitespace-nowrap pointer-events-none"
                animate={{
                  opacity: showLabel ? 0.85 : 0,
                  x: showLabel ? 0 : 4,
                  color: isActive ? '#7C5CFC' : 'rgba(10,10,12,0.7)',
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: 10, letterSpacing: '0.04em' }}
              >
                {label}
              </motion.span>

              {/* Dot — sits on track; scales and tints on active */}
              <motion.span
                className="block rounded-full"
                animate={{
                  scale: isActive ? 1.35 : isHovered ? 1.15 : 1,
                  backgroundColor: isActive
                    ? '#7C5CFC'
                    : isHovered
                      ? 'rgba(10,10,12,0.5)'
                      : 'rgba(10,10,12,0.28)',
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: 6, height: 6 }}
              />
            </button>
          );
        })}
      </div>

      {/* Label */}
      <p
        className="font-semibold text-[#0A0A0C]/30 mt-3"
        style={{
          fontSize: 9,
          letterSpacing: '0.2em',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          userSelect: 'none',
        }}
      >
        MEIRRO
      </p>
    </div>
  );
}
