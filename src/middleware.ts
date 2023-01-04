import type { Session } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import { getBaseUrl } from "./common/utils";

export interface SessionCookie {
  name: string;
  value: string;
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const url = req.nextUrl;
  const { pathname } = url;

  const apiRouteRegex = /^\/(_next|api|static|manifest|assets|404).*/;
  if (apiRouteRegex.test(pathname)) {
    return res;
  }

  const routeBehaviors = new Map<
    string | RegExp,
    "secured" | "repel" | "ignore"
  >([
    ["/dashboard", "secured"],
    ["/verify", "repel"],
    ["/auth", "repel"],
    [/^\/about.*/, "ignore"],
  ]);

  const isAllowed = Array.from(routeBehaviors.keys()).some((route) => {
    if (typeof route === "string" && pathname === route) {
      return true;
    } else if (route instanceof RegExp && route.test(pathname)) {
      return true;
    }
    return false;
  });

  if (!isAllowed) {
    console.log(pathname);
    return NextResponse.redirect(new URL("/404", req.url));
  }

  let behavior: "secured" | "repel" | "ignore" | undefined;
  for (const [route, routeBehavior] of Array.from(routeBehaviors.entries())) {
    if (typeof route === "string" && pathname === route) {
      behavior = routeBehavior;
      break;
    } else if (route instanceof RegExp && route.test(pathname)) {
      behavior = routeBehavior;
      break;
    }
  }

  if (behavior === "ignore") {
    return res;
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
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return res;
}

const verifySession = async (sessionToken: string): Promise<boolean> => {
  const session = await fetch(`${getBaseUrl()}/api/auth/verifySession`, {
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
