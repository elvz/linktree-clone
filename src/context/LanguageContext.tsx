"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '@/utils/translations';

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations['uk']) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // За замовчуванням українська
  const [lang, setLangState] = useState<Language>('uk');

  // При завантаженні перевіряємо, чи зберіг юзер мову раніше
  useEffect(() => {
    const savedLang = localStorage.getItem('app-language') as Language;
    if (savedLang && ['uk', 'en', 'de'].includes(savedLang)) {
      setLangState(savedLang);
    } else {
        // Можна автоматично визначити мову браузера
        const browserLang = navigator.language.slice(0, 2);
        if (browserLang === 'de') setLangState('de');
        else if (browserLang === 'en') setLangState('en');
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('app-language', newLang);
  };

  // Функція перекладу: t('copyLink') поверне текст поточною мовою
  const t = (key: keyof typeof translations['uk']) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Хук для використання в компонентах
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}