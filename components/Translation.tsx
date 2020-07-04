import Code from "../components/Code";

export default function Translation({
  blockImg,
  children
}: {
  blockImg: string;
  children?: string;
}) {
  return (
    <>
      <div className="blocks">
        <img className="blocks__image" src={`/scriptImg/${blockImg}`} />
      </div>
      {children ? (
        <div className="javascript">
          <Code language="javascript">{children}</Code>
        </div>
      ) : (
        <div className="javascript--empty">No translation available.</div>
      )}

      <style jsx>
        {`
          .javascript {
            background: #eee;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 32px;
          }
          .javascript > :global(pre) {
            padding: 16px !important;
            margin: 0;
            font-size: 20px;
          }
          .javascript--empty {
            font-style: italic;
            font-size: 20px;
            color: #888;
            padding: 16px 0;
          }
        `}
      </style>
    </>
  );
}

export function TranslationGrid({ children }) {
  return (
    <div className="translationGrid">
      {children}
      <style jsx>
        {`
          .translationGrid {
            display: grid;
            grid-template-columns: auto 1fr;
            align-items: start;
            grid-column-gap: 32px;
          }
          .translationGrid > :global(h3) {
            grid-column-end: span 2;
          }
        `}
      </style>
    </div>
  );
}

export function TranslationHeader({ children }) {
  return (
    <h3 className="my-2 text-lg font-semibold text-gray-800">{children}</h3>
  );
}
