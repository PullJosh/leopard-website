"use client";

import dynamic from "next/dynamic";

const ScratchBlocks = dynamic(() => import("./ScratchBlocks"), { ssr: false });

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
