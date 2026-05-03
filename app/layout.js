import './globals.css';
import Script from 'next/script';
import ScrollBar from './components/ScrollBar';
import CookieBanner from './components/CookieBanner';

const SITE_URL = 'https://aref-denka.github.io/meirro-v2';

/* ── Metadata ─────────────────────────────────────────────────── */
export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Meirro Pro — 32-Inch 6K Retina Monitor | from $1,499',
    template: '%s | Meirro Pro',
  },

  description:
    'Meirro Pro is a 32-inch 6K Retina monitor with 6016 × 3384 resolution, 218 ppi, 60Hz, and a full CNC-machined aluminium body. Factory-calibrated to ΔE < 1. Starting at $1,499 — stand included.',

  keywords: [
    '6K monitor',
    '32 inch 6K monitor',
    '6K display',
    '32 inch monitor',
    '6K retina monitor',
    '32 inch 6K display',
    'professional 6K monitor',
    'aluminium monitor',
    '6K 60Hz monitor',
    'Thunderbolt 5 monitor',
    '32 inch professional display',
    'Meirro Pro',
    '6016x3384 monitor',
  ],

  authors: [{ name: 'Meirro Technologies' }],
  creator: 'Meirro Technologies',
  publisher: 'Meirro Technologies',

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Meirro',
    title: 'Meirro Pro — 32-Inch 6K Retina Monitor',
    description:
      '32 inches. 6K Retina at 218 ppi. Full CNC aluminium body. 60Hz. Starting at $1,499.',
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Meirro Pro — 32-Inch 6K Retina Monitor',
    description:
      '32 inches. 6K Retina at 218 ppi. Full CNC aluminium body. 60Hz. Starting at $1,499.',
    creator: '@meirro',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  category: 'technology',
};

/* ── JSON-LD structured data ──────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org/',
  '@type': 'Product',
  name: 'Meirro Pro 32-Inch 6K Retina Monitor',
  brand: {
    '@type': 'Brand',
    name: 'Meirro',
  },
  description:
    'A 32-inch 6K Retina display with 6016 × 3384 resolution at 218 ppi, 60Hz, factory-calibrated to ΔE < 1, with a full CNC-machined 6061-T6 aluminium body and three Thunderbolt 5 ports.',
  award: 'Good Design Award 2026',
  offers: {
    '@type': 'Offer',
    price: '1499',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    priceValidUntil: '2027-01-01',
    url: SITE_URL,
    seller: {
      '@type': 'Organization',
      name: 'Meirro Technologies',
    },
  },
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Screen Size',     value: '32 inches' },
    { '@type': 'PropertyValue', name: 'Resolution',      value: '6K — 6016 × 3384 pixels' },
    { '@type': 'PropertyValue', name: 'Pixel Density',   value: '218 ppi' },
    { '@type': 'PropertyValue', name: 'Refresh Rate',    value: '60 Hz' },
    { '@type': 'PropertyValue', name: 'Colour Gamut',    value: '99% DCI-P3' },
    { '@type': 'PropertyValue', name: 'Delta E',         value: 'ΔE < 1 factory calibrated' },
    { '@type': 'PropertyValue', name: 'Material',        value: 'CNC 6061-T6 Aluminium' },
    { '@type': 'PropertyValue', name: 'Connectivity',    value: 'Thunderbolt 5 × 3' },
    { '@type': 'PropertyValue', name: 'Host Charging',   value: 'Up to 240 W' },
    { '@type': 'PropertyValue', name: 'HDR Brightness',  value: '1600 nits peak HDR' },
  ],
};

/* ── Root layout ──────────────────────────────────────────────── */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <ScrollBar />
        <CookieBanner />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0JJV6VCRZW"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied' });
          gtag('config', 'G-0JJV6VCRZW', { send_page_view: false });
          if (localStorage.getItem('meirro-cookies') === 'accepted') {
            gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted' });
            gtag('event', 'page_view');
          }
        `}</Script>
      </body>
    </html>
  );
}
