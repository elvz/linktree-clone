"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useLanguage } from "@/context/LanguageContext";
import { deleteLink } from "@/app/admin/actions";

interface LinkItemProps {
  link: any;
  isPremium: boolean;
}

export function SortableLinkItem({ link, isPremium }: LinkItemProps) {
  const { t } = useLanguage();

  // Хук для перетягування
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  // Стилі для плавного руху
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1, // Коли тягнемо - стає напівпрозорим
    zIndex: isDragging ? 10 : 1,
    position: "relative" as "relative", // Type assertion for TypeScript
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 rounded-xl shadow-sm border flex items-center justify-between group bg-white ${
        link.type === 'header' 
          ? 'bg-gray-50 border-dashed border-gray-300 mt-4 mb-2' 
          : 'bg-white border-gray-100 hover:border-gray-300'
      }`}
    >
      {/* 1. РУЧКА ДЛЯ ПЕРЕТЯГУВАННЯ (Grip Handle) */}
      <div 
        {...attributes} 
        {...listeners} 
        className="mr-3 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-600 p-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
      </div>

      {/* ЛІВА ЧАСТИНА: Іконка + Текст */}
      <div className="flex items-center gap-3 overflow-hidden flex-1 select-none"> {/* select-none щоб текст не виділявся при перетягуванні */}
        
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-lg ${
          link.type === 'header' ? 'bg-transparent text-gray-400 font-bold' : 'bg-gray-100'
        }`}>
            {link.type === 'header' ? 'Tt' : 
            link.type === 'monobank' ? '🐈' : 
            link.type === 'bmc' ? '☕' : 
            link.type === 'kofi' ? '☕' : 
            link.type === 'paypal' ? 'P' :
            link.type === 'pricing' ? '💰' : 
            '🔗'}
        </div>

        <div className="min-w-0 flex-1">
          <div className={`truncate pr-2 ${
            link.type === 'header' 
              ? 'font-bold text-gray-900 uppercase tracking-wider text-sm' 
              : 'font-bold text-gray-800'
          }`}>
              {link.title}
          </div>
          
          {link.type !== 'header' && (
              <div className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                  <span className="truncate max-w-[150px] sm:max-w-[200px]">
                    {link.url || t('priceTitle')}
                  </span>
                  <span className="text-gray-300 shrink-0">•</span>
                  {isPremium ? (
                    <span className="flex items-center gap-1 text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded shrink-0">
                        {link.clicks || 0} {t('clicksLabel')}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded cursor-help shrink-0" title={t('proLockDesc')}>
                        🔒 PRO
                    </span>
                  )}
              </div>
          )}
        </div>
      </div>
      
      {/* ПРАВА ЧАСТИНА: Видалення */}
      {/* Важливо: onPointerDown stopPropagation, щоб клік по кнопці не починав перетягування */}
      <form action={deleteLink} className="shrink-0 ml-2" onPointerDown={(e) => e.stopPropagation()}>
        <input type="hidden" name="linkId" value={link.id} />
        <button className="text-gray-300 hover:text-red-500 transition p-2 hover:bg-red-50 rounded-lg" title={t('delete')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </button>
      </form>
    </div>
  );
}