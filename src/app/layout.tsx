import { Lora } from 'next/font/google';
import "./globals.css";
import React, { type ReactNode } from "react";
import type { Metadata } from 'next';

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: {
    default: "Garrett Meldrum",
    template: '%s | Garrett Meldrum',
  },
  description: "Personal website to show off programming projects, mountaineering/climbing journeys, and achievements in my career",
  keywords: ['Garrett Meldrum', 'software developer', 'web developer', 'React', 'Next.js', 'Mountaineering',
              'Colorado', 'Denver', 'Portfolio', '14ers', 'Mountains', 'Personal Website', 'Portfolio Website'],
  authors: [{ name: 'Garrett Meldrum'}],
  creator: 'Garrett Meldrum',
  
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={lora.variable}>
      <body className="min-h-screen animate-gradient">
        <main>{children}</main>
      </body>
    </html>
  );
}
