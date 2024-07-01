export function getPreviewURL(projectId: string, path: string) {
  let url = new URL(path, process.env.NEXT_PUBLIC_BASE_URL);

  // Add subdomain to URL host
  url.host = [projectId, "preview", ...url.host.split(".")].join(".");

  return url;
}

export function getAssetURL(fileName: string) {
  return `https://${process.env.NEXT_PUBLIC_PROJECT_ASSETS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
}
