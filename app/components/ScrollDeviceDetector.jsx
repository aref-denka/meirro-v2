'use client';
import { useEffect } from 'react';

/* Classify wheel events as mouse vs trackpad and toggle data-scroll-device
   on <html>. Also tracks scroll direction on data-scroll-dir so CSS can
   apply snap behavior only when scrolling down.

   Classification is sticky: a single large deltaY mid-flick won't flip a
   trackpad to mouse. We treat rapid event bursts as trackpad and only
   declare mouse on a single isolated large discrete event. */
export default function ScrollDeviceDetector() {
  useEffect(() => {
    const html = document.documentElement;
    let lastTime = 0;
    let burstCount = 0;

    const onWheel = (e) => {
      const now = performance.now();
      const dt = now - lastTime;
      lastTime = now;

      // Direction — set per event so CSS can react before momentum scroll
      if (e.deltaY > 0) html.dataset.scrollDir = 'down';
      else if (e.deltaY < 0) html.dataset.scrollDir = 'up';

      // Device classification
      if (dt < 60) {
        // Rapid event burst → trackpad gesture
        burstCount++;
        if (burstCount >= 2) html.dataset.scrollDevice = 'trackpad';
      } else {
        // Isolated event with a real gap — could be mouse wheel
        burstCount = 0;
        const dy = Math.abs(e.deltaY);
        const isDiscreteInteger = e.deltaY === Math.round(e.deltaY);
        if (e.deltaMode !== 0 || (dy >= 80 && isDiscreteInteger)) {
          html.dataset.scrollDevice = 'mouse';
        } else if (dy < 30) {
          // Small fractional/integer delta after a pause — still trackpad
          html.dataset.scrollDevice = 'trackpad';
        }
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);
  return null;
}
