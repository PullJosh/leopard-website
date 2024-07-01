import Link from "next/link";
import prisma from "../../../lib/prisma";

export default async function AdminProjects() {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      title: true,
      shared: true,
      owner: {
        select: {
          username: true,
        },
      },
      scratchProjectId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return (
    <div className="prose max-w-max">
      <h1>Projects</h1>
      <table>
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Project Name</th>
            <th>Shared</th>
            <th>Owner</th>
            <th>Scratch Project ID</th>
            <th>Created</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                <Link href={`/admin/projects/${project.id}`}>{project.id}</Link>
              </td>
              <td>
                <Link href={`/projects/${project.id}`}>{project.title}</Link>
              </td>
              <td>{project.shared ? "Yes" : "No"}</td>
              <td>
                {project.owner ? (
                  <Link href={`/useres/${project.owner.username}`}>
                    {project.owner.username}
                  </Link>
                ) : (
                  <em>Anonymous</em>
                )}
              </td>
              <td>
                <Link
                  href={`https://scratch.mit.edu/projects/${project.scratchProjectId}`}
                >
                  {project.scratchProjectId}
                </Link>
              </td>
              <td>{project.createdAt.toLocaleDateString()}</td>
              <td>{project.updatedAt.toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
