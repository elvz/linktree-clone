"use client";

import { useLanguage } from "@/context/LanguageContext";
import { updateProfile } from "@/app/admin/actions";
import { useState, useRef } from "react";

interface ProfileEditorProps {
    initialName: string;
    initialBio?: string; // <--- Додано
  initialColor: string;
  avatarUrl: string | null;
    username: string;
    profileTheme?: string;
}

export default function ProfileEditor({ initialName, initialBio, initialColor, avatarUrl, username, profileTheme }: ProfileEditorProps) {
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
                  
                  {/* 👇 БІОГРАФІЯ (ВСТАВИТИ ТУТ, ПІД ІМЕНЕМ) 👇 */}
            <div>
                <label className="text-sm text-gray-600 font-medium mb-1 block">{t('bioTitle')}</label>
                <textarea 
                    name="bio"
                    defaultValue={initialBio}
                    placeholder={t('bioPlaceholder')}
                    rows={3}
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-black transition resize-none"
                />
            </div>

                  {/* Нікнейм */}
            <div>
                <label className="text-sm text-gray-600 font-medium mb-1 block">{t('nickName')} (URL)</label>
                <div className="flex rounded-lg border border-gray-200 overflow-hidden focus-within:border-black focus-within:ring-1 focus-within:ring-black transition">
                    <div className="bg-gray-50 px-3 py-3 text-sm text-gray-500 border-r border-gray-200 select-none flex items-center">
                        owntree.me/
                    </div>
                    <input 
                        name="username"
                        defaultValue={username}
                        placeholder="your-name"
                        // Додаємо pattern, щоб браузер теж лаявся, якщо щось не так
                        pattern="[a-z0-9-_]+"
                        title="Тільки латинські літери, цифри, дефіс та підкреслення"
                        required
                        className="flex-1 p-3 text-sm outline-none bg-white placeholder-gray-300"
                        // Можна додати авто-форматування при вводі (опціонально)
                        onChange={(e) => {
                           // Замінюємо пробіли та спецсимволи на льоту
                           e.target.value = e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, "");
                        }}
                    />
                </div>
                <p className="text-[10px] text-gray-400 mt-1 ml-1">
                    {t('nickTerm')}
                </p>
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

                  {/* ... після інпуту кольору ... */}

            {/* Вибір Теми */}
            <div>
                <label className="text-sm text-gray-600 font-medium mb-2 block">{t('themesTitle')}</label>
                <div className="grid grid-cols-2 gap-3">
                    {/* Minimal */}
                    <label className="cursor-pointer">
                        <input type="radio" name="theme" value="minimal" className="peer hidden" defaultChecked={!profileTheme || profileTheme === 'minimal'} />
                        <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 peer-checked:border-black peer-checked:ring-1 peer-checked:ring-black transition flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full border border-gray-200 bg-gray-50"></div>
                            <span className="text-sm font-medium">{t('themeMinimal')}</span>
                        </div>
                    </label>

                    {/* Midnight */}
                    <label className="cursor-pointer">
                        <input type="radio" name="theme" value="midnight" className="peer hidden" defaultChecked={profileTheme === 'midnight'} />
                        <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 peer-checked:border-black peer-checked:ring-1 peer-checked:ring-black transition flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-900"></div>
                            <span className="text-sm font-medium">{t('themeMidnight')}</span>
                        </div>
                    </label>

                    {/* Sunset */}
                    <label className="cursor-pointer">
                        <input type="radio" name="theme" value="sunset" className="peer hidden" defaultChecked={profileTheme === 'sunset'} />
                        <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 peer-checked:border-black peer-checked:ring-1 peer-checked:ring-black transition flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"></div>
                            <span className="text-sm font-medium">{t('themeSunset')}</span>
                        </div>
                    </label>

                    {/* Ocean */}
                    <label className="cursor-pointer">
                        <input type="radio" name="theme" value="ocean" className="peer hidden" defaultChecked={profileTheme === 'ocean'} />
                        <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 peer-checked:border-black peer-checked:ring-1 peer-checked:ring-black transition flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-emerald-400"></div>
                            <span className="text-sm font-medium">{t('themeOcean')}</span>
                        </div>
                    </label>
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