import type { Session } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import config from "@/config/index";

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

  let isVerified = false;

  if (authCookie) {
    const { value: sessionToken } = authCookie as SessionCookie;

    const session = await fetch(`${config.clientURL}/api/auth/verifySession`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionToken }),
    });

    const sessionData = (await session.json()) as Session;
    if (!sessionData) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    isVerified = sessionToken === sessionData.sessionToken;
  }

  if (repelRoutes.includes(pathname) && authCookie && isVerified) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  } else if (securedRoutes.includes(pathname) && !isVerified) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return res;
}
