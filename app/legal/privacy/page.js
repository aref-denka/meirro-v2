export const metadata = {
  title: 'Privacy Policy | Meirro',
  description: 'How Meirro Technologies collects, uses, and protects your personal data.',
};

export default function PrivacyPage() {
  return (
    <article className="prose-legal">
      <p className="text-[11px] font-semibold tracking-[2.5px] uppercase text-[#0A0A0C]/40 mb-4">Legal</p>
      <h1 className="text-[32px] md:text-[40px] font-black tracking-[-0.04em] text-[#0A0A0C] mb-2">
        Privacy Policy
      </h1>
      <p className="text-[13px] text-[#0A0A0C]/45 mb-12">Last updated: April 2026</p>

      <Section title="1. Who We Are">
        <p>Meirro Technologies operates meirro.web.app. This Privacy Policy explains how we collect, use, and protect information when you visit our website or make a purchase.</p>
        <p>Contact: <a href="mailto:support@meirro.com" className="text-[#7C5CFC] hover:underline">support@meirro.com</a></p>
      </Section>

      <Section title="2. Information We Collect">
        <p><strong>Automatically collected:</strong> When you visit our site, we may collect anonymised analytics data including pages visited, time on site, device type, and general location (country/region). This is collected via Google Analytics 4 only after you have given consent through our cookie banner.</p>
        <p><strong>Purchase data:</strong> When you complete a purchase via ClickClack (our Shopify-powered checkout), your name, email address, shipping address, and payment information are collected and processed by ClickClack / Shopify. Meirro Technologies receives only the order details necessary to fulfil your purchase — we do not receive or store your payment card details.</p>
        <p><strong>Support enquiries:</strong> If you contact us by email, we retain your correspondence to help resolve your query.</p>
      </Section>

      <Section title="3. Cookies">
        <p>We use cookies and similar technologies to improve your experience. When you first visit the site, a consent banner allows you to accept or decline non-essential cookies.</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Essential cookies:</strong> Required for basic site functionality. Always active.</li>
          <li><strong>Analytics cookies (Google Analytics 4):</strong> Collect anonymised data about how the site is used. Only activated after you click "Accept all".</li>
        </ul>
        <p className="mt-3">You can withdraw consent at any time by clearing your browser cookies. Our cookie preferences are stored under the key <code className="text-[12px] bg-black/[0.06] px-1.5 py-0.5 rounded">meirro-cookies</code> in your browser's localStorage.</p>
      </Section>

      <Section title="4. How We Use Your Information">
        <ul className="list-disc pl-5 space-y-1">
          <li>To process and fulfil your order</li>
          <li>To provide customer support and handle warranty claims</li>
          <li>To improve our website using anonymised analytics data (with consent)</li>
          <li>To comply with legal obligations</li>
        </ul>
        <p className="mt-3">We do not sell, rent, or trade your personal information to third parties for their own marketing purposes.</p>
      </Section>

      <Section title="5. Third-Party Services">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>ClickClack / Shopify</strong> — Processes payments and manages order fulfilment. Subject to <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-[#7C5CFC] hover:underline">Shopify's Privacy Policy</a>.</li>
          <li><strong>Google Analytics 4</strong> — Provides anonymised website analytics. Subject to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#7C5CFC] hover:underline">Google's Privacy Policy</a>. Only activated with your consent.</li>
          <li><strong>Firebase Hosting (Google)</strong> — Hosts this website. Standard server access logs may be retained by Google per their infrastructure policies.</li>
        </ul>
      </Section>

      <Section title="6. Data Retention">
        <p>Analytics data is retained for 14 months in Google Analytics. Order and support records are retained for 7 years for legal and accounting purposes. You may request deletion of your personal data by contacting us directly.</p>
      </Section>

      <Section title="7. Your Rights (GDPR / CCPA)">
        <p>Depending on your location, you may have the following rights:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Right to access the personal data we hold about you</li>
          <li>Right to correct inaccurate data</li>
          <li>Right to request deletion of your data</li>
          <li>Right to withdraw consent for analytics at any time</li>
          <li>Right to data portability</li>
        </ul>
        <p className="mt-3">To exercise any of these rights, email <a href="mailto:support@meirro.com" className="text-[#7C5CFC] hover:underline">support@meirro.com</a>. We will respond within 30 days.</p>
      </Section>

      <Section title="8. Children's Privacy">
        <p>Our website and products are not directed at children under 16. We do not knowingly collect personal data from children. If you believe we have inadvertently collected such data, please contact us immediately.</p>
      </Section>

      <Section title="9. Changes to This Policy">
        <p>We may update this Privacy Policy from time to time. The updated version will be posted here with a revised date. We encourage you to review this page periodically.</p>
      </Section>

      <Section title="10. Contact">
        <p>For any privacy-related questions or requests: <a href="mailto:support@meirro.com" className="text-[#7C5CFC] hover:underline">support@meirro.com</a></p>
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
