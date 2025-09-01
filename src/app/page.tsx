type Track = { 
  id: string | number;
  played_at: string | number;
  track_id: string | number; 
  track_name: string; 
  artist_name_01: string;
  album_name: string;
  duration_ms: string | number
};

export default async function Page() {
  const response = await fetch(`{process.env.API_BASE}/api/recent`, {
    cache: "no-store",
  });
  
  if (!response.ok) throw new Error('Failed to load tracks');
  const data = (await response.json()) as Track[];
  
  return (
    <main>
      <h1>Spotify Recent Listens</h1>
      <ul>{data.map((t) => (<li key={String(t.track_id)}>{t.track_name}</li>))}</ul>
    </main>
  );
}
