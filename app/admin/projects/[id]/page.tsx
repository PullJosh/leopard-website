import { notFound } from "next/navigation";
import prisma from "../../../../lib/prisma";
import Link from "next/link";
import { getPreviewURL } from "../../../../lib/previewURLs";
import { AssetPreview } from "../AssetPreview";

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
    <div className="prose">
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
      <AssetPreview files={project.files} />
    </div>
  );
}
