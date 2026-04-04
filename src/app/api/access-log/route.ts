import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const logFile = path.join(process.cwd(), "access.log");

export async function POST(request: Request) {
  try {
    const { timestamp, method, pathname, ip, ua } = await request.json();
    const line = `${timestamp} | ${method} ${pathname} | ${ip} | ${ua}\n`;
    fs.appendFileSync(logFile, line);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "log-failed" }, { status: 500 });
  }
}
