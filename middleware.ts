import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Match subdomains and rewrite to the project preview route
  // For example, `https://0123456789.preview.leopardjs.com/example.html` will be rewritten to
  // `https://leopardjs.com/$preview/0123456789/example.html`
  const host = request.headers.get("host");
  if (host !== null) {
    const subdomains = getSubdomains(host);
    if (subdomains.length === 2 && subdomains[1] === "preview") {
      return NextResponse.rewrite(
        new URL(
          `/$preview/${subdomains[0]}${request.nextUrl.pathname}`,
          request.url,
        ),
      );
    }

    // Any other subdomains are invalid
    if (subdomains.length > 0) {
      // Redirect to the root domain
      return NextResponse.redirect(
        new URL("/", process.env.NEXT_PUBLIC_BASE_URL),
      );
    }
  }

  // Block URLs begining with $. We will use that as our convention for paths
  // which should not be accessible directly and should only ever be reached
  // via rewrite rules. (Such as /$preview/...)
  if (
    request.nextUrl.pathname.startsWith("$") || // I have no idea if the non-/ version is needed here but I'm including it to be on the safe side
    request.nextUrl.pathname.startsWith("/$")
  ) {
    // Return a 404 for any requests to these paths
    return NextResponse.error();
  }

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
  const { user } = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/me", {
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
  }).then((res) => res.json());

  return user;
}

function getSubdomains(host: string) {
  // Remove port if it exists
  host = host.split(":")[0];

  let parts: string[] = [];

  if (host.endsWith(".localhost.test")) {
    parts = host.split(".").slice(0, -2);
  }

  if (host.endsWith(".leopardjs.com")) {
    parts = host.split(".").slice(0, -2);
  }

  return parts;
}
