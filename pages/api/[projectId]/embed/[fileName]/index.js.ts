import fetch from "node-fetch";
import { Project } from "sb-edit";

export default async (req, res) => {
  let { projectId, fileName } = req.query;

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

  const project = await Project.fromSb3JSON(projectJSON, {
    getAsset: async () => "yo"
  });

  const converted = project.toScratchJS(
    {
      scratchJSURL: "https://pulljosh.github.io/leopard/src/index.js",
      getTargetURL: ({ name }) => `../${name}/index.js`,
      getAssetURL: ({ md5, ext }) =>
        `https://assets.scratch.mit.edu/internalapi/asset/${md5}.${ext}/get/`,
      autoplay: false
    },
    { printWidth: 100 }
  );

  res.setHeader("Content-Type", "application/javascript");
  if (fileName === "index") {
    return res.end(converted["index.js"]);
  } else {
    return res.end(converted[`${fileName}/${fileName}.js`]);
  }
};
