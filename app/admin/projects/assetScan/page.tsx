import Link from "next/link";
import prisma from "../../../../lib/prisma";
import { AssetPreview } from "../AssetPreview";

export default async function AssetScan({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let page = searchParams?.page ? parseInt(searchParams.page as string) : 0;

  const projectsPerPage = 25;
  const projects = await prisma.project.findMany({
    take: projectsPerPage,
    skip: page * projectsPerPage,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      owner: {
        select: {
          id: true,
          username: true,
        },
      },
      createdAt: true,
      files: {
        select: {
          id: true,
          asset: true,
          path: true,
        },
      },
    },
  });

  return (
    <div className="prose w-full">
      <h1>All Uploaded Assets</h1>
      <PaginationButtons currentPage={page} />

      {projects.map((project) => (
        <div key={project.id}>
          <h2>
            <Link href={`/admin/projects/${project.id}`}>{project.title}</Link>
          </h2>
          <p>
            Created by{" "}
            {project.owner ? (
              <Link href={`/admin/users/${project.owner.id}`}>
                {project.owner.username}
              </Link>
            ) : (
              <em>Anonymous</em>
            )}{" "}
            at {project.createdAt.toLocaleDateString()}{" "}
            {project.createdAt.toLocaleTimeString()}
          </p>
          <AssetPreview files={project.files} />
        </div>
      ))}

      <PaginationButtons currentPage={page} />
    </div>
  );
}

// Pagination buttons that update the `page` query parameter when clicked
interface PaginationButtonsProps {
  currentPage: number;
}
function PaginationButtons({ currentPage }: PaginationButtonsProps) {
  return (
    <div className="flex space-x-2 bg-gray-200 p-4">
      <Link href={{ query: { page: 0 } }} className="mr-auto">
        Newest
      </Link>
      {currentPage > 0 && (
        <Link href={{ query: { page: currentPage - 1 } }}>← Newer</Link>
      )}
      <Link href={{ query: { page: currentPage + 1 } }}>Older →</Link>
    </div>
  );
}
