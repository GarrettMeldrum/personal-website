import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  runtime: 'nodejs',
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
    return;
  }

  const { CF_ACCESS_CLIENT_ID, CF_ACCESS_CLIENT_SECRET } = process.env;
  if (!CF_ACCESS_CLIENT_ID || !CF_ACCESS_CLIENT_SECRET) {
    console.error('Missing CF Access env vars at runtime');
    res.status(500).send('Server Misconfigured: CF Access env missing');
    return;
  }
  if (!API_BASE) {
    res.status(500).send('Server Misconfigured: API base missing');
    return;
  }

  const pathSegments = Array.isArray(req.query.path)
    ? req.query.path
    : typeof req.query.path === 'string'
    ? [req.query.path]
    : [];

  const headers: Record<string, string> = {
    'CF-Access-Client-Id': CF_ACCESS_CLIENT_ID,
    'CF-Access-Client-Secret': CF_ACCESS_CLIENT_SECRET,
  };

  const accept = req.headers.accept;
  if (accept) headers['Accept'] = accept;

  const upstreamUrl = new URL(pathSegments.join('/'), API_BASE);
  const url = new URL(req.url ?? '', `http://${req.headers.host}`);
  upstreamUrl.search = url.search;

  const upstream = await fetch(upstreamUrl.toString(), {
    headers,
    cache: 'no-store',
  });

  res.status(upstream.status);
  upstream.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  const body = Buffer.from(await upstream.arrayBuffer());
  res.send(body);
}
