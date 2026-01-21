"use client";

import { useEffect, useRef } from "react";
import { trackView } from "@/app/tracking";

export default function ViewTracker({ profileId }: { profileId: string }) {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Щоб не рахувало двічі в React Strict Mode
    if (!hasTracked.current) {
      trackView(profileId);
      hasTracked.current = true;
    }
  }, [profileId]);

  return null; // Цей компонент нічого не малює
}