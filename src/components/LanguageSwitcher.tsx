"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-sm border border-gray-200 gap-1 absolute top-4 right-4 z-50">
      <button
        onClick={() => setLang('uk')}
        className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
          lang === 'uk' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
        }`}
      >
        UA
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
          lang === 'en' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang('de')}
        className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
          lang === 'de' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
        }`}
      >
        DE
      </button>
    </div>
  );
}