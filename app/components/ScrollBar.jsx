'use client';
import { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function ScrollBar() {
  const spring = useSpring(0, { stiffness: 120, damping: 24 });
  const trackRef = useRef(null);
  const dragging = useRef(false);

  const scrollToFraction = (fraction) => {
    const el = document.documentElement;
    const maxScroll = el.scrollHeight - el.clientHeight;
    window.scrollTo({ top: fraction * maxScroll, behavior: 'instant' });
  };

  const fractionFromEvent = (e) => {
    const rect = trackRef.current.getBoundingClientRect();
    return Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
  };

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const fraction = el.scrollTop / (el.scrollHeight - el.clientHeight);
      // While dragging, jump instantly so the thumb tracks the cursor with no lag.
      // When scrolling normally, let the spring animate smoothly.
      if (dragging.current) {
        spring.jump(fraction);
      } else {
        spring.set(fraction);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [spring]);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current) return;
      const fraction = fractionFromEvent(e);
      spring.jump(fraction);          // thumb follows cursor live
      scrollToFraction(fraction);     // page follows thumb live
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

  return (
    <div
      className="hidden md:flex fixed right-3 top-1/2 -translate-y-1/2 z-[200] flex-col items-center select-none"
      style={{ height: '60vh' }}
    >
      {/* Track — clickable/draggable */}
      <div
        ref={trackRef}
        className="relative flex-1 rounded-full overflow-hidden cursor-pointer"
        style={{ width: 6, background: 'rgba(0,0,0,0.08)' }}
        onMouseDown={handleMouseDown}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 rounded-full origin-top"
          style={{
            scaleY: spring,
            background: 'linear-gradient(180deg, #7C5CFC 0%, #C44BF7 100%)',
          }}
        />
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
