import S3 from "aws-sdk/clients/s3";

export const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  signatureVersion: "v4",
});
