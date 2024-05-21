import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { Project } from "sb-edit";
import { exportProjectWithBufferAssetsToZip } from "../../../lib/convertProject";

export default async function convertToZip(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const projectId = req.query.projectId as string;

  const projectData: any = await fetch(
    `https://api.scratch.mit.edu/projects/${projectId}`,
  ).then((res) => res.json());

  if (projectData.code === "NotFound") {
    res.status(404).json({ error: "Project not found. Is it shared?" });
    return;
  }

  let projectJSON: any;
  try {
    const url = `https://projects.scratch.mit.edu/${projectId}?token=${projectData.project_token}`;
    projectJSON = await fetch(url).then((res) => res.json());
  } catch (e) {
    console.error(e);
    return res
      .status(400)
      .json({ error: `Failed to load project with ID ${projectId}` });
  }

  try {
    const project = await Project.fromSb3JSON(projectJSON, {
      getAsset: async ({ md5, ext }) => {
        const url = `https://assets.scratch.mit.edu/internalapi/asset/${md5}.${ext}/get/`;
        const res = await fetch(url);
        const buffer = Buffer.from(await res.arrayBuffer()); // TODO: It might be possible to optimize this by not converting to a buffer or by streaming
        return buffer;
      },
    });

    const convertedZip = exportProjectWithBufferAssetsToZip(project);
    const buffer = await convertedZip.generateAsync({ type: "nodebuffer" });
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", "attachment; filename=converted.zip");
    res.end(buffer);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }

    return res.status(400).json({ error: "An unknown error occurred" });
  }
}
