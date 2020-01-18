import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";

import PreviewFrame from "./PreviewFrame";
import PreviewCode from "./PreviewCode";

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

  const [view, setView] = useState("preview");

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

      <div className="toggle">
        <button
          className={classNames("toggleButton", {
            active: view === "preview"
          })}
          onClick={() => {
            setView("preview");
          }}
        >
          Preview
        </button>
        <span className="toggleDivider" />
        <button
          className={classNames("toggleButton", {
            active: view === "code"
          })}
          onClick={() => {
            setView("code");
          }}
        >
          Code
        </button>
      </div>

      <div className="previewWindow">
        <div
          className={classNames("previewFlipper", { flip: view === "code" })}
        >
          <PreviewFrame id={projectId} />
          <PreviewCode id={projectId} />
        </div>
      </div>

      <div className="export">
        <Link href="/docs/zip-help">
          <a className="downloadHelp">Help</a>
        </Link>
        <a className="downloadButton" href={`/api/${projectId}/zip`} download>
          Download ZIP
        </a>
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

          .previewWindow {
            background: hsl(212, 33%, 89%);
            box-shadow: inset 0 4px 8px hsl(210, 31%, 80%);
            border-radius: 8px;
          }
          .previewFlipper {
            display: grid;
            grid-template-columns: 1;
            grid-template-rows: 1;
            grid-template-areas: "literallyTheOnlySpot";
            width: 480px;
            height: 360px;
            transform-style: preserve-3d;
            transition: transform 1000ms ease-in-out;
          }
          .previewFlipper.flip {
            transform: rotateY(180deg);
          }
          .previewFlipper > :global(*) {
            grid-area: literallyTheOnlySpot;
            backface-visibility: hidden;
          }
          .previewFlipper > :global(.PreviewCode) {
            transform: rotateY(180deg);
          }

          .toggle {
            display: inline-flex;
            align-self: center;
            padding: 4px;
            margin-bottom: 8px;
            background: #fff;
            border-radius: 999px;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2),
              0 3px 8px rgba(0, 0, 0, 0.1);
          }
          .toggleButton {
            background: none;
            border: none;
            border-radius: 999px;
            cursor: pointer;
            padding: 4px 16px;
            width: 120px;
            font-size: 14px;
            outline: none;
          }
          .toggleButton:focus {
            background: hsl(212, 33%, 89%);
          }
          .toggleButton.active {
            background: hsl(245, 92%, 60%);
            color: hsl(240, 100%, 95%);
          }
          .toggleDivider {
            width: 1px;
            align-self: stretch;
            margin: 4px;
            background: hsl(210, 31%, 80%);
          }

          .export {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-top: 16px;
          }
          .downloadHelp {
            margin-right: 16px;
            color: hsl(209, 23%, 60%);
          }
          .downloadButton {
            padding: 8px 24px;
            padding-left: 48px;
            color: #fff;
            border-radius: 4px;
            text-decoration: none;

            background-color: hsl(162, 63%, 41%);
            background-image: url(/download-icon.svg);
            background-repeat: no-repeat;
            background-position: 12px center;
          }
          .downloadButton:active {
            background-color: hsl(164, 71%, 34%);
          }
        `}
      </style>
    </div>
  );
}
