type track = { 
  track_id: string | number; 
  track_name: string; 
  artist_name: string
};

export default async function Page() {
  const res = await fetch('${process.env.API_BASE}/api/recent', {
    cache: 'no-store',
  });
  
  if (!res.ok) throw new Error('Failed to load tracks');
  const data = (await res.json()) as tracks[];
  
  return (
    <main>
      <h1><Spotify Recent Listens/h1>
      <ul>
        {data.map((u) => <li key={String(t.track_id)}>{t.track_name}</li>)}
      </ul>
    </main>
  )
}
