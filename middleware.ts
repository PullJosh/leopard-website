import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const user = await getUserFromAPI(request);

    if (!user || user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/api/admin")) {
    const user = await getUserFromAPI(request);

    if (!user || user.role !== "ADMIN") {
      return NextResponse.error();
    }
  }

  return NextResponse.next();
}

async function getUserFromAPI(request: NextRequest) {
  const { user } = await fetch(process.env.BASE_URL + "/api/me", {
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
  }).then((res) => res.json());

  return user;
}
