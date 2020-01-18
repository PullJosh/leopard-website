import SyntaxHighlighter from "react-syntax-highlighter";

const theme = {
  hljs: {
    display: "block",
    overflowX: "auto",
    padding: "0.5em",
    color: "#333",
    background: "transparent"
  },
  "hljs-comment": {
    color: "#998",
    fontStyle: "italic"
  },
  "hljs-quote": {
    color: "#998",
    fontStyle: "italic"
  },
  "hljs-keyword": {
    color: "#333",
    fontWeight: "bold"
  },
  "hljs-selector-tag": {
    color: "#333",
    fontWeight: "bold"
  },
  "hljs-subst": {
    color: "#333",
    fontWeight: "normal"
  },
  "hljs-number": {
    color: "#3373cc"
  },
  "hljs-literal": {
    color: "#2e8eb8"
  },
  "hljs-variable": {
    color: "#2e8eb8"
  },
  "hljs-template-variable": {
    color: "#2e8eb8"
  },
  "hljs-tag .hljs-attr": {
    color: "#2e8eb8"
  },
  "hljs-string": {
    color: "#389438"
  },
  "hljs-doctag": {
    color: "#d14"
  },
  "hljs-title": {
    color: "#db2e4b",
    fontWeight: "bold"
  },
  "hljs-section": {
    color: "#900",
    fontWeight: "bold"
  },
  "hljs-selector-id": {
    color: "#900",
    fontWeight: "bold"
  },
  "hljs-type": {
    color: "#458",
    fontWeight: "bold"
  },
  "hljs-class .hljs-title": {
    color: "#458",
    fontWeight: "bold"
  },
  "hljs-tag": {
    color: "#000080",
    fontWeight: "normal"
  },
  "hljs-name": {
    color: "#000080",
    fontWeight: "normal"
  },
  "hljs-attribute": {
    color: "#000080",
    fontWeight: "normal"
  },
  "hljs-regexp": {
    color: "#009926"
  },
  "hljs-link": {
    color: "#009926"
  },
  "hljs-symbol": {
    color: "#990073"
  },
  "hljs-bullet": {
    color: "#990073"
  },
  "hljs-built_in": {
    color: "#774dcb"
  },
  "hljs-builtin-name": {
    color: "#774dcb"
  },
  "hljs-meta": {
    color: "#999",
    fontWeight: "bold"
  },
  "hljs-deletion": {
    background: "#fdd"
  },
  "hljs-addition": {
    background: "#dfd"
  },
  "hljs-emphasis": {
    fontStyle: "italic"
  },
  "hljs-strong": {
    fontWeight: "bold"
  }
};

export default function Code(props) {
  return <SyntaxHighlighter style={theme} {...props} />;
}
