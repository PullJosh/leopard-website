import { NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";
import { getAssetURL } from "../../../../lib/previewURLs";

// Use "Edge" runtime on Vercel. Ideally this will be faster.
export const runtime =
  process.env.NODE_ENV === "development" ? "nodejs" : "edge";

export async function GET(
  req: NextRequest,
  {
    params: { subdomain, path = [] },
  }: { params: { subdomain: string; path?: string[] } },
) {
  // If the path is a directory, append index.html
  if (path.length === 0 || !path[path.length - 1].includes(".")) {
    path.push("index.html");
  }

  const file = await prisma.file.findFirst({
    where: {
      projectId: {
        equals: subdomain,
      },
      path: path.join("/"),
    },
  });

  if (file?.content) {
    return new Response(file.content, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": getContentType(file.path),
        "Surrogate-Control": "no-store",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Expires: "0",
      },
    });
  }

  if (file?.asset) {
    // Redirect to the S3 asset
    return new Response(null, {
      status: 302,
      headers: {
        Location: getAssetURL(file.asset),
        "Access-Control-Allow-Origin": "*",
        "Surrogate-Control": "no-store",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Expires: "0",
      },
    });
  }

  return new Response("404: File not found", { status: 404 });
}

function getContentType(path: string) {
  if (path.endsWith(".html")) return "text/html";
  if (path.endsWith(".htm")) return "text/html";
  if (path.endsWith(".js")) return "text/javascript";
  if (path.endsWith(".mjs")) return "application/json";
  if (path.endsWith(".css")) return "text/css";
  if (path.endsWith(".json")) return "application/json";
  if (path.endsWith(".svg")) return "image/svg+xml";

  return "text/plain";
}
