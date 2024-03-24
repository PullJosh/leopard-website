import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Setting these headers enables `crossOriginIsolated`, which makes it
  // possible to use SharedArrayBuffer and other features in the browser.
  // (This is necessary for WebContainers to work)
  response.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");

  return response;
}
