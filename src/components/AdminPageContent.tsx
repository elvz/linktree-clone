"use client";

import { useLanguage } from "@/context/LanguageContext";
import PricingForm from "@/components/PricingForm";
import LanguageSwitcher from "@/components/LanguageSwitcher"; // Додамо перемикач і сюди!
import { addLink, addMonobankLink, deleteLink, addBmcLink } from "@/app/admin/actions"; // не забудьте імпортувати addPaypalLink
import ProfileEditor from "@/components/ProfileEditor";

// Типи даних
interface AdminContentProps {
  user: any;
  profile: any;
  links: any[];
}

export default function AdminPageContent({ user, profile, links }: AdminContentProps) {
  const { t } = useLanguage();
  const isPremium = profile?.is_premium;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 relative">
       {/* Перемикач мов для адміна */}
      <LanguageSwitcher />

          <div className="max-w-2xl mx-auto">
              
              {/* Банер PRO */}
        {!isPremium && (
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl shadow-lg mb-8 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">{t('proUnlock')}</h3>
              <p className="mb-4 opacity-90 max-w-lg">{t('proDesc')}</p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="https://send.monobank.ua/jar/ВАШ_АЙДІ_БАНКИ" 
                  target="_blank" rel="noreferrer"
                  className="inline-flex justify-center items-center bg-white text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
                >
                  {t('buyPro')}
                </a>
                <a 
                  href="https://t.me/ВАШ_НІКНЕЙМ" 
                  target="_blank" rel="noreferrer"
                  className="inline-flex justify-center items-center bg-black/20 text-white font-medium px-6 py-3 rounded-lg hover:bg-black/30 transition backdrop-blur-sm border border-white/10"
                >
                  {t('supportBtn')}
                </a>
              </div>
              <p className="text-xs mt-3 opacity-70">{t('supportNote')}</p>
            </div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-3xl"></div>
          </div>
        )}
        
        {/* Шапка */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-center gap-4 border border-gray-100 mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{t('adminTitle')}</h1>
            <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
              <span>{user.email}</span>
              {isPremium && (
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">PRO</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href={`/${profile?.username}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition border border-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              <span className="whitespace-nowrap">{t('myPage')}</span>
            </a>

            <form action="/auth/signout" method="post">
              <button className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition border border-transparent hover:border-red-100 cursor-pointer" title={t('logout')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              </button>
            </form>
          </div>
        </div>

        {/* Статистика (PRO ONLY) */}
        <div className="grid grid-cols-2 gap-4 mb-6 relative">
          {/* Якщо НЕ преміум — накладаємо розмиття і замок */}
          {!isPremium && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px] rounded-xl border border-gray-100">
               <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg mb-1">
                 🔒 {t('proFeature')}
               </div>
               <p className="text-[10px] text-gray-600 font-medium">{t('proLockDesc')}</p>
            </div>
            )}
                  
            

          {/* Самі картки (візуально вони є завжди, але розмиті під оверлеєм) */}
          <div className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center transition-all ${!isPremium ? 'blur-[3px] opacity-70' : ''}`}>
            <div className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">{t('statsViews')}</div>
            <div className="text-3xl font-black text-gray-900">{isPremium ? (profile?.views || 0) : '99+'}</div>
          </div>
          
          <div className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center transition-all ${!isPremium ? 'blur-[3px] opacity-70' : ''}`}>
            <div className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">{t('statsClicks')}</div>
            <div className="text-3xl font-black text-gray-900">
               {isPremium ? (links?.reduce((acc, link) => acc + (link.clicks || 0), 0)) : '99+'}
            </div>
          </div>
              </div>
              
              {/* --- [ТУТ] ВСТАВЛЯЄМО РЕДАКТОР ПРОФІЛЮ --- */}
        <ProfileEditor 
            initialName={profile?.full_name || ""}
            initialColor={profile?.bg_color || "#f3f4f6"}
            avatarUrl={profile?.avatar_url}
            username={profile?.username}
        />

        

        {/* ФОРМИ ДОДАВАННЯ */}
        <div className="space-y-6 mb-8">
            
            {/* 1. Звичайне посилання */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">{t('addLinkTitle')}</h2>
            <form action={addLink} className="flex flex-col md:flex-row gap-3">
                <input name="title" placeholder={t('inputTitlePlaceholder')} required className="flex-1 p-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-black transition" />
                <input name="url" placeholder={t('inputUrlPlaceholder')} required className="flex-1 p-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-black transition" />
                <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-black text-sm font-medium transition whitespace-nowrap cursor-pointer">{t('addBtn')}</button>
            </form>
            </div>

            {/* 2. Монобанка */}
            {isPremium ? (
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
            ) : (
             // Заглушка (можна спростити, бо вона лише візуальна)
             // --- GHOST MONO (КРАСИВА ЗАГЛУШКА) ---
             <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 group">
                 {/* Розмитий контент */}
                 <div className="blur-[4px] opacity-60 pointer-events-none select-none grayscale-[0.5] transition-all duration-500 group-hover:blur-[2px] group-hover:scale-[1.01]">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs">🐈</div>
                        <h2 className="text-lg font-semibold text-gray-800">{t('monoTitle')}</h2>
                        <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded-full ml-auto">PRO</span>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 items-end">
                       <div className="w-full md:w-1/3 space-y-1">
                          <div className="h-3 w-20 bg-gray-200 rounded"></div>
                          <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-lg"></div>
                       </div>
                       <div className="w-full md:w-2/3 space-y-1">
                          <div className="h-3 w-24 bg-gray-200 rounded"></div>
                          <div className="flex gap-2">
                             <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-lg"></div>
                             <div className="h-11 w-32 bg-black rounded-lg opacity-80"></div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Оверлей із замком */}
                 <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/30 backdrop-blur-[1px]">
                     <div className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 transform transition-transform group-hover:scale-110">
                        <span>🔒 {t('proFeature')}</span>
                     </div>
                     <p className="mt-2 text-[10px] font-bold text-gray-500 uppercase tracking-wide">{t('proLockDesc')}</p>
                 </div>
             </div>
            
          )}
          
          {/* 3. Buy Me a Coffee Widget (PRO) */}
            {isPremium ? (
            <div className="bg-[#FFDD00] text-gray-900 rounded-xl shadow-sm p-6 border border-yellow-400 relative overflow-hidden">
                {/* Лого чашки на фоні */}
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
            ) : (
             <div className="relative overflow-hidden rounded-xl border border-yellow-400 bg-[#FFDD00] p-6 group">
                 <div className="blur-[4px] opacity-50 pointer-events-none select-none transition-all duration-500 group-hover:blur-[2px] group-hover:scale-[1.01]">
                    <div className="flex items-center gap-2 mb-4">
                       <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center text-gray-900 font-bold text-lg">☕</div>
                       <h2 className="text-lg font-bold">{t('bmcTitle')}</h2>
                       <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded-full ml-auto font-bold">PRO</span>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 items-end">
                        <div className="w-1/3 h-11 bg-white/40 rounded-lg border border-yellow-500/20"></div>
                        <div className="w-2/3 flex gap-2">
                            <div className="w-full h-11 bg-white/40 rounded-lg border border-yellow-500/20"></div>
                            <div className="w-32 h-11 bg-gray-900 rounded-lg opacity-80"></div>
                        </div>
                    </div>
                 </div>

                 {/* Оверлей */}
                 <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                     <div className="bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 transform transition-transform group-hover:scale-110">
                        <span>🔒 {t('proFeature')}</span>
                     </div>
                 </div>
             </div>
            )}

            {/* 3. Прайс (Компонент) */}
            {isPremium ? (
               <PricingForm userId={user.id} />
            ) : (
                <div className="relative overflow-hidden rounded-xl border border-gray-200 border-l-4 border-l-blue-200 bg-white p-6 group">
                 <div className="blur-[4px] opacity-50 pointer-events-none select-none grayscale-[0.5] transition-all duration-500 group-hover:blur-[2px]">
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">{t('priceTitle')}</h2>
                        <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold">PRO</span>
                    </div>
                    <div className="space-y-4">
                        <div className="h-11 w-full bg-gray-50 border border-gray-100 rounded-lg"></div>
                        <div className="flex gap-2">
                            <div className="h-10 flex-[2] bg-gray-50 border border-gray-100 rounded-lg"></div>
                            <div className="h-10 flex-1 bg-gray-50 border border-gray-100 rounded-lg"></div>
                        </div>
                        <div className="flex gap-2 opacity-50">
                            <div className="h-10 flex-[2] bg-gray-50 border border-gray-100 rounded-lg"></div>
                            <div className="h-10 flex-1 bg-gray-50 border border-gray-100 rounded-lg"></div>
                        </div>
                    </div>
                 </div>

                 <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[1px]">
                     <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 transform transition-transform group-hover:scale-110">
                        <span>🔒 {t('proFeature')}</span>
                     </div>
                 </div>
             </div>
            )}
        </div>

        {/* Список лінків */}
        <div className="space-y-3">
          {links?.map((link) => (
            <div key={link.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-lg">
                  {link.type === 'monobank' ? '🐈' : link.type === 'pricing' ? '💰' : link.type === 'bmc' ? '☕' : '🔗'}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-gray-800 truncate">{link.title}</div>
                  <div className="text-xs text-gray-400 flex items-center gap-2">
                    <span className="truncate max-w-[150px]">{link.url || t('priceTitle')}</span>
                    <span className="text-gray-300">•</span>
                    
                    {/* Логіка відображення кліків */}
                    {isPremium ? (
                      <span className="flex items-center gap-1 text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">
                        {link.clicks || 0} {t('clicksLabel')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded cursor-help" title={t('proLockDesc')}>
                        🔒 PRO
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <form action={deleteLink}>
                <input type="hidden" name="linkId" value={link.id} />
                <button className="text-gray-300 hover:text-red-500 transition p-2 hover:bg-red-50 rounded-lg cursor-pointer" title={t('delete')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              </form>
            </div>
          ))}

          {links?.length === 0 && (
            <p className="text-center text-gray-400 py-10">{t('emptyLinks')}</p>
          )}
        </div>

      </div>
    </div>
  );
}