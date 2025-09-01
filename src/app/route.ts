import { NextResponse } from "next/server";


export async function GET(request: Request) {
	try {
		const res = await fetch('$process.env.API_BASE}/recent?limit=5', {
			headers: {
					Authorization: basicAuthHeader(
						process.env.CLIENT_ID!,
						process.env.CLIENT_SECRET!
					),
				},
				cache: 'no-store',
		});
	if (!res.ok) {
		return NextResponse.json({ error: 'Upstream failed' }, { status: res.status });
	}
	const data = await res.json();
	
	return NextResponse.json(data, {
		headers: { 'cache-control': 'private, no-store' },
	});
	} catch (err) {
		return NextResponse.json({ error: 'Server error' }, { status: 500 });
	}
}
