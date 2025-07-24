// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from '@/components/NavBar'
import React, { type ReactNode } from "react";


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <NavBar />
        <main className="max-w-4xl mx-auto px-4 py-8">{
          children}
        </main>
      </body>
    </html>
  )
}

