import Link from 'next/link';

export const metadata = {
  title: 'About Us | Meirro',
  description: 'Meirro was built to fill the gap Apple left. The story of who we are and why we built the Pro Display 6K.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F9]">
      {/* Top bar */}
      <div className="border-b border-black/[0.07] bg-[#F7F7F9]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-[900px] mx-auto px-6 py-4 flex items-center justify-between gap-6 flex-wrap">
          <Link href="/" className="text-[16px] font-bold tracking-[-0.04em] text-[#0A0A0C]">
            Meirro
          </Link>
          <Link
            href="/"
            className="text-[12px] text-[#0A0A0C]/55 hover:text-[#0A0A0C]/90 transition-colors duration-200"
          >
            ← Back to home
          </Link>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-[900px] mx-auto px-6 py-16 md:py-24">
        <article>
          <p className="text-[11px] font-semibold tracking-[2.5px] uppercase text-[#0A0A0C]/40 mb-4">
            About Us
          </p>
          <h1 className="text-[32px] md:text-[40px] font-black tracking-[-0.04em] text-[#0A0A0C] mb-12">
            We built the monitor Apple stopped making.
          </h1>

          <Section title="The Gap">
            <p>
              In 2026, Apple discontinued the 32″ 6K Pro Display XDR and replaced it with a 27″ 5K
              Studio Display XDR. For the creative professionals who had been waiting years for a
              refresh — colorists, editors, photographers, developers running big Macs — that
              wasn&apos;t an upgrade. It was a retreat.
            </p>
            <p>
              There is now no first-party 32″ 6K option from Apple at any price. We thought that
              was unacceptable. So we built one.
            </p>
          </Section>

          <Section title="Who We Are">
            <p>
              Meirro is a brand by ClickClack — the small team behind one of the most trusted names
              in the custom mechanical keyboard community. For years we&apos;ve built precision input
              devices for people who care deeply about their tools. The Pro Display 6K is us applying
              that same obsession to the other end of the workflow.
            </p>
            <p>
              We&apos;re not a display conglomerate. We&apos;re a small team with a specific point of
              view: that professional-grade hardware should be treated like the professional tool it
              is, not as a consumer product with a spec sheet and a warranty card.
            </p>
          </Section>

          <Section title="What We Built">
            <p>
              The Meirro Pro Display 6K is 32 inches of true 6K — 6144×3456 — housed in a CNC
              anodized aluminum body. Every panel ships factory-calibrated to ΔE&lt;2, with a
              calibration report included, because accuracy you can&apos;t verify isn&apos;t accuracy.
            </p>
            <p>
              It&apos;s built to live on a Mac. HDR works out of the box. Brightness adjusts directly
              from macOS without any software workarounds. Thunderbolt 4+ handles charging over a
              single cable, and four USB-C ports mean your desk stays clean.
            </p>
            <p>
              We back it with a warranty and service commitment that reflects what this monitor
              actually is — a long-term investment in your work, not a product you replace when
              something goes wrong.
            </p>
          </Section>

          <Section title="Why It Matters">
            <p>
              The people who need this monitor — the colorists grading on 6K timelines, the
              photographers editing full-frame RAW, the developers who want pixel-perfect density on
              a screen big enough to actually work on — have been told to settle. We don&apos;t think
              they should.
            </p>
            <p>
              Meirro exists because quality tools make better work possible, and that belief is
              worth building a company around.
            </p>
          </Section>

          <Section title="Get in Touch">
            <p>
              Questions, partnerships, or just want to talk displays — reach us at{' '}
              <a href="mailto:support@meirro.com" className="text-[#7C5CFC] hover:underline">
                support@meirro.com
              </a>
              {' '}or visit our{' '}
              <Link href="/contact" className="text-[#7C5CFC] hover:underline">
                contact page
              </Link>
              .
            </p>
          </Section>
        </article>
      </main>

      {/* Footer strip */}
      <div className="border-t border-black/[0.06] mt-8">
        <div className="max-w-[900px] mx-auto px-6 py-6 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-[11px] text-[#0A0A0C]/40">© 2026 Meirro Technologies. All rights reserved.</p>
          <Link href="/" className="text-[11px] text-[#0A0A0C]/50 hover:text-[#0A0A0C] transition-colors">
            ← Back to meirro.web.app
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-[16px] font-bold tracking-[-0.02em] text-[#0A0A0C] mb-3">{title}</h2>
      <div className="space-y-3 text-[14px] text-[#0A0A0C]/70 leading-relaxed">{children}</div>
    </section>
  );
}
