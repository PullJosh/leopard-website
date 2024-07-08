import hljs from "highlight.js/lib/core";
import html from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";

hljs.registerLanguage("html", html);
hljs.registerLanguage("css", css);
hljs.registerLanguage("javascript", javascript);

import "./Code.css";
import classNames from "classnames";

interface CodeProps {
  children: string;
  className?: string;
  language?: "html" | "css" | "javascript";
}

export function Code({
  children,
  className,
  language = "javascript",
}: CodeProps) {
  const highlightedCode = hljs.highlight(children, { language }).value;

  return (
    <pre
      className={classNames("font-mono", className)}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
}
