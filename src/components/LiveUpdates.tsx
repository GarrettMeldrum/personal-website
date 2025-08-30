"use client";

import { useEffect } from "react";

export default function LiveUpdates({
  onUpdate,
}: {
  onUpdate: () => void | Promise<void>;
}) {
  useEffect(() => {
    const es = new EventSource("/api/stream");

    const handler = () => {
		void onUpdate();
    };

    es.addEventListener("message", handler);

    return () => {
      es.removeEventListener("message", handler);
      es.close();
    };
  }, [onUpdate]);

  return null;
}
