import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { addLink, deleteLink, updateProfile } from "./actions"; // Додали updateProfile

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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Шапка */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center border border-gray-100">
          <div>
            <h1 className="text-xl font-bold">Адмін-панель</h1>
            <p className="text-gray-500 text-xs">{user.email}</p>
          </div>
          <form action="/auth/signout" method="post">
            <button className="text-sm text-red-500 hover:bg-red-50 px-3 py-1.5 rounded transition font-medium">
              Вийти
            </button>
          </form>
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

            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black transition text-sm">
              Зберегти зміни
            </button>
          </form>
        </div>
        {/* --- КІНЕЦЬ НОВОГО БЛОКУ --- */}

        {/* Форма додавання */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
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
            <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition font-medium">
              Додати
            </button>
          </form>
        </div>

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
                <button className="text-gray-300 hover:text-red-500 transition p-2">
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