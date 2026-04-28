'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const sections = [
  { id: 'preparation',    label: 'Preparation'    },
  { id: 'pixel-test',     label: 'Pixel Test'     },
  { id: 'uniformity',     label: 'Uniformity'     },
  { id: 'color-accuracy', label: 'Color Accuracy' },
  { id: 'hardware',       label: 'Hardware'       },
  { id: 'hw-calibration', label: 'Calibration & QC' },
];

const fsColors = [
  { hex: '#000000', label: 'Black' },
  { hex: '#FFFFFF', label: 'White' },
  { hex: '#FF0000', label: 'Red'   },
  { hex: '#00FF00', label: 'Green' },
  { hex: '#0000FF', label: 'Blue'  },
];

const refPatches = [
  { hex: '#FF0000', label: 'Red'     },
  { hex: '#00FF00', label: 'Green'   },
  { hex: '#0000FF', label: 'Blue'    },
  { hex: '#00FFFF', label: 'Cyan'    },
  { hex: '#FF00FF', label: 'Magenta' },
  { hex: '#FFFF00', label: 'Yellow'  },
  { hex: '#FFFFFF', label: 'White'   },
  { hex: '#000000', label: 'Black'   },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function TestingGuide() {
  const [active, setActive] = useState('preparation');
  const [checked, setChecked] = useState({});
  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  // ── Uniformity comparison slider ─────────────────────────────
  const [sliderPos, setSliderPos]     = useState(50);
  const sliderRef        = useRef(null);
  const isDraggingSlider = useRef(false);

  useEffect(() => {
    const onMove = (e) => {
      if (!isDraggingSlider.current || !sliderRef.current) return;
      const clientX = e.clientX ?? e.touches?.[0]?.clientX;
      const rect = sliderRef.current.getBoundingClientRect();
      setSliderPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
    };
    const onUp = () => { isDraggingSlider.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, []);
  // ─────────────────────────────────────────────────────────────

  // ── Fullscreen pixel test ────────────────────────────────────
  const [showFs, setShowFs]           = useState(false);
  const [fsColorIdx, setFsColorIdx]   = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const fsRef          = useRef(null);
  const overlayTimer   = useRef(null);

  const launchFullscreen = () => {
    setFsColorIdx(0);
    setOverlayVisible(true);
    setShowFs(true);
  };

  const exitFs = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else setShowFs(false);
  };

  // Enter fullscreen once the overlay div is rendered
  useEffect(() => {
    if (showFs && fsRef.current && !document.fullscreenElement) {
      fsRef.current.requestFullscreen().catch(() => {});
    }
  }, [showFs]);

  // Sync state when user exits via Escape
  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement) {
        setShowFs(false);
        setFsColorIdx(0);
        setOverlayVisible(true);
        setShowFsUnif(false);
        setUnifOverlay(true);
        setShowFsRef(false);
        setRefOverlay(true);
      }
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Arrow-key color cycling
  useEffect(() => {
    const onKey = (e) => {
      if (!showFs) return;
      if (e.key === 'ArrowRight') setFsColorIdx(i => (i + 1) % fsColors.length);
      if (e.key === 'ArrowLeft')  setFsColorIdx(i => (i - 1 + fsColors.length) % fsColors.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showFs]);

  const handleFsMouseMove = () => {
    setOverlayVisible(true);
    clearTimeout(overlayTimer.current);
    overlayTimer.current = setTimeout(() => setOverlayVisible(false), 2500);
  };

  useEffect(() => () => clearTimeout(overlayTimer.current), []);
  // ─────────────────────────────────────────────────────────────

  // ── Fullscreen uniformity slider ─────────────────────────────
  const [showFsUnif, setShowFsUnif]   = useState(false);
  const [fsUnifPos, setFsUnifPos]     = useState(50);
  const [unifOverlay, setUnifOverlay] = useState(true);
  const fsUnifRef        = useRef(null);
  const isDraggingFsUnif = useRef(false);
  const unifOverlayTimer = useRef(null);

  const launchFsUnif = () => {
    setFsUnifPos(50);
    setUnifOverlay(true);
    setShowFsUnif(true);
  };

  const exitFsUnif = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else setShowFsUnif(false);
  };

  useEffect(() => {
    if (showFsUnif && fsUnifRef.current && !document.fullscreenElement) {
      fsUnifRef.current.requestFullscreen().catch(() => {});
    }
  }, [showFsUnif]);

  const handleFsUnifMouseMove = (e) => {
    if (isDraggingFsUnif.current) {
      setFsUnifPos(Math.min(100, Math.max(0, (e.clientX / window.innerWidth) * 100)));
    }
    setUnifOverlay(true);
    clearTimeout(unifOverlayTimer.current);
    unifOverlayTimer.current = setTimeout(() => setUnifOverlay(false), 2500);
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!isDraggingFsUnif.current) return;
      const clientX = e.clientX ?? e.touches?.[0]?.clientX;
      setFsUnifPos(Math.min(100, Math.max(0, (clientX / window.innerWidth) * 100)));
    };
    const onUp = () => { isDraggingFsUnif.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  useEffect(() => () => clearTimeout(unifOverlayTimer.current), []);
  // ─────────────────────────────────────────────────────────────

  // ── Fullscreen reference patches ─────────────────────────────
  const [showFsRef, setShowFsRef]   = useState(false);
  const [fsRefIdx, setFsRefIdx]     = useState(0);
  const [refOverlay, setRefOverlay] = useState(true);
  const fsRefRef        = useRef(null);
  const refOverlayTimer = useRef(null);

  const launchFsRef = () => { setFsRefIdx(0); setRefOverlay(true); setShowFsRef(true); };
  const exitFsRef   = () => { if (document.fullscreenElement) document.exitFullscreen(); else setShowFsRef(false); };

  useEffect(() => {
    if (showFsRef && fsRefRef.current && !document.fullscreenElement) {
      fsRefRef.current.requestFullscreen().catch(() => {});
    }
  }, [showFsRef]);

  useEffect(() => {
    const onKey = (e) => {
      if (!showFsRef) return;
      if (e.key === 'ArrowRight') setFsRefIdx(i => (i + 1) % refPatches.length);
      if (e.key === 'ArrowLeft')  setFsRefIdx(i => (i - 1 + refPatches.length) % refPatches.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showFsRef]);

  const handleFsRefMouseMove = () => {
    setRefOverlay(true);
    clearTimeout(refOverlayTimer.current);
    refOverlayTimer.current = setTimeout(() => setRefOverlay(false), 2500);
  };

  useEffect(() => () => clearTimeout(refOverlayTimer.current), []);
  // ─────────────────────────────────────────────────────────────

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div style={{ background: '#04040A' }} className="min-h-screen text-white">

      {/* ── Top bar ───────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-50 border-b border-white/[0.07]"
        style={{ background: 'rgba(4,4,10,0.95)', backdropFilter: 'blur(24px) saturate(180%)' }}
      >
        <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 md:px-10" style={{ height: 52 }}>
          <Link href="/" className="text-[17px] font-bold tracking-[-0.04em] text-white">
            Meirro
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-[13px] transition-colors duration-200 ${
                  active === id ? 'text-white/90' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <Link
            href="/"
            className="text-[12px] text-white/40 hover:text-white/80 transition-colors duration-200"
          >
            ← Back to product
          </Link>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="border-b border-white/[0.06] relative overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[360px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top, rgba(124,92,252,0.10) 0%, transparent 70%)' }}
        />
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-16 pb-14 md:pt-20 md:pb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <span className="text-[11px] font-semibold tracking-[3px] uppercase text-white/35">
            Meirro Documentation
          </span>
          <h1
            className="font-black tracking-[-0.045em] text-white mt-3"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.08 }}
          >
            Meirro 6K Calibration<br />& Testing Guide
          </h1>
          <p className="mt-5 text-white/50 max-w-[520px] leading-relaxed" style={{ fontSize: 'clamp(14px, 1.5vw, 16px)' }}>
            Step-by-step procedures for verifying pixel integrity, colour accuracy, uniformity,
            and hardware compatibility on your Meirro Pro 32".
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {['6K · 6016×3384', 'DCI-P3 · 99%', 'ΔE < 1.5', 'Thunderbolt 4'].map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-3 py-1.5 rounded-full border border-white/[0.12] text-white/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
        </div>
      </div>

      {/* ── Mobile section tabs ───────────────────────────────────── */}
      <div className="md:hidden flex gap-1 overflow-x-auto px-6 py-4 border-b border-white/[0.06] no-scrollbar">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`shrink-0 text-[12px] px-3 py-1.5 rounded-full border transition-all duration-200 ${
              active === id
                ? 'border-[#7C5CFC]/60 text-white/90 bg-[#7C5CFC]/15'
                : 'border-white/[0.10] text-white/45'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Two-column layout ─────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto flex w-full">

        {/* Sticky sidebar */}
        <aside
          className="hidden md:flex flex-col w-52 flex-shrink-0 sticky border-r border-white/[0.06] overflow-y-auto"
          style={{ top: '52px', height: 'calc(100vh - 52px)' }}
        >
          <nav className="px-5 py-10 flex flex-col gap-0.5">
            <span className="text-[10px] font-semibold tracking-[2.5px] uppercase text-white/30 mb-5 px-3">
              In this guide
            </span>
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`relative text-left text-[13px] px-3 py-2 rounded-lg transition-all duration-200 ${
                  active === id
                    ? 'text-white bg-white/[0.06]'
                    : 'text-white/45 hover:text-white/75 hover:bg-white/[0.03]'
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="sidebarIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-full"
                    style={{ background: 'linear-gradient(180deg, #7C5CFC 0%, #C44BF7 100%)' }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span className="pl-2">{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Scrollable content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-[720px] mx-auto px-8 md:px-12 py-14 space-y-20">

            {/* ── 01 Preparation ───────────────────────────────────── */}
            <motion.section
              id="preparation"
              className="scroll-mt-[72px]"
              variants={fadeUp} initial="hidden"
              whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            >
              <span className="text-[11px] font-semibold tracking-[3px] uppercase" style={{ color: '#7C5CFC' }}>
                01 — Preparation
              </span>
              <h2
                className="font-black tracking-[-0.035em] text-white mt-2"
                style={{ fontSize: 'clamp(24px, 3.5vw, 36px)' }}
              >
                Before You Begin
              </h2>
              <p className="mt-4 text-white/50 leading-relaxed text-[15px]">
                Proper preparation ensures consistent, repeatable results. Skipping these steps can
                introduce errors that make a correctly calibrated display appear faulty.
              </p>
              <div className="mt-8 grid gap-3">
                {[
                  {
                    step: '01', title: 'Warm-up period',
                    body: 'Power on the Meirro Pro 32" and allow a minimum 30-minute warm-up. LCD panels require thermal stabilisation before accurate readings can be taken.',
                  },
                  {
                    step: '02', title: 'Room conditions',
                    body: 'Test in a darkened room or under controlled D65 daylight (6500 K) illumination. Avoid direct sunlight on the panel surface during colour testing.',
                  },
                  {
                    step: '03', title: 'Native resolution',
                    body: 'Set your OS to 6K native (6016 × 3384) at 60 Hz. Scaled or mirrored modes will not produce accurate uniformity readings.',
                  },
                  {
                    step: '04', title: 'Factory defaults',
                    body: 'Reset all OSD settings via Settings → Reset before testing. Existing brightness, contrast, or colour mode adjustments will skew results.',
                  },
                ].map(({ step, title, body }) => (
                  <div
                    key={step}
                    className="flex gap-5 p-5 rounded-2xl border border-white/[0.07]"
                    style={{ background: 'rgba(255,255,255,0.025)' }}
                  >
                    <span className="text-[11px] font-bold tracking-[1px] shrink-0 mt-0.5" style={{ color: '#7C5CFC' }}>
                      {step}
                    </span>
                    <div>
                      <p className="text-[14px] font-semibold text-white/85">{title}</p>
                      <p className="mt-1 text-[13px] text-white/45 leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Pre-test checklist */}
              <div className="mt-10">
                <p className="text-[11px] font-semibold tracking-[2.5px] uppercase text-white/30 mb-4">
                  Pre-test checklist
                </p>
                <div className="grid gap-3">
                  {[
                    {
                      id: 'ar-glass',
                      label: 'Clean the AR glass with a microfiber cloth',
                      sub: 'Remove fingerprints and dust from the anti-reflective coating before any visual test.',
                    },
                    {
                      id: 'accessories',
                      label: 'Ensure all accessories are present',
                      sub: 'Verify the box includes: USB-C cable, power adapter, stand hardware, and documentation.',
                    },
                    {
                      id: 'usbc-wake',
                      label: 'Connect via USB-C — verify auto-wake and 96W PD',
                      sub: 'The display should wake within 3 seconds of cable connection and accept 96W power delivery.',
                    },
                  ].map(({ id, label, sub }) => {
                    const on = !!checked[id];
                    return (
                      <button
                        key={id}
                        onClick={() => toggle(id)}
                        className={`w-full text-left flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 ${
                          on
                            ? 'border-green-500/40 bg-green-500/[0.07]'
                            : 'border-white/[0.07] bg-white/[0.025] hover:bg-white/[0.04] hover:border-white/[0.12]'
                        }`}
                      >
                        <div className={`shrink-0 w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          on ? 'border-green-500 bg-green-500' : 'border-white/25'
                        }`}>
                          {on && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className={`text-[14px] font-semibold transition-colors duration-200 ${
                            on ? 'text-green-400' : 'text-white/85'
                          }`}>
                            {label}
                          </p>
                          <p className="mt-0.5 text-[12px] text-white/40 leading-relaxed">{sub}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.section>

            <hr className="border-white/[0.06]" />

            {/* ── 02 Pixel Test ─────────────────────────────────────── */}
            <motion.section
              id="pixel-test"
              className="scroll-mt-[72px]"
              variants={fadeUp} initial="hidden"
              whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            >
              <span className="text-[11px] font-semibold tracking-[3px] uppercase" style={{ color: '#7C5CFC' }}>
                02 — Pixel Test
              </span>
              <h2
                className="font-black tracking-[-0.035em] text-white mt-2"
                style={{ fontSize: 'clamp(24px, 3.5vw, 36px)' }}
              >
                Dead & Stuck Pixel Detection
              </h2>
              <p className="mt-4 text-white/50 leading-relaxed text-[15px]">
                The Meirro Pro 32" ships under ISO 13406-2 Class I specification — zero dead pixels.
                Use the interactive fullscreen tool below, then reference the colour guide for manual inspection.
              </p>

              {/* Launch button */}
              <button
                onClick={launchFullscreen}
                className="mt-8 group flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/[0.10] transition-all duration-300 hover:border-[#7C5CFC]/50 hover:bg-[#7C5CFC]/[0.08]"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #7C5CFC 0%, #C44BF7 100%)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 2h4v2H4v2H2V2zm8 0h4v4h-2V4h-2V2zM2 10h2v2h2v2H2v-4zm10 2h2v2h-4v-2h2v-2h2v2z" fill="white" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-[14px] font-semibold text-white/90">Launch Fullscreen Test</p>
                  <p className="text-[12px] text-white/40 mt-0.5">Cycles Black → White → Red → Green → Blue. Look for any anomalous pixels.</p>
                </div>
              </button>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { fill: '#000000', label: 'Black',    note: 'Reveals bright stuck sub-pixels' },
                  { fill: '#FFFFFF', label: 'White',    note: 'Reveals dark dead pixels'        },
                  { fill: '#FF2D55', label: 'Red',      note: 'Red channel faults'              },
                  { fill: '#34C759', label: 'Green',    note: 'Green channel faults'            },
                  { fill: '#0A84FF', label: 'Blue',     note: 'Blue channel faults'             },
                  { fill: '#808080', label: '50% Grey', note: 'Stuck mid-tone pixels'           },
                ].map(({ fill, label, note }) => (
                  <div
                    key={label}
                    className="p-4 rounded-xl border border-white/[0.08]"
                    style={{ background: 'rgba(255,255,255,0.025)' }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg border border-white/[0.15] mb-3"
                      style={{ background: fill }}
                    />
                    <p className="text-[13px] font-semibold text-white/85">{label}</p>
                    <p className="text-[11px] text-white/40 mt-1 leading-snug">{note}</p>
                  </div>
                ))}
              </div>
              <div
                className="mt-5 p-5 rounded-2xl border border-white/[0.07]"
                style={{ background: 'rgba(124,92,252,0.07)' }}
              >
                <p className="text-[13px] font-semibold text-white/80">Pass Criteria</p>
                <p className="mt-1 text-[13px] text-white/50 leading-relaxed">
                  Zero dead or permanently stuck pixels. A temporarily stuck pixel may self-correct
                  within 72 hours of operation. If a defect persists, contact{' '}
                  <a href="mailto:support@clickclack.io" className="text-[#A78BFA] hover:text-white transition-colors">
                    support@clickclack.io
                  </a>.
                </p>
              </div>
            </motion.section>

            <hr className="border-white/[0.06]" />

            {/* ── 03 Uniformity ─────────────────────────────────────── */}
            <motion.section
              id="uniformity"
              className="scroll-mt-[72px]"
              variants={fadeUp} initial="hidden"
              whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            >
              <span className="text-[11px] font-semibold tracking-[3px] uppercase" style={{ color: '#7C5CFC' }}>
                03 — Uniformity
              </span>
              <h2
                className="font-black tracking-[-0.035em] text-white mt-2"
                style={{ fontSize: 'clamp(24px, 3.5vw, 36px)' }}
              >
                Screen Uniformity Check
              </h2>
              <p className="mt-4 text-white/50 leading-relaxed text-[15px]">
                Factory-level uniformity compensation is applied across the full 6K surface. Use the
                comparison tool below, then measure luminance at the nine reference points.
              </p>

              {/* ── Comparison slider ─────────────────────────── */}
              <div
                ref={sliderRef}
                className="mt-8 relative rounded-2xl overflow-hidden border border-white/[0.08] select-none"
                style={{ height: 240, cursor: 'col-resize' }}
                onMouseDown={(e) => {
                  isDraggingSlider.current = true;
                  const rect = sliderRef.current.getBoundingClientRect();
                  setSliderPos(Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100)));
                }}
                onTouchStart={(e) => {
                  isDraggingSlider.current = true;
                  const rect = sliderRef.current.getBoundingClientRect();
                  setSliderPos(Math.min(100, Math.max(0, ((e.touches[0].clientX - rect.left) / rect.width) * 100)));
                }}
              >
                {/* Image A — Black (backlight bleed) */}
                <div className="absolute inset-0" style={{ background: '#000' }}>
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-[2px] uppercase px-2.5 py-1 rounded-full border border-white/[0.15] text-white/50">
                      A
                    </span>
                    <span className="text-[12px] font-medium text-white/50">Backlight Bleed</span>
                  </div>
                  <p className="absolute bottom-4 left-4 text-[11px] text-white/30 leading-relaxed max-w-[160px]">
                    Darken the room and scan edges for light bleed
                  </p>
                </div>

                {/* Image B — White (colour tinting) */}
                <div
                  className="absolute inset-0"
                  style={{ background: '#fff', clipPath: `inset(0 0 0 ${sliderPos}%)` }}
                >
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="text-[12px] font-medium text-[#0A0A0C]/50">Colour Tinting</span>
                    <span className="text-[10px] font-bold tracking-[2px] uppercase px-2.5 py-1 rounded-full border border-black/[0.15] text-[#0A0A0C]/40">
                      B
                    </span>
                  </div>
                  <p className="absolute bottom-4 right-4 text-right text-[11px] text-[#0A0A0C]/35 leading-relaxed max-w-[160px]">
                    Look for warm or cool tints, especially in corners
                  </p>
                </div>

                {/* Drag handle */}
                <div
                  className="absolute top-0 bottom-0 flex flex-col items-center pointer-events-none"
                  style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
                >
                  <div className="w-px flex-1" style={{ background: 'rgba(200,200,200,0.7)' }} />
                  <div className="absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-[0_2px_16px_rgba(0,0,0,0.45)]">
                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                      <path d="M5 1L1 5l4 4M11 1l4 4-4 4" stroke="#0A0A0C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Brightness note */}
              <div
                className="mt-4 flex items-start gap-3 p-4 rounded-xl border border-[#7C5CFC]/25"
                style={{ background: 'rgba(124,92,252,0.06)' }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold"
                  style={{ background: 'rgba(124,92,252,0.25)', color: '#A78BFA' }}
                >
                  !
                </div>
                <p className="text-[13px] text-white/55 leading-relaxed">
                  <span className="text-white/80 font-semibold">Set display brightness to 100%</span> before
                  this test. The Meirro Pro 32" is rated at 500 nits peak luminance — full brightness is required
                  to verify this specification.
                </p>
              </div>

              {/* Launch fullscreen uniformity test */}
              <button
                onClick={launchFsUnif}
                className="mt-5 group w-full flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/[0.10] transition-all duration-300 hover:border-[#7C5CFC]/50 hover:bg-[#7C5CFC]/[0.08]"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #7C5CFC 0%, #C44BF7 100%)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 2h4v2H4v2H2V2zm8 0h4v4h-2V4h-2V2zM2 10h2v2h2v2H2v-4zm10 2h2v2h-4v-2h2v-2h2v2z" fill="white" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-[14px] font-semibold text-white/90">Launch Fullscreen Uniformity Test</p>
                  <p className="text-[12px] text-white/40 mt-0.5">Drag the black/white divider across your full panel to inspect for backlight bleed and colour tinting.</p>
                </div>
              </button>

              {/* 3×3 reference grid */}
              <div className="mt-8 flex flex-col items-start gap-3">
                <div className="inline-grid grid-cols-3 gap-2">
                  {['TL', 'TC', 'TR', 'ML', 'C', 'MR', 'BL', 'BC', 'BR'].map((pos) => (
                    <div
                      key={pos}
                      className={`w-16 h-14 md:w-20 md:h-16 rounded-xl border flex items-center justify-center text-[11px] font-semibold tracking-wide ${
                        pos === 'C'
                          ? 'border-[#7C5CFC]/60 text-[#A78BFA]'
                          : 'border-white/[0.12] text-white/35'
                      }`}
                      style={{ background: pos === 'C' ? 'rgba(124,92,252,0.10)' : 'rgba(255,255,255,0.025)' }}
                    >
                      {pos}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-white/30 tracking-[0.02em]">
                  9-point reference grid — centre (C) is the luminance baseline
                </p>
              </div>

              <div className="mt-8 grid gap-3">
                {[
                  {
                    metric: 'Luminance variance', value: 'ΔL < 8%',
                    note: 'Maximum deviation from the centre reading to any corner or edge point.',
                  },
                  {
                    metric: 'Colour temperature', value: 'ΔE < 3',
                    note: 'Acceptable colour shift across the panel surface at D65 white point.',
                  },
                  {
                    metric: 'Backlight bleed', value: 'N/A',
                    note: 'Mini-LED local dimming eliminates traditional backlight bleed. Check for halo artefacts around high-contrast edges instead.',
                  },
                ].map(({ metric, value, note }) => (
                  <div
                    key={metric}
                    className="flex items-start justify-between gap-6 p-5 rounded-2xl border border-white/[0.07]"
                    style={{ background: 'rgba(255,255,255,0.025)' }}
                  >
                    <div>
                      <p className="text-[14px] font-semibold text-white/85">{metric}</p>
                      <p className="mt-1 text-[13px] text-white/45 leading-relaxed">{note}</p>
                    </div>
                    <span className="shrink-0 text-[12px] font-semibold px-3 py-1 rounded-full border border-white/[0.12] text-white/65 whitespace-nowrap">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>

            <hr className="border-white/[0.06]" />

            {/* ── 04 Color Accuracy ─────────────────────────────────── */}
            <motion.section
              id="color-accuracy"
              className="scroll-mt-[72px]"
              variants={fadeUp} initial="hidden"
              whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            >
              <span className="text-[11px] font-semibold tracking-[3px] uppercase" style={{ color: '#7C5CFC' }}>
                04 — Color Accuracy
              </span>
              <h2
                className="font-black tracking-[-0.035em] text-white mt-2"
                style={{ fontSize: 'clamp(24px, 3.5vw, 36px)' }}
              >
                Factory Calibration Data
              </h2>
              <p className="mt-4 text-white/50 leading-relaxed text-[15px]">
                Every Meirro Pro 32" is individually calibrated at the factory, achieving{' '}
                <span className="text-white/80 font-medium">99% sRGB</span> and{' '}
                <span className="text-white/80 font-medium">99% DCI-P3</span> colour gamut coverage.
                Your unit's specific Delta E calibration report — including per-channel measurements
                and the colour gamut chart — is saved on the <span className="text-white/80 font-medium">USB drive included in the box</span>.
              </p>

              {/* ── Glowing download card ──────────────────────── */}
              <div
                className="mt-8 relative rounded-2xl overflow-hidden border border-[#7C5CFC]/30"
                style={{
                  background: 'linear-gradient(135deg, rgba(124,92,252,0.09) 0%, rgba(196,75,247,0.05) 100%)',
                  boxShadow: '0 0 0 1px rgba(124,92,252,0.18), 0 8px 32px rgba(124,92,252,0.18), 0 32px 72px rgba(124,92,252,0.09)',
                }}
              >
                {/* Ambient glow blob */}
                <div
                  className="absolute -top-10 -right-10 w-52 h-52 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(124,92,252,0.18) 0%, transparent 70%)' }}
                />
                <div
                  className="absolute -bottom-16 -left-10 w-44 h-44 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(196,75,247,0.10) 0%, transparent 70%)' }}
                />

                <div className="relative p-7 flex flex-col sm:flex-row sm:items-center gap-6">
                  {/* File icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(124,92,252,0.22) 0%, rgba(196,75,247,0.12) 100%)',
                      border: '1px solid rgba(124,92,252,0.35)',
                    }}
                  >
                    <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
                      <path d="M2 1h11l7 7v17H2V1z" fill="rgba(124,92,252,0.18)" stroke="rgba(167,139,250,0.65)" strokeWidth="1.4" strokeLinejoin="round" />
                      <path d="M13 1v7h7" stroke="rgba(167,139,250,0.45)" strokeWidth="1.4" strokeLinejoin="round" />
                      <path d="M6 13h10M6 17h8M6 21h5" stroke="rgba(167,139,250,0.55)" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-white/92 tracking-[-0.01em]">
                      Sample Factory Calibration Report
                    </p>
                    <p className="mt-1.5 text-[13px] text-white/45 leading-relaxed">
                      View a representative report from production. For your unit's exact figures,
                      locate the USB drive in your Meirro box — it contains your serial-specific
                      Delta E measurements and gamut coverage chart.
                    </p>
                    <p className="mt-3 text-[11px] font-medium tracking-[0.03em] text-white/28">
                      meirro-pro-32-sample-calibration.pdf · PDF · 2.4 MB
                    </p>
                  </div>

                  {/* Download button */}
                  <a
                    href="#"
                    className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-opacity duration-200 hover:opacity-80 whitespace-nowrap"
                    style={{ background: 'linear-gradient(135deg, #7C5CFC 0%, #C44BF7 100%)' }}
                  >
                    <svg width="13" height="14" viewBox="0 0 13 14" fill="none">
                      <path d="M6.5 1v8M6.5 9L3.5 6M6.5 9l3-3M1 12h11" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Download Sample
                  </a>
                </div>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {[
                  { label: 'sRGB Coverage',   value: '100%',   sub: 'Full sRGB gamut'              },
                  { label: 'DCI-P3 Coverage', value: '99%',    sub: 'Wide colour for creative work' },
                  { label: 'Rec.2020',         value: '80%',    sub: 'HDR production reference'     },
                  { label: 'Avg. Delta E',     value: '< 1.5',  sub: 'Imperceptible colour error'   },
                  { label: 'White Point',      value: 'D65',    sub: '6500 K daylight standard'     },
                  { label: 'Target Gamma',     value: '2.2',    sub: 'Display-P3 TRC on macOS'      },
                ].map(({ label, value, sub }) => (
                  <div
                    key={label}
                    className="p-5 rounded-2xl border border-white/[0.07]"
                    style={{ background: 'rgba(255,255,255,0.025)' }}
                  >
                    <p className="text-[11px] font-semibold tracking-[2px] uppercase text-white/35">{label}</p>
                    <p
                      className="font-black tracking-[-0.03em] mt-1"
                      style={{
                        fontSize: 'clamp(22px, 3vw, 28px)',
                        background: 'linear-gradient(135deg, #7C5CFC 0%, #C44BF7 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {value}
                    </p>
                    <p className="text-[12px] text-white/40 mt-1">{sub}</p>
                  </div>
                ))}
              </div>
              <div
                className="mt-5 p-5 rounded-2xl border border-white/[0.07]"
                style={{ background: 'rgba(255,255,255,0.025)' }}
              >
                <p className="text-[13px] font-semibold text-white/80 mb-3">Hardware Calibration Tools</p>
                <div className="flex flex-wrap gap-2">
                  {['DisplayCAL (free)', 'X-Rite i1Display Pro', 'Datacolor Spyder X', 'Calibrite ColorChecker'].map((tool) => (
                    <span
                      key={tool}
                      className="text-[11px] px-3 py-1.5 rounded-full border border-white/[0.10] text-white/50"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-[12px] text-white/40 leading-relaxed">
                  For professional colour grading, recalibrate every 200 hours of use or when
                  ambient lighting conditions change significantly.
                </p>
              </div>
            </motion.section>

            <hr className="border-white/[0.06]" />

            {/* ── 05 Hardware ───────────────────────────────────────── */}
            <motion.section
              id="hardware"
              className="scroll-mt-[72px]"
              variants={fadeUp} initial="hidden"
              whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            >
              <span className="text-[11px] font-semibold tracking-[3px] uppercase" style={{ color: '#7C5CFC' }}>
                05 — Hardware
              </span>
              <h2
                className="font-black tracking-[-0.035em] text-white mt-2"
                style={{ fontSize: 'clamp(24px, 3.5vw, 36px)' }}
              >
                Compatibility & Requirements
              </h2>
              <p className="mt-4 text-white/50 leading-relaxed text-[15px]">
                Driving 6K at 60 Hz requires sufficient bandwidth. Not all cables and GPUs are
                capable — use the tables below to verify your setup before testing.
              </p>

              <div className="mt-8 space-y-5">
                <div>
                  <p className="text-[11px] font-semibold tracking-[2.5px] uppercase text-white/30 mb-3">
                    Cable Requirements
                  </p>
                  <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
                    {[
                      { cable: 'Thunderbolt 4 / USB4',      hz: '60 Hz', status: 'Recommended',   color: 'purple' },
                      { cable: 'DisplayPort 2.1',            hz: '60 Hz', status: 'Supported',     color: 'white'  },
                      { cable: 'DisplayPort 1.4',            hz: '30 Hz', status: 'Limited',       color: 'yellow' },
                      { cable: 'HDMI 2.1',                   hz: '—',     status: 'Not Supported', color: 'red'    },
                    ].map(({ cable, hz, status, color }, i) => (
                      <div
                        key={cable}
                        className={`flex items-center justify-between px-5 py-3.5 text-[13px] ${i !== 0 ? 'border-t border-white/[0.05]' : ''}`}
                        style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}
                      >
                        <span className="text-white/70 font-medium">{cable}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-white/35 text-[12px]">{hz}</span>
                          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                            color === 'purple' ? 'bg-[#7C5CFC]/20 text-[#A78BFA]'
                            : color === 'yellow' ? 'bg-yellow-500/10 text-yellow-400/70'
                            : color === 'red'    ? 'bg-red-500/10 text-red-400/60'
                            : 'bg-white/[0.06] text-white/55'
                          }`}>
                            {status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold tracking-[2.5px] uppercase text-white/30 mb-3">
                    GPU Compatibility (6K @ 60 Hz)
                  </p>
                  <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
                    {[
                      { gpu: 'Apple M1 Pro / Max / Ultra or newer', status: 'Fully Supported',  color: 'purple' },
                      { gpu: 'NVIDIA RTX 3080 or newer',            status: 'Fully Supported',  color: 'purple' },
                      { gpu: 'AMD RX 6800 or newer',                status: 'Fully Supported',  color: 'purple' },
                      { gpu: 'NVIDIA RTX 2080 / AMD RX 5700',       status: 'DP 2.1 required',  color: 'white'  },
                    ].map(({ gpu, status, color }, i) => (
                      <div
                        key={gpu}
                        className={`flex items-center justify-between gap-4 px-5 py-3.5 text-[13px] ${i !== 0 ? 'border-t border-white/[0.05]' : ''}`}
                        style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}
                      >
                        <span className="text-white/70 font-medium">{gpu}</span>
                        <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                          color === 'purple' ? 'bg-[#7C5CFC]/20 text-[#A78BFA]' : 'bg-white/[0.06] text-white/55'
                        }`}>
                          {status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="p-5 rounded-2xl border border-white/[0.07]"
                  style={{ background: 'rgba(255,255,255,0.025)' }}
                >
                  <p className="text-[13px] font-semibold text-white/80">Firmware Check</p>
                  <p className="mt-1 text-[13px] text-white/45 leading-relaxed">
                    Ensure the latest firmware is installed before testing. Navigate to{' '}
                    <span className="text-white/70 font-medium">Settings → About → Firmware Version</span>{' '}
                    and compare against the latest release. Contact{' '}
                    <a href="mailto:support@clickclack.io" className="text-[#A78BFA] hover:text-white transition-colors">
                      support@clickclack.io
                    </a>{' '}
                    for firmware update files.
                  </p>
                </div>
              </div>
            </motion.section>

            <hr className="border-white/[0.06]" />

            {/* ── 06 Hardware Calibration & QC ─────────────────────── */}
            <motion.section
              id="hw-calibration"
              className="scroll-mt-[72px]"
              variants={fadeUp} initial="hidden"
              whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            >
              <span className="text-[11px] font-semibold tracking-[3px] uppercase" style={{ color: '#7C5CFC' }}>
                06 — Hardware Calibration
              </span>
              <h2
                className="font-black tracking-[-0.035em] text-white mt-2"
                style={{ fontSize: 'clamp(24px, 3.5vw, 36px)' }}
              >
                Hardware Calibration
              </h2>
              <p className="mt-4 text-white/50 leading-relaxed text-[15px]">
                Verify your display's performance or build a custom ICC profile using a hardware colorimeter.
                Complete the environment checklist before taking any measurements.
              </p>

              {/* ── Bento grid ───────────────────────────────────── */}
              <div className="mt-8 grid gap-4">

                {/* Row 1 — Steps 1 & 2 */}
                <div className="grid sm:grid-cols-2 gap-4">

                  {/* Step 1 — Environment Setup */}
                  <div
                    className="p-6 rounded-2xl border border-white/[0.07]"
                    style={{ background: 'rgba(255,255,255,0.025)' }}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0"
                        style={{ background: 'rgba(124,92,252,0.2)', color: '#A78BFA' }}
                      >
                        1
                      </span>
                      <p className="text-[14px] font-semibold text-white/85">Environment Setup</p>
                    </div>
                    <p className="text-[11px] font-semibold tracking-[2px] uppercase text-white/30 mb-4 pl-10">
                      Complete all before proceeding
                    </p>
                    <div className="space-y-2">
                      {[
                        { id: 'calib-warmup',   label: 'Monitor has been powered on for at least 30 minutes to stabilize the backlight' },
                        { id: 'calib-lighting', label: 'Room lighting is completely dark or strictly controlled' },
                        { id: 'calib-osd',      label: 'Monitor is set to Factory Default settings via the OSD menu' },
                        { id: 'calib-hw',       label: 'Connect hardware calibrator (e.g., Calibrite, Datacolor) flush against the center of the panel' },
                      ].map(({ id, label }) => {
                        const on = !!checked[id];
                        return (
                          <button
                            key={id}
                            onClick={() => toggle(id)}
                            className={`w-full text-left flex items-start gap-3 p-3.5 rounded-xl border transition-all duration-300 ${
                              on
                                ? 'border-green-500/40 bg-green-500/[0.07]'
                                : 'border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12]'
                            }`}
                          >
                            <div className={`shrink-0 w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                              on ? 'border-green-500 bg-green-500' : 'border-white/25'
                            }`}>
                              {on && (
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <p className={`text-[13px] font-medium leading-snug transition-colors duration-200 ${
                              on ? 'text-green-400' : 'text-white/60'
                            }`}>
                              {label}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2 — Target Specifications */}
                  <div
                    className="p-6 rounded-2xl border border-white/[0.07]"
                    style={{ background: 'rgba(255,255,255,0.025)' }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0"
                        style={{ background: 'rgba(124,92,252,0.2)', color: '#A78BFA' }}
                      >
                        2
                      </span>
                      <p className="text-[14px] font-semibold text-white/85">Target Specifications</p>
                      <span className="ml-auto text-[10px] font-semibold tracking-[2px] uppercase px-2 py-1 rounded-full border border-white/[0.10] text-white/30 shrink-0">
                        Pass Criteria
                      </span>
                    </div>

                    {/* Metric cards */}
                    <div className="space-y-2.5">

                      {/* Peak Luminance */}
                      <div
                        className="p-4 rounded-xl border border-white/[0.07]"
                        style={{ background: 'rgba(255,255,255,0.02)' }}
                      >
                        <p className="text-[10px] font-semibold tracking-[2.5px] uppercase text-white/35 mb-1.5">
                          Peak Luminance
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span
                            className="font-black tracking-[-0.04em] leading-none"
                            style={{
                              fontSize: 38,
                              background: 'linear-gradient(135deg, #7C5CFC 0%, #C44BF7 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            500
                          </span>
                          <span className="text-[15px] font-semibold text-white/40 mb-0.5">nits</span>
                        </div>
                      </div>

                      {/* Color Gamut — DCI-P3 + sRGB side by side */}
                      <div className="grid grid-cols-2 gap-2.5">
                        {[
                          { label: 'DCI-P3', sub: 'Color Gamut', value: '99%' },
                          { label: 'sRGB',   sub: 'Color Gamut', value: '99%' },
                        ].map(({ label, value }) => (
                          <div
                            key={label}
                            className="p-4 rounded-xl border border-white/[0.07]"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                          >
                            <p className="text-[10px] font-semibold tracking-[2.5px] uppercase text-white/35 mb-1.5">
                              {label}
                            </p>
                            <span
                              className="font-black tracking-[-0.04em] leading-none"
                              style={{
                                fontSize: 34,
                                background: 'linear-gradient(135deg, #7C5CFC 0%, #C44BF7 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                              }}
                            >
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Color Accuracy */}
                      <div
                        className="p-4 rounded-xl border border-white/[0.07]"
                        style={{ background: 'rgba(255,255,255,0.02)' }}
                      >
                        <p className="text-[10px] font-semibold tracking-[2.5px] uppercase text-white/35 mb-1.5">
                          Color Accuracy
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span
                            className="font-black tracking-[-0.04em] leading-none"
                            style={{
                              fontSize: 38,
                              background: 'linear-gradient(135deg, #7C5CFC 0%, #C44BF7 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            ≤ 2.0
                          </span>
                          <span className="text-[15px] font-semibold text-white/40 mb-0.5">ΔE avg</span>
                        </div>
                      </div>
                    </div>

                    {/* Failure / reject note */}
                    <div
                      className="mt-4 flex items-start gap-3 p-4 rounded-xl border border-red-500/20"
                      style={{ background: 'rgba(239,68,68,0.06)' }}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold"
                        style={{ background: 'rgba(239,68,68,0.2)', color: '#F87171' }}
                      >
                        !
                      </div>
                      <p className="text-[12px] text-white/50 leading-relaxed">
                        <span className="text-red-400/80 font-semibold">If any metric falls outside these targets, </span>run a full recalibration before using the display for colour-critical work.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Row 2 — Step 3: Hardware Calibration Routine (full width) */}
                <div
                  className="p-6 rounded-2xl border border-white/[0.07]"
                  style={{ background: 'rgba(255,255,255,0.025)' }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0"
                      style={{ background: 'rgba(124,92,252,0.2)', color: '#A78BFA' }}
                    >
                      3
                    </span>
                    <p className="text-[14px] font-semibold text-white/85">Hardware Calibration Routine</p>
                  </div>

                  {/* Instructions */}
                  <p className="text-[13px] text-white/50 leading-relaxed mb-5">
                    Open your calibrator's companion software (DisplayCAL, Calibrite PROFILER, or Datacolor DISPLAY). When prompted to display a specific colour patch, use the button below. Your software will read each patch directly from the screen.
                  </p>

                  {/* Launch Reference Patches button */}
                  <button
                    onClick={launchFsRef}
                    className="mb-6 group w-full flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/[0.10] transition-all duration-300 hover:border-[#7C5CFC]/50 hover:bg-[#7C5CFC]/[0.08]"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                      style={{ background: 'linear-gradient(135deg, #7C5CFC 0%, #C44BF7 100%)' }}
                    >
                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                        <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.9" />
                        <rect x="10" y="1" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.6" />
                        <rect x="1" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.6" />
                        <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.3" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-[14px] font-semibold text-white/90">Launch Reference Patches</p>
                      <p className="text-[12px] text-white/40 mt-0.5">
                        8 patches at 100% saturation — Red · Green · Blue · Cyan · Magenta · Yellow · White · Black. Use ← → to cycle.
                      </p>
                    </div>
                  </button>

                </div>
              </div>
            </motion.section>

            <div className="pb-12" />
          </div>
        </main>
      </div>

      {/* ── Fullscreen pixel test overlay ────────────────────────── */}
      {showFs && (
        <div
          ref={fsRef}
          onMouseMove={handleFsMouseMove}
          style={{ background: fsColors[fsColorIdx].hex, cursor: overlayVisible ? 'default' : 'none' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
        >
          {/* Central 5×5 cm zone indicator */}
          <div
            className="pointer-events-none"
            style={{
              width: 190, height: 190,
              border: `1.5px dashed ${fsColors[fsColorIdx].hex === '#FFFFFF' ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.22)'}`,
              borderRadius: 6,
              position: 'relative',
            }}
          >
            <span
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium tracking-[0.04em]"
              style={{ color: fsColors[fsColorIdx].hex === '#FFFFFF' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)' }}
            >
              Central 5 × 5 cm zone
            </span>
          </div>

          {/* Fade overlay — hides after 2.5 s of inactivity */}
          <div
            className="absolute inset-0 flex flex-col justify-between transition-opacity duration-500"
            style={{ opacity: overlayVisible ? 1 : 0, pointerEvents: overlayVisible ? 'auto' : 'none' }}
          >
            {/* Top bar */}
            <div style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, transparent 100%)' }} className="px-8 pt-8 pb-16">
              <p className="text-white text-[15px] font-semibold tracking-[-0.01em]">
                Pixel & Screen Health Test
              </p>
              <p className="mt-1 text-white/60 text-[13px] max-w-[520px] leading-relaxed">
                Scan the entire panel for dead or bright pixels. Pay close attention to the central 5 × 5 cm zone. Move the mouse to show controls.
              </p>
            </div>

            {/* Bottom bar */}
            <div style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)' }} className="px-8 pb-8 pt-16 flex items-center justify-between flex-wrap gap-4">
              {/* Color swatches */}
              <div className="flex items-center gap-3">
                {fsColors.map(({ hex, label }, i) => (
                  <button
                    key={hex}
                    onClick={() => setFsColorIdx(i)}
                    title={label}
                    className="transition-transform duration-150 hover:scale-110"
                    style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: hex,
                      border: i === fsColorIdx
                        ? '3px solid rgba(255,255,255,0.95)'
                        : '2px solid rgba(255,255,255,0.35)',
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                  />
                ))}
                <span className="text-white/40 text-[12px] ml-2 hidden sm:block">
                  or use ← → keys
                </span>
              </div>

              {/* Exit */}
              <button
                onClick={exitFs}
                className="text-[13px] font-medium text-white/80 hover:text-white transition-colors px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(12px)',
                  cursor: 'pointer',
                }}
              >
                Exit — Esc
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Fullscreen uniformity overlay ───────────────────────── */}
      {showFsUnif && (
        <div
          ref={fsUnifRef}
          className="fixed inset-0 z-[9999] select-none"
          style={{ cursor: unifOverlay ? 'default' : 'none' }}
          onMouseDown={(e) => {
            isDraggingFsUnif.current = true;
            setFsUnifPos(Math.min(100, Math.max(0, (e.clientX / window.innerWidth) * 100)));
          }}
          onMouseMove={handleFsUnifMouseMove}
          onTouchStart={(e) => {
            isDraggingFsUnif.current = true;
            setFsUnifPos(Math.min(100, Math.max(0, (e.touches[0].clientX / window.innerWidth) * 100)));
          }}
          onTouchMove={(e) => {
            if (!isDraggingFsUnif.current) return;
            setFsUnifPos(Math.min(100, Math.max(0, (e.touches[0].clientX / window.innerWidth) * 100)));
          }}
        >
          {/* Black panel */}
          <div className="absolute inset-0" style={{ background: '#000' }} />

          {/* White panel */}
          <div
            className="absolute inset-0"
            style={{ background: '#fff', clipPath: `inset(0 0 0 ${fsUnifPos}%)` }}
          />

          {/* Drag handle */}
          <div
            className="absolute top-0 bottom-0 flex flex-col items-center pointer-events-none"
            style={{ left: `${fsUnifPos}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-px flex-1" style={{ background: 'rgba(128,128,128,0.75)' }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path d="M5 1L1 5l4 4M11 1l4 4-4 4" stroke="#0A0A0C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Fade overlay */}
          <div
            className="absolute inset-0 flex flex-col justify-between transition-opacity duration-500"
            style={{ opacity: unifOverlay ? 1 : 0, pointerEvents: unifOverlay ? 'auto' : 'none' }}
          >
            {/* Top */}
            <div style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.68) 0%, transparent 100%)' }} className="px-8 pt-8 pb-16">
              <p className="text-white text-[15px] font-semibold tracking-[-0.01em]">Uniformity & Brightness Test</p>
              <p className="mt-1 text-white/60 text-[13px] max-w-[520px] leading-relaxed">
                Drag the divider across the full panel. Black: look for backlight bleed around edges (darken the room first). White: look for warm or cool tints in corners. Move the mouse to show controls.
              </p>
            </div>

            {/* Bottom */}
            <div style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.68) 0%, transparent 100%)' }} className="px-8 pb-8 pt-16 flex items-end justify-between flex-wrap gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border border-white/40" style={{ background: 'rgba(255,255,255,0.15)' }} />
                  <span className="text-white/55 text-[12px] font-medium">A — Backlight Bleed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-white border border-black/20" />
                  <span className="text-white/55 text-[12px] font-medium">B — Colour Tinting</span>
                </div>
              </div>
              <button
                onClick={exitFsUnif}
                className="text-[13px] font-medium text-white/80 hover:text-white transition-colors px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(12px)',
                  cursor: 'pointer',
                }}
              >
                Exit — Esc
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Fullscreen reference patches overlay ────────────────── */}
      {showFsRef && (() => {
        const patch      = refPatches[fsRefIdx];
        const lightBg    = ['#00FF00', '#00FFFF', '#FFFF00', '#FFFFFF'].includes(patch.hex);
        const fg         = lightBg ? 'rgba(0,0,0,0.80)' : 'rgba(255,255,255,0.90)';
        const fgMuted    = lightBg ? 'rgba(0,0,0,0.40)' : 'rgba(255,255,255,0.45)';
        const gradColor  = lightBg ? 'rgba(255,255,255,0.60)' : 'rgba(0,0,0,0.70)';
        const borderCol  = lightBg ? 'rgba(0,0,0,0.20)'       : 'rgba(255,255,255,0.20)';
        return (
          <div
            ref={fsRefRef}
            onMouseMove={handleFsRefMouseMove}
            className="fixed inset-0 z-[9999]"
            style={{ background: patch.hex, cursor: refOverlay ? 'default' : 'none' }}
          >
            {/* Fade overlay */}
            <div
              className="absolute inset-0 flex flex-col justify-between transition-opacity duration-500"
              style={{ opacity: refOverlay ? 1 : 0, pointerEvents: refOverlay ? 'auto' : 'none' }}
            >
              {/* Top bar */}
              <div
                className="px-8 pt-8 pb-20"
                style={{ background: `linear-gradient(to bottom, ${gradColor} 0%, transparent 100%)` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[15px] font-semibold tracking-[-0.01em]" style={{ color: fg }}>
                      Reference Colour Patches
                    </p>
                    <p className="mt-1 text-[13px] max-w-[480px] leading-relaxed" style={{ color: fgMuted }}>
                      Advance your calibration software to the matching patch, then use ← → to cycle. Move the mouse to show controls.
                    </p>
                  </div>
                  {/* Patch counter */}
                  <span
                    className="shrink-0 text-[13px] font-semibold px-3 py-1.5 rounded-full mt-0.5"
                    style={{ background: borderCol, color: fg }}
                  >
                    {fsRefIdx + 1} / {refPatches.length}
                  </span>
                </div>
              </div>

              {/* Centre label */}
              <div className="flex flex-col items-center justify-center gap-3 pointer-events-none select-none">
                <span
                  className="font-black tracking-[-0.04em]"
                  style={{ fontSize: 'clamp(48px, 8vw, 96px)', color: fg, lineHeight: 1 }}
                >
                  {patch.label}
                </span>
                <span className="text-[13px] font-mono tracking-[0.06em] font-medium" style={{ color: fgMuted }}>
                  {patch.hex.toUpperCase()}
                </span>
              </div>

              {/* Bottom bar */}
              <div
                className="px-8 pb-8 pt-20 flex items-end justify-between flex-wrap gap-4"
                style={{ background: `linear-gradient(to top, ${gradColor} 0%, transparent 100%)` }}
              >
                {/* Patch strip */}
                <div className="flex items-center gap-2">
                  {refPatches.map(({ hex, label }, i) => (
                    <button
                      key={hex}
                      onClick={() => setFsRefIdx(i)}
                      title={label}
                      className="transition-transform duration-150 hover:scale-110"
                      style={{
                        width: i === fsRefIdx ? 36 : 28,
                        height: i === fsRefIdx ? 36 : 28,
                        borderRadius: '50%',
                        background: hex,
                        border: i === fsRefIdx
                          ? `3px solid ${lightBg ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.9)'}`
                          : `2px solid ${lightBg ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.30)'}`,
                        cursor: 'pointer',
                        outline: 'none',
                        transition: 'width 0.15s, height 0.15s',
                      }}
                    />
                  ))}
                  <span className="text-[12px] ml-2 hidden sm:block" style={{ color: fgMuted }}>
                    or use ← → keys
                  </span>
                </div>

                {/* Exit */}
                <button
                  onClick={exitFsRef}
                  className="text-[13px] font-medium transition-opacity duration-200 hover:opacity-80 px-4 py-2 rounded-full"
                  style={{
                    background: borderCol,
                    border: `1px solid ${borderCol}`,
                    backdropFilter: 'blur(12px)',
                    color: fg,
                    cursor: 'pointer',
                  }}
                >
                  Exit — Esc
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Footer strip ──────────────────────────────────────────── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-6 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-[11px] text-white/25">© 2026 Meirro Technologies. All rights reserved.</p>
          <Link href="/" className="text-[11px] text-white/40 hover:text-white/70 transition-colors duration-200">
            ← Back to meirro.web.app
          </Link>
        </div>
      </div>

    </div>
  );
}
