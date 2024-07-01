"use client";

import { useEffect, useRef } from "react";

// @ts-ignore Scratchblocks is not typed
import scratchblocks from "scratchblocks";

interface ScratchBlocksProps {
  children: string;
  blockStyle?: string;
  languages?: string[];
  inline?: boolean;
  scale?: number;
}

export default function ScratchBlocks({
  children,
  blockStyle = "scratch3",
  languages = undefined,
  inline = false,
  scale = 1,
  ...props
}: ScratchBlocksProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let options: { style?: string; languages?: string[]; inline?: boolean } =
      {};
    if (blockStyle !== undefined) options.style = blockStyle;
    if (languages !== undefined) options.languages = languages;
    options.inline = inline;

    const doc = scratchblocks.parse(children, options);
    const svg = scratchblocks.render(doc, options);

    svg.setAttribute("width", svg.getAttribute("width") * scale);

    ref.current!.innerHTML = "";
    ref.current!.appendChild(svg);
  }, [blockStyle, languages, scale, children, inline]);

  return <div ref={ref} {...props} />;
}
