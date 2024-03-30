import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";

hljs.registerLanguage("javascript", javascript);

import "./Code.css";
import classNames from "classnames";

interface CodeProps {
  children: string;
  className?: string;
}

export function Code({ children, className }: CodeProps) {
  const highlightedCode = hljs.highlight(children, {
    language: "javascript",
  }).value;

  return (
    <div
      className={classNames("font-mono", className)}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
}
