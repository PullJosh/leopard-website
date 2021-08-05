import { useState } from "react";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";

import EditButton from "./EditButton";

export default function Preview({ id }) {
  const router = useRouter();

  const defaultProject = 345789566;
  const getProjectURL = (id: number) =>
    `https://scratch.mit.edu/projects/${id}/`;

  const projectId: number = id === null ? defaultProject : id;
  const [projectURL, setProjectURL] = useState(getProjectURL(projectId));

  const getProjectId = (url: string) => {
    const results = url.match(/\d{2,}/);
    if (results === null) return null;
    return parseInt(results[0], 10);
  };

  return (
    <div className="flex flex-col mx-auto" style={{ maxWidth: 480 }}>
      <img
        className="absolute"
        style={{ transform: "translate(-105%, -65%)" }}
        src="/convert-text.svg"
      />

      <div className="flex flex-col">
        <input
          type="text"
          className="w-full px-4 py-2 mb-4 text-xl text-indigo-800 bg-indigo-100 border-2 border-indigo-600 rounded"
          placeholder="https://scratch.mit.edu/projects/345789566/"
          value={projectURL}
          onChange={e => {
            setProjectURL(e.target.value);
          }}
          onBlur={() => {
            let id = getProjectId(projectURL);
            if (id === null) id = defaultProject;
            setProjectURL(getProjectURL(id));
            router.push(id === defaultProject ? "/" : `/?id=${id}`);

            gtag.event({
              category: "Translate Project",
              action: "Preview",
              label: id
            });
          }}
        />

        <div className="w-full mx-auto" style={{ maxWidth: 480 }}>
          <div className="relative w-full" style={{ paddingTop: "75%" }}>
            <iframe
              className="absolute inset-0 w-full h-full rounded-md shadow-lg"
              src={`/api/${projectId}/embed`}
              scrolling="no"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <EditButton projectId={projectId} />
      </div>
    </div>
  );
}
