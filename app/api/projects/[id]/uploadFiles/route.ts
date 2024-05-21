import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../../../../lib/getUser";
import prisma from "../../../../../lib/prisma";
import {
  getProjectCurrentFilesSize,
  getUserCurrentFilesSize,
  PROJECT_SIZE_LIMIT,
  USER_SIZE_LIMIT,
} from "../../../../../lib/sizeLimits";
import { getAssetHash, uploadS3Asset } from "../../../../../lib/uploadS3Asset";
import { UpdateFilesResponseJSON } from "../../../../../pages/api/projects/[id]/updateFiles";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const formData = await req.formData();

  const uploadPath = formData.get("uploadPath") as string;
  const files = formData.getAll("files") as File[];

  if (uploadPath.startsWith("/")) {
    return new Response("Upload path cannot start with /", {
      status: 400,
    });
  }

  console.log("uploadPath", uploadPath);
  console.log("files", files);

  const user = await getUser(req);

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const currentProjectSize = await getProjectCurrentFilesSize(params.id);
  const currentUserSize = await getUserCurrentFilesSize(user.id);
  const newFilesSize = files.reduce((acc, file) => acc + (file.size ?? 0), 0);
  if (currentProjectSize + newFilesSize > PROJECT_SIZE_LIMIT) {
    return new Response("Project size limit exceeded", { status: 400 });
  }
  if (currentUserSize + newFilesSize > USER_SIZE_LIMIT) {
    return new Response(
      "Uploading these files would exceed user storage quota",
      { status: 400 },
    );
  }

  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });

  if (!project) {
    return new Response("Project not found", { status: 404 });
  }

  if (project.ownerId !== null && project.ownerId !== user.id) {
    return new Response("Forbidden", { status: 403 });
  }

  let assetUploadPromises: Promise<any>[] = [];
  const prismaFileInputs = await Promise.all(
    files.map(async (file) => {
      const path = uploadPath === "" ? file.name : `${uploadPath}/${file.name}`;

      if (isPlainText(file)) {
        const text = await file.text();
        return {
          projectId: params.id,
          path,
          content: text,
          size: Buffer.byteLength(text, "utf8"),
        };
      } else {
        const buffer = Buffer.from(await file.arrayBuffer());
        const hash = getAssetHash(buffer);
        const ext = file.name.split(".").pop();
        const name = ext ? `${hash}.${ext}` : hash;

        assetUploadPromises.push(uploadS3Asset(buffer, name, file.type));

        return {
          projectId: params.id,
          path,
          asset: name,
          size: buffer.length,
        };
      }
    }),
  );

  await Promise.all(assetUploadPromises);
  const primsaFiles = await prisma.$transaction(
    prismaFileInputs.map((input) => prisma.file.create({ data: input })),
  );

  const responseJSON: UpdateFilesResponseJSON = {
    id: params.id,
    files: primsaFiles.map((file) => ({
      id: file.id,
      path: file.path,
      content: file.content ?? undefined,
      asset: file.asset ?? undefined,
    })),
    deletedFiles: [],
  };

  return NextResponse.json(responseJSON);
}

/**
 * Make a reasonable guess as to whether a file is plain text based on its MIME type and file extension.
 */
function isPlainText(file: File): boolean {
  const mimeType = file.type;

  if (mimeType.startsWith("text/")) {
    return true;
  }

  const extension = file.name.split(".").pop();
  const plainTextExtensions = [
    "htm",
    "html",
    "css",
    "js",
    "ts",
    "jsx",
    "tsx",
    "json",
  ];
  if (extension !== undefined && plainTextExtensions.includes(extension)) {
    return true;
  }

  return false;
}
