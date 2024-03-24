"use client";

import { WebContainer } from "@webcontainer/api";
import { createContext, useContext, useEffect, useRef, useState } from "react";

type WebContainerState = "booting" | "ready" | "none";

export const WebContainerContext = createContext<{
  webContainer: WebContainer | null;
}>({
  webContainer: null,
});

interface WebContainerProviderProps {
  children: React.ReactNode;
}

export function WebContainerProvider({ children }: WebContainerProviderProps) {
  const [webContainer, setWebContainer] = useState<WebContainer | null>(null);
  const webContainerStatus = useRef<WebContainerState>("none");

  const ready = webContainerStatus.current === "ready";

  useEffect(() => {
    if (webContainerStatus.current === "none") {
      webContainerStatus.current = "booting";
      WebContainer.boot().then((webContainer) => {
        setWebContainer(webContainer);
        webContainerStatus.current = "ready";
      });
    }

    return () => {
      if (ready) {
        webContainer?.teardown();
        webContainerStatus.current = "none";
      }
    };
  }, [ready, webContainer]);

  return (
    <WebContainerContext.Provider value={{ webContainer }}>
      {children}
    </WebContainerContext.Provider>
  );
}

export function useWebContainer() {
  return useContext(WebContainerContext);
}
