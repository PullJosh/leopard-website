import Link from "next/link";
import prisma from "../../../lib/prisma";

export default async function AdminProjects() {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      title: true,
      owner: {
        select: {
          username: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  return (
    <div className="prose">
      <h1>Projects</h1>
      <table>
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Project Name</th>
            <th>Owner</th>
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
              <td>
                {project.owner ? (
                  <Link href={`/useres/${project.owner.username}`}>
                    {project.owner.username}
                  </Link>
                ) : (
                  <em>Anonymous</em>
                )}
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
