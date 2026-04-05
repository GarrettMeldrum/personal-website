// app/api/currently-playing/route.ts
import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "spotify-listens.db");

async function getAccessToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
    }),
  });

  const data = await res.json();
  return data.access_token;
}

export async function GET() {
  try {
    const token = await getAccessToken();

    const res = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (res.status === 204 || !res.ok) {
      const db = new Database(dbPath, { readonly: true });

      const track = db
        .prepare(
          `
        SELECT 
          t.track_name, t.track_spotify_url, t.track_duration_ms,
          t.track_id,
          ar.artist_name, a.album_name, a.album_image_url, t.played_at,
          (SELECT COUNT(*) FROM tracks t2 WHERE t2.track_id = t.track_id) as play_count
        FROM tracks t
        JOIN albums a ON t.album_id = a.album_id
        JOIN track_artists ta ON t.played_at = ta.played_at
        JOIN artists ar ON ta.artist_id = ar.artist_id
        WHERE ta.artist_position = 0
        ORDER BY t.played_at DESC
        LIMIT 1
        `,
        )
        .get();
      db.close();

      return Response.json({ is_playing: false, track });
    }

    const data = await res.json();
    const track = data.item;

    const db = new Database(dbPath, { readonly: true });
    const playcount = db
      .prepare("SELECT COUNT(*) as count FROM tracks WHERE track_id = ?")
      .get(track.id) as any;
    db.close();

    return Response.json({
      is_playing: true,
      progress_ms: data.progress_ms,
      track: {
        track_name: track.name,
        artist_name: track.artists.map((a: any) => a.name).join(", "),
        album_name: track.album.name,
        album_image_url: track.album.images[0]?.url,
        track_duration_ms: track.duration_ms,
        track_spotify_url: track.external_urls.spotify,
        play_count: playcount?.count ?? 0,
      },
    });
  } catch (e) {
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
