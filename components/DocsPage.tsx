import DocsHeader from "./DocsHeader";
import Title from "./Title";

export default function DocsPage({
  palette,
  children
}: {
  palette?: string;
  children: any;
}) {
  return (
    <div className="page">
      <Title>{palette}</Title>
      <DocsHeader palette={palette} />
      <div className="max-w-4xl px-4 mx-auto">{children}</div>
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
