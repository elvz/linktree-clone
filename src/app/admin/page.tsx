import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import AdminPageContent from '@/components/AdminPageContent' // Імпортуємо наш новий компонент

export default async function AdminPage() {
  const supabase = await createClient()

  // 1. Перевірка авторизації
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return redirect('/login')
  }

  // 2. Отримуємо профіль (+ перегляди)
  const { data: profile } = await supabase
    .from('profiles')
    .select('*, views')
    .eq('id', user.id)
    .single()

  // 3. Отримуємо лінки (+ кліки)
  const { data: links } = await supabase
    .from('links')
    .select('*, clicks')
    .eq('user_id', user.id)
    .order('display_order', { ascending: true }) // Або created_at

  // 4. Віддаємо все у Клієнтський Компонент
  return <AdminPageContent user={user} profile={profile} links={links || []} />
}