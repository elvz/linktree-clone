"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 bg-transparent  z-50 ">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
           <div className="w-8 h-8 bg-black rounded-lg"></div> {/* Логотип заглушка */}
           <span className="font-bold text-xl tracking-tight">OwnTree</span>
        </Link>
        <LanguageSwitcher />
      </div>
    </header>
  );
}