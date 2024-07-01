import type { NextApiRequest, NextApiResponse } from "next";
import { Project } from "sb-edit";
import getRawBody from "raw-body";
import JSZip from "jszip";
import { s3 } from "../../../lib/s3";
import { exportProjectWithURLAssetsToCodeSandbox } from "../../../lib/convertProject";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function uploadToCodesandbox(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const body = await getRawBody(req);

    const zip = await JSZip.loadAsync(body);
    const json = await zip.file("project.json")!.async("text");

    // Upload assets to S3 Bucket for temporary storage
    type AssetType = string;
    const project = await Project.fromSb3JSON(JSON.parse(json), {
      getAsset: async ({ md5, ext }): Promise<AssetType> => {
        // Get asset data from zip as a `Buffer`
        const data = await zip.file(`${md5}.${ext}`)!.async("nodebuffer");

        const key = `${md5}.${ext}`;

        await s3
          .putObject({
            Bucket: process.env.CODESANDBOX_ASSETS_BUCKET_NAME as string,
            Key: key,
            Body: data,
            Expires: new Date(Date.now() + 5 * 60 * 1000), // Automatically deleted after 5 minutes
          })
          .promise();

        return `https://${
          process.env.CODESANDBOX_ASSETS_BUCKET_NAME as string
        }.s3.amazonaws.com/${key}`;
      },
    });

    const sandboxId = await exportProjectWithURLAssetsToCodeSandbox(project);

    res
      .status(200)
      .json({ url: `https://codesandbox.io/s/${sandboxId}?file=/index.js` });
  } catch (err) {
    console.error(err);

    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }

    return res.status(400).json({ error: "An unknown error occurred." });
  }
}
