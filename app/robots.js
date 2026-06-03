export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://www.meirro.com/sitemap.xml',
    host: 'https://www.meirro.com',
  };
}
