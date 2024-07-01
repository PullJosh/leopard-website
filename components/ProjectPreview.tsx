"use client";

import classNames from "classnames";
import { MouseEventHandler, useId } from "react";
import { Tooltip } from "react-tooltip";
import { useProjectPreview } from "../lib/useProjectPreview";

interface GreenFlagButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;

  tooltip?: { text: string; subtext?: string } | null;
}

export function GreenFlagButton({
  onClick,
  disabled,
  className,
  tooltip = null,
}: GreenFlagButtonProps) {
  const tooltipId = useId();

  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        data-tooltip-id={tooltip ? `green-flag-${tooltipId}` : undefined}
        className={classNames(
          "h-9 w-9 rounded-md enabled:hover:bg-gray-300 enabled:active:bg-green-200 disabled:opacity-25",
          className,
        )}
      >
        <img className="h-full w-full" src="/green-flag.svg" alt="Green flag" />
      </button>
      {tooltip && (
        <Tooltip
          className="z-50 !rounded-md !py-1 !pl-2 !pr-1 text-center"
          id={`green-flag-${tooltipId}`}
          place="bottom"
          delayShow={500}
          closeEvents={{
            click: true, // This is the one I actually care about enabling. The rest are just required because I'm overriding the entire `closeEvents` object.
            blur: true,
            dblclick: true,
            mouseleave: true,
            mouseup: true,
          }}
        >
          <div className="flex space-x-2">
            <span>{tooltip.text}</span>
            <span className="flex items-center rounded border border-white/20 px-1 text-xs text-white/40">
              {tooltip.subtext}
            </span>
          </div>
        </Tooltip>
      )}
    </>
  );
}

interface StopButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

export function StopButton({ onClick, disabled, className }: StopButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        "h-9 w-9 rounded-md enabled:hover:bg-gray-300 enabled:active:bg-red-200 disabled:opacity-25",
        className,
      )}
    >
      <img className="h-full w-full" src="/stop-sign.svg" alt="Stop sign" />
    </button>
  );
}

interface GreenFlagOverlayProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export function GreenFlagOverlay({
  onClick,
  className,
}: GreenFlagOverlayProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-800/30",
        className,
      )}
    >
      <img
        className="h-20 w-20 rounded-full border-4 border-white bg-white/50 p-2"
        src="/green-flag.svg"
        alt="Green flag"
      />
    </button>
  );
}

interface ProjectPreviewWithControlsProps {
  projectId: string;
}

export function ProjectPreviewWithControls({
  projectId,
}: ProjectPreviewWithControlsProps) {
  const [previewRef, preview] = useProjectPreview(projectId);

  return (
    <div>
      <GreenFlagButton onClick={() => preview.start()} />
      <StopButton onClick={preview.stop} disabled={!preview.running} />

      <div className="relative overflow-hidden rounded-lg">
        <iframe
          ref={previewRef}
          className="box-content flex-shrink-0 flex-grow-0 rounded-lg border border-gray-300 bg-white"
          width="480"
          height="360"
        />
        {!preview.running && (
          <GreenFlagOverlay onClick={() => preview.start()} />
        )}
      </div>
    </div>
  );
}
