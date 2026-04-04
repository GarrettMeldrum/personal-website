import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "api/access-log") {
    return NextResponse.next();
  }

  fetch(new URL("api/log", request.url), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      method: request.method,
      pathname,
      ip: request.headers.get("x-forwarded-for") || "unknown",
      ua: request.headers.get("user-agent") || "unknown",
    }),
  }).catch(() => {});

  if (
    pathname.includes(".git") ||
    pathname.includes(".php") ||
    pathname.includes("/wp-") ||
    pathname.includes("/cgi-bin") ||
    pathname.includes(".env")
  ) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  return NextResponse.next();
}
