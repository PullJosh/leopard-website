import Head from "next/head";

import DocsHeader from "./DocsHeader";

export default function DocsPage({
  palette,
  children
}: {
  palette?: string;
  children: any;
}) {
  return (
    <div className="page">
      <DocsHeader palette={palette} />
      <div className="content">{children}</div>
      <style jsx global>
        {`
          body {
            margin: 0;
          }
        `}
      </style>
      <style jsx>
        {`
          .content {
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 16px;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
}
