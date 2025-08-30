export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

function headersFrom(req: Request) {
  const headers = new Headers({
    "CF-Access-Client-Id": process.env.CF_ACCESS_CLIENT_ID!,
    "CF-Access-Client-Secret": process.env.CF_ACCESS_CLIENT_SECRET!,
  });
  const accept = req.headers.get("accept");
  if (accept) headers.set("Accept", accept);
  return headers;
}


export async function GET(req: Request, context: unknown) {
  if (!process.env.CF_ACCESS_CLIENT_ID || !process.env.CF_ACCESS_CLIENT_SECRET) {
    console.error("Missing CF Access env vars at runtime");
    return new Response("Server misconfigured: CF Access env missing", { status: 500 });
  }
  
  const url = new URL(req.url);
  const { params } = context as { params: Record<string, string | string[]> };
  const segments = params.path;
  if (!Array.isArray(segments)) {
    return new Response("Not Found", { status: 404 });
  }
  const path = segments.join("/");
  const upstream = await fetch(
    `https://api.garrettmeldrum.com/${path}${url.search}`,
    {
      headers: headersFrom(req),
      cache: "no-store",
    }
  );

  return new Response(upstream.body, {
    status: upstream.status,
    headers: Object.fromEntries(upstream.headers),
  });
}
