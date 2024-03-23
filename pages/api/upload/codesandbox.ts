import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { Project } from "sb-edit";
import { getParameters } from "codesandbox/lib/api/define";
import FormData from "form-data";
import getRawBody from "raw-body";
import JSZip from "jszip";
import S3 from "aws-sdk/clients/s3";

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3 = new S3({
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: `${process.env.CLOUDFLARE_R2_KEY_ID}`,
  secretAccessKey: `${process.env.CLOUDFLARE_R2_KEY_SECRET}`,
  signatureVersion: "v4",
  region: "auto",
});

export default async function uploadToCodesandbox(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const body = await getRawBody(req);

    const zip = await JSZip.loadAsync(body);
    const json = await zip.file("project.json")!.async("text");

    // Upload assets to Cloudflare R2 for temporary storage
    type AssetType = { content: string; isBinary: boolean };
    const project = await Project.fromSb3JSON(JSON.parse(json), {
      getAsset: async ({ md5, ext }): Promise<AssetType> => {
        if (ext === "svg") {
          // No need to upload SVG files to R2. (And in fact, trying to do so
          // is failing for me for some reason.) Instead, just pass the text content of the SVG file.
          return {
            content: await zip.file(`${md5}.${ext}`)!.async("text"),
            isBinary: false,
          };
        }

        // Get asset data from zip as a `Buffer`
        const data = await zip.file(`${md5}.${ext}`)!.async("nodebuffer");

        // Upload asset to Cloudflare R2
        await s3
          .putObject({
            Bucket: "leopard-website",
            Key: `uploaded-sb3-files/${md5}.${ext}`,
            Body: data,
            Expires: new Date(Date.now() + 5 * 60 * 1000), // Automatically deleted after 5 minutes
          })
          .promise();

        // Return a signed URL that allows access to the file for the next 5 minutes
        return {
          content: await s3.getSignedUrlPromise("getObject", {
            Bucket: "leopard-website",
            Key: `uploaded-sb3-files/${md5}.${ext}`,
            Expires: 5 * 60, // 5 minutes
          }),
          isBinary: true,
        };
      },
    });

    const converted = project.toLeopard({});

    let files: { [name: string]: { content: string; isBinary: boolean } } = {};

    for (const fileName in converted) {
      let content = converted[fileName];

      // Prepend index.html with a comment
      if (fileName === "index.html") {
        content = `<!--
  Congratulations! Your project has been converted to JavaScript!

  You should see a working preview of your project on the right side of
  the screen. If not, it means something went wrong.

  Your project's code is all stored in the files on the left side of the
  screen. You can edit the JavaScript code and your project will change.
  But you have to save your changes using File > Save or Ctrl+S on your
  keyboard before the project preview will update.
-->

${content}`;
      }

      // Prepend sprite JS files with eslint-disable
      if (/.+\/.+\.js/g.test(fileName)) {
        content = "/* eslint-disable require-yield, eqeqeq */\n\n" + content;
      }

      files[fileName] = { content, isBinary: false };
    }

    for (const target of [project.stage, ...project.sprites]) {
      for (const costume of target.costumes) {
        files[`${target.name}/costumes/${costume.name}.${costume.ext}`] =
          costume.asset as AssetType;
      }
      for (const sound of target.sounds) {
        files[`${target.name}/sounds/${sound.name}.${sound.ext}`] =
          sound.asset as AssetType;
      }
    }

    const formData = new FormData();
    formData.append("parameters", getParameters({ files }));
    formData.append("json", 1);

    const result: any = await fetch(
      "https://codesandbox.io/api/v1/sandboxes/define",
      {
        method: "POST",
        body: formData,
      },
    ).then((res) => res.json());

    const sandboxId = result.sandbox_id;

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
