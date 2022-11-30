import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ToDo: Set Authentication here
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("X-Powered-By", "Next.js");
  requestHeaders.set("X-Version", "13.0.0");

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("X-Powered-By", "Next.js");
  response.headers.set("X-Version", "13.0.0");
  return response;
}
