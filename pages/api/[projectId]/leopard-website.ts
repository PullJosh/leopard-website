import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { Project } from "sb-edit";
import prisma from "../../../lib/prisma";
import type { Prisma } from "@prisma/client";
import { getUser } from "../../../lib/getUser";
import { nanoid } from "nanoid";
import { getAssetHash, uploadS3Asset } from "../../../lib/uploadS3Asset";

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

    const converted = project.toLeopard();

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

      filesToCreate.push({ path: fileName, content });
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
        });
      }
    }

    // Wait for all assets to finish uploading
    await Promise.all(assetUploadPromises);

    // Create project in database
    const user = await getUser(req);
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
    return res.status(400).json({ error: (err as any).message });
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
