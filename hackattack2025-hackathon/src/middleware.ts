import { NextRequest, NextResponse } from "next/server";

const ipRequestMap = new Map<string, number[]>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQ = 100; // Max  requests per window

export function middleware(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "Unknown";

  const currentTime = Date.now();

  if (!ipRequestMap.has(ip)) {
    ipRequestMap.set(ip, []);
  }

  const timestamps = ipRequestMap
    .get(ip)!
    .filter((ts) => currentTime - ts < RATE_LIMIT_WINDOW);

  if (timestamps.length >= MAX_REQ) {
    return new NextResponse("Too many requests, please try again later", {
      status: 429,
    });
  }

  timestamps.push(currentTime);
  ipRequestMap.set(ip, timestamps);

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path",
};
