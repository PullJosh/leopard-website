import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getRecentConversions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const limit = Number(req.query.limit ?? 10);

  if (limit < 1 || limit > 100) {
    throw new Error("Limit must be between 1 and 100");
  }

  const page = Number(req.query.page ?? 0);

  if (page < 0) {
    throw new Error("Page must be greater than or equal to 0");
  }

  const conversions = await prisma.conversionLog.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: limit * page,
  });

  const scratchProjectData = await Promise.all(
    conversions.map((conversion) =>
      fetch(
        `https://api.scratch.mit.edu/projects/${conversion.scratchProjectId}`
      ).then((res) => res.json())
    )
  );

  res.status(200).json({
    conversions: conversions.map((conversion, i) => ({
      ...conversion,
      scratchProjectData: scratchProjectData[i],
    })),
  });
}
