import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js'; // Використовуємо прямий клієнт, бо тут немає cookies

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://owntree.me'; // ВАШ ДОМЕН

  // 1. СТАТИЧНІ СТОРІНКИ (Головна, Логін)
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // 2. ДИНАМІЧНІ СТОРІНКИ (Користувачі)
  // Створюємо клієнт вручну, бо sitemap.ts працює на сервері без контексту браузера
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Беремо останні 1000 профілів (щоб не перевантажити на старті)
  const { data: profiles } = await supabase
    .from('profiles')
    .select('username, updated_at')
    .limit(1000);

  const userPages = profiles?.map((profile) => ({
    url: `${baseUrl}/${profile.username}`,
    lastModified: new Date(profile.updated_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8, // Профілі юзерів важливі
  })) || [];

  return [...staticPages, ...userPages];
}