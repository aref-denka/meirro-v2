export const dynamic = 'force-static';

const SITE_URL = 'https://www.meirro.com';
const lastModified = new Date('2026-06-04');

export default function sitemap() {
  return [
    { url: `${SITE_URL}/`,                lastModified, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE_URL}/specs`,           lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/testing-guide`,   lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/about_us`,        lastModified, changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${SITE_URL}/contact`,         lastModified, changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${SITE_URL}/legal/privacy`,   lastModified, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE_URL}/legal/terms`,     lastModified, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE_URL}/legal/returns`,   lastModified, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE_URL}/legal/warranty`,  lastModified, changeFrequency: 'yearly',  priority: 0.3 },
  ];
}
