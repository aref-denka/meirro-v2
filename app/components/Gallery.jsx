'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/* Each tile owns its aspect ratio. All tiles share a single height
   (clamped), and `aspect-ratio` auto-computes the width — so adding a
   new tile with any ratio just slots in without breaking the rhythm. */
const tiles = [
  {
    id: 'front-45', index: '01', aspect: '4 / 5',
    src: '/gallery/front-45.webp',
    alt: 'Meirro Pro — three-quarter front view',
  },
  {
    id: 'ar-glass', index: '02', aspect: '16 / 9',
    src: '/gallery/ar-glass.webp',
    alt: 'Meirro Pro — anti-glare glass detail',
  },
  {
    id: 'side',     index: '03', aspect: '5 / 3',
    src: '/gallery/side-view.webp',
    alt: 'Meirro Pro — side profile',
  },
  {
    id: 'real-back', index: '04', aspect: '3 / 2',
    src: '/gallery/real-back.webp',
    alt: 'Meirro Pro — photographed back with MEIRRO mark',
    bg: '#FFFFFF',
  },
  {
    id: 'real-front', index: '05', aspect: '3 / 2',
    src: '/gallery/real-front.webp',
    alt: 'Meirro Pro — photographed front, display on',
    bg: '#FFFFFF',
  },
  {
    id: 'real-side', index: '06', aspect: '3 / 2',
    src: '/gallery/real-side.webp',
    alt: 'Meirro Pro — photographed side profile',
    bg: '#FFFFFF',
  },
  {
    id: 'real-3q', index: '07', aspect: '3 / 2',
    src: '/gallery/real-3q.webp',
    alt: 'Meirro Pro — photographed three-quarter front, display on',
    bg: '#FFFFFF',
  },
];

const N = tiles.length;
const COPIES = 3;       // triple-render so we always loop through the middle copy

export default function Gallery() {
  const railRef         = useRef(null);
  const dragRef         = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const setWidthRef     = useRef(0);
  const teleportLockRef = useRef(false);
  const [active, setActive] = useState(N); // start aimed at first tile of middle copy
  const [tileBgs, setTileBgs] = useState({});

  // Sample each render's corner pixels to use as the tile background, so
  // letterbox bars from object-contain blend into the image. Tiles with an
  // explicit `bg` skip sampling (used for photos with pure-white corners
  // that would otherwise clash with the renders' soft off-white).
  useEffect(() => {
    let cancelled = false;
    tiles.forEach((tile) => {
      if (tile.bg) return;
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        if (cancelled) return;
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const w = canvas.width, h = canvas.height;
          const pts = [
            ctx.getImageData(2, 2, 1, 1).data,
            ctx.getImageData(w - 3, 2, 1, 1).data,
            ctx.getImageData(2, h - 3, 1, 1).data,
            ctx.getImageData(w - 3, h - 3, 1, 1).data,
          ];
          const sum = pts.reduce(
            (a, p) => [a[0] + p[0], a[1] + p[1], a[2] + p[2]],
            [0, 0, 0],
          );
          const rgb = sum.map((v) => Math.round(v / pts.length));
          setTileBgs((prev) => ({
            ...prev,
            [tile.id]: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
          }));
        } catch {
          /* tainted canvas — leave tile bg unset */
        }
      };
      img.src = tile.src;
    });
    return () => { cancelled = true; };
  }, []);

  const getInset = (el) =>
    parseFloat(getComputedStyle(el).paddingLeft) || 24;

  const computeSetWidth = (el) => {
    const items = el.querySelectorAll('[data-tile]');
    if (items.length < N * COPIES) return 0;
    return items[N].offsetLeft - items[0].offsetLeft;
  };

  const updateActive = () => {
    const el = railRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    const items = el.querySelectorAll('[data-tile]');
    let best = 0;
    let bestDist = Infinity;
    items.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    setActive(best);
  };

  // Silent jump by `delta` pixels (no smooth scroll). Adjusts drag origin
  // so a drag in progress doesn't visibly snap.
  const teleport = (delta) => {
    const el = railRef.current;
    if (!el || delta === 0) return;
    teleportLockRef.current = true;
    const prev = el.style.scrollBehavior;
    el.style.scrollBehavior = 'auto';
    el.scrollLeft += delta;
    if (dragRef.current.down) dragRef.current.startScroll += delta;
    requestAnimationFrame(() => {
      el.style.scrollBehavior = prev;
      teleportLockRef.current = false;
    });
  };

  // If scroll has settled outside the middle copy's range, jump back by
  // one set width so we always stay in the middle.
  const maybeTeleport = () => {
    const el = railRef.current;
    if (!el || dragRef.current.down) return;
    const sw = setWidthRef.current;
    if (sw <= 0) return;
    const items = el.querySelectorAll('[data-tile]');
    if (items.length < N * COPIES) return;
    const sp = getInset(el);
    const lower = items[N].offsetLeft - sp;
    const upper = items[N * 2].offsetLeft - sp;
    const sl = el.scrollLeft;
    if (sl >= upper - 0.5)      teleport(-sw);
    else if (sl < lower - 0.5)  teleport(sw);
  };

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    // Position scroll at the start of the middle copy. Retry until layout
    // is settled (varied aspect ratios mean tile widths take a frame).
    let initRaf = 0;
    const init = () => {
      const items = el.querySelectorAll('[data-tile]');
      if (items.length < N * COPIES || items[N].offsetLeft === items[0].offsetLeft) {
        initRaf = requestAnimationFrame(init);
        return;
      }
      const sp = getInset(el);
      const prev = el.style.scrollBehavior;
      el.style.scrollBehavior = 'auto';
      el.scrollLeft = items[N].offsetLeft - sp;
      requestAnimationFrame(() => { el.style.scrollBehavior = prev; });
      setWidthRef.current = computeSetWidth(el);
    };
    init();

    let activeRaf = 0;
    let endTimer = 0;
    const onScroll = () => {
      if (teleportLockRef.current) return;
      cancelAnimationFrame(activeRaf);
      activeRaf = requestAnimationFrame(updateActive);
      clearTimeout(endTimer);
      endTimer = setTimeout(maybeTeleport, 120);
    };
    el.addEventListener('scroll', onScroll, { passive: true });

    const ro = new ResizeObserver(() => {
      const newSw = computeSetWidth(el);
      if (newSw > 0) setWidthRef.current = newSw;
    });
    ro.observe(el);

    return () => {
      cancelAnimationFrame(initRaf);
      cancelAnimationFrame(activeRaf);
      clearTimeout(endTimer);
      el.removeEventListener('scroll', onScroll);
      ro.disconnect();
    };
  }, []);

  const scrollToIndex = (i) => {
    const el = railRef.current;
    if (!el) return;
    const target = el.querySelectorAll('[data-tile]')[N + i];
    if (!target) return;
    const sp = getInset(el);
    el.scrollTo({ left: Math.max(0, target.offsetLeft - sp), behavior: 'smooth' });
  };

  const onMouseDown = (e) => {
    const el = railRef.current;
    if (!el) return;
    dragRef.current = { down: true, startX: e.pageX, startScroll: el.scrollLeft, moved: false };
    el.style.cursor = 'grabbing';
  };
  const onMouseMove = (e) => {
    if (!dragRef.current.down) return;
    const el = railRef.current;
    const dx = e.pageX - dragRef.current.startX;
    if (Math.abs(dx) > 3) dragRef.current.moved = true;
    let next = dragRef.current.startScroll - dx;

    // Mid-drag teleport so an infinite drag never hits the rail edges
    const sw = setWidthRef.current;
    if (sw > 0) {
      const items = el.querySelectorAll('[data-tile]');
      if (items.length >= N * COPIES) {
        const sp = getInset(el);
        const lower = items[N].offsetLeft - sp;
        const upper = items[N * 2].offsetLeft - sp;
        if (next >= upper) {
          next -= sw;
          dragRef.current.startScroll -= sw;
        } else if (next < lower) {
          next += sw;
          dragRef.current.startScroll += sw;
        }
      }
    }
    el.scrollLeft = next;
  };
  const endDrag = () => {
    const el = railRef.current;
    if (!el || !dragRef.current.down) return;
    dragRef.current.down = false;
    el.style.cursor = 'grab';
    setTimeout(maybeTeleport, 200);
  };

  const displayedActive = ((active % N) + N) % N;

  return (
    <section
      id="gallery"
      aria-label="Meirro Pro gallery"
      className="relative bg-[#F7F7F9] text-[#0A0A0C] py-24 md:py-36 overflow-hidden"
    >
      {/* Eyebrow */}
      <div className="relative max-w-[1100px] mx-auto px-6">
        <motion.p
          className="text-[11px] font-semibold tracking-[3px] uppercase text-[#0A0A0C]/45 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          The Gallery
        </motion.p>
      </div>

      {/* Bleed rail — varied widths, uniform height, infinite loop */}
      <div className="relative">
        <div
          ref={railRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          className="gallery-rail flex items-center gap-4 md:gap-5 select-none overflow-x-auto"
          style={{
            paddingLeft:  'max(24px, calc((100vw - 1100px) / 2 + 24px))',
            paddingRight: 'max(24px, calc((100vw - 1100px) / 2 + 24px))',
            cursor: 'grab',
            paddingTop: 8,
            paddingBottom: 24,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {Array.from({ length: COPIES }).flatMap((_, copyIdx) =>
            tiles.map((tile, i) => (
              <motion.figure
                key={`${tile.id}-${copyIdx}`}
                data-tile
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: Math.min(i, 4) * 0.06,
                }}
                className="group relative flex-shrink-0 overflow-hidden rounded-[20px]"
                style={{
                  height: 'clamp(380px, 58vh, 580px)',
                  aspectRatio: tile.aspect,
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow:
                    '0 20px 50px rgba(0,0,0,0.10), 0 4px 14px rgba(0,0,0,0.06)',
                  background: tile.bg || tileBgs[tile.id] || 'transparent',
                  transition: 'background-color 300ms ease',
                }}
              >
                {/* Image — fills tile, subtle hover zoom */}
                <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
                  <Image
                    src={tile.src}
                    alt={tile.alt}
                    fill
                    sizes="(max-width: 768px) 78vw, 720px"
                    style={{ objectFit: 'contain', objectPosition: 'center' }}
                    draggable={false}
                  />
                </div>

                {/* Index chip */}
                <div
                  className="absolute top-5 left-5 px-2.5 py-1 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    border: '1px solid rgba(0,0,0,0.08)',
                  }}
                >
                  <span className="text-[10px] font-semibold tracking-[2px] uppercase text-[#0A0A0C]/65 tabular-nums">
                    {tile.index} / {String(N).padStart(2, '0')}
                  </span>
                </div>
              </motion.figure>
            ))
          )}
        </div>

        {/* Edge fades */}
        <div
          className="absolute inset-y-0 left-0 w-16 md:w-32 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, rgba(247,247,249,1) 0%, transparent 100%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 w-16 md:w-32 pointer-events-none"
          style={{ background: 'linear-gradient(270deg, rgba(247,247,249,1) 0%, transparent 100%)' }}
          aria-hidden="true"
        />
      </div>

      {/* Footer row — counter + dots */}
      <div className="relative max-w-[1100px] mx-auto px-6 mt-10 md:mt-12 flex items-center justify-between gap-6">
        <span
          className="font-semibold tracking-[2px] tabular-nums text-[#0A0A0C]/75"
          style={{ fontSize: '11px' }}
        >
          {String(displayedActive + 1).padStart(2, '0')}
          <span className="text-[#0A0A0C]/30"> / {String(N).padStart(2, '0')}</span>
        </span>

        <div className="flex items-center gap-2">
          {tiles.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Show photo ${i + 1}`}
              className="block"
              style={{
                width: i === displayedActive ? 24 : 6,
                height: 6,
                borderRadius: 999,
                background: i === displayedActive
                  ? '#7C5CFC'
                  : 'rgba(10,10,12,0.18)',
                transition: 'width 360ms cubic-bezier(0.22,1,0.36,1), background 240ms ease',
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .gallery-rail::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
