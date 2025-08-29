"use client";

import { useEffect } from "react";

export default function LiveUpdates({
  onUpdate,
}: {
  onUpdate: (data: unknown) => void;
}) {
  useEffect(() => {
    const es = new EventSource("/api/stream");

    const handler = (ev: MessageEvent) => {
      try {
        onUpdate(JSON.parse(ev.data));
      } catch {
        // swallow JSON parse errors
      }
    };

    es.addEventListener("update", handler);

    return () => {
      es.removeEventListener("update", handler);
      es.close();
    };
  }, [onUpdate]);

  return null;
}
