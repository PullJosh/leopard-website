import prisma from "../../../../../lib/prisma";
import { getAssetHash, uploadS3Asset } from "../../../../../lib/uploadS3Asset";
import { UpdateFilesResponseJSON } from "../../../../../pages/api/projects/[id]/updateFiles";

export async function POST(
  req: Request,
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

  let assetUploadPromises: Promise<any>[] = [];
  const prismaFileInputs = await Promise.all(
    files.map(async (file) => {
      const path = uploadPath === "" ? file.name : `${uploadPath}/${file.name}`;

      // TODO: Check file.size
      if (isPlainText(file)) {
        return {
          projectId: params.id,
          path,
          content: await file.text(),
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

  return Response.json(responseJSON);
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
