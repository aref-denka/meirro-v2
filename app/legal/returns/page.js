export const metadata = {
  title: 'Return Policy | Meirro',
  description: 'Meirro Pro 30-day return policy, refund process, and eligibility conditions.',
};

export default function ReturnsPage() {
  return (
    <article className="prose-legal">
      <p className="text-[11px] font-semibold tracking-[2.5px] uppercase text-[#0A0A0C]/40 mb-4">Legal</p>
      <h1 className="text-[32px] md:text-[40px] font-black tracking-[-0.04em] text-[#0A0A0C] mb-2">
        Return Policy
      </h1>
      <p className="text-[13px] text-[#0A0A0C]/45 mb-12">Last updated: April 2026</p>

      <Section title="30-Day Returns">
        <p>We want you to love your Meirro Pro. If for any reason you are not satisfied, you may return your purchase within <strong>30 days</strong> of the delivery date for a full refund of the product price.</p>
      </Section>

      <Section title="Eligibility Conditions">
        <p>To qualify for a return, the item must:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Be in its original, undamaged condition</li>
          <li>Include all original packaging, accessories, cables, and documentation</li>
          <li>Show no signs of physical damage, modification, or misuse</li>
          <li>Not have been used in a commercial or industrial environment beyond standard evaluation</li>
        </ul>
        <p className="mt-3">Items returned outside the 30-day window, or not meeting the above conditions, will not be accepted unless covered under warranty.</p>
      </Section>

      <Section title="How to Initiate a Return">
        <ol className="list-decimal pl-5 space-y-2 mt-2">
          <li>Email <a href="mailto:support@meirro.com" className="text-[#7C5CFC] hover:underline">support@meirro.com</a> with your order number and reason for return.</li>
          <li>We will respond within 2 business days with a Return Merchandise Authorisation (RMA) number and return shipping instructions.</li>
          <li>Package the unit securely in its original packaging and ship to the address provided. We recommend using a tracked service.</li>
          <li>Once we receive and inspect the item, your refund will be processed within 5–10 business days.</li>
        </ol>
      </Section>

      <Section title="Return Shipping Costs">
        <p><strong>Change of mind returns:</strong> Return shipping is at the customer's expense.</p>
        <p><strong>Defective or incorrect items:</strong> We will cover return shipping in full. Contact us first before sending anything back.</p>
      </Section>

      <Section title="Refunds">
        <p>Approved refunds are issued to the original payment method. Original shipping charges are non-refundable unless the return is due to a defect or our error.</p>
        <p>Depending on your bank or payment provider, refunds may take 5–10 business days to appear on your statement after processing.</p>
      </Section>

      <Section title="Damaged on Arrival">
        <p>If your Meirro Pro arrives physically damaged, contact us at <a href="mailto:support@meirro.com" className="text-[#7C5CFC] hover:underline">support@meirro.com</a> within <strong>48 hours of delivery</strong> with photos of the damage and packaging. We will arrange a replacement or full refund at no cost to you.</p>
      </Section>

      <Section title="Contact">
        <p>Questions about a return? <a href="mailto:support@meirro.com" className="text-[#7C5CFC] hover:underline">support@meirro.com</a></p>
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
