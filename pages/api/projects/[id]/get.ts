import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export interface ProjectResponseJSON {
  id: string;
  title: string;
  scratchProjectId: string | null;
  scratchProjectData: any;
  files: {
    id: string;
    path: string;
    content?: string;
    asset?: string;
  }[];
  description: string;
  owner: { id: string; username: string } | null;
  shared: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getProject(
  id: string,
  includeScratchProjectData = true,
): Promise<ProjectResponseJSON> {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      files: true,
      owner: true,
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  let scratchProjectData = null;

  if (includeScratchProjectData) {
    const scratchProjectId = project.scratchProjectId;
    if (scratchProjectId) {
      const response = await fetch(
        `https://api.scratch.mit.edu/projects/${scratchProjectId}`,
      );
      scratchProjectData = await response.json();
    }
  }

  const responseJSON: ProjectResponseJSON = {
    id: project.id,
    title: project.title,
    scratchProjectId: project.scratchProjectId,
    scratchProjectData,
    files: project.files.map((file) => ({
      ...file,
      content: file.content ?? undefined,
      asset: file.asset ?? undefined,
    })),
    description: project.description,
    owner: project.owner
      ? {
          id: project.owner.id,
          username: project.owner.username,
        }
      : null,
    shared: project.shared,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };

  return responseJSON;
}

export default async function getProjectRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.query.id as string;

  try {
    const project = await getProject(id);
    return res.json(project);
  } catch (err) {
    return res.status(404).json({ error: "Project not found" });
  }
}
