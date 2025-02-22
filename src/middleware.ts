import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("sb-access-token");
  const { pathname } = req.nextUrl;

  if (!accessToken && pathname.startsWith("/id")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (accessToken && pathname === "/") {
    return NextResponse.redirect(new URL("/id", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/id/:path*", "/"],
};
