// src/app/api/[...path]/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function GET(
  request: Request,
  ctx: { params: Promise<{ path: string[] }> } // <- params must be a Promise
): Promise<Response> {
  const { CF_ACCESS_CLIENT_ID, CF_ACCESS_CLIENT_SECRET } = process.env;
  if (!CF_ACCESS_CLIENT_ID || !CF_ACCESS_CLIENT_SECRET) {
    console.error("Missing CF Access env vars at runtime");
    return new Response("Server Misconfigured: CF Access env missing", { status: 500 });
  }
  if (!API_BASE) {
    return new Response("Server Misconfigured: API base missing", { status: 500 });
  }

  const { path } = await ctx.params; // <- await params in Next 15

  const headers = new Headers({
    "CF-Access-Client-Id": CF_ACCESS_CLIENT_ID,
    "CF-Access-Client-Secret": CF_ACCESS_CLIENT_SECRET,
  });

  const accept = request.headers.get("accept");
  if (accept) headers.set("Accept", accept);

  const url = new URL(request.url);
  const upstreamUrl = `${API_BASE}/${path.join("/")}${url.search}`;

  const upstream = await fetch(upstreamUrl, { headers, cache: "no-store" });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: upstream.headers,
  });
}
