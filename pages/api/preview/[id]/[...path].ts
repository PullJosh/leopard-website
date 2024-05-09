import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../lib/prisma";

export default async function PreviewFile(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.query.id as string;
  const path = req.query.path as string[];

  const file = await prisma.file.findUnique({
    where: {
      path_projectId: {
        projectId: id,
        path: path.join("/"),
      },
    },
  });

  if (!file) {
    res.status(404).send("404: File not found");
    return;
  }

  if (file.content) {
    return res
      .status(200)
      .setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Content-Type", getContentType(file.path))
      .setHeader("Surrogate-Control", "no-store")
      .setHeader(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate",
      )
      .setHeader("Expires", "0")
      .send(file.content);
  }

  if (file.asset) {
    // TODO: Investigate how to prevent caching issues on the cloudflare end
    res
      .setHeader("Access-Control-Allow-Origin", "*")
      .redirect(
        302,
        `https://pub-2c4c62070be24cd593a08b68263568f0.r2.dev/${file.asset}`,
      );
    return;
  }
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
