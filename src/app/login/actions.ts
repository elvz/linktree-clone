'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // Отримуємо дані з форми
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error(error)
    redirect('/error') // Можна зробити сторінку помилки
  }

  revalidatePath('/', 'layout')
  redirect('/admin') // Після успіху йдемо в адмінку
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Реєструємо користувача
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
        // Важливо: це відключить підтвердження пошти для тестів,
        // але треба налаштувати це і в Supabase (див. нижче)
    }
  })

  if (error) {
    console.error(error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/admin')
}