"use client";

import { useCallback, useState } from "react";
import classNames from "classnames";

interface JSTranslationsReferencePageProps {
  palettes: {
    name: string;
    color: string;
    children: React.ReactNode;
  }[];
}

export function JSTranslationsReferencePanel({
  palettes,
}: JSTranslationsReferencePageProps) {
  const [palette, setPalette] = useState<string>(palettes[0].name);
  const [open, setOpen] = useState(false);

  const togglePalette = useCallback(
    (name: string) => {
      if (open) {
        if (palette === name) {
          setOpen(false);
        } else {
          setPalette(name);
        }
      } else {
        setPalette(name);
        setOpen(true);
      }
    },
    [open, palette],
  );

  return (
    <>
      <div className="border-b border-gray-300 bg-gray-100">
        <div className="flex flex-wrap">
          {palettes.map((p) => (
            <PaletteTab
              key={p.name}
              color={p.color}
              selected={palette === p.name && open}
              onClick={() => togglePalette(p.name)}
            >
              {p.name}
            </PaletteTab>
          ))}

          <button
            className="ml-auto px-2 text-gray-600 hover:bg-gray-200 active:bg-gray-300"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="overflow-y-auto">
        {open && palettes.find((p) => p.name === palette)!.children}
      </div>
    </>
  );
}

interface PaletteTabProps {
  children: React.ReactNode;
  color: string;
  selected?: boolean;
  onClick?: () => void;
}

function PaletteTab({
  children,
  color,
  selected = false,
  onClick,
}: PaletteTabProps) {
  return (
    <button
      className="group relative block px-4 py-2 text-sm font-medium"
      style={{ color }}
      onClick={onClick}
    >
      <div
        className={classNames("absolute inset-0", {
          "opacity-0 group-hover:opacity-10": !selected,
          "opacity-20": selected,
        })}
        style={{ background: color }}
      />
      <div className="relative">{children}</div>
      {selected && (
        <div
          className="absolute bottom-0 left-4 right-4 h-1 rounded-t-full"
          style={{ backgroundColor: color }}
        />
      )}
    </button>
  );
}
