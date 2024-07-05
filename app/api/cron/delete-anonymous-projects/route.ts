// This route is meant to be hit by Vercel's cron functionality.
// It might also be hit by a user, but that's fine.

import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { s3 } from "../../../../lib/s3";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const projects = await prisma.project.findMany({
    where: {
      ownerId: null,
      createdAt: {
        lte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
    select: {
      id: true,
      files: {
        select: {
          asset: true,
        },
      },
    },
  });

  const projectIds = projects.map((project) => project.id);
  console.log(projectIds);

  let assetKeys = projects
    .flatMap((project) => project.files.map((file) => file.asset))
    .filter((key) => key !== null) as string[];

  console.log(assetKeys, assetKeys.length);

  // Only delete assets that are not used by any other projects
  const assetKeysToDelete = (
    await prisma.file.groupBy({
      by: ["asset"],
      where: { asset: { in: assetKeys } },
      _count: { asset: true },
      having: { asset: { _count: { equals: 1 } } },
    })
  ).map((group) => group.asset as string);

  console.log(assetKeysToDelete);

  // Delete assets from bucket
  if (assetKeysToDelete.length > 0) {
    await s3
      .deleteObjects({
        Bucket: process.env.NEXT_PUBLIC_PROJECT_ASSETS_BUCKET_NAME as string,
        Delete: {
          Objects: assetKeysToDelete.map((key) => ({ Key: key })),
        },
      })
      .promise();
  }

  // Delete projects
  await prisma.project.deleteMany({
    where: { id: { in: projectIds } },
  });

  return NextResponse.json({ success: true });
}
