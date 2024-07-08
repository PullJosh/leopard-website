"use client";

import { useEffect, useState } from "react";

import {
  AbstractFile,
  fileExtension,
  imageFileExtensions,
} from "../lib/fileHelpers";
import { getAssetURL } from "../lib/previewURLs";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import PaintEditor, {
  ScratchPaintReducer,
  // @ts-expect-error - no types available for scratch-paint
} from "scratch-paint/dist/scratch-paint";
// @ts-expect-error - no types available for react-intl-redux
import { IntlProvider, intlReducer } from "react-intl-redux";
// @ts-expect-error - no types available for scratch-l10n
import paintMessages from "scratch-l10n/locales/paint-editor-msgs";

const reducer = combineReducers({
  intl: intlReducer,
  scratchPaint: ScratchPaintReducer,
});

const intlInitialState = {
  intl: {
    defaultLocale: "en",
    locale: "en",
    messages: paintMessages.en.messages,
  },
};

const store = createStore(
  reducer,
  intlInitialState,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__?.(),
);

interface ImageEditorProps<FileType extends AbstractFile> {
  file: FileType;
  editedImageBase64?: string;
  onChange: (newImageBase64: string) => void;
}

export default function ImageEditor<FileType extends AbstractFile>({
  file,
  editedImageBase64,
  onChange,
}: ImageEditorProps<FileType>) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const ext = fileExtension(file.name);

  const [svgString, setSvgString] = useState("");
  useEffect(() => {
    if (ext === "svg") {
      if (editedImageBase64) {
        setSvgString(atob(editedImageBase64.split(",")[1]));
      } else {
        setSvgString("");
        fetch(getAssetURL(file.asset!), { mode: "cors", cache: "reload" })
          .then((res) => res.text())
          .then((svg) => setSvgString(svg));
      }
    }
  }, [editedImageBase64, ext, file]);

  if (ext === "svg") {
    return (
      svgString && (
        <Provider store={store}>
          <IntlProvider>
            <PaintEditor
              image={svgString}
              imageId={file.id}
              imageFormat="svg"
              rotationCenterX={0}
              rotationCenterY={0}
              rtl={false}
              onUpdateImage={(
                unknownBoolean: boolean,
                svg: string,
                centerX: number,
                centerY: number,
              ) => {
                // Encode SVG as base64-encoded file
                onChange(`data:image/svg+xml;base64,${btoa(svg)}`);
              }}
              name={file.name}
              onUpdateName={console.log}
              // zoomLevelId={file.id}
            />
          </IntlProvider>
        </Provider>
      )
    );
  }

  if (imageFileExtensions.includes(ext)) {
    return (
      <div className="absolute left-0 top-0 grid h-full w-full grid-rows-[1fr,auto] bg-gray-100">
        <div className="flex items-center justify-center">
          <img
            key={file.id}
            ref={(el) => setImage(el)}
            src={getAssetURL(file.asset!)}
            alt={`Image file ${file.path}`}
            className="border border-gray-300 bg-gray-200"
            style={{
              backgroundImage:
                "linear-gradient(45deg, white 25%, transparent 25%), linear-gradient(-45deg, white 25%, transparent 25%), linear-gradient(45deg, transparent 75%, white 75%), linear-gradient(-45deg, transparent 75%, white 75%)",
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
            }}
          />
        </div>
        <div className="bg-gray-200 px-2 py-1 text-sm">
          Size: {image?.width}x{image?.height}
        </div>
      </div>
    );
  }

  return <div>Unsupported file type: {ext}</div>;
}
