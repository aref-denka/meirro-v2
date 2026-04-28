export const metadata = {
  title: 'Warranty | Meirro',
  description: 'Meirro Pro 2-year limited warranty — coverage, exclusions, and how to claim.',
};

export default function WarrantyPage() {
  return (
    <article className="prose-legal">
      <p className="text-[11px] font-semibold tracking-[2.5px] uppercase text-[#0A0A0C]/40 mb-4">Legal</p>
      <h1 className="text-[32px] md:text-[40px] font-black tracking-[-0.04em] text-[#0A0A0C] mb-2">
        Warranty Policy
      </h1>
      <p className="text-[13px] text-[#0A0A0C]/45 mb-12">Last updated: April 2026</p>

      <Section title="2-Year Limited Warranty">
        <p>Meirro Technologies warrants the Meirro Pro monitor against defects in materials and workmanship under normal use for a period of <strong>two (2) years</strong> from the original date of purchase.</p>
      </Section>

      <Section title="What Is Covered">
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Panel defects: dead pixels exceeding manufacturer thresholds, backlight uniformity failures, colour accuracy degradation beyond ΔE 2</li>
          <li>Structural defects: CNC aluminium enclosure, stand mechanism, port assembly</li>
          <li>Electrical failures: power circuitry, Thunderbolt 5 ports, internal components under normal operating conditions</li>
          <li>Factory calibration drift (verified by authorised service)</li>
        </ul>
      </Section>

      <Section title="What Is Not Covered">
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Physical damage caused by drops, impacts, liquid contact, or mishandling</li>
          <li>Damage caused by use outside Meirro's published operating specifications</li>
          <li>Cosmetic wear: minor scratches, scuffs, or oxidation resulting from normal use</li>
          <li>Damage caused by unauthorised modification, repair, or disassembly</li>
          <li>Consumable components with expected lifespan (e.g., power cables)</li>
          <li>Damage resulting from acts of God, power surges, or improper installation</li>
          <li>Products with removed or altered serial numbers</li>
        </ul>
      </Section>

      <Section title="Dead Pixel Policy">
        <p>The Meirro Pro panel is factory-inspected before shipment. We will authorise a warranty repair or replacement if your unit exhibits:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>1 or more permanently bright (stuck-on) pixels</li>
          <li>3 or more permanently dark (stuck-off) pixels</li>
          <li>Any pixel defect within the central 20% of the screen area</li>
        </ul>
      </Section>

      <Section title="How to Make a Warranty Claim">
        <ol className="list-decimal pl-5 space-y-2 mt-2">
          <li>Email <a href="mailto:support@clickclack.io" className="text-[#7C5CFC] hover:underline">support@clickclack.io</a> with your order number, a description of the defect, and photographs or video evidence where applicable.</li>
          <li>Our support team will respond within 3 business days to assess the claim.</li>
          <li>If the claim is approved, we will provide a pre-paid return shipping label and arrange a repair or replacement at our discretion.</li>
          <li>Replacement units carry the remainder of the original warranty period or 90 days from replacement date, whichever is longer.</li>
        </ol>
      </Section>

      <Section title="Limitation of Warranty">
        <p>This warranty is the sole and exclusive remedy for defective products. To the extent permitted by law, Meirro Technologies disclaims all implied warranties. Our total liability under this warranty shall not exceed the original purchase price of the product.</p>
        <p>This warranty gives you specific legal rights. You may also have other rights that vary by country or state.</p>
      </Section>

      <Section title="Contact">
        <p>Warranty support: <a href="mailto:support@clickclack.io" className="text-[#7C5CFC] hover:underline">support@clickclack.io</a></p>
      </Section>
    </article>
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
