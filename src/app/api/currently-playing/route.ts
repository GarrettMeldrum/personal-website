// app/api/currently-playing/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const API_BASE = process.env.API_BASE;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export async function GET() {
  try {
    const response = await fetch(`${API_BASE}/currently-playing`, {
      headers: {
        "CF-Access-Client-Id": CLIENT_ID!,
        "CF-Access-Client-Secret": CLIENT_SECRET!,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("Currently playing API error:", error);
    return NextResponse.json(
      { is_playing: false, tracks: [] },
      { status: 503 }
    );
  }
}