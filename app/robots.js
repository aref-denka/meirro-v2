export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://aref-denka.github.io/meirro-v2/sitemap.xml',
    host: 'https://aref-denka.github.io/meirro-v2',
  };
}
