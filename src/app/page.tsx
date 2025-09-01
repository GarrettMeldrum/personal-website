"use client";

import { useEffect, useRef } from "react";

export default function Page() {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const run = async () => {
      const res = await fetch("/api/recent", { cache: "no-cache" });
      if (!res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        preRef.current!.textContent += decoder.decode(value, { stream: true });
      }
    };
    run();
  }, []);

  return (
    <main>
      <h1>Recent (streamed)</h1>
      <pre ref={preRef}></pre>
    </main>
  );
}
