// components/LiveUpdates.tsx
"use client";

import { useEffect, useRef } from "react";

type Update = unknown; // change to your data shape

export default function LiveUpdates({
  onUpdate,
  coalesceMs = 100,           // batch updates a bit
  closeWhenHidden = true,      // set false if you want "always live"
}: {
  onUpdate: (data: Update) => void;
  coalesceMs?: number;
  closeWhenHidden?: boolean;
}) {
  const esRef = useRef<EventSource | null>(null);
  const handlerRef = useRef(onUpdate);
  const timerRef = useRef<number | null>(null);
  const queueRef = useRef<Update[]>([]);

  useEffect(() => {
    handlerRef.current = onUpdate;
  }, [onUpdate]);

  function flush() {
    const q = queueRef.current;
    queueRef.current = [];
    if (q.length) {
      // deliver individually (or change to a single batched callback)
      for (const item of q) handlerRef.current(item);
    }
  }

  function scheduleFlush() {
    if (timerRef.current != null) return;
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      flush();
    }, coalesceMs);
  }

  function open() {
    if (esRef.current) return;
    const es = new EventSource("/api/stream"); // same-origin proxy

    es.onopen = () => {
      // connection established
    };

    es.addEventListener("update", (ev) => {
      try {
        const data = JSON.parse((ev as MessageEvent).data);
        queueRef.current.push(data);
        scheduleFlush();
      } catch (e) {
        // swallow bad frames
      }
    });

    es.addEventListener("ping", () => {
      // keepalive from server; nothing to do
    });

    es.onerror = () => {
      // EventSource auto-retries. If it fully closes, clear our ref so we can reopen.
      if (es.readyState === EventSource.CLOSED) {
        esRef.current = null;
        // a tiny backoff to avoid hot-looping if upstream is hard-down
        setTimeout(open, 1000);
      }
    };

    esRef.current = es;
  }

  function close() {
    esRef.current?.close();
    esRef.current = null;
    if (timerRef.current != null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    queueRef.current = [];
  }

  useEffect(() => {
    open();

    const onVis = () => {
      if (!closeWhenHidden) return;
      if (document.visibilityState === "visible") open();
      else close();
    };
    if (closeWhenHidden) {
      document.addEventListener("visibilitychange", onVis);
    }

    const onBeforeUnload = () => close();
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      if (closeWhenHidden) {
        document.removeEventListener("visibilitychange", onVis);
      }
      window.removeEventListener("beforeunload", onBeforeUnload);
      close();
    };
  }, [closeWhenHidden, coalesceMs]);

  return null;
}
