// app/api/recent/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = url.searchParams.get("limit") ?? "50";

  const r = await fetch(`https://api.garrettmeldrum.com/v1/recent?limit=${encodeURIComponent(limit)}`, {
    headers: {
      "CF-Access-Client-Id": process.env.CF_ACCESS_CLIENT_ID!,
      "CF-Access-Client-Secret": process.env.CF_ACCESS_CLIENT_SECRET!,
    },
    cache: "no-store",
  });

  return new Response(r.body, {
    status: r.status,
    headers: { "Content-Type": "application/json" },
  });
}
