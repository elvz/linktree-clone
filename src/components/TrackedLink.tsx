"use client";

import { trackClick } from "@/app/tracking";

interface TrackedLinkProps {
  id: string;
  url: string;
  children: React.ReactNode;
  className?: string;
}

export default function TrackedLink({ id, url, children, className }: TrackedLinkProps) {
  const handleClick = () => {
    // Відправляємо сигнал на сервер, не чекаючи відповіді
    trackClick(id);
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}