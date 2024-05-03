import { Code } from "./Code";

import dynamic from "next/dynamic";
const ScratchBlocks = dynamic(() => import("./ScratchBlocks"), { ssr: false });

import { CopyButton } from "./CopyButton";

interface JSTranslationsReferenceTableProps {
  translations: {
    scratch: string;
    js?: string;
  }[];
}

export function JSTranslationsReferenceTable({
  translations,
}: JSTranslationsReferenceTableProps) {
  return (
    <table className="w-full table-fixed">
      <tbody>
        {translations.map((translation, i) => (
          <tr key={i} className="h-12">
            <td className="w-1/3 border-r border-b border-gray-300 px-2">
              <ScratchBlocks scale={0.7}>{translation.scratch}</ScratchBlocks>
            </td>
            <td className="w-12 border-b border-gray-300 bg-gray-100 text-center">
              {translation.js && <CopyButton content={translation.js} />}
            </td>
            <td className="w-2/3 border-b border-gray-300 bg-gray-100 text-sm">
              {translation.js ? (
                <Code className="py-2">{translation.js}</Code>
              ) : (
                <span className="px-2 italic">No translation available</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
