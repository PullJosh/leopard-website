import {
  FileName,
  audioFileExtensions,
  fileExtension,
  imageFileExtensions,
} from "../../../lib/fileHelpers";
import { getAssetURL } from "../../../lib/previewURLs";

interface AssetPreviewProps {
  files: {
    id: string;
    asset: string | null;
    path: string;
  }[];
}

export function AssetPreview({ files }: AssetPreviewProps) {
  const uniqueAssets = filterUnique(
    files.filter((file) => file.asset !== null),
    (file) => file.asset as string,
  );

  return (
    <>
      <div className="not-prose flex flex-wrap">
        {uniqueAssets
          .map((file) => {
            if (typeof file.asset !== "string") return null;
            const ext = fileExtension(file.asset as FileName);

            if (imageFileExtensions.includes(ext)) {
              return (
                <div
                  key={file.asset}
                  className="flex max-w-[calc(min(100%,24rem))] flex-col items-center border border-gray-500"
                >
                  <img
                    className="max-w-full flex-shrink-0 flex-grow-0"
                    key={file.id}
                    src={getAssetURL(file.asset)}
                    alt={`Image ${file.path}`}
                  />
                  <div className="mt-auto text-center text-xs">{file.path}</div>
                </div>
              );
            }

            return null;
          })
          .filter(Boolean)}
      </div>
      <div className="not-prose mt-8 flex flex-wrap">
        {filterUnique(
          files.filter((file) => file.asset !== null),
          (file) => file.asset as string,
        )
          .map((file) => {
            if (typeof file.asset !== "string") return null;
            const ext = fileExtension(file.asset as FileName);

            if (audioFileExtensions.includes(ext)) {
              return (
                <div
                  key={file.asset}
                  className=" max-w-[calc(min(100%,24rem))] border border-gray-500"
                >
                  <audio
                    src={getAssetURL(file.asset)}
                    controls
                    className="max-w-full"
                  />
                  <div className="text-center text-xs">{file.path}</div>
                </div>
              );
            }

            return null;
          })
          .filter(Boolean)}
      </div>
    </>
  );
}

function filterUnique<T>(array: T[], key: (item: T) => string) {
  const seen = new Set<string>();
  return array.filter((item) => {
    const k = key(item);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}
