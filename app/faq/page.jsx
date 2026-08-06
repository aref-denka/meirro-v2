import Link from 'next/link';
import FaqItem from '../components/FaqItem';

export const metadata = {
  title: 'FAQ | Meirro Pro 32" 6K Monitor',
  description:
    'Answers to common questions about the Meirro Pro 32-inch 6K monitor — including step-by-step instructions for updating the display firmware from a USB-C flash drive.',
  alternates: { canonical: '/faq' },
};

/* ── Firmware update steps ────────────────────────────────────── */
const firmwareSteps = [
  {
    title: 'Insert the flash drive',
    body: 'Facing the rear of the monitor, locate the USB-C downstream port at the far-right end of the port cluster — this is the port at the opposite end from the main upstream port (the one marked with a lightning-bolt icon). Insert the flash drive into this downstream port.',
  },
  {
    title: 'Open the menu',
    body: 'Press the Menu button (☰) on the upper right of the remote control.',
  },
  {
    title: 'Go to Quick Link → FW Update Function',
    body: 'Navigate to Quick Link, then select FW Update Function.',
  },
  {
    title: 'Select Enable',
    body: 'The monitor will begin scanning the flash drive for the firmware file.',
  },
  {
    title: 'Confirm the upgrade',
    body: 'When the monitor detects the firmware file, it will prompt you to proceed. Select Confirm.',
  },
  {
    title: 'Confirm the restart',
    body: 'Once the update finishes, the monitor will prompt you to restart. Select Confirm.',
  },
  {
    title: 'Finish',
    body: 'When the monitor powers back on, the firmware update is complete. Remove the flash drive.',
  },
];

const beforeYouBegin = [
  "Download the firmware file (.bin) provided by Meirro and copy it to a USB-C flash drive. Place the file in the drive's root directory — not inside a folder.",
  'Have the display’s remote control on hand.',
];

/* ── FAQPage structured data ──────────────────────────────────── */
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I update the firmware on my Meirro Pro Display?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Before you begin: download the firmware file (.bin) provided by Meirro and copy it to a USB-C flash drive, placing the file in the drive’s root directory (not inside a folder). Have the display’s remote control on hand. Do not disconnect power or remove the flash drive while the update is in progress. ' +
          firmwareSteps.map((s, i) => `${i + 1}. ${s.title}. ${s.body}`).join(' ') +
          ' After the update: if the firmware update prompt appears again, return to Menu → Quick Link → FW Update Function and set it to Disable. This stops the monitor from scanning for firmware files.',
      },
    },
  ],
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* Top bar */}
      <div className="border-b border-black/[0.07] bg-[#F7F7F9]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-[900px] mx-auto px-6 py-4 flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-2.5">
            <Link href="/" className="text-[16px] font-bold tracking-[-0.04em] text-[#0A0A0C]">
              Meirro
            </Link>
            <span className="text-[#0A0A0C]/20">/</span>
            <span className="text-[13px] font-medium text-[#0A0A0C]/45">FAQ</span>
          </div>
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
        <p className="text-[11px] font-semibold tracking-[2.5px] uppercase text-[#0A0A0C]/40 mb-4">
          Support
        </p>
        <h1 className="text-[32px] md:text-[40px] font-black tracking-[-0.04em] text-[#0A0A0C] mb-3">
          Frequently Asked Questions
        </h1>
        <p className="text-[15px] text-[#0A0A0C]/55 leading-relaxed max-w-[560px] mb-10">
          Setup, maintenance, and troubleshooting for the Meirro Pro 32&quot; 6K display.
        </p>

        <div className="space-y-3">
          <FaqItem
            question="How do I update the firmware on my Meirro Pro Display?"
            category="Firmware"
            defaultOpen
          >
            {/* Before you begin */}
            <div className="mt-5">
              <p className="text-[10px] font-semibold tracking-[2.5px] uppercase text-[#0A0A0C]/40 mb-3">
                Before you begin
              </p>
              <ul className="space-y-2.5">
                {beforeYouBegin.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full"
                      style={{ background: '#7C5CFC' }}
                    />
                    <span className="text-[14px] text-[#0A0A0C]/70 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div
                className="mt-4 flex items-start gap-3 p-4 rounded-xl border"
                style={{ background: 'rgba(234,179,8,0.07)', borderColor: 'rgba(234,179,8,0.28)' }}
              >
                <span
                  className="shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold"
                  style={{ background: 'rgba(234,179,8,0.22)', color: '#9A6B00' }}
                >
                  !
                </span>
                <p className="text-[13px] leading-relaxed text-[#0A0A0C]/70">
                  <strong className="font-semibold text-[#0A0A0C]/85">
                    Do not disconnect power or remove the flash drive
                  </strong>{' '}
                  while the update is in progress.
                </p>
              </div>
            </div>

            {/* Steps */}
            <div className="mt-8">
              <p className="text-[10px] font-semibold tracking-[2.5px] uppercase text-[#0A0A0C]/40 mb-4">
                Steps
              </p>
              <ol className="space-y-4">
                {firmwareSteps.map(({ title, body }, i) => (
                  <li key={title} className="flex items-start gap-4">
                    <span
                      className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #7C5CFC 0%, #C44BF7 100%)' }}
                    >
                      {i + 1}
                    </span>
                    <div className="pt-0.5">
                      <p className="text-[14px] font-semibold text-[#0A0A0C] tracking-[-0.01em]">
                        {title}
                      </p>
                      <p className="mt-1 text-[14px] text-[#0A0A0C]/60 leading-relaxed">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* After the update */}
            <div
              className="mt-8 p-5 rounded-xl border"
              style={{ background: 'rgba(124,92,252,0.05)', borderColor: 'rgba(124,92,252,0.20)' }}
            >
              <p className="text-[10px] font-semibold tracking-[2.5px] uppercase text-[#7C5CFC] mb-2">
                After the update
              </p>
              <p className="text-[14px] leading-relaxed text-[#0A0A0C]/70">
                If the firmware update prompt appears again, return to{' '}
                <strong className="font-semibold text-[#0A0A0C]/85">
                  Menu → Quick Link → FW Update Function
                </strong>{' '}
                and set it to <strong className="font-semibold text-[#0A0A0C]/85">Disable</strong>.
                This stops the monitor from scanning for firmware files.
              </p>
            </div>
          </FaqItem>
        </div>

        {/* Still need help */}
        <div className="mt-12 pt-10 border-t border-black/[0.07] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="text-[16px] font-bold tracking-[-0.02em] text-[#0A0A0C]">
              Still need help?
            </p>
            <p className="mt-1 text-[13px] text-[#0A0A0C]/55 leading-relaxed">
              Our support team is happy to walk you through it.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="mailto:support@meirro.com"
              className="inline-flex items-center justify-center text-[13px] font-medium text-white px-5 py-2.5 rounded-full transition-opacity duration-200 hover:opacity-85"
              style={{ background: 'linear-gradient(135deg, #7C5CFC 0%, #C44BF7 100%)' }}
            >
              Email support
            </a>
            <Link
              href="/contact"
              className="text-[13px] text-[#0A0A0C]/55 hover:text-[#0A0A0C]/90 transition-colors duration-200"
            >
              Contact page →
            </Link>
          </div>
        </div>
      </main>

      {/* Footer strip */}
      <div className="border-t border-black/[0.06]">
        <div className="max-w-[900px] mx-auto px-6 py-6 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-[11px] text-[#0A0A0C]/40">© 2026 Meirro. All rights reserved.</p>
          <Link href="/" className="text-[11px] text-[#0A0A0C]/50 hover:text-[#0A0A0C] transition-colors">
            ← Back to product
          </Link>
        </div>
      </div>
    </div>
  );
}
