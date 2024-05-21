import type { NextApiRequest, NextApiResponse } from "next";
import { Project } from "sb-edit";
import getRawBody from "raw-body";
import JSZip from "jszip";
import { exportProjectWithBufferAssetsToZip } from "../../../lib/convertProject";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function uploadToZip(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const body = await getRawBody(req);

    const zip = await JSZip.loadAsync(body);
    const json = await zip.file("project.json")!.async("text");

    type AssetType = Buffer;
    const project = await Project.fromSb3JSON(JSON.parse(json), {
      getAsset: ({ md5, ext }): Promise<AssetType> => {
        return zip.file(`${md5}.${ext}`)!.async("nodebuffer");
      },
    });

    const convertedZip = exportProjectWithBufferAssetsToZip(project);
    const buffer = await convertedZip.generateAsync({ type: "nodebuffer" });
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", "attachment; filename=converted.zip");
    res.end(buffer);
  } catch (err) {
    console.error(err);

    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }

    return res.status(400).json({ error: "An unknown error occurred." });
  }
}
