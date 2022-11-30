import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/prismadb";

export interface SessionCookie {
  name: string;
  value: string;
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    /\.(.*)$/.test(pathname)
  )
    return res;

  const authCookie = req.cookies.get("next-auth.session-token") as
    | SessionCookie
    | undefined;

  const securedRoutes = ["/dashboard"];
  const repelRoutes = ["/auth"];
  const protectedRoutes = securedRoutes.concat(repelRoutes);

  for (let i = 0; i < protectedRoutes.length; i++) {
    const route = protectedRoutes[i];
    if (!req.nextUrl.pathname.startsWith(route)) continue;

    if (securedRoutes.includes(route) && !authCookie) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (repelRoutes.includes(route) && authCookie) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // ToDo: check session token in db

    break;
  }

  return res;
}
