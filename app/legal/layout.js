import Link from 'next/link';

const legalLinks = [
  { label: 'Terms of Service',  href: '/legal/terms'   },
  { label: 'Privacy Policy',    href: '/legal/privacy'  },
  { label: 'Return Policy',     href: '/legal/returns'  },
  { label: 'Warranty',          href: '/legal/warranty' },
];

export default function LegalLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F7F7F9]">
      {/* Top bar */}
      <div className="border-b border-black/[0.07] bg-[#F7F7F9]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-[900px] mx-auto px-6 py-4 flex items-center justify-between gap-6 flex-wrap">
          <Link href="/" className="text-[16px] font-bold tracking-[-0.04em] text-[#0A0A0C]">
            Meirro
          </Link>
          <nav className="flex items-center gap-5 flex-wrap">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[12px] text-[#0A0A0C]/55 hover:text-[#0A0A0C]/90 transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-[900px] mx-auto px-6 py-16 md:py-24">
        {children}
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
