import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const API_BASE = process.env.API_BASE;      
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export async function GET() {
  if (!API_BASE || !CLIENT_ID || !CLIENT_SECRET) {
    console.error("Missing required env variables");
    return NextResponse.json(
      { error: "Missing API_BASE, CLIENT_ID, or CLIENT_SECRET" },
      { status: 500 }
    );
  }
  
  try {
    const response = await fetch(`${API_BASE}/analytics`, {
      headers: {
        "CF-Access-Client-Id": CLIENT_ID,
        "CF-Access-Client-Secret": CLIENT_SECRET,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Python API error: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: "Failed to fetch from Python API" },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error("Error fetching Spotify analytics", error);

    return NextResponse.json({
      stats: { total_plays: 0, unique_tracks: 0, unique_artists: 0 },
      top_tracks: [],
      top_artists: [],
      recent_plays: []
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  }
}
