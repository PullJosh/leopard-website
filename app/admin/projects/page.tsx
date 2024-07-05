import Link from "next/link";
import prisma from "../../../lib/prisma";

import { isTemplateId } from "../../../lib/projectTemplates";
import classNames from "classnames";

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

  const projectsCount = projects.length;
  const sharedProjectsCount = projects.filter((p) => p.shared).length;
  const anonymousProjectsCount = projects.filter((p) => !p.owner).length;
  const unsharedProjectsCount =
    projectsCount - sharedProjectsCount - anonymousProjectsCount;

  const projectsToday = projects.filter(
    (p) => p.createdAt > new Date(Date.now() - 24 * 60 * 60 * 1000),
  ).length;

  return (
    <div className="prose max-w-max">
      <h1>Projects ({projectsCount})</h1>
      <p className="lead">
        {sharedProjectsCount} shared, {unsharedProjectsCount} unshared,{" "}
        {anonymousProjectsCount} anonymous; {projectsToday} created in last 24
        hours
      </p>
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
                  className={classNames({
                    "opacity-30":
                      project.scratchProjectId &&
                      isTemplateId(Number(project.scratchProjectId)),
                  })}
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
