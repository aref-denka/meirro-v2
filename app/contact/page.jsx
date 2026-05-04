import Link from 'next/link';

export const metadata = {
  title: 'Contact | Meirro',
  description: 'Get in touch with the Meirro team for support, partnerships, and inquiries.',
};

export default function ContactPage() {
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
            Contact
          </p>
          <h1 className="text-[32px] md:text-[40px] font-black tracking-[-0.04em] text-[#0A0A0C] mb-12">
            Get in Touch
          </h1>

          <Section title="About Us">
            <p>
              Meirro is a precision display engineering company built for professionals who refuse to
              compromise. Our flagship product, the Meirro Pro 32″ 6K monitor, is engineered from the
              ground up — starting with a CNC-machined 6061-T6 aluminum chassis and ending with a
              pixel-perfect panel calibrated to exacting color accuracy standards. We believe that the
              tools you work with should be as refined as the work you produce. Every detail — from the
              Thunderbolt 5 connectivity to the precision stand mechanism — reflects our commitment to
              craftsmanship, performance, and elevated everyday use.
            </p>
          </Section>

          <Section title="Partnerships">
            <p>
              We&apos;re always open to new collaborations with creators, studios, and brands who share
              our commitment to quality and craftsmanship. If you&apos;re interested in working with
              Meirro, reach out to us at{' '}
              <a href="mailto:partnership@meirro.com" className="text-[#7C5CFC] hover:underline">
                partnership@meirro.com
              </a>
            </p>
          </Section>

          <Section title="Customer Support">
            <p>
              For questions about your order, product, or warranty, our support team is here to help.
            </p>
            <p>
              Email us at{' '}
              <a href="mailto:support@meirro.com" className="text-[#7C5CFC] hover:underline">
                support@meirro.com
              </a>
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
