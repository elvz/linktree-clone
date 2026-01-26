"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import TrackedLink from "@/components/TrackedLink";
import CopyLink from "@/components/CopyLink";
import AccordionLink from "@/components/AccordionLink";
import LanguageSwitcher from "@/components/LanguageSwitcher"; // Наш перемикач

interface ProfilePageProps {
  user: any;
}

// --- 1. SMART LINKS (ЛОГІКА ДИЗАЙНУ КНОПОК) ---
const getLinkStyle = (url: string) => {
  if (!url) return { style: "bg-white text-gray-800 border border-gray-200 hover:shadow-md", icon: null };
  const lowerUrl = url.toLowerCase();
  
  // Instagram
  if (lowerUrl.includes('instagram.com')) {
    return {
      style: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white border-transparent shadow-sm hover:shadow-lg hover:opacity-95",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
    };
  }
  // YouTube
  if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
    return {
      style: "bg-[#FF0000] text-white border-transparent shadow-sm hover:shadow-lg hover:opacity-95",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    };
  }
  // TikTok
  if (lowerUrl.includes('tiktok.com')) {
    return {
      style: "bg-black text-white border-gray-800 shadow-sm hover:shadow-lg hover:opacity-90",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.54-1.15v8.36c0 1.21-.11 2.45-.59 3.59a7.35 7.35 0 0 1-5.17 4.18c-1.39.3-2.84.14-4.16-.36a7.38 7.38 0 0 1-4.26-6.19c-.19-1.4.15-2.83.84-4.07a7.28 7.28 0 0 1 4.38-3.46v4.16c-1.17.15-2.27.87-2.81 1.94-.55 1.13-.43 2.53.31 3.56.76 1.01 2.06 1.48 3.29 1.26 1.25-.26 2.27-1.21 2.59-2.45.16-.59.18-1.2.06-1.81V.02h1.36z"/></svg>
    };
  }
  // Telegram
  if (lowerUrl.includes('t.me') || lowerUrl.includes('telegram')) {
    return {
      style: "bg-[#229ED9] text-white border-transparent shadow-sm hover:shadow-lg hover:opacity-95",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
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
    // --- FACEBOOK (NEW) ---
  if (lowerUrl.includes('facebook.com') || lowerUrl.includes('fb.com')) {
    return {
      style: "bg-[#1877F2] text-white border-transparent",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.859-5.978.536 0 2.071.03 2.661.08v3.434h-1.63c-2.31 0-2.605 1.05-2.605 2.822v1.222h3.88l-1.426 3.667h-2.454v7.98h-4.286z"/></svg>
      )
    };
  }

  // Стандартний стиль (якщо не соцмережа)
  return {
    style: "bg-white text-gray-800 border border-gray-200 hover:border-gray-300 hover:shadow-md",
    icon: null
  };
};

export default function ProfilePageContent({ user }: ProfilePageProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  // --- 2. ЛОГІКА ТЕМ ---
  // Визначаємо CSS-класи залежно від теми
  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case 'midnight':
        return "bg-gray-900 text-white";
      case 'sunset':
        return "bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white";
      case 'ocean':
        return "bg-gradient-to-br from-cyan-500 to-blue-600 text-white";
      case 'minimal':
      default:
        // Для Minimal ми повертаємо базові класи, а колір додамо через style
        return "text-gray-900"; 
    }
  };

  const currentTheme = user.theme || 'minimal';
  const themeClasses = getThemeClasses(currentTheme);
  
  // Якщо тема Minimal - використовуємо обраний колір, якщо ні - градієнт теми перекриє це
  const bgStyle = (currentTheme === 'minimal') 
    ? { backgroundColor: user.bg_color || '#f3f4f6' } 
    : {};

  // Функція копіювання
  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Сортуємо лінки
  const sortedLinks = user.links?.sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0)) || [];

  return (
    <div 
      className={`min-h-screen w-full transition-colors duration-500 ${themeClasses}`}
      style={bgStyle} // Сюди падає колір тільки якщо тема Minimal
    >

      <LanguageSwitcher />
      <div className="max-w-md mx-auto py-12 px-4 flex flex-col items-center">
        
        {/* Аватар */}
        <div className="mb-4 relative group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white/20 shadow-xl bg-gray-100">
             {user.avatar_url ? (
               <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
             ) : (
               <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400">
                  {user.username?.[0]?.toUpperCase()}
               </div>
             )}
          </div>
        </div>

        {/* Ім'я та Нікнейм */}
        <h1 className="text-xl font-bold mb-1 text-center drop-shadow-sm">{user.full_name}</h1>

        {/* 👇 БІОГРАФІЯ (ДОДАЄМО ЦЕЙ БЛОК) 👇 */}
        {user.bio && (
          <p className="text-sm text-center opacity-90 mb-4 max-w-xs whitespace-pre-wrap leading-relaxed">
            {user.bio}
          </p>
        )}
        
        {/* Клікабельний нікнейм з іконкою (ВІДНОВЛЕНО!) */}
        <CopyLink username={user.username} />

        {/* --- СПИСОК ПОСИЛАНЬ --- */}
        <div className="w-full space-y-4">
          {sortedLinks.map((link: any) => {

            // 1. АКОРДЕОН ПРАЙСУ (ВАШ КОМПОНЕНТ)
            if (link.type === 'pricing') {
              return <AccordionLink key={link.id} title={link.title} data={link.meta_data} />;
            }
            
            // 0. ЗАГОЛОВОК (HEADER)
            if (link.type === 'header') {
                return (
                  <h3 key={link.id} className="w-full text-center font-extrabold text-lg uppercase tracking-widest mt-6 mb-2 opacity-80 drop-shadow-sm">
                    {link.title}
                  </h3>
                );
            }

            // 1. BUY ME A COFFEE (Жовтий)
            if (link.type === 'bmc') {
                return (
                  <TrackedLink
                    key={link.id}
                    id={link.id}
                    url={link.url}
                    className="block w-full bg-[#FFDD00] text-gray-900 p-4 rounded-xl shadow-md hover:scale-[1.02] transition-all relative overflow-hidden group border-2 border-[#FFDD00]"
                  >
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center shrink-0 text-gray-900 font-bold text-xl">☕</div>
                      <div className="flex-1 min-w-0 text-left">
                         <div className="font-bold text-base truncate">{link.title}</div>
                         <div className="text-xs opacity-80 font-medium">{t('bmcAction')}</div>
                      </div>
                      <div className="ml-auto bg-gray-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap">{t('bmcBtn')}</div>
                    </div>
                  </TrackedLink>
                );
            }

            // 2. MONOBANK (Чорний)
            if (link.type === 'monobank') {
                return (
                    <TrackedLink
                    key={link.id}
                    id={link.id}
                    url={link.url}
                    className="block w-full bg-black text-white p-4 rounded-xl shadow-md hover:scale-[1.02] transition-all relative overflow-hidden group border-2 border-transparent"
                  >
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xl">🐈</div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="font-bold text-base truncate">{link.title}</div>
                        <div className="text-xs text-gray-400">{t('monoAction')}</div>
                      </div>
                      <div className="ml-auto bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap">{t('monoButton')}</div>
                    </div>
                  </TrackedLink>
                );
            }

            // 3. PAYPAL (Синій)
            if (link.type === 'paypal') {
                return (
                  <TrackedLink key={link.id} id={link.id} url={link.url} className="block w-full bg-[#0070BA] text-white p-4 rounded-xl shadow-md hover:scale-[1.02] transition-all relative overflow-hidden group">
                     <div className="flex items-center gap-3 relative z-10">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0 font-bold italic font-serif">P</div>
                        <div className="font-bold text-base">{link.title}</div>
                     </div>
                  </TrackedLink>
                )
            }
            
            // 4. SMART LINKS (Всі інші)
            const smartStyle = getLinkStyle(link.url);
            return (
                <TrackedLink
                  key={link.id}
                  id={link.id}
                  url={link.url}
                  className={`block w-full py-4 px-5 rounded-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center relative overflow-hidden ${smartStyle.style}`}
                >
                  {smartStyle.icon && (
                    <span className="absolute left-5 opacity-90">{smartStyle.icon}</span>
                  )}
                  <span className="font-semibold text-center truncate px-8">{link.title}</span>
                  <svg className="w-4 h-4 absolute right-5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </TrackedLink>
            );

          })}
        </div>

        {/* Footer */}
        <footer className="mt-16 pb-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs font-medium opacity-50 hover:opacity-100 transition-opacity"
            >
                <div className="w-3 h-3 bg-current rounded-full"></div>
                <span>{t('footer')}</span>
            </Link>
        </footer>

      </div>
    </div>
  );
}