import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'], // Забороняємо індексувати адмінку
    },
    sitemap: 'https://owntree.me/sitemap.xml', // Вказуємо шлях до карти (Next.js згенерує її сам з файлу sitemap.ts)
  };
}