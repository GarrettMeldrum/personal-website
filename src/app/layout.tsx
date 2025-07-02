import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
        <header className="py-4 px-6 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold">Garrett Meldrum</h1>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="py-4 text-center text-sm text-gray-500">
          © 2025 Garrett Meldrum
        </footer>
      </body>
    </html>
  )
}

