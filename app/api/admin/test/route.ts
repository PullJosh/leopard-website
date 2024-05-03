import S3 from "aws-sdk/clients/s3";
import { NextRequest, NextResponse } from "next/server";

const s3 = new S3({
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: `${process.env.CLOUDFLARE_R2_KEY_ID}`,
  secretAccessKey: `${process.env.CLOUDFLARE_R2_KEY_SECRET}`,
  signatureVersion: "v4",
  region: "auto",
});

export async function POST(request: NextRequest) {
  // const prefix = "4Zo1Zs_rJb/";

  // get query param "prefix"
  const prefix = request.nextUrl.searchParams.get("prefix");

  if (!prefix) {
    throw new Error("Need a prefix");
  }

  const deletedCount = await deleteFolder(prefix);

  return NextResponse.json({ success: true, deletedCount });
}

async function deleteFolder(prefix: string, delimeter = "/"): Promise<number> {
  const { Contents, CommonPrefixes } = await s3
    .listObjectsV2({
      Bucket: "leopard-projects-dev",
      Delimiter: delimeter,
      Prefix: prefix,
    })
    .promise();

  let count = 0;

  if (CommonPrefixes && CommonPrefixes.length > 0) {
    const subCounts = await Promise.all(
      CommonPrefixes?.map(({ Prefix }) =>
        deleteFolder(Prefix as string, delimeter),
      ),
    );

    count += subCounts.reduce((acc, curr) => acc + curr, 0);
  }

  if (Contents && Contents.length > 0) {
    await s3
      .deleteObjects({
        Bucket: "leopard-projects-dev",
        Delete: {
          Objects: Contents.map(({ Key }) => ({ Key: Key as string })),
        },
      })
      .promise();

    count += Contents.length;
  }

  return count;
}
