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

  const apiRouteRegex = /^\/(?:_next|api|static|\.(?:.*))$/;
  if (apiRouteRegex.test(pathname)) {
    return res;
  }

  const routeBehaviors = new Map<string | RegExp, "secured" | "repel">([
    ["/dashboard", "secured"],
    [/^\/auth/, "repel"],
  ]);

  let behavior: "secured" | "repel" | undefined;
  for (const [route, routeBehavior] of Array.from(routeBehaviors.entries())) {
    if (typeof route === "string" && pathname === route) {
      behavior = routeBehavior;
      break;
    } else if (route instanceof RegExp && route.test(pathname)) {
      behavior = routeBehavior;
      break;
    }
  }

  const authCookie = req.cookies.get("next-auth.session-token") as
    | SessionCookie
    | undefined;

  let isVerified = false;

  if (authCookie) {
    const { value: sessionToken } = authCookie as SessionCookie;
    isVerified = await verifySession(sessionToken);
  }

  if (behavior === "repel" && authCookie && isVerified) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  } else if (behavior === "secured" && !isVerified) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return res;
}

const verifySession = async (sessionToken: string): Promise<boolean> => {
  const session = await fetch(`${config.clientURL}/api/auth/verifySession`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionToken }),
  });

  if (!session.ok) {
    return false;
  }

  const sessionData = (await session.json()) as Session;
  if (!sessionData) {
    return false;
  }

  return sessionToken === sessionData.sessionToken;
};
