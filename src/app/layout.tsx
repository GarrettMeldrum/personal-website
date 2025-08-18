import { Lora } from 'next/font/google';
import "./globals.css";
import NavBar from '@/components/NavBar'
import React, { type ReactNode } from "react";

const lora = Lora ({
  subsets: ["latin"],
  variable: "--font-lora",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={lora.variable}>
      <body className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100">
        <NavBar />
        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}

