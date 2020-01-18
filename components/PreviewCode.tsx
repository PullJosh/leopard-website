import { useState } from "react";
import useSWR from "swr";
import fetch from "../lib/fetch";

import Code from "./Code";

export default function PreviewCode({ id }) {
  const { data, error } = useSWR<{
    scratchJs?: "ERROR" | { [key: string]: string };
  }>(() => `/api/${id}/debug/`, fetch);
  const sourceCode = data ? data.scratchJs : null;
  const [sourceCodeSelection, setSourceCodeSelection] = useState(
    "Stage/Stage.mjs"
  );

  if (error || sourceCode === "ERROR") {
    return (
      <code>
        There was an error while compiling this project. :(
        <br />
        <b>{error}</b>
        <br />
        Please ensure the project you chose was made with Scratch 3.0 and does
        not use any unsupported features.
        <br />
        As scratch-js and sb-edit are improved, you will see fewer of these
        errors. Hang tight!
      </code>
    );
  }

  if (!sourceCode) return <code>Loading...</code>;

  return (
    <div className="PreviewCode">
      <div className="fileSelectWrapper">
        <select
          value={sourceCodeSelection}
          onChange={e => {
            setSourceCodeSelection(e.target.value);
          }}
          className="fileSelect"
        >
          {Object.keys(sourceCode).map(key => (
            <option value={key} key={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <Code
        className="code"
        language={sourceCodeSelection === "index.html" ? "html" : "javascript"}
      >
        {sourceCode[sourceCodeSelection]}
      </Code>

      <style jsx>
        {`
          .PreviewCode {
            width: 480px;
            height: 360px;
            display: flex;
            flex-direction: column;
            border-radius: 8px;
            overflow: hidden;
            background: #fff;
          }

          .fileSelectWrapper {
            box-shadow: inset 0 -2px 0 hsl(212, 33%, 89%);
          }
          .fileSelect {
            background: hsl(240, 100%, 95%);
            color: hsl(245, 100%, 27%);
            border: none;
            border-bottom: 2px solid hsl(243, 94%, 70%);
            padding: 12px 16px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
          }

          .PreviewCode > :global(.code) {
            flex-grow: 1;
            margin: 0;
            overflow: auto;
            font-size: 12px;
          }
        `}
      </style>
    </div>
  );
}
