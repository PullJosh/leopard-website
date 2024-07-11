import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { Project } from "sb-edit";
import { exportProjectWithURLAssetsToCodeSandbox } from "../../../lib/convertProject";

export const config = {
  maxDuration: 60, // Allow running for up to 1 minute (the max) on Vercel
};

export default async function convertToCodesandbox(
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
    type AssetType = string;
    const project = await Project.fromSb3JSON(projectJSON, {
      getAsset: async ({ md5, ext }): Promise<AssetType> =>
        `https://assets.scratch.mit.edu/internalapi/asset/${md5}.${ext}/get/`,
    });

    const sandboxId = await exportProjectWithURLAssetsToCodeSandbox(project);

    res
      .status(200)
      .json({ url: `https://codesandbox.io/s/${sandboxId}?file=/index.js` });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }

    return res.status(400).json({ error: "An unknown error occurred" });
  }
}
