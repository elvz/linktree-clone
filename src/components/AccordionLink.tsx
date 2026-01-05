"use client";

import { useState } from "react";

// Описуємо структуру даних прайсу
interface PricingItem {
  label: string;
  price: string;
}

interface AccordionProps {
  title: string;
  data: { items: PricingItem[] }; // JSON, який ми зберегли в meta_data
}

export default function AccordionLink({ title, data }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const items = data?.items || [];

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4 transition-all duration-300">
      {/* Шапка (Кнопка) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-bold text-gray-800">{title}</span>
        
        {/* Стрілочка, що крутиться */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      {/* Список, що виїжджає */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 pt-0 border-t border-gray-100 bg-gray-50/50">
          <ul className="space-y-3 mt-3">
            {items.map((item, idx) => (
              <li key={idx} className="flex justify-between items-center text-sm border-b border-gray-200/50 last:border-0 pb-2 last:pb-0">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-semibold text-gray-900 bg-white px-2 py-1 rounded shadow-sm border border-gray-100">
                  {item.price}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}