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

// Допоміжна функція для визначення бренду
const getLinkStyle = (url: string) => {
  const lowerUrl = url.toLowerCase();
  
  // --- INSTAGRAM ---
  if (lowerUrl.includes('instagram.com')) {
    return {
      style: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white border-transparent",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
      )
    };
  }
  
  // --- FACEBOOK (NEW) ---
  if (lowerUrl.includes('facebook.com') || lowerUrl.includes('fb.com')) {
    return {
      style: "bg-[#1877F2] text-white border-transparent",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.859-5.978.536 0 2.071.03 2.661.08v3.434h-1.63c-2.31 0-2.605 1.05-2.605 2.822v1.222h3.88l-1.426 3.667h-2.454v7.98h-4.286z"/></svg>
      )
    };
  }

  // --- YOUTUBE ---
  if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
    return {
      style: "bg-[#FF0000] text-white border-transparent",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      )
    };
  }

  // --- TIKTOK ---
  if (lowerUrl.includes('tiktok.com')) {
    return {
      style: "bg-black text-white border-gray-800",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.54-1.15v8.36c0 1.21-.11 2.45-.59 3.59a7.35 7.35 0 0 1-5.17 4.18c-1.39.3-2.84.14-4.16-.36a7.38 7.38 0 0 1-4.26-6.19c-.19-1.4.15-2.83.84-4.07a7.28 7.28 0 0 1 4.38-3.46v4.16c-1.17.15-2.27.87-2.81 1.94-.55 1.13-.43 2.53.31 3.56.76 1.01 2.06 1.48 3.29 1.26 1.25-.26 2.27-1.21 2.59-2.45.16-.59.18-1.2.06-1.81V.02h1.36z"/></svg>
      )
    };
  }

  // --- TELEGRAM ---
  if (lowerUrl.includes('t.me') || lowerUrl.includes('telegram')) {
    return {
      style: "bg-[#229ED9] text-white border-transparent",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      )
    };
  }

  // --- SPOTIFY (NEW) ---
  if (lowerUrl.includes('spotify.com') || lowerUrl.includes('open.spotify.com')) {
    return {
      style: "bg-[#1DB954] text-white border-transparent",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
      )
    };
  }

  // --- SOUNDCLOUD (NEW) ---
  if (lowerUrl.includes('soundcloud.com')) {
    return {
      style: "bg-[#ff5500] text-white border-transparent",
      icon: (
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.56 8.87V17h8.76c1.48 0 2.68-1.2 2.68-2.68 0-1.48-1.2-2.68-2.68-2.68-.2 0-.39.03-.57.08V11.5c0-2.31-1.87-4.19-4.18-4.19-1.8 0-3.33 1.15-3.92 2.76-.08-.01-.15-.02-.23-.02-1.29 0-2.34 1.05-2.34 2.34 0 .09.01.18.02.26L9 12.72V17h2.46V8.92c.03-.02.07-.03.1-.05zM3.44 11.25l1.24.23v5.45l-1.24.23c-.7-.35-1.19-1.07-1.19-1.9v-2.11c0-.83.48-1.55 1.19-1.9zM5.92 10.59l1.24.16v6.43l-1.24.16c-.73-.29-1.24-1-1.24-1.83V12.42c0-.82.51-1.53 1.24-1.83zM.96 12.18l1.24.29v4.06l-1.24.29c-.58-.46-.96-1.17-.96-1.97v-.7c0-.79.37-1.51.96-1.97z"/></svg>
      )
    };
  }

  // --- LINKEDIN ---
  if (lowerUrl.includes('linkedin.com')) {
    return {
      style: "bg-[#0077b5] text-white border-transparent",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
    }
  }

  // За замовчуванням (звичайний лінк)
  return {
    style: "bg-white text-gray-800 border border-gray-200 hover:border-gray-300",
    icon: null
  };
};


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

          // 4. Розумна кнопка (Smart Link)
          const smartStyle = getLinkStyle(link.url);

          return (
            <TrackedLink
              key={link.id}
              id={link.id}
              url={link.url}
              className={`block w-full py-4 px-6 rounded-xl shadow-sm hover:scale-[1.02] transition-all relative overflow-hidden flex items-center justify-center gap-3 ${smartStyle.style}`}
            >
              {/* Іконка бренду зліва (якщо є) */}
              {smartStyle.icon && (
                <span className="absolute left-6 opacity-90">
                   {smartStyle.icon}
                </span>
              )}
              
              <span className="font-medium text-center truncate px-8">{link.title}</span>
              
              {/* Декоративна стрілочка справа */}
              <svg className="w-4 h-4 absolute right-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
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