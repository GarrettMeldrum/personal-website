import { NextResponse } from "next/server";

const api_base = process.env.API_BASE;
const built_url = `${api_base}/recent?limit=5`
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

export const dynamic = "force-dynamic";

export async function GET() {
	
	if (!client_id || !client_secret) {
		return NextReponse.json(
			{ error: "Missing client_id/secret from env" },
			{ status: 500 }
		);
	}

	const upstream = await fetch(built_url, {
		headers: {
			"CF-Access-Client-Id": client_id,
			"CF-Access-Client-Secret": client_secret,
			Accept: "application/json",
		},
		cache: "no-store",
	});
	
	if (!upstream.ok || !upstream.body) {
		const text = await upstream.text().catach(() => "");
		return NextResponse.json(
			{ error: "Upstream request failed",
				status: upstream.status,
				body: text
			},
			{ status: 502 }
		);
	}
	
	const contentType = upstream.headers.get("content-type") ?? "application/json; charset=utf-8";
	
	return new NextResponse(upstream.body, {
		status: upstream.status,
		headers: {
			"content-type": contentType,
			"transfer-encoding": "chunked",
		},
	});
}
