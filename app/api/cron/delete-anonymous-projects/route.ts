// This route is meant to be hit by Vercel's cron functionality.
// It might also be hit by a user, but that's fine.

import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { s3 } from "../../../../lib/s3";

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

  const fileKeys = projects
    .flatMap((project) => project.files.map((file) => file.asset))
    .filter((key) => key !== null) as string[];

  console.log(fileKeys, fileKeys.length);

  // Delete assets from bucket
  if (fileKeys.length > 0) {
    await s3
      .deleteObjects({
        Bucket: process.env.NEXT_PUBLIC_PROJECT_ASSETS_BUCKET_NAME as string,
        Delete: {
          Objects: fileKeys.map((key) => ({ Key: key })),
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
