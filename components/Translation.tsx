import dynamic from "next/dynamic";
import Code from "./Code";

const ScratchBlocks = dynamic(() => import("./ScratchBlocks"), { ssr: false });

export default function Translation({
  scratch,
  js,
}: {
  scratch: string;
  js?: string;
}) {
  return (
    <>
      <div>
        <ScratchBlocks scale={0.9}>{scratch}</ScratchBlocks>
      </div>
      {js ? (
        <div className="bg-gray-200 px-2 py-1 rounded overflow-hidden">
          <Code language="javascript">{js}</Code>
        </div>
      ) : (
        <div className="self-center italic text-lg text-gray-700">
          No translation available.
        </div>
      )}
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
            grid-row-gap: 4px;
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
