import { NextResponse } from "next/server";
import { getBasicAuthHeader } from "@/utils/auth";

export async function GET() {
	try {
		const responseUrl = process.env.API_BASE
		const response = await fetch(`${responseUrl}/recent?limit=5`, {
			headers: {
					Authorization: getBasicAuthHeader(),
					Accept: "application/json",
				},
				cache: 'no-store',
		});
	
		if (!response.ok) {
			return NextResponse.json({ error: 'Upstream failed' }, { status: response.status });
		}
		
		
		const data = await response.json();
		console.log(data);
		return NextResponse.json(data, {
			headers: { "Content-Type": "application/json" },
		});
	} catch{
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
