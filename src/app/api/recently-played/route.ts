// app/api/recently-played/route.ts
import Database from "better-sqlite3";
import path from "path";

export const dynamic = "force-dynamic";

const dbPath = path.join(process.cwd(), "data", "spotify-listens");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(Number(searchParams.get("limit")) || 10, 50);

  try {
    const db = new Database(dbPath, { readonly: true });

    const tracks = db
      .prepare(
        `
      SELECT 
        t.played_at,
        t.track_name,
        t.track_duration_ms,
        t.track_spotify_url,
        ar.artist_name,
        a.album_name,
        a.album_image_url
      FROM tracks t
      JOIN albums a ON t.album_id = a.album_id
      JOIN track_artists ta ON t.played_at = ta.played_at
      JOIN artists ar ON ta.artist_id = ar.artist_id
      WHERE ta.artist_position = 0
      ORDER BY t.played_at DESC
      LIMIT ?
    `,
      )
      .all(limit);

    db.close();

    return Response.json(tracks);
  } catch {
    console.error("Error fetching recently played:");
    return Response.json(
      { error: "Failed to fetch recently played" },
      { status: 500 },
    );
  }
}
