import React, { type ReactNode } from "react";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="blog-layout max-w-4xl mx-auto px-4 py-8">{
      children}
    </main>
  )
}

