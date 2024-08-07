import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { getUser } from "../../../../lib/getUser";
import {
  getProjectCurrentFilesSize,
  getUserCurrentFilesSize,
  PROJECT_SIZE_LIMIT,
  USER_SIZE_LIMIT,
} from "../../../../lib/sizeLimits";
import { Path, pathContains, stringToPath } from "../../../../lib/fileHelpers";

type FileChange =
  | { type: "create"; path: string; content?: string }
  | { type: "update"; id: string; path?: string; content?: string }
  | { type: "delete"; path: string };

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

  const getFileIdsToDelete = (deletedPaths: Path[]) => {
    return project.files
      .filter(({ path }) => {
        return deletedPaths.some((deletePath) =>
          pathContains(deletePath, stringToPath(path)),
        );
      })
      .map((file) => file.id);
  };

  const sizeDelta = await getSizeDelta(changes, getFileIdsToDelete);
  const currentProjectSize = await getProjectCurrentFilesSize(id);
  console.log("Size delta:", sizeDelta);
  console.log("Current project size:", currentProjectSize);
  console.log("Project size after changes:", currentProjectSize + sizeDelta);
  if (currentProjectSize + sizeDelta > PROJECT_SIZE_LIMIT) {
    return res.status(400).json({
      error: "Project size limit exceeded. Maximum project size is 10 MB.",
    });
  }
  if (user) {
    const currentUserSize = await getUserCurrentFilesSize(user.id);
    console.log("Current user size:", currentUserSize);
    console.log("User size after changes:", currentUserSize + sizeDelta);
    if (currentUserSize + sizeDelta > USER_SIZE_LIMIT) {
      return res.status(400).json({
        error: "User size limit exceeded. Maximum user size limit is 50 MB.",
      });
    }
  }

  const files = await prisma.$transaction(
    changes.map((change) =>
      commitChangeInPrisma(change, id, getFileIdsToDelete),
    ),
  );

  const deletePaths = changes
    .filter(({ type }) => type === "delete")
    .map(({ path }) => stringToPath(path!));

  const responseJSON: UpdateFilesResponseJSON = {
    id: project.id,
    files: files
      .map((fileOrBatchDelete) => {
        if (!("id" in fileOrBatchDelete)) {
          // Is a batch delete
          return null;
        }

        return {
          id: fileOrBatchDelete.id,
          path: fileOrBatchDelete.path,
          content: fileOrBatchDelete.content ?? undefined,
          asset: fileOrBatchDelete.asset ?? undefined,
        };
      })
      .filter(Boolean) as UpdateFilesResponseJSON["files"],
    deletedFiles: getFileIdsToDelete(deletePaths),
  };

  return res.json(responseJSON);
}

function commitChangeInPrisma(
  change: FileChange,
  projectId: string,
  getFileIdsToDelete: (deletedPaths: Path[]) => string[],
) {
  switch (change.type) {
    case "create":
      return prisma.file.create({
        data: {
          path: change.path,
          content: change.content,
          project: { connect: { id: projectId } },
          size: Buffer.byteLength(change.content ?? "", "utf8"),
        },
      });
    case "update":
      return prisma.file.update({
        where: { id: change.id },
        data: {
          path: change.path,
          content: change.content,
          size: Buffer.byteLength(change.content ?? "", "utf8"),
        },
      });
    case "delete":
      return prisma.file.deleteMany({
        where: { id: { in: getFileIdsToDelete([stringToPath(change.path)]) } },
      });
  }
}

async function getSizeDelta(
  changes: FileChange[],
  getFileIdsToDelete: (deletedPaths: Path[]) => string[],
): Promise<number> {
  let sizeDelta = 0;
  let fileIdsToFetch = [];

  for (const change of changes) {
    switch (change.type) {
      case "create":
        sizeDelta += Buffer.byteLength(change.content ?? "", "utf8");
        break;
      case "update":
        // For an update, we'll add the new size now and subtract the old size later
        sizeDelta += Buffer.byteLength(change.content ?? "", "utf8");
        fileIdsToFetch.push(change.id);
        break;
      case "delete":
        fileIdsToFetch.push(...getFileIdsToDelete([stringToPath(change.path)]));
        break;
    }
  }

  const files = await prisma.file.findMany({
    where: { id: { in: fileIdsToFetch } },
    select: { size: true },
  });

  // All of the found files are either being updated or deleted, so we'll subtract their sizes
  // (Updated files already had their new size added earlier, so we only need to subtract now)
  for (const file of files) {
    sizeDelta -= file.size;
  }

  return sizeDelta;
}
