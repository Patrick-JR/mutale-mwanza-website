import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth-constants";

/**
 * Edge-safe middleware: only checks that a session cookie exists.
 * Real session verification happens in the layout via getSessionUser()
 * (which uses Prisma and cannot run on the Edge runtime).
 *
 * If a /admin route is hit without a cookie, redirect to /admin/login.
 */
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Only guard /admin/* (allow /admin/login through)
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return NextResponse.next();
  }

  const hasCookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (hasCookie) return NextResponse.next();

  const loginUrl = new URL("/admin/login", req.url);
  if (pathname !== "/admin") loginUrl.searchParams.set("next", pathname + (search || ""));
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
