import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (
    path.includes(".git") ||
    path.includes(".php") ||
    path.includes("/wp-") ||
    path.includes("/cgi-bin") ||
    path.includes(".env")
  ) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  return NextResponse.next();
}
