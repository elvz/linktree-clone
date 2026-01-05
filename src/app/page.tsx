import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      
      {/* Логотип / Назва */}
      <div className="mb-8 font-bold text-xl flex items-center gap-2">
        <div className="w-8 h-8 bg-black rounded-lg"></div>
        <span>Linktree Clone</span>
      </div>

      {/* Заголовки */}
      <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
        Усе, що ти є. <br />
        <span className="text-gray-400">В одному посиланні.</span>
      </h1>
      
      <p className="text-lg text-gray-500 max-w-xl mb-10">
        Створи красиву сторінку для свого Instagram, TikTok та інших соцмереж. 
        Безкоштовно. Швидко. Українською.
      </p>

      {/* Кнопки */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Link 
          href="/login"
          className="bg-black text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition active:scale-95"
        >
          Створити свій Linktree
        </Link>
        
        {/* Приклад (можете вставити сюди свій нікнейм, коли створите) */}
        <Link 
          href="/demo" 
          className="bg-gray-100 text-gray-900 px-8 py-4 rounded-xl font-medium hover:bg-gray-200 transition active:scale-95"
        >
          Подивитись демо
        </Link>
      </div>

      {/* Футер */}
      <footer className="absolute bottom-8 text-sm text-gray-400">
        © 2025 Linktree Clone. Built with Next.js & Supabase.
      </footer>
    </main>
  );
}
