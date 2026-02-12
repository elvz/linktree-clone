"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link"; // Не забудьте імпортувати!
import { useLanguage } from "@/context/LanguageContext";

export default function ForgotPassword() {
    const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    
    // Вказуємо сторінку, куди перекине юзера після кліку в листі
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
    });

    if (error) {
      setMessage("Помилка: " + error.message);
    } else {
      setMessage("Перевірте пошту! Ми надіслали посилання для відновлення.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form onSubmit={handleReset} className="w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">{t('resetTitle')}</h1>
        <input
          type="email"
          placeholder={t('emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-black text-white p-2 rounded">
          {t('sendLink')}
        </button>
        {message && <p className="text-center text-sm mt-2">{message}</p>}
          </form>
          {/* 👇 КНОПКА НАЗАД 👇 */}
<Link 
  href="/login" 
  className="mt-4 text-sm text-center text-gray-500 hover:text-black flex items-center justify-center gap-1 transition"
>
  ← {t('backToLogin')}
</Link>
    </div>
  );
}