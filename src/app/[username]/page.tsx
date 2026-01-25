import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import ProfilePageContent from "@/components/ProfilePageContent";
import { Metadata, ResolvingMetadata } from "next";

export const dynamic = "force-dynamic";

await supabase.rpc('increment_views', { p_username: username });

// Тип для параметрів сторінки
type Props = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// 1. ФУНКЦІЯ ГЕНЕРАЦІЇ МЕТАТЕГІВ (ДЛЯ КРАСИ В TELEGRAM/INSTA)
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { username } = await params;
  
  // Робимо запит до бази (Next.js кешує такі запити, тому це не навантажує базу)
  const supabase = createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url, username")
    .eq("username", username)
    .single();

  // Якщо юзера немає — повертаємо стандартний заголовок
  if (!profile) {
    return {
      title: "User not found",
    };
  }

  // Формуємо красивий заголовок і картинку
  const title = `${profile.full_name} (@${profile.username})`;
  const description = `Перегляньте всі посилання ${profile.full_name} в одному місці.`;
  
  // Якщо є аватарка, використовуємо її, якщо ні — дефолтну заглушку
  const images = profile.avatar_url 
    ? [profile.avatar_url] 
    : ["https://placehold.co/1200x630/black/white?text=Linktree+Clone"]; // Можна замінити на ваше лого

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `https://linktree-clone.vercel.app/${username}`, // Замініть на ваш реальний домен, коли буде
      siteName: 'Linktree Clone',
      images: [
        {
          url: images[0],
          width: 800,
          height: 800, // Аватарки зазвичай квадратні
        },
      ],
      locale: 'uk_UA',
      type: 'website',
    },
    twitter: {
      card: 'summary', // 'summary_large_image' якщо фото прямокутне, 'summary' якщо квадратне (аватар)
      title: title,
      description: description,
      images: images,
    },
  };
}

// 2. ОСНОВНИЙ КОМПОНЕНТ СТОРІНКИ
export default async function UserProfile({ params }: Props) {
  const { username } = await params;
  const supabase = createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*, links(*)")
    .eq("username", username)
    .single();

  if (error || !profile) {
    return notFound();
  }

  // Явно сортуємо посилання
  if (profile.links) {
     profile.links.sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0));
  }

  

  // Просто передаємо дані у клієнтський компонент
  return <ProfilePageContent user={profile as any} />;
}