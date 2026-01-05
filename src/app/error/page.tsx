import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Упс! Помилка</h1>
      <p className="text-gray-600 mb-8">Щось пішло не так під час реєстрації або входу.</p>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-400">Можливі причини:</p>
        <ul className="text-sm text-gray-500 list-disc text-left inline-block mb-6">
            <li>Такий користувач вже існує</li>
            <li>Пароль менше 6 символів</li>
            <li>Проблеми з підключенням до Supabase</li>
        </ul>
      </div>

      <Link 
        href="/login"
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Спробувати ще раз
      </Link>
    </div>
  );
}