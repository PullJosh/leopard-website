export function getAssetURL(fileName: string) {
  return `https://${process.env.NEXT_PUBLIC_PROJECT_ASSETS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
}
