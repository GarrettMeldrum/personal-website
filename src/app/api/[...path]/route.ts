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

export async function GET(req: Request, { params }: { params: { path?: string[] } }) {
  const url = new URL(req.url);
  const path = (params.path || []).join("/");
  const upstream = await fetch(
    `https://api.garrettmeldrum.com/v1/${path}${url.search}`,
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
