import fetch from "node-fetch";
import { Project } from "sb-edit";
import { getParameters } from "codesandbox/lib/api/define";
import FormData from "form-data";

export default async (req, res) => {
  const { projectId } = req.query;

  let projectJSON: any;
  try {
    const url = `https://projects.scratch.mit.edu/${projectId}`;
    projectJSON = await fetch(url).then((res: any) => res.json());
  } catch (e) {
    console.error(e);
    return res
      .status(400)
      .json({ error: `Failed to load project with ID ${projectId}` });
  }

  try {
    const project = await Project.fromSb3JSON(projectJSON, {
      getAsset: async ({ md5, ext }) =>
        `https://assets.scratch.mit.edu/internalapi/asset/${md5}.${ext}/get/`
    });

    const converted = project.toLeopard({});

    let files = {};

    for (const fileName in converted) {
      let content = converted[fileName];

      // Prepend sprite JS files with eslint-disable
      if (/.+\/.+\.js/g.test(fileName)) {
        content = "/* eslint-disable require-yield, eqeqeq */\n\n" + content;
      }

      files[fileName] = { content, isBinary: false };
    }

    for (const target of [project.stage, ...project.sprites]) {
      for (const costume of target.costumes) {
        files[`${target.name}/costumes/${costume.name}.${costume.ext}`] = {
          content: costume.asset,
          isBinary: true
        };
      }
      for (const sound of target.sounds) {
        files[`${target.name}/sounds/${sound.name}.${sound.ext}`] = {
          content: sound.asset,
          isBinary: true
        };
      }
    }

    const formData = new FormData();
    formData.append("parameters", getParameters({ files }));

    const result = await fetch(
      "https://codesandbox.io/api/v1/sandboxes/define",
      {
        method: "POST",
        body: formData
      }
    );

    res.status(302);
    res.setHeader("Location", result.url);
    res.end();
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: "Failed to convert project" });
  }
};
