import { SESSION } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION)?.value;
  const pathname = request.nextUrl.pathname;

  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/tasks", request.url));
  }

  if (pathname === "/" || pathname.startsWith("/api/auth/login")) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|.*\\.svg|sw.js).*)"],
};
