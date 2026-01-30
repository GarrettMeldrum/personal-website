// app/api/currently-playing/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const API_BASE = process.env.API_BASE;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export async function GET() {
  try {
    const response = await fetch(`${API_BASE}/currently-playing`, {
      headers: {
        "CF-Access-Client-Id": CLIENT_ID!,
        "CF-Access-Client-Secret": CLIENT_SECRET!,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      return NextResponse.json(
        { error: "Failed to fetch currently playing" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("Error fetching currently playing:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
