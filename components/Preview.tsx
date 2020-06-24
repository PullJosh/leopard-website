import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

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
    <div className="Preview">
      <img className="convertText" src="/convert-text.svg" />

      <input
        type="text"
        className="projectInput"
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
        }}
      />

      <iframe
        className="previewFrame"
        src={`/api/${projectId}/embed`}
        scrolling="no"
      />

      <div className="edit">
        <EditButton projectId={projectId} />
      </div>

      <style jsx>
        {`
          .Preview {
            display: flex;
            flex-direction: column;
            position: relative;

            perspective: 2000px;
          }

          .convertText {
            position: absolute;
            top: -64px;
            left: -16px;
            transform: translate(-100%, 0);
            user-select: none;
            pointer-events: none;
          }

          .projectInput {
            background: hsl(212, 33%, 89%);
            box-shadow: inset 0 2px 3px hsl(210, 31%, 80%);
            border: none;
            border-radius: 8px;
            padding: 16px 24px;
            margin-bottom: 16px;
            font-size: 20px;
          }

          .previewFrame {
            width: 480px;
            height: 360px;
            border: none;
            border-radius: 8px;
            background: hsl(212, 33%, 89%);
            overflow: hidden;
          }

          .edit {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-top: 16px;
          }
        `}
      </style>
    </div>
  );
}
