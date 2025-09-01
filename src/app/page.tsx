"use client";

import { useEffect, useState } from "react";

type Track = { 
  id: string | number;
  played_at: string | number;
  track_id: string | number; 
  track_name: string; 
  artist_name_01: string;
  album_name: string;
  duration_ms: string | number
};

export default function Page() {
  const [data, setData] = useState<Track[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/recent", { cache: "no-store" });
        const ct = res.headers.get("content-type") || "";
        const body = await res.text();

        if (!res.ok) {
          console.error("API failed:", res.status, body.slice(0, 300));
          throw new Error(`API failed: ${res.status}`);
        }
        if (!ct.includes("application/json")) {
          console.error("Not JSON:", ct, body.slice(0, 300));
          throw new Error(`Expected JSON, got ${ct}`);
        }

        setData(JSON.parse(body) as Track[]);
      } catch (e) {
        setError((e as Error).message);
      }
    })();
  }, []);

  if (error) {
    return <main><h1>Error</h1><p>{error}</p></main>;
  }

  return (
    <main>
      <h1>Spotify Recent Listens</h1>
      {data ? (
        <ul>{data.map(t => <li key={String(t.track_id)}>{t.track_name}</li>)}</ul>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
