"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function HomeContent() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen relative">
      <LanguageSwitcher />

      {/* Header / Nav */}
      <header className="px-6 py-4 flex justify-between items-center max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-black rounded-lg"></div> {/* Логотип заглушка */}
           <span className="font-bold text-xl tracking-tight">OwnTree</span>
        </div>
        <div className="flex gap-4">
           {/* Кнопка входу прямо в шапці */}
           <Link href="/login" className="text-sm font-medium hover:text-gray-600 px-3 py-2">
             {t('tabLogin')}
           </Link>
           <Link href="/login" className="text-sm font-medium bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition">
             {t('tabRegister')}
           </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-6 max-w-4xl">
           {t('heroTitle')}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
           {t('heroSubtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/login" // Ведемо на реєстрацію
            className="bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200"
          >
            {t('heroButtonCreate')}
          </Link>
          <Link 
            href="/demo" // Або на чийсь профіль
            className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition"
          >
            {t('heroButtonDemo')}
          </Link>
        </div>

        {/* Маленька декорація (Mockup) */}
        <div className="mt-20 w-full max-w-sm h-64 bg-gray-100 rounded-t-3xl border-x-8 border-t-8 border-gray-900 shadow-2xl opacity-50 relative overflow-hidden">
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 font-bold">
                YOUR OWNTREE
             </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500 border-t border-gray-100">
        <p>© 2026 {t('footerCopyright')}</p>
      </footer>
    </div>
  );
}