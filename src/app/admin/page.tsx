import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { addLink, deleteLink, updateProfile, addMonobankLink } from "./actions"; // Додали updateProfile
import PricingForm from "@/components/PricingForm";

export default async function AdminPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  // Завантажуємо існуючі посилання цього юзера
  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true }); // Спочатку старі, потім нові

    const isPremium = profile?.is_premium;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Якщо не преміум — показуємо банер */}
      {/* Банер Premium */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl shadow-lg mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Розблокуй PRO можливості! 🚀</h3>
            <p className="mb-4 opacity-90 max-w-lg">
              Отримай доступ до віджету Монобанку, створенню прайс-листів та пріоритетної підтримки.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Кнопка 1: Оплата */}
              <a 
                href="https://send.monobank.ua/jar/2GzjQyvVbj" 
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center items-center bg-white text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
              >
                Купити PRO за 99 грн
              </a>

              {/* Кнопка 2: Підтримка (Telegram) */}
              <a 
                href="https://t.me/aelvz" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex justify-center items-center bg-black/20 text-white font-medium px-6 py-3 rounded-lg hover:bg-black/30 transition backdrop-blur-sm border border-white/10"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                Я оплатив / Підтримка
              </a>
            </div>

            <p className="text-xs mt-3 opacity-70">
              *Після оплати натисніть кнопку підтримки та надішліть скріншот (або час оплати) для активації.
            </p>
          </div>
          
          {/* Декор */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-3xl"></div>
        </div>
      )}
        
        {/* Шапка (ОНОВЛЕНА) */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-center gap-4 border border-gray-100">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Адмін-панель</h1>
            <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
              <span>{user.email}</span>
              {isPremium && (
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                  PRO
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Кнопка "Переглянути сторінку" */}
            <a
              href={`/${profile?.username}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition border border-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              <span className="whitespace-nowrap">Моя сторінка</span>
            </a>

            {/* Кнопка "Вийти" */}
            <form action="/auth/signout" method="post">
              <button className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition border border-transparent hover:border-red-100" title="Вийти">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              </button>
            </form>
          </div>
        </div>

        {/* --- НОВИЙ БЛОК: Налаштування профілю --- */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Налаштування сторінки</h2>
          <form action={updateProfile} className="space-y-4">

            {/* БЛОК АВАТАРКИ */}
<div className="flex items-center gap-4 mb-6">
  {/* Прев'ю поточної аватарки */}
  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 border border-gray-300 relative">
    {profile?.avatar_url ? (
      <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-2xl text-gray-400 font-bold">
        {profile?.username?.[0]?.toUpperCase() || "?"}
      </div>
    )}
  </div>

  {/* Кнопка завантаження */}
  <div>
    <label 
      htmlFor="avatar-upload" 
      className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition inline-block"
    >
      Змінити фото
    </label>
    <input 
      id="avatar-upload"
      name="avatar" 
      type="file" 
      accept="image/*" // Тільки картинки
      className="hidden" // Ховаємо стандартний інпут
    />
    <p className="text-xs text-gray-400 mt-2">Макс. 2MB (jpg, png)</p>
  </div>
</div>
            
            {/* Ім'я */}
            <div>
              <label className="text-sm text-gray-500 block mb-1">Відображуване ім'я</label>
              <input 
                name="fullName" 
                defaultValue={profile?.full_name || ''}
                className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:border-black"
              />
            </div>

            {/* Нікнейм (URL) */}
            <div>
              <label className="text-sm text-gray-500 block mb-1">Нікнейм (URL)</label>
              <div className="flex items-center">
                <span className="bg-gray-100 p-2 border border-r-0 border-gray-200 rounded-l-lg text-gray-500">
                  domain.com/
                </span>
                <input 
                  name="username" 
                  defaultValue={profile?.username || ''}
                  className="w-full p-2 border border-gray-200 rounded-r-lg outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Колір фону */}
            <div>
               <label className="text-sm text-gray-500 block mb-1">Колір фону</label>
               <div className="flex gap-2 h-10">
                 <input 
                   type="color" 
                   name="bgColor"
                   defaultValue={profile?.bg_color || '#ffffff'}
                   className="h-full aspect-square p-0 border-0 rounded cursor-pointer"
                 />
                 <div className="text-xs text-gray-400 self-center">Натисніть, щоб обрати колір</div>
               </div>
            </div>

            <button className="cursor-pointer bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black transition text-sm">
              Зберегти зміни
            </button>
          </form>
        </div>
        {/* --- КІНЕЦЬ НОВОГО БЛОКУ --- */}

        {/* Форма додавання */}
        {/* <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Додати нове посилання</h2>
          <form action={addLink} className="flex flex-col gap-3 md:flex-row">
            <input 
              name="title" 
              placeholder="Назва (напр. Instagram)" 
              required
              className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none"
            />
            <input 
              name="url" 
              placeholder="URL (https://...)" 
              required
              className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none"
            />
            <button className="cursor-pointer bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition font-medium">
              Додати
            </button>
          </form>
        </div> */}

        {/* --- ВАРІАНТ: РОЗДІЛЕНІ БЛОКИ --- */}
        
        {/* 1. Блок для звичайних посилань (Основний) */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Додати посилання</h2>
          <form action={addLink} className="flex flex-col md:flex-row gap-3">
            <input 
              name="title" 
              placeholder="Назва (напр. Instagram)" 
              required
              className="flex-1 p-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-black transition"
            />
            <input 
              name="url" 
              placeholder="URL (https://...)" 
              required
              className="flex-1 p-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-black transition"
            />
            <button className="cursor-pointer bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-black text-sm font-medium transition whitespace-nowrap">
              Додати
            </button>
          </form>
        </div>

        {/* 2. Блок для Монобанку (З ЗАГЛУШКОЮ) */}
        {isPremium ? (
          // --- АКТИВНА ФОРМА (ЯКЩО КУПИВ) ---
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-sm p-6 border border-gray-200 dashed-border">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs">
                🐈
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Віджет Монобанку</h2>
              <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded-full ml-auto">PRO</span>
            </div>

            <form action={addMonobankLink} className="flex flex-col md:flex-row gap-3 items-end">
              <div className="w-full md:w-1/3">
                <label className="text-xs text-gray-500 mb-1 block ml-1">Назва збору</label>
                <input 
                  name="title" 
                  placeholder="Напр: На мавік" 
                  className="w-full p-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-black transition bg-white"
                />
              </div>
              
              <div className="w-full md:w-2/3">
                <label className="text-xs text-gray-500 mb-1 block ml-1">Посилання на банку</label>
                <div className="flex gap-2">
                  <input 
                    name="url" 
                    placeholder="https://send.monobank.ua/jar/..." 
                    required
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-black transition bg-white"
                  />
                  <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 text-sm font-medium transition whitespace-nowrap flex items-center gap-2">
                    <span>Додати</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          // --- ЗАГЛУШКА (ЯКЩО НЕ КУПИВ) ---
          <div className="relative overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6">
            {/* Розмитий контент на фоні */}
            <div className="blur-[1px] opacity-60 pointer-events-none select-none filter grayscale-[50%]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">🐈</div>
                <h2 className="text-lg font-semibold text-gray-700">Віджет Монобанку</h2>
              </div>
              <div className="flex flex-col md:flex-row gap-3 items-end">
                 <div className="w-1/3 space-y-1">
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    <div className="h-11 w-full bg-white border border-gray-200 rounded-lg"></div>
                 </div>
                 <div className="w-2/3 space-y-1">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="flex gap-2">
                       <div className="h-11 w-full bg-white border border-gray-200 rounded-lg"></div>
                       <div className="h-11 w-24 bg-gray-800 rounded-lg"></div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Оверлей з замочком */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[1px]">
              <div className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-bold text-white shadow-xl transition-transform ">
                <span>Віджет Монобанку</span>
              </div>
              <p className="mt-2 text-xs font-medium text-gray-600">
                Доступно після оплати
              </p>
            </div>
          </div>
        )}

        {/* 3. Блок Прайсу (ТІЛЬКИ ДЛЯ PREMIUM) */}
        {isPremium ? (
           <PricingForm userId={user.id} />
        ) : (
           // Заглушка, якщо не купив преміум
           <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 opacity-70 relative overflow-hidden group">
              <div className="blur-[2px] pointer-events-none select-none">
                 <h2 className="text-lg font-semibold mb-4">💰 Прайс-лист</h2>
                 <div className="space-y-3">
                    <input disabled className="w-full p-2 border rounded bg-gray-100" placeholder="Назва прайсу..." />
                    <div className="flex gap-2"><input disabled className="w-2/3 p-2 border rounded bg-gray-100" /><input disabled className="w-1/3 p-2 border rounded bg-gray-100" /></div>
                 </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                 <div className="text-center">
                    <span className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-bold text-white shadow-xl transition-transform ">Додавання послуг і цін</span>
                    <p className="mt-2 text-xs font-medium text-gray-600">Доступно після оплати</p>
                 </div>
              </div>
           </div>
        )}

        

        {/* Список посилань */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold ml-1">Ваші посилання</h2>
          
          {links?.length === 0 && (
             <p className="text-gray-400 text-center py-8 bg-white rounded-xl border border-dashed border-gray-200">
               Список порожній. Додайте щось!
             </p>
          )}

          {links?.map((link) => (
            <div key={link.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group">
              <div>
                <div className="font-bold text-gray-800">{link.title}</div>
                <div className="text-xs text-gray-400 truncate max-w-[200px]">{link.url}</div>
              </div>
              
              <form action={deleteLink}>
                <input type="hidden" name="linkId" value={link.id} />
                <button className="cursor-pointer text-gray-300 hover:text-red-500 transition p-2">
                  {/* Іконка смітника (SVG) */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              </form>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}