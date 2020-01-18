import fetch from "node-fetch";
import { Project } from "sb-edit";

export default async (req, res) => {
  const { projectId } = req.query;

  const projectJSON = await fetch(
    `https://projects.scratch.mit.edu/${projectId}`
  ).then(res => res.json());

  let project;
  try {
    project = await Project.fromSb3JSON(projectJSON, {
      getAsset: async () => "yo"
    });
  } catch (e) {
    console.log(`The following error occured for project ID ${projectId}:`);
    console.log("(Compilation stage: Import from sb3)");
    console.error(e);

    return res
      .status(500)
      .json({ original: projectJSON, new: "ERROR", scratchJs: "ERROR" });
  }

  let newProject: any = "ERROR";
  let scratchJs: any = "ERROR";

  try {
    newProject = project.toObject();
  } catch (e) {
    console.log(`The following error occured for project ID ${projectId}:`);
    console.log("(Compilation stage: Convert to project object)");
    console.error(e);
  }

  try {
    scratchJs = project.toScratchJS({}, { printWidth: 100 });
  } catch (e) {
    console.log(`The following error occured for project ID ${projectId}:`);
    console.log("(Compilation stage: Export to scratch-js)");
    console.error(e);
  }

  res.status(200).json({
    original: projectJSON,
    new: newProject,
    scratchJs
  });
};
