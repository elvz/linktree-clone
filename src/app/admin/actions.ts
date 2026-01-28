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

// ... imports

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" };

  const fullName = formData.get('fullName') as string
  let username = formData.get('username') as string
  const bgColor = formData.get('bgColor') as string
  const theme = formData.get('theme') as string
  const bio = formData.get('bio') as string // <--- 1. ДОДАЄМО ЦЕ
  
  // 1. САНІТИЗАЦІЯ НІКНЕЙМУ (Чистка)
  // Перетворюємо на малі літери, прибираємо пробіли, лишаємо тільки букви, цифри, дефіс і підкреслення.
  // Наприклад: "Vasya Pupkin!" -> "vasya-pupkin"
  username = username
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')          // Пробіли змінюємо на дефіси
    .replace(/[^a-z0-9-._]/g, '')  // <--- ЗМІНА ТУТ: додали крапку (._)
    .replace(/\.+/g, '.')          // Замінюємо повторні крапки (user..name -> user.name)
    .replace(/-+/g, '-')           // Замінюємо повторні дефіси
    .replace(/^[\-.]+|[\-.]+$/g, ''); // Видаляємо крапки та дефіси на початку і в кінці

  if (username.length < 3) {
      // Тут можна повернути помилку, якщо нік надто короткий
      console.error("Username too short");
      return; 
  }

  // 2. ПЕРЕВІРКА НА УНІКАЛЬНІСТЬ
  // Шукаємо, чи є такий нікнейм у КОГОСЬ ІНШОГО (не у мене)
  const { data: existingUser } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .neq('id', user.id) // Виключаємо себе з пошуку
    .single();

  if (existingUser) {
    // Якщо такий юзер вже є — зупиняємось і нічого не зберігаємо!
    console.error("Username is taken!");
    // В ідеалі тут треба повернути помилку на фронтенд (див. далі)
    return; 
  }

  // ... (Ваш код завантаження аватара залишається без змін) ...
  const file = formData.get('avatar') as File
  let avatarUrl = null;
  // ... (код upload) ...

  const updateData: any = {
    full_name: fullName,
    username: username, // Зберігаємо вже "чистий" нікнейм
    bg_color: bgColor,
    theme: theme,
    bio: bio, // <--- 2. ДОДАЄМО В ОБ'ЄКТ ДЛЯ ЗАПИСУ
    updated_at: new Date().toISOString(),
  }

  if (avatarUrl) {
    updateData.avatar_url = avatarUrl
  }

  const { error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', user.id)

  if (error) {
      console.error("Update error:", error);
  } else {
      revalidatePath('/admin')
      revalidatePath(`/${username}`) // Оновлюємо кеш вже нової сторінки
  }
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

