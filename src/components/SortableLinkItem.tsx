"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useLanguage } from "@/context/LanguageContext";
import { deleteLink, updateLink } from "@/app/admin/actions"; // 👈 Додав імпорт updateLink
import { useState } from "react";

interface LinkItemProps {
  link: any;
  isPremium: boolean;
}

export function SortableLinkItem({ link, isPremium }: LinkItemProps) {
  const { t } = useLanguage();

  // --- СТАН РЕДАГУВАННЯ ---
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ title: link.title, url: link.url || "" });
  const [isSaving, setIsSaving] = useState(false);

  // Хук для перетягування
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id, disabled: isEditing }); // 👈 Вимикаємо драг, коли редагуємо

  // Стилі для плавного руху
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
    position: "relative" as "relative",
  };

  // 👇 ФУНКЦІЯ ЗБЕРЕЖЕННЯ
  const handleSave = async () => {
    setIsSaving(true);
    // Викликаємо серверну дію (яку ми створили в попередньому кроці)
    await updateLink(link.id, editForm.title, editForm.url);
    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 rounded-xl shadow-sm border flex items-center justify-between group bg-white transition-all ${
        link.type === 'header' 
          ? 'bg-gray-50 border-dashed border-gray-300 mt-4 mb-2' 
          : 'bg-white border-gray-100 hover:border-gray-300'
      } ${isEditing ? 'ring-2 ring-black border-transparent' : ''}`}
    >
      
      {/* 1. РУЧКА ДЛЯ ПЕРЕТЯГУВАННЯ (Ховаємо при редагуванні) */}
      {!isEditing && (
        <div 
            {...attributes} 
            {...listeners} 
            className="mr-3 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-600 p-1"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
        </div>
      )}

      {/* ЛІВА ЧАСТИНА: Іконка + Контент */}
      <div className="flex items-center gap-3 overflow-hidden flex-1 select-none">
        
        {/* Іконка типу лінка */}
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
            {/* 🔄 УМОВА: РЕДАГУЄМО ЧИ НІ? */}
            {isEditing ? (
                // --- РЕЖИМ РЕДАГУВАННЯ ---
                <div className="flex flex-col gap-2 w-full pr-2">
                    {/* Інпут Назви */}
                    <input 
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="border border-gray-300 p-1.5 rounded text-sm w-full outline-none focus:border-black transition"
                        placeholder="Назва"
                        autoFocus
                    />
                    
                    {/* Інпут URL (Ховаємо для заголовків) */}
                    {link.type !== 'header' && link.type !== 'pricing' && (
                        <input 
                            value={editForm.url}
                            onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                            className="border border-gray-200 bg-gray-50 p-1.5 rounded text-xs w-full text-gray-600 outline-none focus:border-black transition"
                            placeholder="https://..."
                        />
                    )}

                    {/* Кнопки Зберегти / Скасувати */}
                    <div className="flex gap-2 mt-1">
                        <button 
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-black text-white px-3 py-1 rounded text-xs font-bold hover:bg-gray-800 transition"
                        >
                            {isSaving ? "..." : "OK"}
                        </button>
                        <button 
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                // --- РЕЖИМ ПЕРЕГЛЯДУ (ЯК БУЛО) ---
                <>
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
                </>
            )}
        </div>
      </div>
      
      {/* ПРАВА ЧАСТИНА: Кнопки дій */}
      {!isEditing && (
        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity ml-2">
            
            {/* 👇 КНОПКА РЕДАГУВАТИ */}
            <button 
                onClick={() => setIsEditing(true)}
                className="text-gray-300 hover:text-blue-500 transition p-2 hover:bg-blue-50 rounded-lg"
                title="Edit"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
            </button>

            {/* КНОПКА ВИДАЛИТИ */}
            <form action={deleteLink} onPointerDown={(e) => e.stopPropagation()}>
                <input type="hidden" name="linkId" value={link.id} />
                <button className="text-gray-300 hover:text-red-500 transition p-2 hover:bg-red-50 rounded-lg" title={t('delete')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
            </form>
        </div>
      )}
    </div>
  );
}