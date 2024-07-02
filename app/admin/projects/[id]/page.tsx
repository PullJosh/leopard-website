import { notFound } from "next/navigation";
import prisma from "../../../../lib/prisma";
import Link from "next/link";
import { getAssetURL, getPreviewURL } from "../../../../lib/previewURLs";
import {
  audioFileExtensions,
  fileExtension,
  FileName,
  imageFileExtensions,
} from "../../../../lib/fileHelpers";

interface AdminProjectPageProps {
  params: {
    id: string;
  };
}

export default async function AdminProjectPage({
  params: { id },
}: AdminProjectPageProps) {
  const project = await prisma.project.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      owner: {
        select: {
          id: true,
          username: true,
          createdAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
      files: {
        select: {
          id: true,
          path: true,
          content: true,
          asset: true,
        },
        orderBy: {
          path: "asc",
        },
      },
    },
  });

  if (!project) {
    return notFound();
  }

  return (
    <div className="prose max-w-max">
      <h1>{project.title}</h1>
      <ul>
        <li>
          <strong>Owner:</strong>{" "}
          {project.owner ? (
            <>
              {project.owner.username} (id: {project.owner.id}, joined:{" "}
              {project.owner.createdAt.toLocaleDateString()})
            </>
          ) : (
            "null"
          )}
        </li>
        <li>
          <strong>Created At:</strong> {project.createdAt.toLocaleDateString()}
        </li>
        <li>
          <strong>Updated At:</strong> {project.updatedAt.toLocaleDateString()}
        </li>
      </ul>
      <h2>Files</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Path</th>
            <th>Asset</th>
          </tr>
        </thead>
        <tbody>
          {project.files.map((file) => (
            <tr key={file.id}>
              <td>{file.id}</td>
              <td>
                {file.asset !== null || file.content !== null ? (
                  <Link href={getPreviewURL(project.id, file.path).href}>
                    {file.path}
                  </Link>
                ) : (
                  <strong>{file.path}</strong>
                )}
              </td>
              <td>{file.asset}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Asset Previews</h2>
      <div className="not-prose flex flex-wrap">
        {filterUnique(
          project.files.filter((file) => file.asset !== null),
          (file) => file.asset as string,
        )
          .map((file) => {
            if (typeof file.asset !== "string") return null;
            const ext = fileExtension(file.asset as FileName);

            if (imageFileExtensions.includes(ext)) {
              return (
                <div
                  key={file.asset}
                  className="flex flex-col items-center border border-gray-500"
                >
                  <img
                    className="max-w-sm flex-shrink-0 flex-grow-0"
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
          project.files.filter((file) => file.asset !== null),
          (file) => file.asset as string,
        )
          .map((file) => {
            if (typeof file.asset !== "string") return null;
            const ext = fileExtension(file.asset as FileName);

            if (audioFileExtensions.includes(ext)) {
              return (
                <div key={file.asset} className="border border-gray-500">
                  <audio src={getAssetURL(file.asset)} controls />
                  <div className="text-center text-xs">{file.path}</div>
                </div>
              );
            }

            return null;
          })
          .filter(Boolean)}
      </div>
    </div>
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
