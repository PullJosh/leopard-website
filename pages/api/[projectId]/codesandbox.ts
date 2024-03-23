import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { Project } from "sb-edit";
import { getParameters } from "codesandbox/lib/api/define";
import FormData from "form-data";

import prisma from "../../../lib/db";

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

    const converted = project.toLeopard({});

    let files: { [name: string]: { content: string; isBinary: boolean } } = {};

    for (const fileName in converted) {
      let content = converted[fileName];

      // Prepend index.html with a comment
      if (fileName === "index.html") {
        content = `<!--
  Congratulations! Your project has been converted to JavaScript!

  You should see a working preview of your project on the right side of
  the screen. If not, it means something went wrong.

  Your project's code is all stored in the files on the left side of the
  screen. You can edit the JavaScript code and your project will change.
  But you have to save your changes using File > Save or Ctrl+S on your
  keyboard before the project preview will update.
-->

${content}`;
      }

      // Prepend sprite JS files with eslint-disable
      if (/.+\/.+\.js/g.test(fileName)) {
        content = "/* eslint-disable require-yield, eqeqeq */\n\n" + content;
      }

      files[fileName] = { content, isBinary: false };
    }

    for (const target of [project.stage, ...project.sprites]) {
      for (const costume of target.costumes) {
        files[`${target.name}/costumes/${costume.name}.${costume.ext}`] = {
          content: costume.asset as AssetType,
          isBinary: true,
        };
      }
      for (const sound of target.sounds) {
        files[`${target.name}/sounds/${sound.name}.${sound.ext}`] = {
          content: sound.asset as AssetType,
          isBinary: true,
        };
      }
    }

    const formData = new FormData();
    formData.append("parameters", getParameters({ files }));
    formData.append("json", 1);

    const result: any = await fetch(
      "https://codesandbox.io/api/v1/sandboxes/define",
      {
        method: "POST",
        body: formData,
      },
    ).then((res) => res.json());

    const sandboxId = result.sandbox_id;

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
