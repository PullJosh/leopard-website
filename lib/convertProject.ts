import JSZip from "jszip";
import { Project } from "sb-edit";
import { getParameters } from "codesandbox/lib/api/define";
import fetch from "node-fetch";
import FormData from "form-data";

export function postProcessLeopardFiles(files: { [fileName: string]: string }) {
  for (const fileName in files) {
    let content = files[fileName];

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

    files[fileName] = content;
  }
}

export async function exportProjectWithBufferAssetsToZip(project: Project): Promise<JSZip> {
  const converted = await project.toLeopard({});
  postProcessLeopardFiles(converted);

  const zip = new JSZip();

  for (const fileName in converted) {
    zip.file(fileName, converted[fileName]);
  }

  for (const target of [project.stage, ...project.sprites]) {
    for (const costume of target.costumes) {
      zip.file(
        `${target.name}/costumes/${costume.name}.${costume.ext}`,
        costume.asset as Buffer,
      );
    }
    for (const sound of target.sounds) {
      zip.file(
        `${target.name}/sounds/${sound.name}.${sound.ext}`,
        sound.asset as Buffer,
      );
    }
  }

  return zip;
}

export async function exportProjectWithURLAssetsToCodeSandbox(
  project: Project,
): Promise<string> {
  const converted = await project.toLeopard({});
  postProcessLeopardFiles(converted);

  let files: { [name: string]: { content: string; isBinary: boolean } } = {};
  for (const fileName in converted) {
    files[fileName] = { content: converted[fileName], isBinary: false };
  }

  for (const target of [project.stage, ...project.sprites]) {
    for (const costume of target.costumes) {
      files[`${target.name}/costumes/${costume.name}.${costume.ext}`] = {
        content: costume.asset as string,
        isBinary: true,
      };
    }
    for (const sound of target.sounds) {
      files[`${target.name}/sounds/${sound.name}.${sound.ext}`] = {
        content: sound.asset as string,
        isBinary: true,
      };
    }
  }

  const formData = new FormData();
  formData.append("parameters", getParameters({ files }));
  formData.append("json", 1);

  const result: any = await fetch(
    "https://codesandbox.io/api/v1/sandboxes/define",
    { method: "POST", body: formData },
  ).then((res) => res.json());

  return result.sandbox_id;
}
