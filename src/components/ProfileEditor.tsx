"use client";

import { useLanguage } from "@/context/LanguageContext";
import { updateProfile } from "@/app/admin/actions";
import { useState, useRef } from "react";

interface ProfileEditorProps {
  initialName: string;
  initialColor: string;
  avatarUrl: string | null;
  username: string;
}

export default function ProfileEditor({ initialName, initialColor, avatarUrl, username }: ProfileEditorProps) {
  const { t } = useLanguage();
  
  // Стан для прев'ю аватарки (щоб показати нову картинку до збереження)
  const [preview, setPreview] = useState<string | null>(avatarUrl);
  const [color, setColor] = useState(initialColor || "#f3f4f6");
  const [loading, setLoading] = useState(false);
  
  // Реф для прихованого інпуту файлу
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Обробка вибору файлу
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Створюємо тимчасове посилання, щоб показати юзеру, що він обрав
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
      <h2 className="text-lg font-semibold mb-6 text-gray-800 flex items-center gap-2">
        🛠 {t('profileSettings')}
      </h2>

      <form 
        action={async (formData) => {
            setLoading(true);
            await updateProfile(formData);
            setLoading(false);
        }} 
        className="flex flex-col gap-6"
      >
        {/* 1. Блок Аватарки */}
        <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 border-2 border-gray-100 overflow-hidden shrink-0">
                {preview ? (
                    <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl text-gray-400 font-bold">
                        {username?.[0]?.toUpperCase()}
                    </div>
                )}
            </div>
            
            <div>
                {/* Прихований інпут для файлу */}
                <input 
                    type="file" 
                    name="avatar" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg"
                    className="hidden"
                />
                {/* Кнопка, яка викликає інпут */}
                <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition shadow-sm cursor-pointer"
                >
                    {t('changePhoto')}
                </button>
                <p className="text-xs text-gray-400 mt-1">Max 2MB (jpg, png)</p>
            </div>
        </div>

        {/* 2. Поля вводу (Вертикальний список) */}
        <div className="space-y-5">
            
            {/* Відображуване ім'я */}
            <div>
                <label className="text-sm text-gray-600 font-medium mb-1 block">{t('labelName')}</label>
                <input 
                    name="fullName"
                    defaultValue={initialName}
                    placeholder={t('placeholderName')}
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                />
            </div>

            {/* Нікнейм (URL) */}
            <div>
                <label className="text-sm text-gray-600 font-medium mb-1 block">{t('nickName')} (URL)</label>
                <div className="flex rounded-lg border border-gray-200 overflow-hidden focus-within:border-black focus-within:ring-1 focus-within:ring-black transition">
                    <div className="bg-gray-50 px-3 py-3 text-sm text-gray-500 border-r border-gray-200 select-none">
                        https://sitename.com/
                    </div>
                    <input 
                        name="username"
                        defaultValue={username}
                        placeholder="username"
                        className="flex-1 p-3 text-sm outline-none bg-white"
                    />
                </div>
            </div>

            {/* Колір фону */}
            <div>
                <label className="text-sm text-gray-600 font-medium mb-1 block">{t('labelColor')}</label>
                <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                        <input 
                            type="color" 
                            name="bgColor"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer p-0 border-0"
                        />
                    </div>
                    <div className="text-sm text-gray-500">
                        {t('bgColor')}
                    </div>
                </div>
            </div>

        </div>

        {/* Кнопка збереження */}
        <div>
            <button 
                disabled={loading}
                className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-black text-sm font-medium transition disabled:opacity-70 flex items-center justify-center gap-2 w-full md:w-auto shadow-md hover:shadow-lg cursor-pointer"
            >
                {loading ? t('saving') : t('saveBtn')}
            </button>
        </div>

      </form>
    </div>
  );
}