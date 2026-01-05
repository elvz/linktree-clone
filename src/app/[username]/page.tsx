import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import CopyLink from "@/components/CopyLink";
import AccordionLink from "@/components/AccordionLink";

// 1. Описуємо типи даних (TypeScript), щоб не було помилок
interface Link {
  id: string;
  title: string;
  url: string;
  icon: string | null;
  type: String;
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

      
      {/* Ім'я */}
      <h1 className="text-xl font-bold text-gray-800 mb-1">{user.full_name}</h1>
      
      {/* Клікабельний нікнейм */}
      <CopyLink username={user.username} />

      {/* Список кнопок */}
      {/* ... далі йде ваш код з map ... */}

      {/* Список кнопок */}
      <div className="w-full max-w-md space-y-4">
        {sortedLinks.map((link) => {
        
          if (link.type === 'pricing') {
     return (
        <AccordionLink 
           key={link.id} 
           title={link.title} 
           data={link.meta_data} 
        />
     );
          }
          
  // ВАРІАНТ 1: Це Монобанка
  if (link.type === 'monobank') {
    return (
      <a
        key={link.id}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-black text-white p-4 rounded-2xl shadow-lg hover:scale-[1.02] transition-all relative overflow-hidden group"
      >
        {/* Фоновий декор */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 blur-2xl rounded-full -mr-10 -mt-10"></div>
        
        <div className="flex items-center gap-4 relative z-10">
          {/* SVG Іконка кота (inline, щоб не ламалася) */}
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center shrink-0 text-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
               {/* Це спрощений символ, але виглядає як лого */}
            </svg>
          </div>
          
          <div className="text-left overflow-hidden">
            {/* ТУТ ТЕПЕР КАСТОМНА НАЗВА */}
            <div className="font-bold text-lg leading-tight truncate pr-2">
              {link.title}
            </div>
            {/* <div className="text-gray-400 text-xs">Натисніть, щоб розбити</div> */}
          </div>
          
          <div className="ml-auto bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full group-hover:bg-gray-200 transition shrink-0">
            Поповнити
          </div>
        </div>
      </a>
    );
  }

  // ВАРІАНТ 2: Звичайна кнопка (ваш старий код)
  return (
    <a
      key={link.id}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full bg-white text-gray-800 font-medium py-4 px-6 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all text-center border border-gray-100"
    >
      {link.title}
    </a>
  );
})}

        {sortedLinks.length === 0 && (
          <p className="text-center text-gray-400">У користувача ще немає посилань</p>
        )}
      </div>

      {/* Ваш "брендінг" */}
      <div className="mt-12 text-xs text-gray-400">
        Linktree Clone by Elvz
      </div>
    </main>
  );
}