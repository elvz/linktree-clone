"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

// Компонент одного пункту FAQ
const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <svg 
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

export default function LandingPage() {
  const { t } = useLanguage();

  return (
      <div className="w-full bg-white">
<LanguageSwitcher />
      {/* Header / Nav */}
      <header className="px-6 py-4 flex justify-between items-center max-w-6xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2">
           <div className="w-8 h-8 bg-black rounded-lg"></div> {/* Логотип заглушка */}
           <span className="font-bold text-xl tracking-tight">OwnTree</span>
        </Link>
        {/* hidden = приховано за замовчуванням (на мобільних)
   md:flex = показується як flex на екранах ширше 768px (планшети і ПК)
*/}
<div className="hidden md:flex gap-4"> 
  
  {/* Кнопка входу */}
  <Link href="/login" className="text-sm font-medium hover:text-gray-600 px-3 py-2">
    {t('tabLogin')}
  </Link>

  {/* Кнопка реєстрації */}
  <Link href="/login" className="text-sm font-medium bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition">
    {t('tabRegister')}
  </Link>

</div>
      </header>
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-20 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
          {t('heroTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">{t('heroTitleSpan')}</span>
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          {t('heroSubtitle')}
        </p>
        <div className="flex justify-center gap-4">
            <Link 
                href="/login" 
                className="bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition shadow-xl hover:shadow-2xl hover:-translate-y-1 transform duration-200"
            >
                {t('heroBtn')}
            </Link>
        </div>
      </section>

      {/* 2. FEATURES GRID */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-2xl mb-4">🎨</div>
                <h3 className="text-xl font-bold mb-2">{t('feat1Title')}</h3>
                <p className="text-gray-500">{t('feat1Desc')}</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-4">🔗</div>
                <h3 className="text-xl font-bold mb-2">{t('feat2Title')}</h3>
                <p className="text-gray-500">{t('feat2Desc')}</p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl mb-4">📈</div>
                <h3 className="text-xl font-bold mb-2">{t('feat3Title')}</h3>
                <p className="text-gray-500">{t('feat3Desc')}</p>
            </div>
        </div>
      </section>

      {/* 3. FAQ SECTION */}
      <section className="py-24 px-4 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{t('faqTitle')}</h2>
        <div className="space-y-2">
            <FaqItem question={t('faq1Q')} answer={t('faq1A')} />
            <FaqItem question={t('faq2Q')} answer={t('faq2A')} />
            <FaqItem question={t('faq3Q')} answer={t('faq3A')} />
        </div>
      </section>

      {/* 4. SIMPLE FOOTER */}
      <footer className="py-8 border-t border-gray-100 text-center text-gray-400 text-sm">
              <p>© 2026 Owntree. Built with ❤️ by <Link href="https://t.me/aelvz">elvz.</Link></p>
      </footer>

    </div>
  );
}