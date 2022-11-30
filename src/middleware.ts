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
  const protectedRoutes = securedRoutes.concat(repelRoutes);

  for (let i = 0; i < protectedRoutes.length; i++) {
    const route = protectedRoutes[i];

    if (!req.nextUrl.pathname.startsWith(route)) continue;

    if (securedRoutes.includes(route) && !authCookie) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (authCookie) {
      const { value: sessionToken } = authCookie as SessionCookie;

      const session = await fetch(
        `${config.clientURL}/api/auth/verifySession`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionToken }),
        },
      );

      const sessionData = (await session.json()) as Session;
      const isVerified = sessionToken === sessionData.sessionToken;

      if (isVerified && repelRoutes.includes(route) && authCookie) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    break;
  }

  return res;
}
