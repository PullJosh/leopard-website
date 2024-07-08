"use client";

import dynamic from "next/dynamic";

const ScratchBlocks = dynamic(() => import("./ScratchBlocksInner"), {
  ssr: false,
});

export default ScratchBlocks;

interface InlineBlockProps {
  children: string;
}

export function InlineBlock({ children }: InlineBlockProps) {
  return (
    <ScratchBlocks inline={true} scale={0.6} className="-my-3 align-middle">
      {children}
    </ScratchBlocks>
  );
}
