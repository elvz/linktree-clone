import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Імпорт провайдера
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Owntree | Єдине посилання для всього",
    template: "%s | Owntree" // Це додаватиметься до назв профілів (напр. "Alex | Owntree")
  },
  description: "Створи красиве дерево посилань безкоштовно. Аналог Linktree, але без підписок. Український продукт.",
  keywords: ["linktree", "bio link", "owntree", "посилання в біо", "link in bio", "безкоштовно"],
  openGraph: {
    title: "Owntree - Твоє посилання в біо",
    description: "Створи свій сайт-візитку за 1 хвилину.",
    url: "https://owntree.me",
    siteName: "Owntree",
    locale: "uk_UA",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico", // Переконайтеся, що у вас є іконка в папці public
  },
  verification: {
    google: 'liLwYmwpvniVHZSgkiNkKjT3PitN68kRGJaIRgKN4UM', // Тільки набір букв і цифр, без тегу <meta>
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <LanguageProvider> {/* <--- Обгортка тут */}
          
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}