import crypto from "crypto";
import { s3 } from "./s3";

export function getAssetHash(buffer: Buffer) {
  return crypto.createHash("md5").update(buffer).digest("hex");
}

export async function uploadS3Asset(
  body: Buffer,
  name: string,
  contentType?: string,
) {
  return await s3
    .putObject({
      Bucket: process.env.NEXT_PUBLIC_PROJECT_ASSETS_BUCKET_NAME as string,
      Key: name,
      Body: body,
      ContentType: contentType,
    })
    .promise();
}
