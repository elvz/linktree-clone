"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import GoogleButton from "./GoogleButton"; // Ваша кнопка Google
import LanguageSwitcher from "@/components/LanguageSwitcher"; // Перемикач мов
import Link from "next/link";
import Header from "@/components/Header";

export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const supabase = createClient();

  // Стан: 'login' або 'register'
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (mode === 'login') {
        // --- ЛОГІКА ВХОДУ ---
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        // Успішний вхід -> на адмінку
        router.push("/admin");
        router.refresh();
      } else {
        // --- ЛОГІКА РЕЄСТРАЦІЇ ---
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            // Створюємо профіль одразу з початком email як username
            data: {
              username: email.split('@')[0], 
              full_name: email.split('@')[0],
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;

        // Успішна реєстрація -> показати повідомлення
        setMessage({ type: 'success', text: t('successRegister') });
        setLoading(false); // Зупиняємо лоадер, щоб юзер прочитав текст
        return; 
      }
    } catch (error: any) {
      console.error(error);
      setMessage({ 
        type: 'error', 
        text: error.message === "Invalid login credentials" ? t('errorLogin') : t('errorGeneric') 
      });
    } finally {
        if (mode === 'login') setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 relative">
      <Header />
      
      

      

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        
        {/* Заголовок */}
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
          {mode === 'login' ? t('authLoginTitle') : t('authRegisterTitle')}
        </h1>

        {/* Таби перемикання */}
        <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
          <button
            onClick={() => { setMode('login'); setMessage(null); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              mode === 'login' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('tabLogin')}
          </button>
          <button
            onClick={() => { setMode('register'); setMessage(null); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              mode === 'register' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('tabRegister')}
          </button>
        </div>

        {/* Google Кнопка */}
        <GoogleButton />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">{t('orText')}</span></div>
        </div>

        {/* Повідомлення про помилку/успіх */}
        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* Форма */}
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('emailLabel')}</label>
            <input
              type="email"
              required
              placeholder={t('emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('passwordLabel')}</label>
            <input
              type="password"
              required
              minLength={6}
              placeholder={t('passwordPlaceholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
            />
          </div>

          {/* 👇 ДОДАЄМО ТУТ 👇 */}
<div className="flex justify-end mt-1 mb-4">
  <Link 
    href="/forgot-password" 
    className="text-xs font-medium text-gray-500 hover:text-black transition-colors"
  >
    {t('forgotPass')}
  </Link>
</div>

          <button
            disabled={loading}
            className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-black transition disabled:opacity-70 flex justify-center"
          >
            {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
                mode === 'login' ? t('loginButton') : t('registerButton')
            )}
          </button>
        </form>

        {/* Підвал картки */}
        <p className="mt-6 text-center text-sm text-gray-500">
          {mode === 'login' ? t('noAccount') : t('haveAccount')}{" "}
          <button 
            onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setMessage(null);
            }}
            className="font-semibold text-gray-900 hover:underline"
          >
            {mode === 'login' ? t('toRegister') : t('toLogin')}
          </button>
        </p>

      </div>
    </div>
  );
}