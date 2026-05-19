'use client';
import { useEffect } from 'react';

/* Classify wheel events as mouse vs trackpad and toggle data-scroll-device
   on <html>. CSS uses it to gate scroll-snap — only trackpads opt into snap,
   so mouse-wheel scrolling stays free. Re-classifies live if the user
   switches input device. */
export default function ScrollDeviceDetector() {
  useEffect(() => {
    const html = document.documentElement;
    const onWheel = (e) => {
      const dy = Math.abs(e.deltaY);
      // Line/page mode → always a mouse wheel.
      // Pixel mode + big delta (≥ 50) → mouse wheel (single click).
      // Pixel mode + small delta → trackpad (continuous gesture).
      if (e.deltaMode !== 0 || dy >= 50) {
        html.dataset.scrollDevice = 'mouse';
      } else {
        html.dataset.scrollDevice = 'trackpad';
      }
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);
  return null;
}
