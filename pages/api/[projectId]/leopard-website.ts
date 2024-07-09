import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { Project } from "sb-edit";
import prisma from "../../../lib/prisma";
import type { Prisma } from "@prisma/client";
import { getUser } from "../../../lib/getUser";
import { nanoid } from "nanoid";
import { getAssetHash, uploadS3Asset } from "../../../lib/uploadS3Asset";
import {
  getUserCurrentFilesSize,
  PROJECT_SIZE_LIMIT,
  USER_SIZE_LIMIT,
} from "../../../lib/sizeLimits";

interface Asset {
  buffer: Buffer;
  contentType?: string;
}

export default async function convertToLeopardWebsite(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const projectId = req.query.projectId as string;
    const [projectData, projectJSON] = await getProjectJSON(projectId);

    const project = await Project.fromSb3JSON(projectJSON, {
      getAsset: async ({ md5, ext }) => {
        const url = `https://assets.scratch.mit.edu/internalapi/asset/${md5}.${ext}/get/`;
        const res = await fetch(url);
        const buffer = Buffer.from(await res.arrayBuffer()); // TODO: It might be possible to optimize this by not converting to a buffer or by streaming
        const contentType = res.headers.get("Content-Type") ?? undefined;

        const asset: Asset = { buffer, contentType };
        return asset;
      },
    });

    const converted = await project.toLeopard();

    let assetUploadPromises = [];
    let alreadyUploadedAssetNames: Set<string> = new Set();
    let filesToCreate: Prisma.FileCreateManyProjectInput[] = [];

    // Generate code files
    for (const fileName in converted) {
      let content = converted[fileName];

      if (fileName === "index.html") {
        content = content
          .replace(`<button id="greenFlag">Green Flag</button>\n    `, "")
          .replace(
            `document.querySelector("#greenFlag").addEventListener("click", () => {\n        project.greenFlag();\n      });\n\n      `,
            "",
          )
          .replace(
            `  </head>`,
            `    <style>body { margin: 0; }</style>\n  </head>`,
          );
      }

      filesToCreate.push({
        path: fileName,
        content,
        size: Buffer.byteLength(content, "utf8"),
      });
    }

    // Calculate total size of files and assets
    // We need to do this before uploading the assets to avoid exceeding the size limit
    const sizeSum = (arr: (number | undefined)[]) =>
      arr.reduce<number>((a = 0, b = 0) => a + b, 0) ?? 0;

    const totalSize = sizeSum([
      ...filesToCreate.map(({ size }) => size),
      ...[project.stage, ...project.sprites].flatMap((sprite) => [
        ...sprite.costumes.map(({ asset }) => (asset as Asset).buffer.length),
        ...sprite.sounds.map(({ asset }) => (asset as Asset).buffer.length),
      ]),
    ]);

    // Maximum size of a single project
    if (totalSize > PROJECT_SIZE_LIMIT) {
      throw new Error("Project is too large. Maximum project size is 10 MB.");
    }

    // Check if user has enough storage space
    const user = await getUser(req);
    if (user) {
      const existingFilesSize = await getUserCurrentFilesSize(user.id);
      if (existingFilesSize + totalSize > USER_SIZE_LIMIT) {
        throw new Error(
          `Cannot create project, because it would exceed your 50 MB storage limit. So far you have used ${existingFilesSize} bytes, and this project would add an additional ${totalSize} bytes.`,
        );
      }
    } else {
      // If user is not logged in, we don't check for an account storage limit.
      // Any user who later tries to claim this project will need to have enough
      // storage. If nobody claims it, it will be deleted after 24 hours.
    }

    // Begin uploading assets and add them to filesToCreate
    for (const target of [project.stage, ...project.sprites]) {
      for (const costume of target.costumes) {
        const { buffer, contentType } = costume.asset as Asset;
        const hash = getAssetHash(buffer);
        const name = `${hash}.${costume.ext}`;

        if (!alreadyUploadedAssetNames.has(name)) {
          assetUploadPromises.push(uploadS3Asset(buffer, name, contentType));
          alreadyUploadedAssetNames.add(name);
        }

        filesToCreate.push({
          path: `${target.name}/costumes/${costume.name}.${costume.ext}`,
          asset: name,
          size: buffer.length,
        });
      }

      for (const sound of target.sounds) {
        const { buffer, contentType } = sound.asset as Asset;
        const hash = getAssetHash(buffer);
        const name = `${hash}.${sound.ext}`;

        if (!alreadyUploadedAssetNames.has(name)) {
          assetUploadPromises.push(uploadS3Asset(buffer, name, contentType));
          alreadyUploadedAssetNames.add(name);
        }

        filesToCreate.push({
          path: `${target.name}/sounds/${sound.name}.${sound.ext}`,
          asset: name,
          size: buffer.length,
        });
      }
    }

    // Wait for all assets to finish uploading
    await Promise.all(assetUploadPromises);

    // Create project in database
    const projectDb = await prisma.project.create({
      data: {
        id: nanoid(10).toString(),
        ownerId: user?.id ?? null,
        title: projectData.title,
        scratchProjectId: projectData.id.toString(),
        files: {
          createMany: {
            data: filesToCreate,
          },
        },
        description: [projectData.instructions, projectData.description]
          .filter(Boolean)
          .join("\n\n---\n\n"),
      },
    });

    return res.status(200).json({
      project: {
        id: projectDb.id,
        name: projectDb.title,
        scratchProjectId: projectDb.scratchProjectId,
        createdAt: projectDb.createdAt,
        updatedAt: projectDb.updatedAt,
      },
    });
  } catch (err) {
    console.error(err);
    let status = 400;
    if ((err as any).message === "Project not found. Is it shared?") {
      status = 404;
    }
    return res.status(status).json({ error: (err as any).message });
  }
}

async function getProjectJSON(projectId: string): Promise<[any, any]> {
  const projectData: any = await fetch(
    `https://api.scratch.mit.edu/projects/${projectId}`,
  ).then((res) => res.json());

  if (projectData.code === "NotFound") {
    throw new Error("Project not found. Is it shared?");
  }

  const url = `https://projects.scratch.mit.edu/${projectId}?token=${projectData.project_token}`;
  const projectJSON: any = await fetch(url).then((res) => res.json());

  return [projectData, projectJSON];
}
