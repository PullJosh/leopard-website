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
import { getAssetHash, uploadS3Asset } from "../../../../lib/uploadS3Asset";

type FileChange =
  | { type: "create"; path: string; content?: string }
  | {
      type: "update";
      id: string;
      path?: string;
      content?: string;
      asset?: { base64: string; ext: string };
    }
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

  let assetUpdates = new Map<
    string,
    { hash: string; buffer: Buffer; ext: string; mimeType?: string }
  >();
  for (const change of changes) {
    if (change.type === "update") {
      const asset = change.asset;
      if (asset) {
        const buffer = Buffer.from(asset.base64.split(",")[1], "base64");
        const mimeType = asset.base64.match(/data:(.*?);/)?.[1];
        const hash = getAssetHash(buffer);
        assetUpdates.set(change.id, { hash, buffer, ext: asset.ext, mimeType });
      }
    }
  }

  const sizeDelta = await getSizeDelta(
    changes,
    getFileIdsToDelete,
    assetUpdates,
  );
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

  for (const assetUpdate of Array.from(assetUpdates.values())) {
    const name = assetName(assetUpdate.hash, assetUpdate.ext || undefined);
    await uploadS3Asset(assetUpdate.buffer, name, assetUpdate.mimeType);
  }

  const files = await prisma.$transaction(
    changes.map((change) =>
      commitChangeInPrisma(change, id, getFileIdsToDelete, assetUpdates),
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
  assetUpdates: Map<string, { hash: string; buffer: Buffer; ext: string }>,
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
      const assetUpdate = assetUpdates.get(change.id);
      return prisma.file.update({
        where: { id: change.id },
        data: {
          path: change.path,
          content: change.content,
          asset: assetUpdate
            ? assetName(assetUpdate.hash, assetUpdate.ext)
            : undefined,
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
  assetUpdates: Map<string, { hash: string; buffer: Buffer }>,
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
        sizeDelta += change.asset
          ? assetUpdates.get(change.id)!.buffer.byteLength
          : Buffer.byteLength(change.content ?? "", "utf8");
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

function assetName(hash: string, ext?: string) {
  return ext ? `${hash}.${ext}` : hash;
}
