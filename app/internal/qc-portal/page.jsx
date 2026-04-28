'use client';

import { useState, useEffect, useRef } from 'react';

// Update this constant to rotate the access code
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

const checklistItems = [
  { id: 'warmup',   label: 'Monitor powered on for at least 30 minutes to stabilize the backlight' },
  { id: 'lighting', label: 'Room lighting is completely dark or strictly controlled' },
  { id: 'osd',      label: 'Monitor reset to Factory Default settings via the OSD menu' },
  { id: 'hw',       label: 'Hardware calibrator connected flush against the center of the panel' },
];

const specs = [
  { label: 'Peak Luminance', value: '500',   unit: 'nits'  },
  { label: 'DCI-P3',         value: '99%',   unit: 'gamut' },
  { label: 'sRGB',           value: '99%',   unit: 'gamut' },
  { label: 'Delta E avg',    value: '≤ 2.0', unit: 'ΔE'    },
];

const AMBER     = '#EAB308';
const GREEN     = '#22C55E';
const GREEN_DIM = '#4ADE80';

const stepLabels = ['Pre-Calibration', 'Screen Health', 'Target Specs', 'Ref Patches', 'QA Report'];

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

  // ── Checklist ────────────────────────────────────────────────
  const [checked, setChecked] = useState({});
  const toggle = (id) => setChecked(p => ({ ...p, [id]: !p[id] }));
  const checkedCount = checklistItems.filter(({ id }) => !!checked[id]).length;
  const allChecked   = checkedCount === checklistItems.length;

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

  const launchPixel = () => { setPixelIdx(0); setPixelOverlay(true); setShowPixel(true); };
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

  // Shared fullscreenchange — resets both overlays on ESC
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
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#080808' }}>
        <div className="w-full max-w-[360px]">
          <div className="flex justify-center mb-7">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(234,179,8,0.09)', border: '1.5px solid rgba(234,179,8,0.28)' }}
            >
              <svg width="26" height="30" viewBox="0 0 26 30" fill="none">
                <rect x="3" y="13" width="20" height="15" rx="3" fill="rgba(234,179,8,0.12)" stroke={AMBER} strokeWidth="1.6" />
                <path d="M8 13V9a5 5 0 0 1 10 0v4" stroke={AMBER} strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="13" cy="20.5" r="2" fill={AMBER} />
                <path d="M13 22.5v2" stroke={AMBER} strokeWidth="1.5" strokeLinecap="round" />
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
              className="w-full py-3.5 rounded-xl text-[14px] font-bold text-black transition-all duration-150 hover:brightness-110 active:scale-[0.99]"
              style={{ background: AMBER }}
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

  // ── Portal — computed values ─────────────────────────────────
  const patch    = refPatches[patchIdx];
  const pLightBg = ['#00FF00', '#00FFFF', '#FFFF00', '#FFFFFF'].includes(patch.hex);
  const pFg      = pLightBg ? 'rgba(0,0,0,0.82)'       : 'rgba(255,255,255,0.90)';
  const pFgM     = pLightBg ? 'rgba(0,0,0,0.42)'       : 'rgba(255,255,255,0.46)';
  const pGrad    = pLightBg ? 'rgba(255,255,255,0.62)'  : 'rgba(0,0,0,0.72)';
  const pBorder  = pLightBg ? 'rgba(0,0,0,0.16)'       : 'rgba(255,255,255,0.18)';

  const pxColor  = pixelColors[pixelIdx];
  const pxLight  = ['#FFFFFF', '#00FF00'].includes(pxColor.hex);
  const pxFg     = pxLight  ? 'rgba(0,0,0,0.82)'       : 'rgba(255,255,255,0.90)';
  const pxFgM    = pxLight  ? 'rgba(0,0,0,0.40)'       : 'rgba(255,255,255,0.44)';
  const pxGrad   = pxLight  ? 'rgba(255,255,255,0.62)'  : 'rgba(0,0,0,0.72)';
  const pxBorder = pxLight  ? 'rgba(0,0,0,0.16)'       : 'rgba(255,255,255,0.18)';

  return (
    <div style={{ background: '#0A0A0A' }} className="min-h-screen text-white">

      {/* Top bar */}
      <div
        className="sticky top-0 z-50 border-b"
        style={{ background: 'rgba(10,10,10,0.97)', borderColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)' }}
      >
        <div className="max-w-[960px] mx-auto flex items-center justify-between px-6" style={{ height: 48 }}>
          <div className="flex items-center gap-2.5">
            <span className="text-[15px] font-bold tracking-[-0.03em]" style={{ color: 'rgba(255,255,255,0.90)' }}>Meirro</span>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>/</span>
            <span className="text-[13px] font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>QC Portal</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: AMBER, boxShadow: `0 0 5px ${AMBER}` }} />
              <span className="text-[10px] font-semibold tracking-[2px] uppercase" style={{ color: 'rgba(234,179,8,0.80)' }}>
                Internal
              </span>
            </div>
            <button
              onClick={() => { sessionStorage.removeItem('meirro-qc-auth'); setUnlocked(false); }}
              className="text-[11px] transition-colors duration-150"
              style={{ color: 'rgba(255,255,255,0.25)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
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
            <p className="text-[10px] font-semibold tracking-[3px] uppercase mb-2" style={{ color: AMBER }}>
              Meirro Pro 32" · Factory QC SOP
            </p>
            <h1 className="text-[30px] font-black tracking-[-0.04em] text-white leading-tight">
              Colour Calibration &amp; QC Sign-off
            </h1>
            <p className="mt-2 text-[13px] max-w-[460px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
              Complete all five steps in sequence before final packaging. Do not skip or reorder.
            </p>
          </div>

          {/* Checklist counter */}
          <div
            className="shrink-0 flex flex-col items-end justify-center p-4 rounded-xl border"
            style={{
              background: 'rgba(255,255,255,0.025)',
              borderColor: allChecked ? 'rgba(34,197,94,0.30)' : 'rgba(255,255,255,0.08)',
              minWidth: 110,
              transition: 'border-color 0.3s',
            }}
          >
            <p className="text-[10px] font-semibold tracking-[2px] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Checklist
            </p>
            <p className="text-[28px] font-black tracking-[-0.04em] leading-none"
              style={{ color: allChecked ? GREEN_DIM : 'rgba(255,255,255,0.90)' }}>
              {checkedCount}
              <span className="text-[14px] font-semibold" style={{ color: 'rgba(255,255,255,0.28)' }}>
                /{checklistItems.length}
              </span>
            </p>
            <p className="text-[11px] mt-1" style={{ color: allChecked ? 'rgba(74,222,128,0.70)' : 'rgba(255,255,255,0.28)' }}>
              {allChecked ? '✓ All clear' : 'Pending'}
            </p>
          </div>
        </div>

        {/* ── 5-step progress strip ─────────────────────────────── */}
        <div className="flex items-center mb-8">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300"
                  style={{
                    background: i === 0 && allChecked ? 'rgba(34,197,94,0.18)' : 'rgba(255,255,255,0.06)',
                    border: `1.5px solid ${i === 0 && allChecked ? 'rgba(34,197,94,0.50)' : 'rgba(255,255,255,0.12)'}`,
                    color: i === 0 && allChecked ? GREEN_DIM : i === 4 ? AMBER : 'rgba(255,255,255,0.38)',
                  }}
                >
                  {i === 0 && allChecked ? '✓' : `0${i + 1}`}
                </div>
                <span className="text-[9px] font-medium tracking-[0.03em] hidden sm:block text-center" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  {label}
                </span>
              </div>
              {i < 4 && (
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
              background: '#111111',
              borderColor: allChecked ? 'rgba(34,197,94,0.32)' : 'rgba(255,255,255,0.09)',
            }}
          >
            <div className="h-[3px]" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${(checkedCount / checklistItems.length) * 100}%`,
                  background: allChecked ? GREEN : AMBER,
                }}
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[12px] font-bold transition-all duration-300"
                    style={{
                      background: allChecked ? 'rgba(34,197,94,0.14)' : 'rgba(255,255,255,0.06)',
                      border: `1px solid ${allChecked ? 'rgba(34,197,94,0.40)' : 'rgba(255,255,255,0.10)'}`,
                      color: allChecked ? GREEN_DIM : 'rgba(255,255,255,0.38)',
                    }}
                  >
                    {allChecked ? '✓' : '01'}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[2.5px] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>Step 01</p>
                    <h2 className="text-[17px] font-bold tracking-[-0.02em] text-white">Pre-Calibration Checklist</h2>
                  </div>
                </div>
                <div
                  className="shrink-0 text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all duration-300"
                  style={{
                    background: allChecked ? 'rgba(34,197,94,0.08)' : 'transparent',
                    borderColor: allChecked ? 'rgba(34,197,94,0.35)' : 'rgba(255,255,255,0.10)',
                    color: allChecked ? GREEN_DIM : 'rgba(255,255,255,0.28)',
                  }}
                >
                  {allChecked ? '✓ All clear' : `${checkedCount} / ${checklistItems.length}`}
                </div>
              </div>
              <div className="space-y-2">
                {checklistItems.map(({ id, label }) => {
                  const on = !!checked[id];
                  return (
                    <button
                      key={id}
                      onClick={() => toggle(id)}
                      className="w-full text-left flex items-center gap-3.5 px-4 py-3.5 rounded-xl border transition-all duration-150"
                      style={{
                        background: on ? 'rgba(34,197,94,0.05)' : 'rgba(255,255,255,0.02)',
                        borderColor: on ? 'rgba(34,197,94,0.26)' : 'rgba(255,255,255,0.07)',
                      }}
                    >
                      <div
                        className="shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-150"
                        style={{ borderColor: on ? GREEN : 'rgba(255,255,255,0.22)', background: on ? GREEN : 'transparent' }}
                      >
                        {on && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span
                        className="text-[13px] font-medium leading-snug transition-colors duration-150"
                        style={{ color: on ? GREEN_DIM : 'rgba(255,255,255,0.62)' }}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Step 02: Screen Health & Uniformity ────────────────── */}
          <div className="rounded-2xl border p-6" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.09)' }}>
            <div className="flex items-start gap-4 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[12px] font-bold"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.38)' }}
              >
                02
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-[2.5px] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>Step 02</p>
                <h2 className="text-[17px] font-bold tracking-[-0.02em] text-white">Screen Health &amp; Uniformity</h2>
                <div className="flex items-center gap-1.5 mt-2">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="2.5" stroke="rgba(255,255,255,0.40)" strokeWidth="1.2" />
                    <path d="M1 6C2.5 3 4 1.5 6 1.5S9.5 3 11 6c-1.5 3-3 4.5-5 4.5S2.5 9 1 6z" stroke="rgba(255,255,255,0.40)" strokeWidth="1.2" />
                  </svg>
                  <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    Visual inspection — <span style={{ color: 'rgba(255,255,255,0.65)' }}>you</span> are the sensor. No hardware required.
                  </span>
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-[1fr_auto] sm:gap-8 sm:items-start">
              {/* Left — pass criteria */}
              <div>
                <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.40)' }}>
                  Cycle through each colour field and <strong style={{ color: 'rgba(255,255,255,0.62)', fontWeight: 600 }}>scan the panel surface with your eyes</strong>. All criteria below must pass before proceeding.
                </p>
                <ol className="space-y-2.5">
                  {[
                    'Zero dead or bright pixels in the central 5×5 cm zone',
                    'Maximum of 3 sub-pixel defects panel-wide',
                    'Zero backlight bleed visible on black field',
                    'Zero colour tinting visible on white field',
                  ].map((criterion, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="shrink-0 w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold mt-0.5"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.38)' }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-[13px] leading-snug" style={{ color: 'rgba(255,255,255,0.58)' }}>
                        {criterion}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Right — launch button */}
              <button
                onClick={launchPixel}
                className="group mt-6 sm:mt-0 sm:w-[168px] flex sm:flex-col items-center sm:justify-center gap-3 w-full px-5 sm:px-4 py-4 rounded-xl border transition-all duration-150"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.09)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.20)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)')}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-150 group-hover:scale-105"
                  style={{ background: AMBER }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="1" y="1" width="7.5" height="7.5" rx="1.5" fill="black" fillOpacity="0.65" />
                    <rect x="9.5" y="1" width="7.5" height="7.5" rx="1.5" fill="black" fillOpacity="0.40" />
                    <rect x="1" y="9.5" width="7.5" height="7.5" rx="1.5" fill="black" fillOpacity="0.40" />
                    <rect x="9.5" y="9.5" width="7.5" height="7.5" rx="1.5" fill="black" fillOpacity="0.20" />
                  </svg>
                </div>
                <div className="text-left sm:text-center">
                  <p className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.90)' }}>Launch Pixel Test</p>
                  <p className="text-[11px] font-mono mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>5 fields · K W R G B</p>
                </div>
              </button>
            </div>
          </div>

          {/* ── Step 03: Target Specifications ─────────────────────── */}
          <div className="rounded-2xl border p-6" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.09)' }}>
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[12px] font-bold"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.38)' }}
              >
                03
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold tracking-[2.5px] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>Step 03</p>
                <h2 className="text-[17px] font-bold tracking-[-0.02em] text-white">Target Specifications</h2>
              </div>
              <span
                className="shrink-0 text-[10px] font-semibold tracking-[2px] uppercase px-2.5 py-1.5 rounded-full border"
                style={{ borderColor: 'rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.28)' }}
              >
                Pass Criteria
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {specs.map(({ label, value, unit }) => (
                <div
                  key={label}
                  className="p-4 rounded-xl border flex flex-col"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <p className="text-[10px] font-semibold tracking-[2px] uppercase mb-2.5 leading-tight" style={{ color: 'rgba(255,255,255,0.28)' }}>
                    {label}
                  </p>
                  <p className="font-black tracking-[-0.04em] leading-none" style={{ fontSize: 'clamp(22px, 3vw, 30px)', color: AMBER }}>
                    {value}
                  </p>
                  <p className="text-[10px] font-mono mt-2" style={{ color: 'rgba(255,255,255,0.22)' }}>{unit}</p>
                </div>
              ))}
            </div>

            <div
              className="flex items-start gap-3 p-4 rounded-xl border"
              style={{ background: 'rgba(239,68,68,0.05)', borderColor: 'rgba(239,68,68,0.18)' }}
            >
              <div
                className="w-5 h-5 rounded flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5"
                style={{ background: 'rgba(239,68,68,0.18)', color: '#F87171' }}
              >
                !
              </div>
              <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <span className="font-semibold" style={{ color: 'rgba(248,113,113,0.90)' }}>If any metric fails, do not ship. </span>
                The unit must be recalibrated or formally rejected before leaving the facility.
              </p>
            </div>
          </div>

          {/* ── Step 04: Reference Patch Tool ──────────────────────── */}
          <div className="rounded-2xl border p-6" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.09)' }}>
            <div className="flex items-start gap-4 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[12px] font-bold"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.38)' }}
              >
                04
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-[2.5px] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>Step 04</p>
                <h2 className="text-[17px] font-bold tracking-[-0.02em] text-white">Reference Patch Tool</h2>
                <div className="flex items-center gap-1.5 mt-2">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="1.5" y="5" width="4" height="5.5" rx="1" stroke="rgba(255,255,255,0.40)" strokeWidth="1.2" />
                    <path d="M5.5 7.5V3a2 2 0 0 1 4 0v1" stroke="rgba(255,255,255,0.40)" strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="9" cy="5.5" r="1.5" stroke="rgba(255,255,255,0.40)" strokeWidth="1.2" />
                  </svg>
                  <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    Hardware measurement — <span style={{ color: 'rgba(255,255,255,0.65)' }}>your colorimeter</span> is the sensor.
                  </span>
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-[1fr_auto] sm:gap-8 sm:items-start">
              <div>
                <p className="text-[13px] leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.40)' }}>
                  Open Calman or LightSpace and begin a measurement session. <strong style={{ color: 'rgba(255,255,255,0.62)', fontWeight: 600 }}>Place your colorimeter against the panel</strong>, then advance to each patch as the software requests it using ← → keys. Patches display at 100% saturation with no active CMS or GPU colour management correction.
                </p>
                <div className="flex items-end gap-2 flex-wrap">
                  {refPatches.map(({ hex, label }) => (
                    <div key={hex} className="flex flex-col items-center gap-1.5">
                      <div
                        className="w-7 h-7 rounded-lg"
                        style={{
                          background: hex,
                          border: hex === '#000000' ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.12)',
                        }}
                      />
                      <span className="text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.22)' }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={launchFs}
                className="group mt-6 sm:mt-0 sm:w-[168px] flex sm:flex-col items-center sm:justify-center gap-3 w-full px-5 sm:px-4 py-4 rounded-xl border transition-all duration-150"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.09)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.20)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)')}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-150 group-hover:scale-105"
                  style={{ background: AMBER }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="1" y="1" width="7" height="7" rx="1.5" fill="black" fillOpacity="0.65" />
                    <rect x="10" y="1" width="7" height="7" rx="1.5" fill="black" fillOpacity="0.45" />
                    <rect x="1" y="10" width="7" height="7" rx="1.5" fill="black" fillOpacity="0.45" />
                    <rect x="10" y="10" width="7" height="7" rx="1.5" fill="black" fillOpacity="0.25" />
                  </svg>
                </div>
                <div className="text-left sm:text-center">
                  <p className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.90)' }}>Launch Patches</p>
                  <p className="text-[11px] font-mono mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>8 · 100% sat</p>
                </div>
              </button>
            </div>
          </div>

          {/* ── Step 05: Generate QA Report ────────────────────────── */}
          <div
            className="rounded-2xl border p-6"
            style={{
              background: '#111111',
              borderColor: 'rgba(234,179,8,0.28)',
              boxShadow: '0 0 0 1px rgba(234,179,8,0.05), 0 4px 28px rgba(234,179,8,0.07)',
            }}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[12px] font-bold"
                  style={{ background: 'rgba(234,179,8,0.14)', border: '1px solid rgba(234,179,8,0.35)', color: AMBER }}
                >
                  05
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-[2.5px] uppercase mb-0.5" style={{ color: 'rgba(234,179,8,0.72)' }}>
                    Step 05 — Mandatory
                  </p>
                  <h2 className="text-[17px] font-bold tracking-[-0.02em] text-white">Generate QA Report</h2>
                </div>
              </div>
              <div
                className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border"
                style={{ borderColor: 'rgba(234,179,8,0.35)', background: 'rgba(234,179,8,0.08)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: AMBER }} />
                <span className="text-[10px] font-semibold tracking-[2px] uppercase" style={{ color: AMBER }}>Required</span>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  n: '01',
                  title: 'Export validation PDF',
                  body: 'Upon a successful calibration passing ΔE ≤ 2.0, export the validation PDF from your calibration software (Calman or LightSpace).',
                },
                {
                  n: '02',
                  title: 'Save to USB drive',
                  bodyJsx: (
                    <>
                      Save the file to the Meirro USB drive under the exact filename:{' '}
                      <span
                        className="font-mono text-[11px] px-1.5 py-0.5 rounded whitespace-nowrap"
                        style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)' }}
                      >
                        [Serial_Number]_Calibration.pdf
                      </span>
                    </>
                  ),
                },
                {
                  n: '03',
                  title: 'Place in accessory box',
                  body: 'Place the USB drive in the accessory box and proceed with final packaging. Do not ship without this file on the drive.',
                },
              ].map(({ n, title, body, bodyJsx }) => (
                <div
                  key={n}
                  className="flex gap-4 p-4 rounded-xl border"
                  style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  <span className="text-[12px] font-bold shrink-0 mt-0.5 font-mono" style={{ color: AMBER, width: 20 }}>
                    {n}
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-white/85">{title}</p>
                    <p className="mt-1 text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>
                      {bodyJsx ?? body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-8 pt-5 border-t flex items-center justify-between"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.18)' }}>
            © 2026 Meirro Technologies · Internal use only
          </p>
          <button
            onClick={() => { sessionStorage.removeItem('meirro-qc-auth'); setUnlocked(false); }}
            className="text-[11px] transition-colors duration-150"
            style={{ color: 'rgba(255,255,255,0.22)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.50)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}
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
          {/* Always-visible ESC hint */}
          <div
            className="absolute bottom-6 right-8 text-[11px] font-mono tracking-[0.04em] pointer-events-none select-none"
            style={{ color: pxLight ? 'rgba(0,0,0,0.28)' : 'rgba(255,255,255,0.25)' }}
          >
            ← → cycle · Press ESC to exit
          </div>

          {/* Fading controls overlay */}
          <div
            className="absolute inset-0 flex flex-col justify-between transition-opacity duration-500"
            style={{ opacity: pixelOverlay ? 1 : 0, pointerEvents: pixelOverlay ? 'auto' : 'none' }}
          >
            {/* Top */}
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
                </div>
                <span
                  className="shrink-0 text-[13px] font-semibold font-mono px-3 py-1.5 rounded"
                  style={{ background: pxBorder, color: pxFg }}
                >
                  {pixelIdx + 1} / {pixelColors.length}
                </span>
              </div>
            </div>

            {/* Centre label */}
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

            {/* Bottom */}
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
                    style={{
                      width: i === pixelIdx ? 36 : 28,
                      height: i === pixelIdx ? 36 : 28,
                      borderRadius: '50%',
                      background: hex,
                      border: i === pixelIdx
                        ? `3px solid ${pxLight ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.9)'}`
                        : `2px solid ${pxLight ? 'rgba(0,0,0,0.20)' : 'rgba(255,255,255,0.28)'}`,
                      cursor: 'pointer',
                      outline: 'none',
                      transition: 'width 0.15s, height 0.15s',
                    }}
                  />
                ))}
              </div>
              <button
                onClick={exitPixel}
                className="text-[13px] font-medium px-4 py-2 rounded transition-opacity duration-150 hover:opacity-75"
                style={{ background: pxBorder, border: `1px solid ${pxBorder}`, color: pxFg, cursor: 'pointer' }}
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
                    style={{
                      width: i === patchIdx ? 36 : 28,
                      height: i === patchIdx ? 36 : 28,
                      borderRadius: '50%',
                      background: hex,
                      border: i === patchIdx
                        ? `3px solid ${pLightBg ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.9)'}`
                        : `2px solid ${pLightBg ? 'rgba(0,0,0,0.20)' : 'rgba(255,255,255,0.28)'}`,
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
                className="text-[13px] font-medium px-4 py-2 rounded transition-opacity duration-150 hover:opacity-75"
                style={{ background: pBorder, border: `1px solid ${pBorder}`, color: pFg, cursor: 'pointer' }}
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
