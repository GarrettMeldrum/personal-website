// app/api/spotify-analytics/route.ts
import Database from "better-sqlite3";
import path from "path";

export const dynamic = "force-dynamic";

const dbPath = path.join(process.cwd(), "data", "listens.db");

export async function GET() {
  try {
    const db = new Database(dbPath, { readonly: true });

    const totalPlays = db
      .prepare("SELECT COUNT(*) as count FROM tracks")
      .get() as any;

    const uniqueTracks = db
      .prepare("SELECT COUNT(DISTINCT track_id) as count FROM tracks")
      .get() as any;

    const uniqueArtists = db
      .prepare(
        `SELECT COUNT(DISTINCT artist_id) as count 
       FROM track_artists 
       WHERE artist_position = 0`,
      )
      .get() as any;

    const topTracks = db
      .prepare(
        `
      SELECT 
        t.track_id,
        t.track_name,
        a.album_name,
        a.album_image_url,
        COUNT(*) as play_count,
        MAX(t.played_at) as last_played
      FROM tracks t
      JOIN albums a ON t.album_id = a.album_id
      GROUP BY t.track_id
      ORDER BY play_count DESC
      LIMIT 5
    `,
      )
      .all() as any[];

    const getArtist = db.prepare(`
      SELECT a.artist_name
      FROM track_artists ta
      JOIN artists a ON ta.artist_id = a.artist_id
      JOIN tracks t ON ta.played_at = t.played_at
      WHERE t.track_id = ? AND ta.artist_position = 0
      LIMIT 1
    `);

    const topTracksWithArtists = topTracks.map((track) => ({
      ...track,
      artist_name:
        (getArtist.get(track.track_id) as any)?.artist_name ?? "Unknown",
    }));

    const topArtists = db
      .prepare(
        `
      SELECT
        ar.artist_id,
        ar.artist_name,
        COUNT(*) as play_count
      FROM track_artists ta
      JOIN artists ar ON ta.artist_id = ar.artist_id
      WHERE ta.artist_position = 0
      GROUP BY ar.artist_id
      ORDER BY play_count DESC
      LIMIT 8
    `,
      )
      .all();

    const recentPlays = db
      .prepare(
        `
      SELECT 
        t.played_at,
        t.track_id,
        t.track_name,
        t.track_duration_ms,
        a.album_name,
        a.album_image_url,
        ar.artist_name
      FROM tracks t
      JOIN albums a ON t.album_id = a.album_id
      JOIN track_artists ta ON t.played_at = ta.played_at
      JOIN artists ar ON ta.artist_id = ar.artist_id
      WHERE ta.artist_position = 0
      ORDER BY t.played_at DESC
      LIMIT 10
    `,
      )
      .all();

    db.close();

    return Response.json({
      stats: {
        total_plays: totalPlays.count,
        unique_tracks: uniqueTracks.count,
        unique_artists: uniqueArtists.count,
      },
      top_tracks: topTracksWithArtists,
      top_artists: topArtists,
      recent_plays: recentPlays,
    });
  } catch {
    console.error("Error fetching analytics:");
    return Response.json(
      { error: "Failed to fetch analytics" },
      { status: 500 },
    );
  }
}
