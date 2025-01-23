import { SESSION } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("===== MIDDLEWARE DEBUG LOG =====");
  console.log("HEADER COOKIE:", request.headers.get("cookie") || "(none)");
  console.log("SESSION FROM COOKIES:", request.cookies.get(SESSION)?.value || "(none)");
  const token = request.cookies.get(SESSION)?.value;
  const { pathname, searchParams } = request.nextUrl;

  if (searchParams.has("_rsc")) {
    return NextResponse.next();
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
