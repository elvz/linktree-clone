import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Імпорт провайдера
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linktree Clone",
  description: "Your links in one place",
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