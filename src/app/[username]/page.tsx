import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import ProfilePageContent from "@/components/ProfilePageContent"; // Імпортуємо новий компонент

export default async function UserProfile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*, links(*)") 
    .eq("username", username)
    .single();

  if (error || !profile) {
    return notFound();
  }

  // Просто передаємо дані у клієнтський компонент
  return <ProfilePageContent user={profile as any} />;
}