import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Вхід в Linktree Clone</h1>
        
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