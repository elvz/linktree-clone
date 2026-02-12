"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function UpdatePassword() {
    const { t } = useLanguage();
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();

    // Оновлюємо пароль для ПОТОЧНОГО залогіненого юзера
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      alert("Помилка: " + error.message);
    } else {
      alert("Пароль успішно змінено!");
      router.push("/admin"); // Перекидаємо в адмінку
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form onSubmit={handleUpdate} className="w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Новий пароль</h1>
        <input
          type="password"
          placeholder={t('newPassPH')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          {t('savePass')}
        </button>
          </form>
    </div>
  );
}