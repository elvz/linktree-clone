'use server'

import { createClient } from '@/utils/supabase/server'

// Збільшуємо перегляди профілю
export async function trackView(profileId: string) {
  const supabase = await createClient()
  await supabase.rpc('increment_views', { p_id: profileId })
}

// Збільшуємо кліки по кнопці
export async function trackClick(linkId: string) {
  const supabase = await createClient()
  await supabase.rpc('increment_clicks', { l_id: linkId })
}