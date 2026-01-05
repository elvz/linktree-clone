"use client";

import { useState } from "react";

export default function CopyLink({ username }: { username: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Беремо поточне посилання з адресного рядка
    const url = window.location.href;
    
    // Копіюємо в буфер обміну
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      // Ховаємо повідомлення через 2 секунди
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative flex flex-col items-center z-20">
      <button
        onClick={handleCopy}
        className="text-gray-500 text-sm mb-8 cursor-pointer hover:text-black hover:scale-105 transition-all flex items-center gap-1.5 active:scale-95"
        title="Натисніть, щоб скопіювати посилання"
      >
        <span>@{username}</span>
        {/* Маленька іконка копіювання */}
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
           <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
      </button>

      {/* Спливаюче повідомлення (Toast notification) */}
      <div
        className={`absolute top-full mt-[-25px] bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full shadow-lg transition-all duration-300 pointer-events-none whitespace-nowrap ${
          copied 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 -translate-y-2"
        }`}
      >
        Посилання скопійовано! ✅
      </div>
    </div>
  );
}