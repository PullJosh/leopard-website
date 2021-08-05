import { useState, useEffect } from "react";
import classNames from "classnames";
import * as gtag from "../lib/gtag";

export default function EditButton({ projectId }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const onClick = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    document.body.addEventListener("click", onClick);

    return () => {
      document.body.removeEventListener("click", onClick);
    };
  });

  return (
    <div className="relative flex">
      <a
        className="flex items-center px-6 py-3 text-white bg-indigo-700 border-b-2 border-indigo-800 rounded-l"
        href={`/api/${projectId}/codesandbox`}
        download
        onClick={() => {
          gtag.event({
            category: "Translate Project",
            action: "Edit in CodeSandbox",
            label: projectId
          });
        }}
      >
        <img
          className="mr-4 opacity-75"
          src="/codesandbox.svg"
          alt="CodeSandbox"
        />
        <span>Edit as Javascript</span>
      </a>
      <button
        className="px-4 bg-indigo-700 border-b-2 border-l border-indigo-800 rounded-r"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <img src="/down-arrow.svg" alt="More" />
      </button>

      <div
        className={classNames(
          "absolute right-0 bottom-0 transform translate-y-full pt-1",
          { invisible: !menuOpen }
        )}
      >
        <div
          className="absolute top-0 right-0 w-0 h-0 mr-4 -mt-3 text-white border-8 border-transparent"
          style={{ borderBottomColor: "currentColor" }}
        />
        <div className="w-56 py-1 bg-white rounded shadow">
          <a
            className="flex items-center px-4 py-2 hover:bg-gray-200"
            href={`/api/${projectId}/zip`}
            download
            onClick={() => {
              gtag.event({
                category: "Translate Project",
                action: "Download ZIP",
                label: projectId
              });
            }}
          >
            <img className="mr-2" src="/download-icon.svg" alt="" />
            <span>Download ZIP</span>
          </a>
        </div>
      </div>
    </div>
  );
}
