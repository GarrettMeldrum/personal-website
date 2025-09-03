// app/page.tsx
'use client'; // Mark as a Client Component

import { useState, useEffect } from 'react';



export default function YourPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/recent', { cache: "no-store" }); // Relative path to your route.ts
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Initial fetch
    fetchData();

    // Set up polling interval (e.g., every 5 seconds)
    const intervalId = setInterval(fetchData, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      <h1>Spotify Listens</h1>
      {!data ? (<p>Loading data...</p>) :
        ( 
        <> 
        {data[0] && (<p><strong>{data[0].track_name}</strong> — {data[0].artist_name}</p>)}
        {data[1] && (<p><strong>{data[1].track_name}</strong> — {data[1].artist_name}</p>)}
        {data[2] && (<p><strong>{data[2].track_name}</strong> — {data[2].artist_name}</p>)}
        {data[3] && (<p><strong>{data[3].track_name}</strong> — {data[3].artist_name}</p>)}
        {data[4] && (<p><strong>{data[4].track_name}</strong> — {data[4].artist_name}</p>)}
        </>
        )}
    </div>
  );
}
