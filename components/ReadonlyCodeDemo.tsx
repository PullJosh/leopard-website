"use client";

import { useMemo } from "react";
import { Code } from "./Code";

interface ReadonlyCodeDemoProps {
  html?: string;
  css?: string;
  js?: string;
  describeLanguages?: boolean;
  previewCSS?: string;
}

export default function ReadonlyCodeDemo({
  html,
  css,
  js,
  describeLanguages = [html, css, js].filter(Boolean).length > 1,
  previewCSS,
}: ReadonlyCodeDemoProps) {
  const previewURL = useCodePreviewURL({
    html,
    css: `${css || ""}${previewCSS || ""}`,
    js,
  });

  return (
    <div className="not-prose grid grid-cols-2 gap-x-4">
      <div className="space-y-4">
        {html && (
          <div>
            <ReadonlyCodeDemoHeader
              description="Content"
              showDescription={describeLanguages}
            >
              HTML
            </ReadonlyCodeDemoHeader>
            <div className="overflow-auto rounded-md bg-gray-200 px-4 py-2">
              <Code className="text-sm" language="html">
                {html}
              </Code>
            </div>
          </div>
        )}
        {css && (
          <div>
            <ReadonlyCodeDemoHeader
              description="Style"
              showDescription={describeLanguages}
            >
              CSS
            </ReadonlyCodeDemoHeader>
            <div className="overflow-auto rounded-md bg-gray-200 px-4 py-2">
              <Code className="text-sm" language="css">
                {css}
              </Code>
            </div>
          </div>
        )}
        {js && (
          <div>
            <ReadonlyCodeDemoHeader
              description="Functionality"
              showDescription={describeLanguages}
            >
              JS
            </ReadonlyCodeDemoHeader>
            <div className="overflow-auto rounded-md bg-gray-200 px-4 py-2">
              <Code className="text-sm" language="javascript">
                {js}
              </Code>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <ReadonlyCodeDemoHeader>Preview</ReadonlyCodeDemoHeader>
        <iframe
          className="min-h-28 flex-shrink flex-grow rounded-md border border-gray-300 bg-white"
          src={previewURL}
        />
      </div>
    </div>
  );
}

interface ReadonlyCodeDemoHeaderProps {
  children: React.ReactNode;
  description?: string;
  showDescription?: boolean;
}

function ReadonlyCodeDemoHeader({
  children,
  description,
  showDescription = false,
}: ReadonlyCodeDemoHeaderProps) {
  return (
    <div>
      <span className="align-middle font-semibold">{children}</span>
      {description && showDescription && (
        <>
          {" "}
          <span className="align-middle text-sm text-gray-600">
            ({description})
          </span>
        </>
      )}
    </div>
  );
}

function useBlobURL(code: string, type: string) {
  console.log(code, type);

  const url = useMemo(() => {
    const blob = new Blob([code], { type });
    return URL.createObjectURL(blob);
  }, [code, type]);

  return url;
}

function useCodePreviewURL(code: { html?: string; css?: string; js?: string }) {
  const cssURL = useBlobURL(code.css || "", "text/css");
  const jsURL = useBlobURL(code.js || "", "text/javascript");

  const source = `
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="${cssURL}" />
      </head>
      <body>
        ${code.html || ""}
        <script src="${jsURL}"></script>
      </body>
    </html>
  `;

  const htmlURL = useBlobURL(source, "text/html");
  return htmlURL;
}
