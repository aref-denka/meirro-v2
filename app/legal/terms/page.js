export const metadata = {
  title: 'Terms of Service | Meirro',
  description: 'Terms of Service for purchasing and using Meirro Pro products.',
};

export default function TermsPage() {
  return (
    <article className="prose-legal">
      <p className="text-[11px] font-semibold tracking-[2.5px] uppercase text-[#0A0A0C]/40 mb-4">Legal</p>
      <h1 className="text-[32px] md:text-[40px] font-black tracking-[-0.04em] text-[#0A0A0C] mb-2">
        Terms of Service
      </h1>
      <p className="text-[13px] text-[#0A0A0C]/45 mb-12">Last updated: April 2026</p>

      <Section title="1. Agreement to Terms">
        <p>By visiting meirro.web.app, placing an order, or using any service offered by Meirro Technologies ("Meirro", "we", "us", "our"), you agree to be bound by these Terms of Service. If you do not agree, please do not use our site or services.</p>
      </Section>

      <Section title="2. Products and Purchases">
        <p>All orders for Meirro Pro products are processed through ClickClack (clickclack.io), our authorised fulfilment partner. By completing a purchase you also agree to ClickClack's terms of service and privacy policy. Meirro Technologies retains responsibility for product quality, warranty claims, and post-sale support.</p>
        <p>Prices are displayed in USD and are subject to change without notice. We reserve the right to cancel or refuse any order at our discretion, including in cases of pricing errors.</p>
      </Section>

      <Section title="3. Shipping and Delivery">
        <p>Orders ship within 5–7 business days of payment confirmation. Estimated delivery windows are provided in good faith and are not guaranteed. Meirro is not liable for delays caused by carriers, customs authorities, or events outside our control.</p>
        <p>Risk of loss passes to the buyer upon handover to the carrier. If your order arrives damaged, contact us within 7 days of delivery at <a href="mailto:support@meirro.com" className="text-[#7C5CFC] hover:underline">support@meirro.com</a>.</p>
      </Section>

      <Section title="4. Intellectual Property">
        <p>All content on this website — including text, images, design, graphics, logos, and product imagery — is the property of Meirro Technologies and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any Meirro content without express written permission.</p>
      </Section>

      <Section title="5. Disclaimer of Warranties">
        <p>The Meirro Pro is sold with a limited hardware warranty as described in our <a href="/legal/warranty" className="text-[#7C5CFC] hover:underline">Warranty Policy</a>. Except as expressly stated, the site and its content are provided "as is" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability or fitness for a particular purpose.</p>
      </Section>

      <Section title="6. Limitation of Liability">
        <p>To the fullest extent permitted by law, Meirro Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your purchase or use of our products or website. Our total liability shall not exceed the amount you paid for the product giving rise to the claim.</p>
      </Section>

      <Section title="7. Governing Law">
        <p>These Terms are governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Delaware.</p>
      </Section>

      <Section title="8. Changes to Terms">
        <p>We may update these Terms at any time. The revised version will be effective upon posting with an updated date. Continued use of our site after changes constitutes acceptance of the new Terms.</p>
      </Section>

      <Section title="9. Contact">
        <p>Questions about these Terms? Reach us at <a href="mailto:support@meirro.com" className="text-[#7C5CFC] hover:underline">support@meirro.com</a>.</p>
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
