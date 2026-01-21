"use client";

import { useLanguage } from "@/context/LanguageContext";
import ViewTracker from "@/components/ViewTracker";
import CopyLink from "@/components/CopyLink";
import AccordionLink from "@/components/AccordionLink";
import TrackedLink from "@/components/TrackedLink";
import LanguageSwitcher from "@/components/LanguageSwitcher"; // Наш перемикач

// Типи (можна винести в окремий файл types.ts, але хай будуть тут)
interface Link {
  id: string;
  title: string;
  url: string;
  icon: string | null;
  type: string;
  meta_data?: any;
  clicks?: number;
}

interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  bg_color: string;
  links: Link[];
  views: number;
}

export default function ProfilePageContent({ user }: { user: Profile }) {
  const { t } = useLanguage(); // <--- МАГІЯ ТУТ

  // Сортування
  const sortedLinks = user.links?.sort((a: any, b: any) => a.display_order - b.display_order) || [];

  return (
    <main 
      className="min-h-screen flex flex-col items-center py-10 px-4 relative" // relative для позиціонування перемикача
      style={{ backgroundColor: user.bg_color || "#f3f4f6" }}
    >
      {/* 1. Додали перемикач мов */}
      <LanguageSwitcher />

      <ViewTracker profileId={user.id} />

      {/* Аватарка */}
      <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 overflow-hidden border-4 border-white shadow-lg">
        {user.avatar_url ? (
          <img src={user.avatar_url} alt={user.username} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl text-gray-500">
            {user.username[0].toUpperCase()}
          </div>
        )}
      </div>
      
      <h1 className="text-xl font-bold text-gray-800 mb-1">{user.full_name}</h1>
      
      {/* 2. CopyLink теж треба оновити, щоб він приймав переклад, 
           але поки залишимо як є, бо він всередині сам може юзати хук */}
      <CopyLink username={user.username} />

      <div className="w-full max-w-md space-y-4">
        {sortedLinks.map((link) => {
          if (link.type === 'pricing') {
             return (
                <AccordionLink 
                   key={link.id} 
                   title={link.title || t('priceTitle')} // Якщо назви нема, беремо зі словника
                   data={link.meta_data} 
                />
             );
          }
          
          if (link.type === 'monobank') {
            return (
              <TrackedLink
                key={link.id}
                id={link.id}
                url={link.url}
                className="block w-full bg-black text-white p-4 rounded-2xl shadow-lg hover:scale-[1.02] transition-all relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 blur-2xl rounded-full -mr-10 -mt-10"></div>
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center shrink-0 text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
                    </svg>
                  </div>
                  
                  <div className="text-left overflow-hidden">
                    <div className="font-bold text-lg leading-tight truncate pr-2">
                      {link.title}
                    </div>
                    {/* Переклад підпису */}
                    <div className="text-gray-400 text-xs">{t('monoAction')}</div>
                  </div>
                  
                  <div className="ml-auto bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full group-hover:bg-gray-200 transition shrink-0">
                    {t('monoButton')}
                  </div>
                </div>
              </TrackedLink>
            );
          }

          if (link.type === 'bmc') {
            return (
              <TrackedLink
                key={link.id}
                id={link.id}
                url={link.url}
                className="block w-full bg-[#FFDD00] text-gray-900 p-4 rounded-2xl shadow-lg hover:scale-[1.02] transition-all relative overflow-hidden group border border-yellow-400"
              >
                {/* Декор */}
                <div className="absolute -right-6 -bottom-6 opacity-20 rotate-12 group-hover:rotate-[20deg] transition-transform duration-300">
                    <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor"><path d="M20.216 6.415l-.132-.666c-.119-.596-.387-1.143-.773-1.618a4.99 4.99 0 0 0-3.355-1.92l-1.09-.15-7.795-1.066L4.99 7.02l8.834 1.208c.596.082 1.134.33 1.58.705.466.393.81.902.99 1.472l.142.45c.446-.035.886-.145 1.305-.33a3.535 3.535 0 0 0 2.375-4.11zm-1.127 5.688c0 1.938-1.578 3.516-3.516 3.516H7.102c-1.938 0-3.516-1.578-3.516-3.516V8.203h12.016v3.9zM22.07 5.56c-.347-1.39-1.22-2.58-2.46-3.376a7.276 7.276 0 0 0-4.757-.96L6.56.12A2.43 2.43 0 0 0 3.79 2.14L2 15.62c0 2.85 2.316 5.165 5.164 5.165h8.28c2.85 0 5.165-2.316 5.165-5.165v-2.36c1.64-.176 3.06-1.21 3.73-2.715.39-1.38.15-2.85-.59-4.05-.28-.46-.64-.86-1.08-1.19z"/></svg>
                </div>
                
                <div className="flex items-center gap-4 relative z-10">
                   {/* Іконка */}
                  <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center shrink-0 text-gray-900 font-bold text-2xl border border-white/20">
                    ☕
                  </div>
                  
                  <div className="text-left overflow-hidden">
                    <div className="font-bold text-lg leading-tight truncate pr-2 text-gray-900">
                      {link.title}
                    </div>
                    <div className="text-gray-700 text-xs font-medium">{t('bmcAction')}</div>
                  </div>
                  
                  <div className="ml-auto bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-full group-hover:bg-black transition shrink-0 shadow-md">
                    {t('bmcBtn')}
                  </div>
                </div>
              </TrackedLink>
            );
          }

          return (
            <TrackedLink
              key={link.id}
              id={link.id}
              url={link.url}
              className="block w-full bg-white text-gray-800 font-medium py-4 px-6 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all text-center border border-gray-100"
            >
              {link.title}
            </TrackedLink>
          );
        })}
      </div>

      <div className="mt-12 text-xs text-gray-400">
        {t('footer')}
      </div>
    </main>
  );
}