'use client';
import { Lora } from 'next/font/google';
import "./globals.css";
import React, { type ReactNode } from "react";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={lora.variable}>
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-gradient">
        <style jsx global>{`
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-gradient {
            background: linear-gradient(-45deg, #0f172a, #581c87, #1e1b4b, #065f46, #7c2d12);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
          }
        `}</style>
        <main>{children}</main>
      </body>
    </html>
  );
}
