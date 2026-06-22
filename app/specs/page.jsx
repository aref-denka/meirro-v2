import Link from 'next/link';

export const metadata = {
  title: 'Specs | Meirro Pro 32" 6K Monitor',
  description:
    'Full technical specifications for the Meirro Pro 32-inch 6K monitor — Nano IPS Black panel, 6144 × 3456 at 224 ppi, 98% DCI-P3, factory ΔE < 2, USB-C, and a CNC anodized aluminum body.',
  alternates: { canonical: '/specs' },
};

const specGroups = [
  {
    category: 'Display',
    specs: [
      { label: 'Panel Type',        value: 'Nano IPS Black' },
      { label: 'Size',              value: '32.0" diagonal' },
      { label: 'Aspect Ratio',      value: '16:9' },
      { label: 'Active Area',       value: '696.73 × 391.91 mm' },
      { label: 'Resolution',        value: '6144 × 3456 (6K)' },
      { label: 'Pixel Density',     value: '224 ppi' },
      { label: 'Pixel Pitch',       value: '0.1134 mm' },
      { label: 'Refresh Rate',      value: '60 Hz' },
      { label: 'Response Time',     value: 'GTG 14 ms' },
      { label: 'Brightness',        value: '450 nits typical (SDR) · 750 nits (HDR enabled)' },
      { label: 'Contrast',          value: '2,000:1 native' },
      { label: 'Viewing Angle',     value: '178° H · 178° V' },
      { label: 'Surface',           value: 'Anti-glare glossy' },
      { label: 'Backlight',         value: 'Edge-lit LED' },
    ],
  },
  {
    category: 'Colour',
    specs: [
      { label: 'Colour Space',      value: 'sRGB · DCI-P3 · Adobe RGB' },
      { label: 'sRGB Coverage',     value: '99%' },
      { label: 'DCI-P3 Coverage',   value: '98%' },
      { label: 'Adobe RGB Coverage', value: '99%' },
      { label: 'Bit Depth',         value: '10-bit (1.07 billion colours)' },
      { label: 'Calibration',       value: 'Factory, per-unit' },
      { label: 'Delta E',           value: 'ΔE < 2 average' },
      { label: 'Calibration Report', value: 'Included with every unit' },
    ],
  },
  {
    category: 'Connectivity',
    specs: [
      { label: 'USB-C Upstream',    value: '× 1 · 80 Gbps' },
      { label: 'USB-C Downstream',  value: '× 4 · USB 2.0 · 480 Mbps' },
      { label: 'USB Power Delivery', value: 'Up to 96 W host charging' },
      { label: 'Cable',             value: 'USB4 80Gbps Cable' },
    ],
  },
  {
    category: 'Power',
    specs: [
      { label: 'Input',             value: '100–240 V AC, 50/60 Hz' },
      { label: 'Power Cord',        value: 'Detachable IEC C13' },
      { label: 'Typical Draw',      value: '~55 W (SDR, 200 nits)' },
      { label: 'Maximum Draw',      value: '~210 W (including 96 W host charging)' },
      { label: 'Standby',           value: '< 0.5 W' },
    ],
  },
  {
    category: 'Physical',
    specs: [
      { label: 'Size',              value: '32.0" diagonal' },
      { label: 'Weight (panel)',    value: '3.83 kg' },
      { label: 'Weight (monitor)',  value: '8.92 kg' },
      { label: 'Body Material',     value: 'CNC anodized aluminum alloy' },
      { label: 'Stand',             value: 'Included · CNC anodized aluminum alloy' },
      { label: 'Stand Tilt',        value: '-5° to +25°' },
      { label: 'VESA Mount',        value: '100 × 100 mm' },
    ],
  },
  {
    category: 'Environment',
    specs: [
      { label: 'Operating Temp',    value: '0° to 35° C' },
      { label: 'Storage Temp',      value: '-20° to 60° C' },
      { label: 'Humidity',          value: '10–90% non-condensing' },
      { label: 'Altitude',          value: 'Up to 3,048 m operating · 12,192 m storage' },
    ],
  },
  {
    category: 'In the Box',
    specs: [
      { label: 'Display',           value: 'Meirro Pro 32" 6K Monitor' },
      { label: 'Stand',             value: 'CNC anodized aluminum stand' },
      { label: 'Cable',             value: 'USB4 80Gbps Cable' },
      { label: 'Power',             value: 'Detachable IEC C13 cable' },
      { label: 'Documents',         value: 'Per-unit calibration report · Quick-start guide' },
    ],
  },
  {
    category: 'Warranty & Support',
    specs: [
      { label: 'Warranty',          value: '2-year limited hardware warranty' },
      { label: 'Support',           value: 'support@meirro.com' },
      { label: 'Replacement',       value: 'Advance replacement available' },
    ],
  },
];

export default function SpecsPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F9]">
      {/* Top bar */}
      <div className="border-b border-black/[0.07] bg-[#F7F7F9]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-[1100px] mx-auto px-6 py-4 flex items-center justify-between gap-6 flex-wrap">
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

      {/* Specs section */}
      <section
        id="specs-table"
        aria-label="Full technical specifications for Meirro Pro 32-inch 6K monitor"
        className="relative bg-white py-20 md:py-28 px-6 overflow-hidden"
      >
        <div className="blueprint-grid absolute inset-0 opacity-[0.6]" />

        <div className="relative max-w-[1100px] mx-auto">
          {/* Header */}
          <div className="mb-16">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#0A0A0C]/50 mb-5">
              Technical Specifications
            </p>
            <div className="flex items-end justify-between gap-8">
              <h1
                className="font-black tracking-[-0.05em] leading-[0.94] text-[#0A0A0C]"
                style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
              >
                Every number.<br />Accounted for.
              </h1>
              <div className="hidden md:block h-px bg-black/10 flex-1 mb-3" />
            </div>
            <p className="mt-8 max-w-2xl text-[14px] text-[#0A0A0C]/70 leading-relaxed">
              The complete spec sheet for the Meirro Pro Display 6K. Each unit is
              individually measured at the factory and shipped with the calibration
              report we used to verify it before it left the line.
            </p>
          </div>

          {/* Spec groups */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
            {specGroups.map((group) => (
              <div key={group.category}>
                <p className="text-[10px] font-semibold tracking-[2.5px] uppercase text-[#0A0A0C]/45 mb-5 pb-3 border-b border-black/[0.06]">
                  {group.category}
                </p>
                <div>
                  {group.specs.map(({ label, value }) => (
                    <div
                      key={label}
                      className="spec-row flex items-baseline justify-between gap-6 py-3 border-b border-black/[0.05] rounded-sm px-2 -mx-2"
                    >
                      <span className="text-[11px] font-semibold tracking-[0.5px] uppercase text-[#0A0A0C]/55 shrink-0 w-32">
                        {label}
                      </span>
                      <span className="text-[14px] text-[#0A0A0C] font-normal text-right leading-snug">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            <p className="text-[11px] text-[#0A0A0C]/55 leading-relaxed">
              <span className="block font-semibold text-[#0A0A0C]/75 mb-1.5 uppercase tracking-[1.5px] text-[10px]">
                Measurement Method
              </span>
              All colour figures are measured at the factory using a tristimulus colorimeter
              against a 100% reference patch at the centre of the screen, after a 30-minute
              warm-up. Brightness is measured in SDR at the panel&apos;s default colour mode.
            </p>
            <p className="text-[11px] text-[#0A0A0C]/55 leading-relaxed">
              <span className="block font-semibold text-[#0A0A0C]/75 mb-1.5 uppercase tracking-[1.5px] text-[10px]">
                Disclaimer
              </span>
              Specifications subject to change without notice. All measurements are
              approximate. Colour accuracy figures are based on the factory calibration
              of production units and may shift slightly with use; we recommend
              recalibration every 6–12 months for professional workflows.
            </p>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <div className="border-t border-black/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 py-6 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-[11px] text-[#0A0A0C]/40">© 2026 Meirro. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/testing-guide" className="text-[11px] text-[#0A0A0C]/50 hover:text-[#0A0A0C] transition-colors">
              Testing guide
            </Link>
            <Link href="/about_us" className="text-[11px] text-[#0A0A0C]/50 hover:text-[#0A0A0C] transition-colors">
              About us
            </Link>
            <Link href="/contact" className="text-[11px] text-[#0A0A0C]/50 hover:text-[#0A0A0C] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
