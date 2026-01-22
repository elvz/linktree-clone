'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addLink(formData: FormData) {
  const supabase = await createClient()
  
  // 1. Отримуємо дані про юзера
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // 2. Отримуємо дані з форми
  const title = formData.get('title') as string
  const url = formData.get('url') as string

  if (!title || !url) return

  // 3. Додаємо в базу
  await supabase.from('links').insert({
    title,
    url,
    user_id: user.id, // прив'язка до юзера
  })

  // 4. Оновлюємо сторінку адмінки (щоб лінк з'явився миттєво)
  revalidatePath('/admin')
}

export async function deleteLink(formData: FormData) {
  const supabase = await createClient()
  const linkId = formData.get('linkId') as string

  await supabase.from('links').delete().eq('id', linkId)
  
  revalidatePath('/admin')
}

// ... imports

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return;

  const fullName = formData.get('fullName') as string
  const username = formData.get('username') as string
  const bgColor = formData.get('bgColor') as string
  // 👇 Отримуємо тему
  const theme = formData.get('theme') as string 
  
  const file = formData.get('avatar') as File

  let avatarUrl = null;
  // ... (ваш код завантаження аватара без змін) ...

  const updateData: any = {
    full_name: fullName,
    username: username,
    bg_color: bgColor,
    theme: theme, // 👈 Додаємо тему в об'єкт
    updated_at: new Date().toISOString(),
  }

  if (avatarUrl) {
    updateData.avatar_url = avatarUrl
  }

  await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', user.id)

  revalidatePath('/admin')
  revalidatePath(`/${username}`)
}

export async function addMonobankLink(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // 1. ПЕРЕВІРКА НА ПРЕМІУМ
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_premium')
    .eq('id', user.id)
    .single()

  if (!profile?.is_premium) {
    // Якщо не преміум — нічого не робимо (або можна повернути помилку)
    // У реальному проєкті тут краще повернути { error: "Buy Premium" }
    return 
  }

  const url = formData.get('url') as string
  // ТЕПЕР ЧИТАЄМО НАЗВУ З ФОРМИ
  // Якщо користувач нічого не ввів, тоді вже ставимо дефолтну
  const title = (formData.get('title') as string) || "Моя Банка"

  if (!url.includes('send.monobank.ua')) {
    return 
  }

  await supabase.from('links').insert({
    title, // Зберігаємо те, що ввів юзер
    url,
    type: 'monobank',
    user_id: user.id,
    icon: 'monobank'
  })

  revalidatePath('/admin')
}

// ... внизу файлу actions.ts

// ... imports

export async function addBmcLink(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const title = formData.get('title') as string
  const url = formData.get('url') as string

  // Валідація: якщо ввели просто нікнейм
  let finalUrl = url
  if (!url.startsWith('http')) {
     finalUrl = `https://buymeacoffee.com/${url.replace('@', '')}`
  }

  await supabase.from('links').insert({
    title: title || 'Buy Me a Coffee',
    url: finalUrl,
    type: 'bmc', // <--- ТИП: BMC
    user_id: user.id,
    display_order: 0, 
  })

  revalidatePath('/admin')
  revalidatePath(`/${user.user_metadata.username}`)
}

export async function addHeaderLink(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const title = formData.get('title') as string

  await supabase.from('links').insert({
    title: title || 'Section',
    url: '', // URL пустий, бо це просто текст
    type: 'header', // <--- НОВИЙ ТИП
    user_id: user.id,
    display_order: 0, // Нові елементи падають вниз
  })

  revalidatePath('/admin')
  revalidatePath(`/${user.user_metadata.username}`)
}

export async function updateLinksOrder(items: { id: string; display_order: number }[]) {
  const supabase = await createClient();
  
  // Варіант "в лоб": оновлюємо кожен запис окремо.
  // Це найнадійніший спосіб, щоб не конфліктувати з RLS (політиками доступу).
  const updates = items.map((item) => 
    supabase
      .from('links')
      .update({ display_order: item.display_order })
      .eq('id', item.id)
  );

  await Promise.all(updates);

  // Примусово оновлюємо кеш адмінки
  revalidatePath('/admin');
}
// ... інші імпорти ...

