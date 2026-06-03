export const metadata = {
  title: 'Privacy Policy | Meirro',
  description: 'How Meirro Technologies collects, uses, shares, and protects your personal data, including your U.S. state and EU/UK privacy rights.',
};

export default function PrivacyPage() {
  return (
    <article className="prose-legal">
      <p className="text-[11px] font-semibold tracking-[2.5px] uppercase text-[#0A0A0C]/40 mb-4">Legal</p>
      <h1 className="text-[32px] md:text-[40px] font-black tracking-[-0.04em] text-[#0A0A0C] mb-2">
        Privacy Policy
      </h1>
      <p className="text-[13px] text-[#0A0A0C]/45 mb-12">Last updated: May 2026</p>

      <Section title="1. Who We Are">
        <p>Meirro Technologies (&ldquo;Meirro,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates meirro.web.app. This Privacy Policy explains how we collect, use, share, and protect personal information when you visit our website, contact us, or make a purchase.</p>
        <p>This Policy covers visitors worldwide and includes specific disclosures for residents of California and other U.S. states with comprehensive privacy laws, as well as residents of the European Economic Area (EEA), the United Kingdom, and Switzerland.</p>
        <p>Contact: <a href="mailto:support@meirro.com" className="text-[#7C5CFC] hover:underline">support@meirro.com</a></p>
      </Section>

      <Section title="2. Personal Information We Collect">
        <p>We collect the following categories of personal information, depending on how you interact with us:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Identifiers</strong> — name, email address, shipping address, phone number, IP address, device identifiers, and online cookie identifiers.</li>
          <li><strong>Commercial information</strong> — products purchased, order history, returns, and warranty claims.</li>
          <li><strong>Payment information</strong> — processed directly by our checkout provider; we do not receive or store your full payment card number.</li>
          <li><strong>Internet or network activity</strong> — pages visited, referring URLs, browser type, time on site, clicks, and interactions collected through cookies, pixels, and similar technologies.</li>
          <li><strong>Geolocation data</strong> — approximate location (country/region) derived from your IP address. We do not collect precise GPS location.</li>
          <li><strong>Inferences</strong> — non-sensitive inferences drawn from the above (e.g. likely product interest) used to improve the site and, where consented, to measure advertising performance.</li>
          <li><strong>Customer support records</strong> — the content of emails and messages you send us.</li>
        </ul>
        <p className="mt-3">We do <strong>not</strong> knowingly collect sensitive personal information (such as government IDs, health data, precise location, biometric data, or information about a person under 16) and we do not use any personal information to make automated decisions that produce legal or similarly significant effects about you.</p>
      </Section>

      <Section title="3. How We Use Your Information">
        <ul className="list-disc pl-5 space-y-1">
          <li>To process, fulfil, and ship your order, and to handle returns and warranty claims.</li>
          <li>To provide customer support and respond to your enquiries.</li>
          <li>To operate, secure, and improve our website and detect fraud or abuse.</li>
          <li>To measure site performance and audience using analytics — only with your consent where required by law.</li>
          <li>To send transactional communications (order confirmations, shipping updates) and, where you have opted in, marketing emails.</li>
          <li>To comply with our legal, tax, accounting, and regulatory obligations.</li>
        </ul>
      </Section>

      <Section title="4. How We Share Your Information">
        <p>We share personal information only with the following categories of recipients, and only for the purposes described in this Policy:</p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li><strong>Service providers acting on our behalf</strong> — including our checkout and payment processor, hosting provider, email and customer-support tools, and analytics vendors. These providers are contractually bound to use the data only to perform services for us.</li>
          <li><strong>Shipping carriers</strong> — to deliver your order.</li>
          <li><strong>Professional advisers</strong> — accountants, auditors, and lawyers, where reasonably necessary.</li>
          <li><strong>Regulators, courts, or law enforcement</strong> — where we are legally required to do so or to protect our rights, property, or safety, or those of others.</li>
          <li><strong>Successors</strong> — in connection with a merger, acquisition, financing, or sale of business assets, in which case we will require the recipient to honour this Policy.</li>
        </ul>
        <p className="mt-3">We do <strong>not</strong> sell your personal information for money. As described in Section 7, certain analytics and advertising cookies may, under some U.S. state privacy laws, be considered a &ldquo;sale&rdquo; or a &ldquo;share&rdquo; for cross-context behavioural advertising. You can opt out at any time using the controls below.</p>
      </Section>

      <Section title="5. Cookies and Similar Technologies">
        <p>We use cookies, pixels, local storage, and similar technologies (collectively, &ldquo;cookies&rdquo;) to operate the site and, with your consent where required, to measure performance and personalise marketing.</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Strictly necessary cookies</strong> — required for the site to function (e.g. remembering your consent choice). Always active; cannot be disabled.</li>
          <li><strong>Analytics cookies</strong> — Google Analytics 4. Help us understand how the site is used. Loaded only after you accept non-essential cookies.</li>
          <li><strong>Advertising / targeting cookies</strong> — used to measure the effectiveness of marketing campaigns and, where applicable, to show you relevant ads on third-party platforms. Loaded only after you accept non-essential cookies.</li>
        </ul>
        <p className="mt-3">You can manage your choice at any time by re-opening the cookie banner from the link in our footer, by clearing your browser cookies, or by clearing the <code className="text-[12px] bg-black/[0.06] px-1.5 py-0.5 rounded">meirro-cookies</code> entry in your browser&rsquo;s localStorage. Most browsers also let you block or delete cookies directly.</p>
      </Section>

      <Section title="6. Targeted Advertising and Third-Party Analytics">
        <p>We use third parties to measure how visitors interact with our site and, where you have consented, to deliver and measure advertising. These third parties may set their own cookies and receive limited information (such as your IP address, device identifiers, the pages you viewed on our site, and your interactions) directly from your browser.</p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li><strong>Google Analytics 4</strong> — provides aggregated and pseudonymised audience and behaviour analytics. We have enabled IP-address truncation. Activated only with your consent. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#7C5CFC] hover:underline">Google&rsquo;s Privacy Policy</a> and <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#7C5CFC] hover:underline">Google Analytics Opt-Out</a>.</li>
          <li><strong>Advertising platforms</strong> — where we run ad campaigns, we may load pixels or tags (for example, from Google Ads or Meta) to measure conversions and reach audiences with relevant ads. Activated only with your consent.</li>
        </ul>
        <p className="mt-3">Under some U.S. state privacy laws, the use of these third-party advertising cookies to build cross-context behavioural advertising profiles may be considered a &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information. We disclose this here so that you can make an informed choice and exercise your rights as described in Section 7.</p>
        <p className="mt-3">We honour the Global Privacy Control (GPC) signal sent by your browser as a valid opt-out of sale/sharing and of targeted advertising.</p>
      </Section>

      <Section title="7. Your Privacy Choices — U.S. Residents (Do Not Sell or Share My Personal Information)">
        <p>If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Tennessee, Texas, Utah, Virginia, or another U.S. state with a comprehensive privacy law, you have certain rights regarding your personal information.</p>
        <p>Depending on your state of residence, you may have the right to:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Know / access</strong> the categories and specific pieces of personal information we have collected about you, the sources, the purposes, and the categories of recipients.</li>
          <li><strong>Delete</strong> personal information we have collected from you, subject to legal exceptions.</li>
          <li><strong>Correct</strong> inaccurate personal information.</li>
          <li><strong>Data portability</strong> — receive a copy of your personal information in a portable, machine-readable format.</li>
          <li><strong>Opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo;</strong> of your personal information for cross-context behavioural advertising or targeted advertising.</li>
          <li><strong>Limit the use of sensitive personal information</strong> (we do not use sensitive personal information for purposes that would require this right, but you may still submit a request).</li>
          <li><strong>Non-discrimination</strong> — we will not discriminate against you for exercising any of these rights.</li>
          <li><strong>Appeal</strong> a decision we make about your request, where required by your state&rsquo;s law.</li>
        </ul>
        <p className="mt-4"><strong>How to opt out of &ldquo;Do Not Sell or Share My Personal Information&rdquo; and targeted advertising:</strong></p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Click <strong>&ldquo;Decline&rdquo; / &ldquo;Necessary only&rdquo;</strong> on our cookie banner, or revisit the banner from our footer to change your choice.</li>
          <li>Enable the <strong>Global Privacy Control (GPC)</strong> signal in your browser — we will treat it as a valid opt-out for that browser and device.</li>
          <li>Email us at <a href="mailto:support@meirro.com" className="text-[#7C5CFC] hover:underline">support@meirro.com</a> with the subject line &ldquo;Do Not Sell or Share &mdash; [your state].&rdquo;</li>
        </ul>
        <p className="mt-4"><strong>How to exercise your other rights:</strong> email <a href="mailto:support@meirro.com" className="text-[#7C5CFC] hover:underline">support@meirro.com</a>. We will verify your identity using information already on file (such as the email used to place your order) and respond within the timeframe required by your state&rsquo;s law (generally 45 days, extendable once for another 45 days where allowed). You may use an authorised agent to submit a request on your behalf, subject to verification.</p>
        <p className="mt-4"><strong>California &ldquo;Shine the Light&rdquo;:</strong> we do not disclose personal information to third parties for their own direct-marketing purposes.</p>
      </Section>

      <Section title="8. Your Rights — EEA, United Kingdom, and Switzerland">
        <p>If you are located in the European Economic Area, the United Kingdom, or Switzerland, the EU General Data Protection Regulation (GDPR), the UK GDPR, or the Swiss FADP applies to our processing of your personal data. Meirro Technologies is the controller of your personal data for the purposes of these laws.</p>
        <p><strong>Legal bases for processing.</strong> We rely on the following legal bases:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Performance of a contract</strong> — to process and ship your order and handle returns and warranty claims.</li>
          <li><strong>Legitimate interests</strong> — to secure our site, prevent fraud, and respond to your enquiries. We balance these interests against your rights.</li>
          <li><strong>Consent</strong> — for all non-essential cookies (including analytics and advertising cookies) and for marketing emails. You may withdraw consent at any time without affecting the lawfulness of processing before withdrawal.</li>
          <li><strong>Legal obligation</strong> — to comply with tax, accounting, and other legal duties.</li>
        </ul>
        <p className="mt-3"><strong>Prior consent for non-essential cookies.</strong> In line with the EU ePrivacy Directive (the &ldquo;Cookie Law&rdquo;), the UK PECR, and applicable national rules, we do <strong>not</strong> set or read any non-essential cookies (including analytics, marketing, and targeted-advertising cookies) on your device until you have given specific, informed, and freely given consent through our cookie banner. Declining is as easy as accepting, and you can withdraw consent at any time by re-opening the banner from our footer or by clearing your browser storage.</p>
        <p className="mt-3"><strong>Your rights.</strong> Subject to the conditions in the GDPR / UK GDPR, you have the right to:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Access your personal data and obtain a copy.</li>
          <li>Have inaccurate or incomplete data corrected.</li>
          <li>Have your data erased (&ldquo;right to be forgotten&rdquo;).</li>
          <li>Restrict or object to processing, including processing based on legitimate interests and any direct marketing.</li>
          <li>Data portability — receive your data in a structured, commonly used, machine-readable format.</li>
          <li>Withdraw consent at any time.</li>
          <li>Lodge a complaint with your local data protection authority (in the UK, the Information Commissioner&rsquo;s Office at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#7C5CFC] hover:underline">ico.org.uk</a>).</li>
        </ul>
        <p className="mt-3">To exercise any of these rights, email <a href="mailto:support@meirro.com" className="text-[#7C5CFC] hover:underline">support@meirro.com</a>. We will respond within one month, extendable by a further two months for complex requests.</p>
        <p className="mt-3"><strong>International transfers.</strong> Some of our service providers (including our hosting and analytics vendors) are located in the United States. Where we transfer personal data outside the EEA, UK, or Switzerland, we rely on appropriate safeguards such as the European Commission&rsquo;s Standard Contractual Clauses, the UK International Data Transfer Addendum, and, where applicable, certification under the EU&ndash;U.S. and UK&ndash;U.S. Data Privacy Frameworks.</p>
      </Section>

      <Section title="9. Data Retention">
        <p>We keep personal data only for as long as needed for the purposes described above:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Order, invoice, and warranty records — up to 7 years, to meet tax and accounting requirements.</li>
          <li>Customer support correspondence — up to 3 years after the matter is resolved.</li>
          <li>Analytics data in Google Analytics 4 — up to 14 months.</li>
          <li>Marketing-consent records — for as long as you remain subscribed, plus a reasonable period to demonstrate compliance.</li>
        </ul>
        <p className="mt-3">After these periods we delete or anonymise the data. You may ask us to delete your data earlier at any time, subject to the legal exceptions in Sections 7 and 8.</p>
      </Section>

      <Section title="10. Data Security">
        <p>We use reasonable technical and organisational measures to protect personal data against loss, misuse, and unauthorised access &mdash; including encryption in transit (TLS), restricted access to production systems, and vetted service providers. No method of transmission over the internet is 100% secure; we cannot guarantee absolute security.</p>
      </Section>

      <Section title="11. Children&rsquo;s Privacy">
        <p>Our website and products are not directed at children under 16, and we do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us and we will delete it.</p>
      </Section>

      <Section title="12. Changes to This Policy">
        <p>We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised &ldquo;Last updated&rdquo; date. Material changes will be highlighted on the site or notified by email where appropriate.</p>
      </Section>

      <Section title="13. Contact">
        <p>For any privacy-related question, complaint, or rights request: <a href="mailto:support@meirro.com" className="text-[#7C5CFC] hover:underline">support@meirro.com</a>.</p>
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
