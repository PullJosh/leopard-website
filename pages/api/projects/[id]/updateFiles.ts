import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { getUser } from "../../../../lib/getUser";

type FileChange =
  | { type: "create"; path: string; content?: string }
  | { type: "update"; id: string; path?: string; content?: string }
  | { type: "delete"; id: string };

export interface UpdateFilesRequestJSON {
  changes: FileChange[];
}

export interface UpdateFilesResponseJSON {
  id: string;
  files: {
    id: string;
    path: string;
    content?: string;
    asset?: string;
  }[];
  deletedFiles: string[];
}

export default async function updateFiles(
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

  if (project.ownerId !== null && project.ownerId !== user?.id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { changes }: UpdateFilesRequestJSON = req.body;

  const files = await prisma.$transaction(
    changes.map((change) => commitChangeInPrisma(change, id)),
  );

  const responseJSON: UpdateFilesResponseJSON = {
    id: project.id,
    files: files.map((file) => ({
      id: file.id,
      path: file.path,
      content: file.content ?? undefined,
      asset: file.asset ?? undefined,
    })),
    deletedFiles: changes
      .map((change) => (change.type === "delete" ? change.id : null))
      .filter(Boolean) as string[],
  };

  return res.json(responseJSON);
}

function commitChangeInPrisma(change: FileChange, projectId: string) {
  switch (change.type) {
    case "create":
      return prisma.file.create({
        data: {
          path: change.path,
          content: change.content,
          project: { connect: { id: projectId } },
        },
      });
    case "update":
      return prisma.file.update({
        where: { id: change.id },
        data: {
          path: change.path,
          content: change.content,
        },
      });
    case "delete":
      return prisma.file.delete({ where: { id: change.id } });
  }
}
