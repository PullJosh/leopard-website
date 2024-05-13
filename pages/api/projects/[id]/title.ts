import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { getUser } from "../../../../lib/getUser";

export interface TitleRequestJSON {
  title: string;
}

export default async function updateTitle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.query.id as string;

  const project = await prisma.project.findUnique({
    where: { id },
    include: { files: true },
  });

  if (!project) {
    return res.status(404).json({ error: "Project not found." });
  }

  const user = await getUser(req);

  if (project.ownerId !== null && !project.shared) {
    if (project.ownerId !== user?.id) {
      return res.status(403).json({ error: "Forbidden" });
    }
  }

  const { title }: TitleRequestJSON = req.body;

  await prisma.project.update({
    where: { id },
    data: { title },
  });

  return res.json({ id, title });
}
