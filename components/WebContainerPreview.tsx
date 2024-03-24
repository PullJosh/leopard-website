"use client";

import type { FileSystemTree } from "@webcontainer/api";
import { useEffect, useState } from "react";
import { useWebContainer } from "./WebContainerProvider";

interface WebContainerPreviewProps {
  defaultFiles: FileSystemTree;
}

export function WebContainerPreview({
  defaultFiles,
}: WebContainerPreviewProps) {
  const { webContainer } = useWebContainer();

  const [status, setStatus] = useState("Waiting");
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (webContainer) {
      console.log(webContainer);

      (async () => {
        webContainer.on("error", (error) => {
          console.error(error);
        });

        console.log("Mounting default files");
        setStatus("Mounting files");
        console.log("Mount", await webContainer.mount(defaultFiles));

        console.log("Installing dependencies");
        setStatus("Installing dependencies");
        const installProcess = await webContainer.spawn("npm", ["install"]);
        installProcess.output.pipeTo(
          new WritableStream({ write: console.log }),
        );
        console.log("npm install", installProcess, await installProcess.exit);

        console.log("Starting server");
        setStatus("Starting server");
        const devProcess = await webContainer.spawn("npm", ["run", "dev"]);
        devProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              console.log(data);
            },
          }),
        );
        console.log("npm run dev", devProcess);

        webContainer.on("server-ready", (port, url) => {
          console.log("Server ready", url);
          setStatus("Server ready");
          setSrc(url);
        });

        console.log("Server started");
        setStatus("Server started");
      })();
    }
  }, [webContainer, defaultFiles]);

  return (
    <div>
      <p>Webcontainer :)</p>
      {src ? (
        <iframe
          src={src}
          width={480}
          height={360}
          style={{ border: "1px solid black" }}
        />
      ) : (
        <div style={{ width: 480, height: 360, border: "1px solid black" }}>
          <p>Status: {status}</p>
        </div>
      )}
    </div>
  );
}
