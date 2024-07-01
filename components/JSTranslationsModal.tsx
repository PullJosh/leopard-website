import { useState } from "react";
import Draggable from "react-draggable";

import dynamic from "next/dynamic";
const ScratchBlocks = dynamic(() => import("./ScratchBlocks"), {
  ssr: false,
});

import { Code } from "./Code";

import { palettes } from "../lib/translationPalettes";

export function JSTranslationsModal() {
  const [selectedPalette, setSelectedPalette] = useState<string>(
    palettes[0].name,
  );

  return (
    <Draggable bounds="body" handle="#translations-drag-handle">
      <div className="fixed bottom-10 right-10 z-40 flex h-5/6 w-1/3 flex-col overflow-hidden rounded-xl border border-gray-400 bg-white shadow-xl">
        <div className="flex flex-shrink-0 flex-grow-0 items-center border-b border-gray-300 bg-gray-200">
          <div
            id="translations-drag-handle"
            className="flex-grow cursor-move px-4 py-2 font-semibold text-gray-700"
          >
            JS Translations
          </div>
          <button className="group cursor-pointer p-1">
            <svg className="h-8 w-8" viewBox="0 0 32 32">
              <line
                x1="8"
                y1="8"
                x2="24"
                y2="24"
                className="stroke-gray-600 group-hover:stroke-gray-700 group-focus:stroke-gray-700 group-active:stroke-gray-900"
                strokeLinecap="round"
                strokeWidth={3}
                fill="none"
              />
              <line
                x1="8"
                y1="24"
                x2="24"
                y2="8"
                className="stroke-gray-600 group-hover:stroke-gray-700 group-focus:stroke-gray-700 group-active:stroke-gray-900"
                strokeLinecap="round"
                strokeWidth={3}
                fill="none"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-grow overflow-hidden">
          <div className="flex flex-col border-r border-gray-300 bg-gray-100">
            {palettes.map((palette) => (
              <button
                key={palette.name}
                className="-mr-px block border-r border-transparent p-2 text-center hover:bg-gray-200"
                style={{
                  background:
                    selectedPalette === palette.name
                      ? `${palette.color}33`
                      : undefined,
                  borderColor:
                    selectedPalette === palette.name
                      ? `${palette.color}55`
                      : undefined,
                }}
                onClick={() => setSelectedPalette(palette.name)}
              >
                <div
                  className="mx-auto h-5 w-5 rounded-full"
                  style={{ background: palette.color }}
                />
                <div className="text-xs">{palette.name}</div>
              </button>
            ))}
          </div>
          <div className="flex-grow overflow-auto p-4">
            {palettes
              .find((palette) => palette.name === selectedPalette)!
              .translations.map((translation, i) => (
                <div key={i}>
                  <ScratchBlocks scale={0.75}>
                    {translation.scratch}
                  </ScratchBlocks>
                  {translation.js && <Code>{translation.js}</Code>}
                </div>
              ))}
          </div>
        </div>
      </div>
    </Draggable>
  );
}
