// app/api/recent/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const API_BASE = process.env.API_BASE;      
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export async function GET() {
	if (!API_BASE || !CLIENT_ID || !CLIENT_SECRET) {
	return NextResponse.json(
		{ error: "Missing API_BASE, CLIENT_ID, or CLIENT_SECRET" },
		{ status: 500 }
		);
	}
	
	const data = await fetch(`${API_BASE}/recent?limit=5`, {
		headers: {
        "CF-Access-Client-Id": CLIENT_ID,
        "CF-Access-Client-Secret": CLIENT_SECRET,
        Accept: "application/json",
      },
      cache: "no-store",
    });
	const json = await data.json();
    return NextResponse.json(json);
}
