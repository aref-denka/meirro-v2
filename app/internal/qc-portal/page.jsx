'use client';

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const BRAND_COLORS = ['#7C5CFC', '#A78BFA', '#C44BF7', '#22C55E', '#4ADE80', '#ffffff'];

const fireStepBurst = () => {
  confetti({
    particleCount: 45,
    spread: 60,
    origin: { x: 0.5, y: 0.65 },
    colors: BRAND_COLORS,
    startVelocity: 28,
    ticks: 80,
    gravity: 1.1,
    scalar: 0.85,
  });
};

const fireAllComplete = () => {
  const opts = {
    spread: 60,
    colors: BRAND_COLORS,
    startVelocity: 45,
    ticks: 200,
    gravity: 0.8,
    scalar: 1.1,
  };
  confetti({ ...opts, particleCount: 90, angle: 60,  origin: { x: 0,   y: 0.7 } });
  confetti({ ...opts, particleCount: 90, angle: 120, origin: { x: 1,   y: 0.7 } });
  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: BRAND_COLORS,
      startVelocity: 20,
      ticks: 150,
      gravity: 0.9,
      scalar: 0.9,
    });
  }, 300);
};

const QC_PASSWORD = 'MEIRRO-QC-2026';

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

const pixelColors = [
  { hex: '#000000', label: 'Black' },
  { hex: '#FFFFFF', label: 'White' },
  { hex: '#FF0000', label: 'Red'   },
  { hex: '#00FF00', label: 'Green' },
  { hex: '#0000FF', label: 'Blue'  },
];

const step1Items = [
  { id: 'warmup',   label: 'Monitor powered on for at least 30 minutes to stabilize the backlight' },
  { id: 'lighting', label: 'Room lighting is completely dark or strictly controlled' },
  { id: 'osd',      label: 'Monitor reset to Factory Default settings via the OSD menu' },
  { id: 'hw',       label: 'Hardware calibrator connected flush against the center of the panel' },
];

const step2Items = [
  { id: 'pixels',   label: 'Zero dead or bright pixels in the central 5×5 cm zone' },
  { id: 'subpixel', label: 'Maximum of 1 sub-pixel defect panel-wide' },
  { id: 'bleed',    label: 'No corner bleed visible at 50cm on black field' },
  { id: 'tint',     label: 'Zero colour tinting visible on white field' },
];

const step3Items = [
  { id: 'lum',    label: 'Peak Luminance ≥ 500 nits — pass confirmed' },
  { id: 'dcip3',  label: 'DCI-P3 coverage ≥ 99% — pass confirmed' },
  { id: 'srgb',   label: 'sRGB coverage ≥ 99% — pass confirmed' },
  { id: 'deltae', label: 'Delta E avg ≤ 2.0 — pass confirmed' },
];

const step4Items = refPatches.map(({ label }) => ({ id: label.toLowerCase(), label: `${label} patch measured and recorded` }));

const specs = [
  {
    label: 'Peak Luminance',
    value: '500',
    unit: 'nits',
    how: 'Open your calibration software, place the colorimeter probe flat against the centre of the screen, then trigger a 100% white patch. The software will show a live brightness reading in nits.',
  },
  {
    label: 'DCI-P3',
    value: '99%',
    unit: 'gamut',
    how: 'Run the colour gamut test in your calibration software. It displays a sequence of colour patches and automatically calculates what percentage of the DCI-P3 colour space the screen can reproduce.',
  },
  {
    label: 'sRGB',
    value: '99%',
    unit: 'gamut',
    how: 'The same colour gamut test also measures sRGB coverage — no extra steps needed. Both results appear on the same summary page.',
  },
  {
    label: 'Delta E avg',
    value: '≤ 2.0',
    unit: 'ΔE',
    how: 'Run the greyscale and colour accuracy test. The software calculates Delta E (ΔE) — a number that measures how far each displayed colour is from its target. Under 2.0 is considered accurate; anything above is a fail.',
  },
];

const PURPLE      = '#7C5CFC';
const PURPLE_SOFT = '#A78BFA';
const PURPLE_GRAD = 'linear-gradient(135deg, #7C5CFC 0%, #C44BF7 100%)';
const GREEN       = '#22C55E';
const GREEN_DIM   = '#4ADE80';

const stepLabels = ['Pre-Calibration', 'Screen Health', 'Target Specs', 'Ref Patches'];

// Reusable checklist row — circular checkbox, testing-guide style
function CheckItem({ id, label, checked, onToggle }) {
  const on = !!checked;
  return (
    <button
      onClick={() => onToggle(id)}
      className={`w-full text-left flex items-center gap-3.5 px-4 py-3.5 rounded-xl border transition-all duration-200 ${
        on
          ? 'border-green-500/40 bg-green-500/[0.07]'
          : 'border-white/[0.07] bg-white/[0.025] hover:bg-white/[0.04] hover:border-white/[0.12]'
      }`}
    >
      <div className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
        on ? 'border-green-500 bg-green-500' : 'border-white/25'
      }`}>
        {on && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className={`text-[13px] font-medium leading-snug transition-colors duration-200 ${
        on ? 'text-green-400' : 'text-white/70'
      }`}>
        {label}
      </span>
    </button>
  );
}

// Thin progress bar at the top of each step card
function StepProgressBar({ count, total, complete }) {
  return (
    <div className="h-[3px]" style={{ background: 'rgba(255,255,255,0.05)' }}>
      <div
        className="h-full transition-all duration-500"
        style={{
          width: `${(count / total) * 100}%`,
          background: complete ? GREEN : PURPLE_GRAD,
        }}
      />
    </div>
  );
}

export default function QCPortal() {
  // ── Auth ─────────────────────────────────────────────────────
  const [unlocked, setUnlocked] = useState(false);
  const [pwInput,  setPwInput]  = useState('');
  const [pwError,  setPwError]  = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('meirro-qc-auth') === '1') setUnlocked(true);
  }, []);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (pwInput === QC_PASSWORD) {
      sessionStorage.setItem('meirro-qc-auth', '1');
      setUnlocked(true);
    } else {
      setPwError(true);
      setPwInput('');
      setTimeout(() => setPwError(false), 1800);
    }
  };

  // ── Step checklists ──────────────────────────────────────────
  const [s1, setS1] = useState({});
  const [s2, setS2] = useState({});
  const [s3, setS3] = useState({});
  const [s4, setS4] = useState({});

  const toggle1 = (id) => setS1(p => ({ ...p, [id]: !p[id] }));
  const toggle2 = (id) => setS2(p => ({ ...p, [id]: !p[id] }));
  const toggle3 = (id) => setS3(p => ({ ...p, [id]: !p[id] }));
  const toggle4 = (id) => setS4(p => ({ ...p, [id]: !p[id] }));

  const checkAll1 = () => setS1(Object.fromEntries(step1Items.map(({ id }) => [id, true])));
  const checkAll2 = () => setS2(Object.fromEntries(step2Items.map(({ id }) => [id, true])));
  const checkAll3 = () => setS3(Object.fromEntries(step3Items.map(({ id }) => [id, true])));
  const checkAll4 = () => setS4(Object.fromEntries(step4Items.map(({ id }) => [id, true])));

  const s1Count    = step1Items.filter(({ id }) => !!s1[id]).length;
  const s1Complete = s1Count === step1Items.length;
  const s2Count    = step2Items.filter(({ id }) => !!s2[id]).length;
  const s2Complete = s2Count === step2Items.length;
  const s3Count    = step3Items.filter(({ id }) => !!s3[id]).length;
  const s3Complete = s3Count === step3Items.length;
  const s4Count    = step4Items.filter(({ id }) => !!s4[id]).length;
  const s4Complete = s4Count === step4Items.length;

  const totalItems   = step1Items.length + step2Items.length + step3Items.length + step4Items.length;
  const totalChecked = s1Count + s2Count + s3Count + s4Count;
  const allComplete  = s1Complete && s2Complete && s3Complete && s4Complete;

  const stepComplete = [s1Complete, s2Complete, s3Complete, s4Complete];

  // ── Confetti ─────────────────────────────────────────────────

  const prevComplete = useRef([false, false, false, false]);
  const prevAllComplete = useRef(false);

  useEffect(() => {
    const prev = prevComplete.current;
    [s1Complete, s2Complete, s3Complete, s4Complete].forEach((c, i) => {
      if (c && !prev[i]) fireStepBurst();
    });
    prevComplete.current = [s1Complete, s2Complete, s3Complete, s4Complete];
  }, [s1Complete, s2Complete, s3Complete, s4Complete]);

  useEffect(() => {
    if (allComplete && !prevAllComplete.current) setTimeout(fireAllComplete, 250);
    prevAllComplete.current = allComplete;
  }, [allComplete]);

  // ── Fullscreen reference patches ─────────────────────────────
  const [showFs,    setShowFs]    = useState(false);
  const [patchIdx,  setPatchIdx]  = useState(0);
  const [fsOverlay, setFsOverlay] = useState(true);
  const fsRef          = useRef(null);
  const fsOverlayTimer = useRef(null);

  const launchFs = () => { setPatchIdx(0); setFsOverlay(true); setShowFs(true); };
  const exitFs   = () => { if (document.fullscreenElement) document.exitFullscreen(); else setShowFs(false); };

  useEffect(() => {
    if (showFs && fsRef.current && !document.fullscreenElement) {
      fsRef.current.requestFullscreen().catch(() => {});
    }
  }, [showFs]);

  useEffect(() => {
    const onKey = (e) => {
      if (!showFs) return;
      if (e.key === 'ArrowRight') setPatchIdx(i => (i + 1) % refPatches.length);
      if (e.key === 'ArrowLeft')  setPatchIdx(i => (i - 1 + refPatches.length) % refPatches.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showFs]);

  const onFsMouseMove = () => {
    setFsOverlay(true);
    clearTimeout(fsOverlayTimer.current);
    fsOverlayTimer.current = setTimeout(() => setFsOverlay(false), 2500);
  };
  useEffect(() => () => clearTimeout(fsOverlayTimer.current), []);

  // ── Fullscreen pixel test ─────────────────────────────────────
  const [showPixel,    setShowPixel]    = useState(false);
  const [pixelIdx,     setPixelIdx]     = useState(0);
  const [pixelOverlay, setPixelOverlay] = useState(true);
  const pixelRef   = useRef(null);
  const pixelTimer = useRef(null);

  const [criterionIdx, setCriterionIdx] = useState(0);
  const criterionTimer = useRef(null);

  useEffect(() => {
    if (showPixel) {
      criterionTimer.current = setInterval(() => setCriterionIdx(i => (i + 1) % step2Items.length), 3500);
    } else {
      clearInterval(criterionTimer.current);
      setCriterionIdx(0);
    }
    return () => clearInterval(criterionTimer.current);
  }, [showPixel]);

  const launchPixel = () => { setPixelIdx(0); setPixelOverlay(true); setCriterionIdx(0); setShowPixel(true); };
  const exitPixel   = () => { if (document.fullscreenElement) document.exitFullscreen(); else setShowPixel(false); };

  useEffect(() => {
    if (showPixel && pixelRef.current && !document.fullscreenElement) {
      pixelRef.current.requestFullscreen().catch(() => {});
    }
  }, [showPixel]);

  useEffect(() => {
    const onKey = (e) => {
      if (!showPixel) return;
      if (e.key === 'ArrowRight') setPixelIdx(i => (i + 1) % pixelColors.length);
      if (e.key === 'ArrowLeft')  setPixelIdx(i => (i - 1 + pixelColors.length) % pixelColors.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showPixel]);

  const onPixelMouseMove = () => {
    setPixelOverlay(true);
    clearTimeout(pixelTimer.current);
    pixelTimer.current = setTimeout(() => setPixelOverlay(false), 2500);
  };
  useEffect(() => () => clearTimeout(pixelTimer.current), []);

  // Shared fullscreenchange
  useEffect(() => {
    const onChange = () => {
      if (!document.fullscreenElement) {
        setShowFs(false);    setFsOverlay(true);
        setShowPixel(false); setPixelOverlay(true);
      }
    };
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  // ── Password gate ────────────────────────────────────────────
  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#04040A' }}>
        <div className="w-full max-w-[360px]">
          <div className="flex justify-center mb-7">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(124,92,252,0.09)', border: '1.5px solid rgba(124,92,252,0.28)' }}
            >
              <svg width="26" height="30" viewBox="0 0 26 30" fill="none">
                <rect x="3" y="13" width="20" height="15" rx="3" fill="rgba(124,92,252,0.12)" stroke={PURPLE} strokeWidth="1.6" />
                <path d="M8 13V9a5 5 0 0 1 10 0v4" stroke={PURPLE} strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="13" cy="20.5" r="2" fill={PURPLE} />
                <path d="M13 22.5v2" stroke={PURPLE_SOFT} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="text-center mb-7">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.30)' }}>
              Meirro Technologies
            </p>
            <h1 className="text-[28px] font-black tracking-[-0.04em] text-white">QC Portal</h1>
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Factory calibration & quality sign-off
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold tracking-[2px] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.30)' }}>
                Access Code
              </label>
              <input
                type="password"
                value={pwInput}
                onChange={e => setPwInput(e.target.value)}
                placeholder="••••••••••••••"
                autoFocus
                className="w-full px-4 py-3.5 rounded-xl text-[15px] font-mono text-white placeholder-white/15 outline-none transition-all duration-150"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: `1.5px solid ${pwError ? 'rgba(239,68,68,0.55)' : 'rgba(255,255,255,0.10)'}`,
                  boxShadow: pwError ? '0 0 0 3px rgba(239,68,68,0.08)' : 'none',
                }}
              />
              {pwError && (
                <p className="mt-2 text-[12px] flex items-center gap-1.5" style={{ color: '#F87171' }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 2l6 6M8 2l-6 6" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Incorrect access code. Try again.
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-[14px] font-bold text-white transition-all duration-150 hover:opacity-90 active:scale-[0.99]"
              style={{ background: PURPLE_GRAD }}
            >
              Unlock Portal
            </button>
          </form>

          <div
            className="mt-7 flex items-start gap-2.5 p-3.5 rounded-xl border"
            style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-px">
              <circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" />
              <path d="M7 6.5V9.5M7 4.5v.5" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <p className="text-[11px] leading-snug" style={{ color: 'rgba(255,255,255,0.22)' }}>
              Restricted to authorised QC personnel. Unauthorised access is prohibited.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Portal — fullscreen computed values ──────────────────────
  const patch    = refPatches[patchIdx];
  const pLightBg = ['#00FF00', '#00FFFF', '#FFFF00', '#FFFFFF'].includes(patch.hex);
  const pFg      = pLightBg ? 'rgba(0,0,0,0.82)'      : 'rgba(255,255,255,0.90)';
  const pFgM     = pLightBg ? 'rgba(0,0,0,0.42)'      : 'rgba(255,255,255,0.46)';
  const pGrad    = pLightBg ? 'rgba(255,255,255,0.62)' : 'rgba(0,0,0,0.72)';
  const pBorder  = pLightBg ? 'rgba(0,0,0,0.16)'      : 'rgba(255,255,255,0.18)';

  const pxColor  = pixelColors[pixelIdx];
  const pxLight  = ['#FFFFFF', '#00FF00'].includes(pxColor.hex);
  const pxFg     = pxLight ? 'rgba(0,0,0,0.82)'      : 'rgba(255,255,255,0.90)';
  const pxFgM    = pxLight ? 'rgba(0,0,0,0.40)'      : 'rgba(255,255,255,0.44)';
  const pxGrad   = pxLight ? 'rgba(255,255,255,0.62)' : 'rgba(0,0,0,0.72)';
  const pxBorder = pxLight ? 'rgba(0,0,0,0.16)'      : 'rgba(255,255,255,0.18)';

  return (
    <div style={{ background: '#04040A' }} className="min-h-screen text-white">

      {/* Top bar */}
      <div
        className="sticky top-0 z-50 border-b border-white/[0.07]"
        style={{ background: 'rgba(4,4,10,0.95)', backdropFilter: 'blur(24px) saturate(180%)' }}
      >
        <div className="max-w-[960px] mx-auto flex items-center justify-between px-6" style={{ height: 52 }}>
          <div className="flex items-center gap-2.5">
            <span className="text-[17px] font-bold tracking-[-0.04em] text-white">Meirro</span>
            <span className="text-white/20">/</span>
            <span className="text-[13px] font-medium text-white/45">QC Portal</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: PURPLE, boxShadow: `0 0 6px ${PURPLE}` }} />
              <span className="text-[10px] font-semibold tracking-[2px] uppercase" style={{ color: PURPLE_SOFT }}>
                Internal
              </span>
            </div>
            <button
              onClick={() => { sessionStorage.removeItem('meirro-qc-auth'); setUnlocked(false); }}
              className="text-[12px] text-white/30 hover:text-white/60 transition-colors duration-150"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[960px] mx-auto px-6 py-10">

        {/* Page header */}
        <div className="flex items-start justify-between gap-6 flex-wrap mb-8">
          <div>
            <span className="text-[11px] font-semibold tracking-[3px] uppercase" style={{ color: PURPLE }}>
              Meirro Pro 32" · Factory QC SOP
            </span>
            <h1 className="font-black tracking-[-0.045em] text-white mt-2 leading-tight" style={{ fontSize: 'clamp(24px, 3.5vw, 32px)' }}>
              Colour Calibration &amp; QC Sign-off
            </h1>
            <p className="mt-2 text-[13px] max-w-[460px] leading-relaxed text-white/40">
              Complete all four steps in sequence before final packaging. Do not skip or reorder.
            </p>
          </div>

          {/* Overall counter */}
          <div
            className="shrink-0 flex flex-col items-end justify-center p-4 rounded-2xl border transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.025)',
              borderColor: allComplete ? 'rgba(34,197,94,0.30)' : 'rgba(255,255,255,0.07)',
              minWidth: 110,
            }}
          >
            <p className="text-[10px] font-semibold tracking-[2px] uppercase mb-1 text-white/30">
              Checklist
            </p>
            <p
              className="text-[28px] font-black tracking-[-0.04em] leading-none"
              style={{ color: allComplete ? GREEN_DIM : 'rgba(255,255,255,0.90)' }}
            >
              {totalChecked}
              <span className="text-[14px] font-semibold text-white/28">/{totalItems}</span>
            </p>
            <p className="text-[11px] mt-1" style={{ color: allComplete ? 'rgba(74,222,128,0.70)' : 'rgba(255,255,255,0.28)' }}>
              {allComplete ? '✓ All clear' : 'Pending'}
            </p>
          </div>
        </div>

        {/* ── 4-step progress strip ────────────────────────────── */}
        <div className="flex items-center mb-8">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300"
                  style={{
                    background: stepComplete[i] ? 'rgba(34,197,94,0.18)' : 'rgba(124,92,252,0.12)',
                    border: `1.5px solid ${stepComplete[i] ? 'rgba(34,197,94,0.50)' : 'rgba(124,92,252,0.35)'}`,
                    color: stepComplete[i] ? GREEN_DIM : PURPLE_SOFT,
                  }}
                >
                  {stepComplete[i] ? '✓' : `0${i + 1}`}
                </div>
                <span className="text-[9px] font-medium tracking-[0.03em] hidden sm:block text-center text-white/25">
                  {label}
                </span>
              </div>
              {i < 3 && (
                <div className="flex-1 h-px mx-2" style={{ background: 'rgba(255,255,255,0.07)' }} />
              )}
            </div>
          ))}
        </div>

        <div className="space-y-4">

          {/* ── Step 01: Pre-Calibration Checklist ─────────────────── */}
          <div
            className="rounded-2xl border overflow-hidden transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.025)',
              borderColor: s1Complete ? 'rgba(34,197,94,0.32)' : 'rgba(255,255,255,0.07)',
            }}
          >
            <StepProgressBar count={s1Count} total={step1Items.length} complete={s1Complete} />
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[12px] font-bold transition-all duration-300"
                    style={{
                      background: s1Complete ? 'rgba(34,197,94,0.14)' : 'rgba(124,92,252,0.14)',
                      border: `1px solid ${s1Complete ? 'rgba(34,197,94,0.40)' : 'rgba(124,92,252,0.40)'}`,
                      color: s1Complete ? GREEN_DIM : PURPLE_SOFT,
                    }}
                  >
                    {s1Complete ? '✓' : '01'}
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[2.5px] uppercase mb-0.5" style={{ color: PURPLE_SOFT }}>Step 01</p>
                    <h2 className="text-[17px] font-bold tracking-[-0.02em] text-white">Pre-Calibration Checklist</h2>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!s1Complete && (
                    <button
                      onClick={checkAll1}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/[0.08] text-white/30 hover:border-[#7C5CFC]/40 hover:text-[#A78BFA] transition-all duration-150"
                    >
                      Check all
                    </button>
                  )}
                  <div
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all duration-300"
                    style={{
                      background: s1Complete ? 'rgba(34,197,94,0.08)' : 'transparent',
                      borderColor: s1Complete ? 'rgba(34,197,94,0.35)' : 'rgba(255,255,255,0.10)',
                      color: s1Complete ? GREEN_DIM : 'rgba(255,255,255,0.28)',
                    }}
                  >
                    {s1Complete ? '✓ All clear' : `${s1Count} / ${step1Items.length}`}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {step1Items.map(({ id, label }) => (
                  <CheckItem key={id} id={id} label={label} checked={s1[id]} onToggle={toggle1} />
                ))}
              </div>
            </div>
          </div>

          {/* ── Step 02: Screen Health & Uniformity ────────────────── */}
          <div
            className="rounded-2xl border overflow-hidden transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.025)',
              borderColor: s2Complete ? 'rgba(34,197,94,0.32)' : 'rgba(255,255,255,0.07)',
            }}
          >
            <StepProgressBar count={s2Count} total={step2Items.length} complete={s2Complete} />
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[12px] font-bold transition-all duration-300"
                    style={{
                      background: s2Complete ? 'rgba(34,197,94,0.14)' : 'rgba(124,92,252,0.14)',
                      border: `1px solid ${s2Complete ? 'rgba(34,197,94,0.40)' : 'rgba(124,92,252,0.40)'}`,
                      color: s2Complete ? GREEN_DIM : PURPLE_SOFT,
                    }}
                  >
                    {s2Complete ? '✓' : '02'}
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[2.5px] uppercase mb-0.5" style={{ color: PURPLE_SOFT }}>Step 02</p>
                    <h2 className="text-[17px] font-bold tracking-[-0.02em] text-white">Screen Health &amp; Uniformity</h2>
                    <div className="flex items-center gap-1.5 mt-2">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="2.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
                        <path d="M1 6C2.5 3 4 1.5 6 1.5S9.5 3 11 6c-1.5 3-3 4.5-5 4.5S2.5 9 1 6z" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
                      </svg>
                      <span className="text-[11px] font-medium text-white/40">
                        Visual inspection — <span className="text-white/65">you</span> are the sensor. No hardware required.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!s2Complete && (
                    <button
                      onClick={checkAll2}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/[0.08] text-white/30 hover:border-[#7C5CFC]/40 hover:text-[#A78BFA] transition-all duration-150"
                    >
                      Check all
                    </button>
                  )}
                  <div
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all duration-300"
                    style={{
                      background: s2Complete ? 'rgba(34,197,94,0.08)' : 'transparent',
                      borderColor: s2Complete ? 'rgba(34,197,94,0.35)' : 'rgba(255,255,255,0.10)',
                      color: s2Complete ? GREEN_DIM : 'rgba(255,255,255,0.28)',
                    }}
                  >
                    {s2Complete ? '✓ All clear' : `${s2Count} / ${step2Items.length}`}
                  </div>
                </div>
              </div>

              <p className="text-[13px] leading-relaxed mb-4 text-white/45">
                Cycle through each colour field and <strong className="text-white/70 font-semibold">scan the panel surface with your eyes</strong>. Confirm all criteria below before proceeding.
              </p>

              <div className="sm:grid sm:grid-cols-[1fr_auto] sm:gap-8 sm:items-start">
                <div className="space-y-2">
                  {step2Items.map(({ id, label }) => (
                    <CheckItem key={id} id={id} label={label} checked={s2[id]} onToggle={toggle2} />
                  ))}
                </div>

                <button
                  onClick={launchPixel}
                  className="group mt-4 sm:mt-0 sm:w-[168px] flex sm:flex-col items-center sm:justify-center gap-3 w-full px-5 sm:px-4 py-4 rounded-2xl border border-white/[0.10] transition-all duration-300 hover:border-[#7C5CFC]/50 hover:bg-[#7C5CFC]/[0.08]"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{ background: PURPLE_GRAD }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect x="1" y="1" width="7.5" height="7.5" rx="1.5" fill="white" fillOpacity="0.65" />
                      <rect x="9.5" y="1" width="7.5" height="7.5" rx="1.5" fill="white" fillOpacity="0.40" />
                      <rect x="1" y="9.5" width="7.5" height="7.5" rx="1.5" fill="white" fillOpacity="0.40" />
                      <rect x="9.5" y="9.5" width="7.5" height="7.5" rx="1.5" fill="white" fillOpacity="0.20" />
                    </svg>
                  </div>
                  <div className="text-left sm:text-center">
                    <p className="text-[13px] font-semibold text-white/90">Launch Pixel Test</p>
                    <p className="text-[11px] font-mono mt-0.5 text-white/35">5 fields · K W R G B</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* ── Recommended Tools (informational, no progress) ─────── */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ background: 'rgba(124,92,252,0.04)', borderColor: 'rgba(124,92,252,0.18)' }}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-1">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(124,92,252,0.14)', border: '1px solid rgba(124,92,252,0.30)' }}
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M9.5 2a3.5 3.5 0 0 0-3.24 4.84L2 11.09 2 13h1.91l4.25-4.26A3.5 3.5 0 1 0 9.5 2zm0 5.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill={PURPLE_SOFT} fillOpacity="0.8" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-[2.5px] uppercase" style={{ color: PURPLE_SOFT }}>Before Step 3</p>
                  <h3 className="text-[15px] font-bold tracking-[-0.02em] text-white">Recommended Calibration Tools</h3>
                </div>
              </div>
              <p className="text-[13px] text-white/40 leading-relaxed mb-6 pl-11">
                Step 3 requires two things: a <strong className="text-white/65 font-medium">colorimeter</strong> (a small probe you clip or place against the screen that physically reads the light and colour it emits) and <strong className="text-white/65 font-medium">calibration software</strong> that interprets those readings. Here's what we recommend.
              </p>

              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-semibold tracking-[2.5px] uppercase text-white/25 mb-2.5 pl-1">Hardware — Colorimeter</p>
                  <a
                    href="https://calibrite.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.07] hover:border-[#7C5CFC]/40 hover:bg-[#7C5CFC]/[0.05] transition-all duration-200 group"
                    style={{ background: 'rgba(255,255,255,0.025)' }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(124,92,252,0.12)', border: '1px solid rgba(124,92,252,0.25)' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="5" stroke={PURPLE_SOFT} strokeWidth="1.3" strokeOpacity="0.7" />
                        <circle cx="8" cy="8" r="2" fill={PURPLE_SOFT} fillOpacity="0.6" />
                        <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke={PURPLE_SOFT} strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.5" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-[14px] font-semibold text-white/90">Calibrite ColorChecker Display</p>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(124,92,252,0.15)', color: PURPLE_SOFT }}>Hardware</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#7C5CFC]/20" style={{ color: PURPLE_SOFT }}>Recommended</span>
                      </div>
                      <p className="mt-1 text-[12px] text-white/45 leading-relaxed">
                        The physical probe you rest against the screen. It plugs into your computer via USB and works with all the software below. No colorimeter, no hardware measurements.
                      </p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-1 opacity-30 group-hover:opacity-60 transition-opacity">
                      <path d="M3 11L11 3M11 3H6M11 3v5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>

                <div>
                  <p className="text-[10px] font-semibold tracking-[2.5px] uppercase text-white/25 mb-2.5 pl-1">Software — Calibration Suite <span className="normal-case tracking-normal text-white/20 font-normal">· pick one</span></p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      {
                        name: 'Calman',
                        by: 'by Portrait Displays',
                        badge: 'Professional',
                        desc: 'The industry standard for display manufacturers. Automates the full measurement sequence — just connect your probe and follow the on-screen steps.',
                        url: 'https://www.portrait.com/calman/',
                      },
                      {
                        name: 'LightSpace CMS',
                        by: 'by Light Illusion',
                        badge: 'Professional',
                        desc: 'Widely used in broadcast and cinema post-production. Excels at colour management and detailed gamut analysis.',
                        url: 'https://www.lightillusion.com',
                      },
                      {
                        name: 'DisplayCAL',
                        by: 'Open source',
                        badge: 'Free',
                        badgeGreen: true,
                        desc: 'A free, open-source option that covers all the essentials. The best starting point if you\'re new to display calibration.',
                        url: 'https://displaycal.net',
                      },
                    ].map(({ name, by, badge, badgeGreen, desc, url }) => (
                      <a
                        key={name}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col gap-2 p-4 rounded-xl border border-white/[0.07] hover:border-[#7C5CFC]/40 hover:bg-[#7C5CFC]/[0.05] transition-all duration-200 group"
                        style={{ background: 'rgba(255,255,255,0.025)' }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[13px] font-semibold text-white/90 group-hover:text-white transition-colors">{name}</p>
                            <p className="text-[11px] text-white/30">{by}</p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={badgeGreen
                                ? { background: 'rgba(34,197,94,0.12)', color: '#4ADE80' }
                                : { background: 'rgba(124,92,252,0.15)', color: PURPLE_SOFT }
                              }
                            >
                              {badge}
                            </span>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-25 group-hover:opacity-50 transition-opacity">
                              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H5.5M9.5 2.5v4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-[11px] text-white/40 leading-relaxed">{desc}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Step 03: Target Specifications ─────────────────────── */}
          <div
            className="rounded-2xl border overflow-hidden transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.025)',
              borderColor: s3Complete ? 'rgba(34,197,94,0.32)' : 'rgba(255,255,255,0.07)',
            }}
          >
            <StepProgressBar count={s3Count} total={step3Items.length} complete={s3Complete} />
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[12px] font-bold transition-all duration-300"
                    style={{
                      background: s3Complete ? 'rgba(34,197,94,0.14)' : 'rgba(124,92,252,0.14)',
                      border: `1px solid ${s3Complete ? 'rgba(34,197,94,0.40)' : 'rgba(124,92,252,0.40)'}`,
                      color: s3Complete ? GREEN_DIM : PURPLE_SOFT,
                    }}
                  >
                    {s3Complete ? '✓' : '03'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold tracking-[2.5px] uppercase mb-0.5" style={{ color: PURPLE_SOFT }}>Step 03</p>
                    <h2 className="text-[17px] font-bold tracking-[-0.02em] text-white">Target Specifications</h2>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!s3Complete && (
                    <button
                      onClick={checkAll3}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/[0.08] text-white/30 hover:border-[#7C5CFC]/40 hover:text-[#A78BFA] transition-all duration-150"
                    >
                      Check all
                    </button>
                  )}
                  <div
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all duration-300"
                    style={{
                      background: s3Complete ? 'rgba(34,197,94,0.08)' : 'transparent',
                      borderColor: s3Complete ? 'rgba(34,197,94,0.35)' : 'rgba(255,255,255,0.10)',
                      color: s3Complete ? GREEN_DIM : 'rgba(255,255,255,0.28)',
                    }}
                  >
                    {s3Complete ? '✓ All clear' : `${s3Count} / ${step3Items.length}`}
                  </div>
                </div>
              </div>

              {/* Spec reference dashboard */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {specs.map(({ label, value, unit, how }) => (
                  <div
                    key={label}
                    className="p-4 rounded-xl border border-white/[0.07] flex flex-col gap-2"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[10px] font-semibold tracking-[2px] uppercase leading-tight text-white/30">
                        {label}
                      </p>
                      <div className="flex items-baseline gap-1 shrink-0">
                        <span
                          className="font-black tracking-[-0.04em] leading-none"
                          style={{
                            fontSize: 'clamp(18px, 2.5vw, 24px)',
                            background: PURPLE_GRAD,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {value}
                        </span>
                        <span className="text-[10px] font-mono text-white/25">{unit}</span>
                      </div>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/38">{how}</p>
                  </div>
                ))}
              </div>

              {/* Pass confirmation checklist */}
              <div className="space-y-2 mb-5">
                {step3Items.map(({ id, label }) => (
                  <CheckItem key={id} id={id} label={label} checked={s3[id]} onToggle={toggle3} />
                ))}
              </div>

              <div
                className="flex items-start gap-3 p-4 rounded-xl border border-red-500/20"
                style={{ background: 'rgba(239,68,68,0.05)' }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5"
                  style={{ background: 'rgba(239,68,68,0.18)', color: '#F87171' }}
                >
                  !
                </div>
                <p className="text-[12px] leading-relaxed text-white/45">
                  <span className="font-semibold" style={{ color: 'rgba(248,113,113,0.90)' }}>If any metric fails, do not ship. </span>
                  The unit must be recalibrated or formally rejected before leaving the facility.
                </p>
              </div>
            </div>
          </div>

          {/* ── Step 04: Reference Patch Tool ──────────────────────── */}
          <div
            className="rounded-2xl border overflow-hidden transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.025)',
              borderColor: s4Complete ? 'rgba(34,197,94,0.32)' : 'rgba(255,255,255,0.07)',
            }}
          >
            <StepProgressBar count={s4Count} total={step4Items.length} complete={s4Complete} />
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[12px] font-bold transition-all duration-300"
                    style={{
                      background: s4Complete ? 'rgba(34,197,94,0.14)' : 'rgba(124,92,252,0.14)',
                      border: `1px solid ${s4Complete ? 'rgba(34,197,94,0.40)' : 'rgba(124,92,252,0.40)'}`,
                      color: s4Complete ? GREEN_DIM : PURPLE_SOFT,
                    }}
                  >
                    {s4Complete ? '✓' : '04'}
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[2.5px] uppercase mb-0.5" style={{ color: PURPLE_SOFT }}>Step 04</p>
                    <h2 className="text-[17px] font-bold tracking-[-0.02em] text-white">Reference Patch Tool</h2>
                    <div className="flex items-center gap-1.5 mt-2">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <rect x="1.5" y="5" width="4" height="5.5" rx="1" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
                        <path d="M5.5 7.5V3a2 2 0 0 1 4 0v1" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinecap="round" />
                        <circle cx="9" cy="5.5" r="1.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
                      </svg>
                      <span className="text-[11px] font-medium text-white/40">
                        Hardware measurement — <span className="text-white/65">your colorimeter</span> is the sensor.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!s4Complete && (
                    <button
                      onClick={checkAll4}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/[0.08] text-white/30 hover:border-[#7C5CFC]/40 hover:text-[#A78BFA] transition-all duration-150"
                    >
                      Check all
                    </button>
                  )}
                  <div
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all duration-300"
                    style={{
                      background: s4Complete ? 'rgba(34,197,94,0.08)' : 'transparent',
                      borderColor: s4Complete ? 'rgba(34,197,94,0.35)' : 'rgba(255,255,255,0.10)',
                      color: s4Complete ? GREEN_DIM : 'rgba(255,255,255,0.28)',
                    }}
                  >
                    {s4Complete ? '✓ All clear' : `${s4Count} / ${step4Items.length}`}
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-[1fr_auto] sm:gap-8 sm:items-start">
                <div>
                  <p className="text-[13px] leading-relaxed mb-5 text-white/45">
                    Open your calibration software (Calman, LightSpace, or DisplayCAL) and start a new measurement session. <strong className="text-white/70 font-semibold">Rest the colorimeter probe flat against the centre of the screen</strong> — the software will prompt you to display specific colour patches. Use ← → to cycle through them here, and tick each one off below once the software has recorded it.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {step4Items.map(({ id, label }, i) => {
                      const p = refPatches[i];
                      const on = !!s4[id];
                      return (
                        <button
                          key={id}
                          onClick={() => toggle4(id)}
                          className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 ${
                            on
                              ? 'border-green-500/40 bg-green-500/[0.07]'
                              : 'border-white/[0.07] bg-white/[0.025] hover:bg-white/[0.04] hover:border-white/[0.12]'
                          }`}
                        >
                          <div
                            className="shrink-0 w-4 h-4 rounded"
                            style={{
                              background: p.hex,
                              border: p.hex === '#000000' ? '1px solid rgba(255,255,255,0.20)' : '1px solid rgba(0,0,0,0.12)',
                            }}
                          />
                          <span className={`flex-1 text-[13px] font-medium leading-snug transition-colors duration-200 ${
                            on ? 'text-green-400' : 'text-white/70'
                          }`}>
                            {label}
                          </span>
                          <div className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            on ? 'border-green-500 bg-green-500' : 'border-white/25'
                          }`}>
                            {on && (
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={launchFs}
                  className="group mt-6 sm:mt-0 sm:w-[168px] flex sm:flex-col items-center sm:justify-center gap-3 w-full px-5 sm:px-4 py-4 rounded-2xl border border-white/[0.10] transition-all duration-300 hover:border-[#7C5CFC]/50 hover:bg-[#7C5CFC]/[0.08]"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{ background: PURPLE_GRAD }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect x="1" y="1" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.90" />
                      <rect x="10" y="1" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.60" />
                      <rect x="1" y="10" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.60" />
                      <rect x="10" y="10" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.30" />
                    </svg>
                  </div>
                  <div className="text-left sm:text-center">
                    <p className="text-[13px] font-semibold text-white/90">Launch Patches</p>
                    <p className="text-[11px] font-mono mt-0.5 text-white/35">8 · 100% sat</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between">
          <p className="text-[11px] text-white/20">© 2026 Meirro Technologies · Internal use only</p>
          <button
            onClick={() => { sessionStorage.removeItem('meirro-qc-auth'); setUnlocked(false); }}
            className="text-[11px] text-white/25 hover:text-white/55 transition-colors duration-150"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* ── Fullscreen pixel test overlay ────────────────────────── */}
      {showPixel && (
        <div
          ref={pixelRef}
          onMouseMove={onPixelMouseMove}
          className="fixed inset-0 z-[9999]"
          style={{ background: pxColor.hex, cursor: pixelOverlay ? 'default' : 'none' }}
        >
          <div
            className="absolute bottom-6 right-8 text-[11px] font-mono tracking-[0.04em] pointer-events-none select-none"
            style={{ color: pxLight ? 'rgba(0,0,0,0.28)' : 'rgba(255,255,255,0.25)' }}
          >
            ← → cycle · Press ESC to exit
          </div>

          <div
            className="absolute inset-0 flex flex-col justify-between transition-opacity duration-500"
            style={{ opacity: pixelOverlay ? 1 : 0, pointerEvents: pixelOverlay ? 'auto' : 'none' }}
          >
            <div
              className="px-8 pt-8 pb-16"
              style={{ background: `linear-gradient(to bottom, ${pxGrad} 0%, transparent 100%)` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[15px] font-semibold tracking-[-0.01em]" style={{ color: pxFg }}>
                    Visual Inspection — you are the sensor
                  </p>
                  <p className="mt-1 text-[13px] max-w-[480px] leading-relaxed" style={{ color: pxFgM }}>
                    Scan the full panel surface with your eyes. No hardware needed. Look for dead, stuck, or bright pixels on each field.
                  </p>
                  <div className="mt-3 flex items-center gap-2.5 max-w-[480px]">
                    <span className="text-[9px] font-semibold tracking-[2px] uppercase shrink-0" style={{ color: pxLight ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.30)' }}>
                      Check
                    </span>
                    <div className="flex-1 overflow-hidden">
                      {step2Items.map(({ id, label }, i) => (
                        <p
                          key={id}
                          className="text-[12px] font-medium leading-snug transition-all duration-500"
                          style={{
                            color: pxLight ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.70)',
                            opacity: i === criterionIdx ? 1 : 0,
                            position: i === criterionIdx ? 'relative' : 'absolute',
                            pointerEvents: 'none',
                          }}
                        >
                          {label}
                        </p>
                      ))}
                    </div>
                    <span className="text-[10px] font-mono shrink-0" style={{ color: pxLight ? 'rgba(0,0,0,0.30)' : 'rgba(255,255,255,0.25)' }}>
                      {criterionIdx + 1}/{step2Items.length}
                    </span>
                  </div>
                </div>
                <span
                  className="shrink-0 text-[13px] font-semibold font-mono px-3 py-1.5 rounded"
                  style={{ background: pxBorder, color: pxFg }}
                >
                  {pixelIdx + 1} / {pixelColors.length}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 pointer-events-none select-none">
              <span
                className="font-black tracking-[-0.04em]"
                style={{ fontSize: 'clamp(48px, 8vw, 96px)', color: pxFg, lineHeight: 1 }}
              >
                {pxColor.label}
              </span>
              <span className="text-[13px] font-mono tracking-[0.06em]" style={{ color: pxFgM }}>
                {pxColor.hex.toUpperCase()}
              </span>
            </div>

            <div
              className="px-8 pb-12 pt-16 flex items-end justify-between flex-wrap gap-4"
              style={{ background: `linear-gradient(to top, ${pxGrad} 0%, transparent 100%)` }}
            >
              <div className="flex items-center gap-2">
                {pixelColors.map(({ hex, label }, i) => (
                  <button
                    key={hex}
                    onClick={() => setPixelIdx(i)}
                    title={label}
                    className="transition-transform duration-150 hover:scale-110"
                    style={{
                      width: i === pixelIdx ? 36 : 28,
                      height: i === pixelIdx ? 36 : 28,
                      borderRadius: '50%',
                      background: hex,
                      border: i === pixelIdx
                        ? `3px solid ${pxLight ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.95)'}`
                        : `2px solid ${pxLight ? 'rgba(0,0,0,0.20)' : 'rgba(255,255,255,0.35)'}`,
                      cursor: 'pointer',
                      outline: 'none',
                      transition: 'width 0.15s, height 0.15s',
                    }}
                  />
                ))}
              </div>
              <button
                onClick={exitPixel}
                className="text-[13px] font-medium px-4 py-2 rounded-full transition-opacity duration-150 hover:opacity-75"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(12px)',
                  color: pxFg,
                  cursor: 'pointer',
                }}
              >
                Exit — Esc
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Fullscreen reference patches overlay ─────────────────── */}
      {showFs && (
        <div
          ref={fsRef}
          onMouseMove={onFsMouseMove}
          className="fixed inset-0 z-[9999]"
          style={{ background: patch.hex, cursor: fsOverlay ? 'default' : 'none' }}
        >
          <div
            className="absolute inset-0 flex flex-col justify-between transition-opacity duration-500"
            style={{ opacity: fsOverlay ? 1 : 0, pointerEvents: fsOverlay ? 'auto' : 'none' }}
          >
            <div
              className="px-8 pt-8 pb-20"
              style={{ background: `linear-gradient(to bottom, ${pGrad} 0%, transparent 100%)` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[15px] font-semibold tracking-[-0.01em]" style={{ color: pFg }}>
                    Hardware Measurement — your colorimeter is the sensor
                  </p>
                  <p className="mt-1 text-[13px] max-w-[480px] leading-relaxed" style={{ color: pFgM }}>
                    Advance to each patch as Calman or LightSpace requests it. Your colorimeter reads the screen — you just cycle the colours.
                  </p>
                </div>
                <span
                  className="shrink-0 text-[13px] font-semibold font-mono px-3 py-1.5 rounded"
                  style={{ background: pBorder, color: pFg }}
                >
                  {patchIdx + 1} / {refPatches.length}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 pointer-events-none select-none">
              <span
                className="font-black tracking-[-0.04em]"
                style={{ fontSize: 'clamp(48px, 8vw, 96px)', color: pFg, lineHeight: 1 }}
              >
                {patch.label}
              </span>
              <span className="text-[13px] font-mono tracking-[0.06em]" style={{ color: pFgM }}>
                {patch.hex.toUpperCase()}
              </span>
            </div>

            <div
              className="px-8 pb-8 pt-20 flex items-end justify-between flex-wrap gap-4"
              style={{ background: `linear-gradient(to top, ${pGrad} 0%, transparent 100%)` }}
            >
              <div className="flex items-center gap-2">
                {refPatches.map(({ hex, label }, i) => (
                  <button
                    key={hex}
                    onClick={() => setPatchIdx(i)}
                    title={label}
                    className="transition-transform duration-150 hover:scale-110"
                    style={{
                      width: i === patchIdx ? 36 : 28,
                      height: i === patchIdx ? 36 : 28,
                      borderRadius: '50%',
                      background: hex,
                      border: i === patchIdx
                        ? `3px solid ${pLightBg ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.95)'}`
                        : `2px solid ${pLightBg ? 'rgba(0,0,0,0.20)' : 'rgba(255,255,255,0.30)'}`,
                      cursor: 'pointer',
                      outline: 'none',
                      transition: 'width 0.15s, height 0.15s',
                    }}
                  />
                ))}
                <span className="text-[12px] ml-2 hidden sm:block" style={{ color: pFgM }}>
                  or use ← → keys
                </span>
              </div>
              <button
                onClick={exitFs}
                className="text-[13px] font-medium px-4 py-2 rounded-full transition-opacity duration-150 hover:opacity-75"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(12px)',
                  color: pFg,
                  cursor: 'pointer',
                }}
              >
                Exit — Esc
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
