export const dynamic = 'force-static';

export default function sitemap() {
  return [
    {
      url: 'https://www.meirro.com/',
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
