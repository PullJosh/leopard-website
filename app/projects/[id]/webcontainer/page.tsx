import { notFound } from "next/navigation";

import prisma from "../../../../lib/db";
import { WebContainerPreview } from "../../../../components/WebContainerPreview";
import { FileSystemTree } from "@webcontainer/api";
import { WebContainerProvider } from "../../../../components/WebContainerProvider";

export interface ProjectWebContainerProps {
  params: {
    id: string;
  };
}

export default async function ProjectWebContainer({
  params: { id },
}: ProjectWebContainerProps) {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      files: true,
      owner: true,
    },
  });

  if (!project) {
    notFound();
  }

  let defaultFiles: FileSystemTree = {
    "index.html": {
      file: {
        contents: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Vite App</title>
            </head>
            <body>
              <h1>Hello from webcontainer!</h1>
              <script type="module" src="/index.js"></script>
            </body>
          </html>`,
      },
    },
    "index.js": {
      file: {
        contents: `console.log("Hello, WebContainer!");`,
      },
    },
    "package.json": {
      file: {
        contents: JSON.stringify({
          name: "leopard-project",
          type: "module",
          devDependencies: {
            vite: "^4.0.4",
          },
          scripts: {
            dev: "vite",
            build: "vite build",
            preview: "vite preview",
          },
        }),
      },
    },
  };

  return (
    <>
      <h1>Project Info</h1>
      <WebContainerProvider>
        <WebContainerPreview defaultFiles={defaultFiles} />
      </WebContainerProvider>
      <pre>{JSON.stringify(project, null, 2)}</pre>
    </>
  );
}
