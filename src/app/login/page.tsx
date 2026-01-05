import { login, signup } from './actions'
import GoogleButton from './GoogleButton' // Імпорт

export default function LoginPage() {
  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Вхід в Linktree Clone</h1>
        
        {/* Кнопка Гугл */}
        <GoogleButton />

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">або поштою</span></div>
        </div>

    {/* <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Вхід в Linktree Clone</h1> */}
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            />
          </div>

          <div className="flex gap-4 pt-4">
            {/* formaction дозволяє одній формі мати дві кнопки з різною дією */}
            <button 
              formAction={login} 
              className="flex-1 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              Увійти
            </button>
            <button 
              formAction={signup} 
              className="flex-1 bg-white text-black border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition"
            >
              Реєстрація
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}