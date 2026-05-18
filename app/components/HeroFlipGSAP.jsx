'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* Hero — 3D card flip on scroll, powered by GSAP + ScrollTrigger.

   Architecture
   -----------
   - Outer <section> is 300vh tall — that's the scroll budget the flip
     consumes. The inner stage is `position: sticky; top: 0; height:
     100vh`, so it pins to the viewport while the user scrolls the
     section.
   - The card has a `perspective: 1400px` parent and a
     `transform-style: preserve-3d` rotating inner. Two stacked
     `<Image>` faces (front, back) use `backface-visibility: hidden`
     so only the camera-facing one renders.

   Animation
   ---------
   - ScrollTrigger binds the card's `rotateY` to scroll progress
     between `start: 'top top'` and `end: 'bottom top'` (i.e., the
     entire section scroll).
   - `ease: 'none'` + `scrub: 1` produces a linear interpolation with
     ~1 frame of smoothing — flipping the card both forward when
     scrolling down and reverse when scrolling up, with zero jitter.
   - The title and scroll-hint fade out during the first ~500px of
     scroll via a second scrubbed tween. */

export default function HeroFlipGSAP() {
  const sectionRef = useRef(null);
  const cardRef    = useRef(null);
  const titleRef   = useRef(null);
  const hintRef    = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // The flip: 0° → 180°, concentrated in the middle 60% of scroll
      // with a punchy in-out ease and a low scrub so it responds
      // tightly to wheel movement — the Framer University "snap" feel.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end:   'bottom top',
          scrub: 0.4,
        },
      });
      tl.to(cardRef.current, { rotateY: 0,   duration: 0.20 })                            // hold front
        .to(cardRef.current, { rotateY: 180, duration: 0.60, ease: 'power3.inOut' })       // snap flip
        .to(cardRef.current, { rotateY: 180, duration: 0.20 });                            // hold back

      // Title + scroll-hint fade out at the start of the scroll.
      gsap.to([titleRef.current, hintRef.current], {
        opacity: 0,
        y: -28,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end:   'top top-=400',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="display"
      className="relative"
      style={{ height: '200vh' }}
      aria-label="Meirro Pro — 32-inch 6K monitor"
    >
      {/* Sticky stage — stays pinned for the duration of the section */}
      <div className="sticky top-0 h-screen w-full overflow-hidden relative bg-[#F7F7F9] flex flex-col items-center">

        {/* Ambient violet bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 20% 40%, rgba(124,92,252,0.06) 0%, transparent 55%), ' +
              'radial-gradient(ellipse 60% 50% at 80% 60%, rgba(196,75,247,0.04) 0%, transparent 55%)',
          }}
          aria-hidden="true"
        />

        {/* Title */}
        <div
          ref={titleRef}
          className="text-center px-6 z-20 pointer-events-none"
          style={{ paddingTop: 'clamp(40px, 6vh, 80px)' }}
        >
          <h1
            className="font-black tracking-[-0.06em] leading-[0.92] text-[#0A0A0C]"
            style={{ fontSize: 'clamp(56px, 10vw, 140px)' }}
          >
            Meirro Pro.
          </h1>
          <p
            className="mt-4 text-[#0A0A0C]/75 font-normal tracking-[-0.01em]"
            style={{ fontSize: 'clamp(14px, 1.7vw, 19px)' }}
          >
            Precision for professionals.
          </p>
        </div>

        {/* Card — flex-1 grabs the middle vertical space between title and hint */}
        <div className="flex-1 w-full flex items-center justify-center px-6 z-10">
          <div
            className="relative"
            style={{
              width: 'min(820px, 90vw)',
              aspectRatio: '5 / 4',
              perspective: '1400px',
            }}
          >
            <div
              ref={cardRef}
              className="relative w-full h-full"
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              {/* Front face — front of the monitor */}
              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.18))',
                }}
              >
                <Image
                  src="/hero/front.png"
                  alt="Meirro Pro — front view"
                  fill
                  sizes="(max-width: 768px) 90vw, 820px"
                  priority
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                  draggable={false}
                />
              </div>

              {/* Back face — pre-rotated 180° so it reads forward at the end */}
              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.18))',
                }}
              >
                <Image
                  src="/hero/back.png"
                  alt="Meirro Pro — back view"
                  fill
                  sizes="(max-width: 768px) 90vw, 820px"
                  priority
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={hintRef}
          className="flex flex-col items-center gap-2 pointer-events-none z-20"
          style={{ paddingBottom: 'clamp(20px, 3vh, 40px)' }}
        >
          <span className="text-[10px] font-medium tracking-[2.5px] uppercase text-[#0A0A0C]/40">
            Scroll
          </span>
          <div
            className="scroll-hint-line w-px h-8 bg-gradient-to-b from-[#0A0A0C]/20 to-transparent"
            style={{ transformOrigin: 'top' }}
            aria-hidden="true"
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollHintPulse {
          0%, 100% { transform: scaleY(1); opacity: 0.4; }
          50%      { transform: scaleY(0.4); opacity: 1; }
        }
        .scroll-hint-line {
          animation: scrollHintPulse 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
