"use client";

import { useCallback, useMemo, useRef, useState } from "react";

export function useProjectPreview(id: string) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const baseURL = useMemo(
    () => new URL(`/api/preview/${id}/`, process.env.NEXT_PUBLIC_BASE_URL),
    [id],
  );
  const [running, setRunning] = useState(false);

  const start = useCallback(
    (path = "index.html") => {
      if (!iframeRef.current) return;

      iframeRef.current.contentWindow?.location.replace(new URL(path, baseURL));
      setRunning(true);
    },
    [baseURL],
  );

  const stop = useCallback(() => {
    iframeRef.current?.contentWindow?.location.replace("about:blank");
    setRunning(false);
  }, []);

  return [iframeRef, { start, stop, running }] as const;
}
