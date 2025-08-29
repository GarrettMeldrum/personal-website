// app/stream/route.ts
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const upstream = await fetch('https://api.garrettmeldrum.com/v1/stream', {
    headers: { 
		Accept: 'text/event-stream',
		CF-Access-Client-Id: process.env.CF_ACCESS_CLIENT_ID!,
		CF-Access-Client-Secret: process.env.CF_ACCESS_CLIENT_SECRET!,
		 },
    cache: 'no-store',
  })

  if (!upstream.ok || !upstream.body) {
    return new Response('bad upstream', { status: 502 })
  }


  const { readable, writeable } = new TranformStream();
  upstream.body.pipeTo(writeable);
  
  return new Response(readable, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  })
}
