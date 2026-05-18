'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const tiles = [
  {
    id: 'hero',
    kind: 'hero',
    index: '01',
    label: 'Studio · three-quarter',
    sublabel: 'Front face, in Slate',
    aurora:
      'radial-gradient(ellipse 70% 60% at 30% 40%, rgba(124,92,252,0.60) 0%, transparent 60%), ' +
      'radial-gradient(ellipse 60% 55% at 75% 70%, rgba(196,75,247,0.45) 0%, transparent 55%), ' +
      'linear-gradient(135deg, #060614 0%, #1A1024 100%)',
  },
  {
    id: 'glass',
    index: '02',
    label: 'Anti-glare glass',
    sublabel: 'Macro · 5×',
    aurora:
      'radial-gradient(ellipse 80% 70% at 50% 30%, rgba(167,139,250,0.5) 0%, transparent 60%), ' +
      'linear-gradient(160deg, #04040A 0%, #0F0820 100%)',
  },
  {
    id: 'ports',
    index: '03',
    label: 'Rear I/O',
    sublabel: 'Thunderbolt 5 · DP 2.1',
    aurora:
      'radial-gradient(ellipse 65% 55% at 70% 60%, rgba(124,92,252,0.55) 0%, transparent 55%), ' +
      'linear-gradient(140deg, #060614 0%, #160E2A 100%)',
  },
  {
    id: 'stand',
    index: '04',
    label: 'Counter-balanced stand',
    sublabel: 'Hinge & yoke detail',
    aurora:
      'radial-gradient(ellipse 60% 60% at 40% 50%, rgba(232,121,249,0.42) 0%, transparent 55%), ' +
      'radial-gradient(ellipse 55% 50% at 80% 30%, rgba(124,92,252,0.5) 0%, transparent 55%), ' +
      'linear-gradient(150deg, #050510 0%, #1C0F2C 100%)',
  },
  {
    id: 'profile',
    index: '05',
    label: 'Side profile',
    sublabel: '9.4 mm · CNC chamfer',
    aurora:
      'radial-gradient(ellipse 75% 60% at 50% 50%, rgba(196,75,247,0.45) 0%, transparent 60%), ' +
      'linear-gradient(135deg, #04040A 0%, #120A22 100%)',
  },
  {
    id: 'desk',
    index: '06',
    label: 'In the studio',
    sublabel: 'On-desk · ambient',
    aurora:
      'radial-gradient(ellipse 70% 55% at 30% 30%, rgba(124,92,252,0.42) 0%, transparent 60%), ' +
      'radial-gradient(ellipse 60% 50% at 75% 70%, rgba(232,121,249,0.4) 0%, transparent 55%), ' +
      'linear-gradient(140deg, #06061A 0%, #150D2E 100%)',
  },
];

const N = tiles.length;
const COPIES = 3;

export default function Gallery() {
  const railRef = useRef(null);
  // Active is the absolute index in the rail (0..N*COPIES-1).
  // Initialize to first tile of the middle copy.
  const [active, setActive] = useState(N);
  const dragRef = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const setWidthRef = useRef(0);
  const teleportLockRef = useRef(false);

  const getSnapPad = (el) =>
    parseFloat(getComputedStyle(el).scrollPaddingLeft) || 24;

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

  // Silent jump by `delta` pixels. Preserves drag origin so an in-progress drag continues.
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

  // If scroll has settled in the third copy, jump back by one set; same in reverse.
  const maybeTeleport = () => {
    const el = railRef.current;
    if (!el || dragRef.current.down) return;
    const sw = setWidthRef.current;
    if (sw <= 0) return;
    const items = el.querySelectorAll('[data-tile]');
    if (items.length < N * COPIES) return;
    const sp = getSnapPad(el);
    const lowerSnap = items[N].offsetLeft - sp;
    const upperSnap = items[N * 2].offsetLeft - sp;
    const sl = el.scrollLeft;
    if (sl >= upperSnap - 0.5)      teleport(-sw);
    else if (sl < lowerSnap - 0.5)  teleport(sw);
  };

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    // Position scroll at the start of the middle copy. Retry until layout is settled.
    let initRaf = 0;
    const init = () => {
      const items = el.querySelectorAll('[data-tile]');
      if (items.length < N * COPIES || items[N].offsetLeft === items[0].offsetLeft) {
        initRaf = requestAnimationFrame(init);
        return;
      }
      const sp = getSnapPad(el);
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

  // Dot click: scroll to the corresponding tile in the middle copy.
  const scrollToIndex = (i) => {
    const el = railRef.current;
    if (!el) return;
    const target = el.querySelectorAll('[data-tile]')[N + i];
    if (!target) return;
    const sp = getSnapPad(el);
    el.scrollTo({ left: Math.max(0, target.offsetLeft - sp), behavior: 'smooth' });
  };

  // Mouse drag-to-pan, with mid-drag teleport so the loop is invisible while dragging.
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

    const sw = setWidthRef.current;
    if (sw > 0) {
      const items = el.querySelectorAll('[data-tile]');
      if (items.length >= N * COPIES) {
        const sp = getSnapPad(el);
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
      aria-label="Meirro Pro gallery — studio renders and detail shots"
      className="relative bg-[#04040A] text-white py-24 md:py-36 overflow-hidden"
    >
      {/* Aurora bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 25%, rgba(124,92,252,0.18) 0%, transparent 65%), ' +
            'radial-gradient(ellipse 50% 35% at 85% 80%, rgba(196,75,247,0.10) 0%, transparent 60%)',
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>")',
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative max-w-[1100px] mx-auto px-6">
        <motion.div
          className="mb-12 md:mb-16 max-w-[820px]"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-semibold tracking-[3px] uppercase text-white/50 mb-5">
            The Gallery
          </p>
          <h2
            className="font-black tracking-[-0.05em] leading-[0.94] text-white"
            style={{ fontSize: 'clamp(40px, 5.5vw, 70px)' }}
          >
            Every{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #FF6B6B 0%, #FFD93D 22%, #6BCB77 44%, #4D96FF 66%, #A78BFA 83%, #E879F9 100%)',
              }}
            >
              angle.
            </span>
          </h2>
          <p
            className="mt-6 text-white/55 font-normal leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(14px, 1.4vw, 17px)' }}
          >
            Studio renders, in-context shots, and the details that don&apos;t
            make the spec sheet. Drag, scroll, or tap a dot — it loops.
          </p>
        </motion.div>
      </div>

      {/* Bleed rail */}
      <div className="relative">
        <div
          ref={railRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          className="gallery-rail flex gap-4 md:gap-5 select-none overflow-x-auto"
          style={{
            scrollPaddingLeft: 'max(24px, calc((100vw - 1100px) / 2 + 24px))',
            cursor: 'grab',
            paddingTop: 8,
            paddingBottom: 24,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {Array.from({ length: COPIES }).flatMap((_, copyIdx) =>
            tiles.map((tile, i) => {
              const isHero = tile.kind === 'hero';
              return (
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
                    width: isHero ? 'min(720px, 88vw)' : 'min(380px, 78vw)',
                    aspectRatio: isHero ? '4 / 5' : '3 / 4',
                    border: '1px solid rgba(255,255,255,0.07)',
                    boxShadow:
                      '0 30px 70px rgba(0,0,0,0.45), 0 4px 14px rgba(0,0,0,0.25)',
                  }}
                >
                  {/* Aurora — swap for <img> later */}
                  <div
                    className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    style={{ background: tile.aurora }}
                    aria-hidden="true"
                  />

                  {/* Scan lines */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-35"
                    style={{
                      background:
                        'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 6px)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Top sheen */}
                  <div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
                    aria-hidden="true"
                  />

                  {/* Bottom darken */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                    style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.55) 100%)' }}
                    aria-hidden="true"
                  />

                  {/* Index chip */}
                  <div
                    className="absolute top-5 left-5 px-2.5 py-1 rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <span className="text-[10px] font-semibold tracking-[2px] uppercase text-white/70 tabular-nums">
                      {tile.index} / {String(N).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Placeholder pill */}
                  <div
                    className="absolute top-5 right-5 px-2 py-0.5 rounded-full"
                    style={{
                      background: 'rgba(124,92,252,0.18)',
                      border: '1px solid rgba(167,139,250,0.3)',
                    }}
                    aria-hidden="true"
                  >
                    <span className="text-[9px] font-semibold tracking-[1.5px] uppercase text-white/65">
                      Placeholder
                    </span>
                  </div>

                  {/* Caption */}
                  <figcaption className="absolute left-6 right-6 bottom-6 z-10 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                    <p
                      className="font-bold text-white leading-tight"
                      style={{
                        fontSize: isHero ? 'clamp(20px, 2.4vw, 28px)' : 'clamp(16px, 1.6vw, 20px)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {tile.label}
                    </p>
                    <p
                      className="text-white/55 mt-1.5 font-normal"
                      style={{ fontSize: 'clamp(11px, 1vw, 13px)', letterSpacing: '0.01em' }}
                    >
                      {tile.sublabel}
                    </p>
                  </figcaption>
                </motion.figure>
              );
            })
          )}
        </div>

        {/* Edge fades */}
        <div
          className="absolute inset-y-0 left-0 w-16 md:w-32 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, rgba(4,4,10,1) 0%, transparent 100%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 w-16 md:w-32 pointer-events-none"
          style={{ background: 'linear-gradient(270deg, rgba(4,4,10,1) 0%, transparent 100%)' }}
          aria-hidden="true"
        />
      </div>

      {/* Footer row */}
      <div className="relative max-w-[1100px] mx-auto px-6 mt-10 md:mt-12 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span
            className="font-semibold tracking-[2px] tabular-nums text-white/75"
            style={{ fontSize: '11px' }}
          >
            {String(displayedActive + 1).padStart(2, '0')}
            <span className="text-white/30"> / {String(N).padStart(2, '0')}</span>
          </span>
          <span className="hidden sm:inline-block w-px h-3 bg-white/15" aria-hidden="true" />
          <span className="hidden sm:inline-block text-[10px] font-semibold tracking-[2px] uppercase text-white/35">
            Endless loop
          </span>
        </div>

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
                  ? 'rgba(167,139,250,0.95)'
                  : 'rgba(255,255,255,0.22)',
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
