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
  const bio = formData.get('bio') as string
  
  // 1. САНІТИЗАЦІЯ НІКНЕЙМУ
  username = username
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-._]/g, '') // Дозволяємо букви, цифри, дефіс, крапку, підкреслення
    .replace(/\.+/g, '.') 
    .replace(/-+/g, '-')
    .replace(/^[\-.]+|[\-.]+$/g, '');

  if (username.length < 3) {
      console.error("Username too short");
      return; 
  }

  // 2. ПЕРЕВІРКА НА УНІКАЛЬНІСТЬ
  const { data: existingUser } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .neq('id', user.id)
    .single();

  if (existingUser) {
    console.error("Username is taken!");
    return; 
  }

  // 3. ЗАВАНТАЖЕННЯ АВАТАРКИ (ВИПРАВЛЕНО)
  const file = formData.get('avatar') as File
  let newAvatarUrl = null; // Тимчасова змінна для посилання

  if (file && file.size > 0) {
    const fileExt = file.name.split('.').pop();
    // Генеруємо унікальне ім'я з часом (Date.now())
    const fileName = `avatar-${user.id}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error('Upload error:', uploadError);
    } else {
      // Отримуємо посилання
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
      
      // ✅ Зберігаємо в змінну newAvatarUrl, а не в updateData (якої ще немає)
      newAvatarUrl = publicUrl;
    }
  }

  // 4. ПІДГОТОВКА ДАНИХ ДЛЯ ОНОВЛЕННЯ
  const updateData: any = {
    full_name: fullName,
    username: username,
    bg_color: bgColor,
    theme: theme,
    bio: bio,
    updated_at: new Date().toISOString(),
  }

  // Якщо ми завантажили нову фотку - додаємо її до оновлення
  if (newAvatarUrl) {
    updateData.avatar_url = newAvatarUrl;
  }

  // 5. ЗАПИС В БАЗУ
  const { error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', user.id)

  if (error) {
      console.error("Update error:", error);
  } else {
      revalidatePath('/admin')
      // Оновлюємо кеш профілю, щоб всі бачили нову фотку
      revalidatePath(`/${username}`) 
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

// ... (ваші попередні імпорти)

export async function updateLink(linkId: string, title: string, url: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  // Оновлюємо посилання
  const { error } = await supabase
    .from('links')
    .update({ 
      title: title,
      url: url,
      // updated_at: new Date().toISOString() // Можна оновити дату, якщо треба
    })
    .eq('id', linkId)
    .eq('user_id', user.id) // Важливо: перевіряємо, що це лінк саме цього юзера

  if (error) {
    console.error("Error updating link:", error)
    return { error: "Не вдалося оновити посилання" }
  }

  revalidatePath('/admin')
  revalidatePath('/[username]') // Оновлюємо кеш профілю
  return { success: true }
}

