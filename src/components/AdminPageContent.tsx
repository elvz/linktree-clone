"use client";

import { useLanguage } from "@/context/LanguageContext";
import PricingForm from "@/components/PricingForm";
import LanguageSwitcher from "@/components/LanguageSwitcher"; 
import { addLink, addMonobankLink, addBmcLink, addHeaderLink } from "@/app/admin/actions"; 
import ProfileEditor from "@/components/ProfileEditor";
import SortableLinkList from "@/components/SortableLinkList";

// Типи даних
interface AdminContentProps {
  user: any;
  profile: any;
  links: any[];
}

export default function AdminPageContent({ user, profile, links }: AdminContentProps) {
  const { t } = useLanguage();
  
  // 🔥 BETA MODE: Вмикаємо PRO для всіх
  const isPremium = true; 
  // const isPremium = profile?.is_premium; // <-- Старий код (збережено)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 relative">
       {/* Перемикач мов для адміна */}
      <LanguageSwitcher />

          <div className="max-w-2xl mx-auto">

         {/* --- BETA БАНЕР (ЛОКАЛІЗОВАНО) --- */}
             <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-xl shadow-lg mb-8 relative overflow-hidden border border-emerald-400/50">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-white/20">
                            {t('publicBeta')}
                        </span>
                        <h3 className="text-xl font-bold">{t('betaTitle')}</h3>
                    </div>
                    <p className="text-emerald-50 text-sm max-w-lg leading-relaxed">
                      {t('betaDesc')}
                    </p>
                  </div>
                  
                  <div className="hidden sm:flex bg-white/10 w-12 h-12 rounded-full items-center justify-center text-2xl border border-white/20">
                    🚀
                  </div>
                </div>
            </div>
              
             {/* Шапка */}
            <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-center gap-4 border border-gray-100 mb-6">
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t('adminTitle')}</h1>
                <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
                  <span>{user.email}</span>
                  {/* BETA Badge */}
                  <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                    BETA TESTER
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                {/* Кнопка: Моя сторінка */}
                <a
                  href={`/${profile?.username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition border border-gray-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  <span className="hidden sm:inline">{t('myPage')}</span>
                </a>

                {/* НОВА КНОПКА: ПІДТРИМКА */}
                <a
                  href="https://t.me/aelvz" 
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition border border-transparent hover:border-blue-100"
                  title={t('supportBtn') || "Support"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                </a>

                {/* Кнопка: Вийти */}
                <form action="/auth/signout" method="post">
                  <button className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition border border-transparent hover:border-red-100 cursor-pointer" title={t('logout')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                  </button>
                </form>
              </div>
            </div>
             
            

            {/* Статистика (PRO unlocked) */}
            <div className="grid grid-cols-2 gap-4 mb-6 relative">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center transition-all">
                <div className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">{t('statsViews')}</div>
                <div className="text-3xl font-black text-gray-900">{profile?.views || 0}</div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center transition-all">
                <div className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">{t('statsClicks')}</div>
                <div className="text-3xl font-black text-gray-900">
                   {links?.reduce((acc, link) => acc + (link.clicks || 0), 0)}
                </div>
              </div>
            </div>
              
            {/* РЕДАКТОР ПРОФІЛЮ */}
            <ProfileEditor 
                initialName={profile?.full_name || ""}
                initialColor={profile?.bg_color || "#f3f4f6"}
                avatarUrl={profile?.avatar_url}
                username={profile?.username}
                profileTheme={profile?.theme}
            />

        {/* ФОРМИ ДОДАВАННЯ */}
        <div className="space-y-6 mb-8">
          
            {/* 1. Звичайне посилання */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">{t('addLinkTitle')}</h2>
            
            {/* БЛОК ЗАГОЛОВКА */}
            <div className="bg-gray-50 rounded-xl shadow-sm p-4 border border-gray-200 border-dashed mb-6">
                <h2 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16"/><path d="M12 4v16"/></svg>
                   {t('headerTitle')}
                </h2>
                <form action={addHeaderLink} className="flex gap-3">
                    <input 
                        name="title" 
                        placeholder={t('headerPlaceholder')} 
                        required 
                        className="flex-1 p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-black transition" 
                    />
                    <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm font-bold transition whitespace-nowrap cursor-pointer">
                        {t('headerAddBtn')}
                    </button>
                </form>
            </div>

            <form action={addLink} className="flex flex-col md:flex-row gap-3">
                <input name="title" placeholder={t('inputTitlePlaceholder')} required className="flex-1 p-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-black transition" />
                <input name="url" placeholder={t('inputUrlPlaceholder')} required className="flex-1 p-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-black transition" />
                <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-black text-sm font-medium transition whitespace-nowrap cursor-pointer">{t('addBtn')}</button>
            </form>
            </div>

            {/* 2. Монобанка (Всі PRO) */}
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-sm p-6 border border-gray-200 dashed-border">
                <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs">🐈</div>
                <h2 className="text-lg font-semibold text-gray-800">{t('monoTitle')}</h2>
                <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded-full ml-auto">PRO</span>
                </div>
                <form action={addMonobankLink} className="flex flex-col md:flex-row gap-3 items-end">
                <div className="w-full md:w-1/3">
                    <label className="text-xs text-gray-500 mb-1 block ml-1">{t('monoNameLabel')}</label>
                    <input name="title" placeholder={t('monoNamePlaceholder')} className="w-full p-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-black transition bg-white" />
                </div>
                <div className="w-full md:w-2/3">
                    <label className="text-xs text-gray-500 mb-1 block ml-1">{t('monoUrlLabel')}</label>
                    <div className="flex gap-2">
                    <input name="url" placeholder={t('monoUrlPlaceholder')} required className="w-full p-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-black transition bg-white" />
                    <button className="bg-black text-white px-6 py-3 rounded-lg  text-sm font-medium transition whitespace-nowrap flex items-center gap-2 cursor-pointer"><span>{t('monoAddBtn') || t('addBtn')}</span></button>
                    </div>
                </div>
                </form>
            </div>
          
            {/* 3. Buy Me a Coffee Widget (PRO) */}
            <div className="bg-[#FFDD00] text-gray-900 rounded-xl shadow-sm p-6 border border-yellow-400 relative overflow-hidden">
                <div className="absolute -right-2 -bottom-4 opacity-20 rotate-12">
                   <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor"><path d="M20.216 6.415l-.132-.666c-.119-.596-.387-1.143-.773-1.618a4.99 4.99 0 0 0-3.355-1.92l-1.09-.15-7.795-1.066L4.99 7.02l8.834 1.208c.596.082 1.134.33 1.58.705.466.393.81.902.99 1.472l.142.45c.446-.035.886-.145 1.305-.33a3.535 3.535 0 0 0 2.375-4.11zm-1.127 5.688c0 1.938-1.578 3.516-3.516 3.516H7.102c-1.938 0-3.516-1.578-3.516-3.516V8.203h12.016v3.9zM22.07 5.56c-.347-1.39-1.22-2.58-2.46-3.376a7.276 7.276 0 0 0-4.757-.96L6.56.12A2.43 2.43 0 0 0 3.79 2.14L2 15.62c0 2.85 2.316 5.165 5.164 5.165h8.28c2.85 0 5.165-2.316 5.165-5.165v-2.36c1.64-.176 3.06-1.21 3.73-2.715.39-1.38.15-2.85-.59-4.05-.28-.46-.64-.86-1.08-1.19z"/></svg>
                </div>

                <div className="flex items-center gap-2 mb-4 relative z-10">
                   <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center text-gray-900 font-bold text-lg">☕</div>
                   <h2 className="text-lg font-bold">{t('bmcTitle')}</h2>
                   <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded-full ml-auto font-bold">PRO</span>
                </div>
                
                <form action={addBmcLink} className="flex flex-col md:flex-row gap-3 items-end relative z-10">
                <div className="w-full md:w-1/3">
                    <label className="text-xs text-gray-700 font-bold mb-1 block ml-1">{t('monoNameLabel')}</label>
                    <input name="title" placeholder="Coffee ☕" className="w-full p-3 border border-yellow-500/30 bg-white/40 rounded-lg text-sm text-gray-900 placeholder-gray-600 outline-none focus:bg-white/60 transition backdrop-blur-sm" />
                </div>
                <div className="w-full md:w-2/3">
                    <label className="text-xs text-gray-700 font-bold mb-1 block ml-1">{t('bmcLabel')}</label>
                    <div className="flex gap-2">
                    <input name="url" placeholder={t('bmcPlaceholder')} required className="w-full p-3 border border-yellow-500/30 bg-white/40 rounded-lg text-sm text-gray-900 placeholder-gray-600 outline-none focus:bg-white/60 transition backdrop-blur-sm" />
                    <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-black text-sm font-bold transition whitespace-nowrap shadow-md cursor-pointer">
                        {t('addBtn')}
                    </button>
                    </div>
                </div>
                </form>
            </div>

            {/* 3. Прайс (Всі PRO) */}
            <PricingForm userId={user.id} />
        </div>

        {/* Список лінків */}
        <div className="space-y-3">
          <div className="mt-8">
             <SortableLinkList 
                initialLinks={links} 
                isPremium={true} // ЗАВЖДИ TRUE
             />
          </div>

          {links?.length === 0 && (
            <p className="text-center text-gray-400 py-10">{t('emptyLinks')}</p>
          )}
        </div>

      </div>
    </div>
  );
}