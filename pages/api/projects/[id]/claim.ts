import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { getUser } from "../../../../lib/getUser";
import { getProject } from "./get";
import {
  getProjectCurrentFilesSize,
  getUserCurrentFilesSize,
  USER_SIZE_LIMIT,
} from "../../../../lib/sizeLimits";

export default async function claimProject(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.query.id as string;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      files: true,
      owner: true,
    },
  });

  if (!project) {
    return res.status(404).json({ error: "Project not found." });
  }

  if (project.owner !== null) {
    return res.status(400).json({ error: "Project already has an owner" });
  }

  const user = await getUser(req);

  if (user === null) {
    return res
      .status(401)
      .json({ error: "Must be signed in to claim a project" });
  }

  const projectSize = await getProjectCurrentFilesSize(id);
  const currentUserSize = await getUserCurrentFilesSize(user.id);
  if (projectSize + currentUserSize > USER_SIZE_LIMIT) {
    return res.status(400).json({
      error: "Claiming this project would exceed your storage quota",
    });
  }

  await prisma.project.update({
    where: { id },
    data: {
      ownerId: user.id,
    },
  });

  try {
    const project = await getProject(id);
    return res.json({ project });
  } catch (err) {
    return res.status(400).json({ error: "Failed to fetch project" });
  }
}
