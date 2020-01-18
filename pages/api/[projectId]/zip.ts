import fetch from "node-fetch";
import { Project } from "sb-edit";
import JSZip from "jszip";

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

  let zip;
  try {
    const project = await Project.fromSb3JSON(projectJSON, {
      getAsset: async ({ md5, ext }) => {
        return fetch(
          `https://assets.scratch.mit.edu/internalapi/asset/${md5}.${ext}/get/`
        ).then(res => res.buffer());
      }
    });

    const converted = project.toScratchJS(
      {
        scratchJSURL:
          "https://pulljosh.github.io/scratch-js/scratch-js/index.mjs"
      },
      { printWidth: 100 }
    );

    zip = new JSZip();
    for (const [name, content] of Object.entries(converted)) {
      zip.file(name, content);
    }
    for (const target of [project.stage, ...project.sprites]) {
      for (const costume of target.costumes) {
        zip.file(
          `${target.name}/costumes/${costume.name}.${costume.ext}`,
          costume.asset
        );
      }
      for (const sound of target.sounds) {
        zip.file(
          `${target.name}/sounds/${sound.name}.${sound.ext}`,
          sound.asset
        );
      }
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: `Failed to translate project` });
  }

  const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
  res.status(200);
  res.setHeader(
    "Content-Disposition",
    `attachment;filename=project-${projectId}.zip`
  );
  res.end(zipBuffer);
};
