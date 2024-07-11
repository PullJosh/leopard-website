import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // In maintenance mode, rewrite all requests to /$maintenance
  if (process.env.MAINTENANCE_MODE === "true") {
    return NextResponse.rewrite(new URL("/$maintenance.html", request.url));
  }

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
  }

  // Block URLs begining with $. We will use that as our convention for paths
  // which should not be accessible directly and should only ever be reached
  // via rewrite rules. (Such as /$preview/...)
  if (
    request.nextUrl.pathname.startsWith("$") || // I have no idea if the non-/ version is needed here but I'm including it to be on the safe side
    request.nextUrl.pathname.startsWith("/$")
  ) {
    // Exception: If unsafe same-domain previews are enabled, allow
    // $preview paths to be loaded directly
    if (process.env.NEXT_PUBLIC_UNSAFE_SAME_DOMAIN_PREVIEWS === "true") {
      if (
        request.nextUrl.pathname.startsWith("$preview") ||
        request.nextUrl.pathname.startsWith("/$preview")
      ) {
        return NextResponse.next();
      }
    }

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

  return host.split(".").slice(0, -2);
}
