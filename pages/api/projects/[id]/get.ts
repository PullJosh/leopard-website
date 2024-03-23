import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/db";

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
  owner: { username: string } | null;
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
    owner: project.owner,
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
