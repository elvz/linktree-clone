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

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const fullName = formData.get('fullName') as string
  const username = formData.get('username') as string
  const bgColor = formData.get('bgColor') as string
  const file = formData.get('avatar') as File // Отримуємо файл

  let avatarUrl = null;

  // 1. Якщо користувач обрав файл — завантажуємо його
  if (file && file.size > 0) {
    // Генеруємо унікальне ім'я (щоб обійти кеш браузера)
    const fileName = `${user.id}-${Date.now()}`
    
    const { data, error } = await supabase
      .storage
      .from('avatars') // Назва нашого відра
      .upload(fileName, file, {
        upsert: true // Перезаписати, якщо існує
      })

    if (error) {
      console.error('Upload error:', error)
      // Можна повернути помилку, але поки пропустимо
    } else {
      // Отримуємо публічне посилання на файл
      const { data: publicUrlData } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(fileName)
      
      avatarUrl = publicUrlData.publicUrl
    }
  }

  // 2. Готуємо дані для оновлення
  const updateData: any = {
    full_name: fullName,
    username: username,
    bg_color: bgColor,
    updated_at: new Date().toISOString(),
  }

  // Оновлюємо аватарку ТІЛЬКИ якщо вона була завантажена
  if (avatarUrl) {
    updateData.avatar_url = avatarUrl
  }

  // 3. Оновлюємо базу даних
  const { error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', user.id)

  if (error) {
    console.error('Database error:', error)
    return 
  }

  revalidatePath('/admin')
  revalidatePath(`/${username}`)
}

export async function addMonobankLink(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

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