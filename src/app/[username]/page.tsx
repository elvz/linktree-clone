import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

// 1. Описуємо типи даних (TypeScript), щоб не було помилок
interface Link {
  id: string;
  title: string;
  url: string;
  icon: string | null;
}

interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  bg_color: string;
  links: Link[]; // Масив посилань
}

// 2. Це головна функція сторінки
export default async function UserProfile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  // У Next.js 15 params - це Promise, тому треба почекати
  const { username } = await params;
  
  const supabase = createClient();

  // 3. Робимо запит до бази
  // Ми кажемо: "Дай мені профіль, де username = тому, що в URL"
  // .select('*, links(*)') — це магія: він одразу підтягне і профіль, і пов'язані лінки!
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*, links(*)") 
    .eq("username", username)
    .single();

  // Якщо юзера не знайдено — показуємо сторінку 404
  if (error || !profile) {
    return notFound();
  }

  // Типізуємо дані, щоб VS Code допомагав
  const user = profile as Profile;
  
  // Сортуємо посилання за порядком (display_order)
  const sortedLinks = user.links?.sort((a: any, b: any) => a.display_order - b.display_order) || [];

  return (
    // 4. Верстка (Tailwind CSS)
    // style={{ backgroundColor: ... }} дозволяє динамічно міняти колір фону з бази
    <main 
      className="min-h-screen flex flex-col items-center py-10 px-4"
      style={{ backgroundColor: user.bg_color || "#f3f4f6" }}
    >
      
      {/* Аватарка (поки заглушка, якщо немає картинки) */}
      <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 overflow-hidden border-4 border-white shadow-lg">
        {user.avatar_url ? (
          <img src={user.avatar_url} alt={user.username} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl text-gray-500">
            {user.username[0].toUpperCase()}
          </div>
        )}
      </div>

      {/* Ім'я та нікнейм */}
      <h1 className="text-xl font-bold text-gray-800 mb-1">{user.full_name}</h1>
      <p className="text-gray-500 text-sm mb-8">@{user.username}</p>

      {/* Список кнопок */}
      <div className="w-full max-w-md space-y-4">
        {sortedLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-white text-gray-800 font-medium py-4 px-6 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all text-center border border-gray-100"
          >
            {link.title}
          </a>
        ))}

        {sortedLinks.length === 0 && (
          <p className="text-center text-gray-400">У користувача ще немає посилань</p>
        )}
      </div>

      {/* Ваш "брендінг" */}
      <div className="mt-12 text-xs text-gray-400">
        Linktree Clone by You
      </div>
    </main>
  );
}