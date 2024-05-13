import S3 from "aws-sdk/clients/s3";
import crypto from "crypto";

const s3 = new S3({
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: `${process.env.CLOUDFLARE_R2_KEY_ID}`,
  secretAccessKey: `${process.env.CLOUDFLARE_R2_KEY_SECRET}`,
  signatureVersion: "v4",
  region: "auto",
});

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
      Bucket: "leopard-projects-dev",
      Key: name,
      Body: body,
      ContentType: contentType,
    })
    .promise();
}
