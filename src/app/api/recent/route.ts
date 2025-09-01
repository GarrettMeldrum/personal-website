import { NextResponse } from "next/server";
import { getBasicAuthHeader } from "@/utils/auth";

export async function GET() {
	try {
		const response = await fetch(`${process.env.API_BASE}/recent?limit=5`, {
			headers: {
					Authorization: getBasicAuthHeader(),
				},
				cache: 'no-store',
		});
	
		if (!response.ok) {
			return NextResponse.json({ error: 'Upstream failed' }, { status: response.status });
		}
		
		
		const data = await response.json();
		
		return NextResponse.json(data, {
			headers: { "Content-Type": "application/json" },
		});
	} catch{
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
