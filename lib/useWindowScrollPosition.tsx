"use client";

import { useCallback, useEffect, useState } from "react";

export function useWindowScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const onScroll = useCallback(() => {
    setScrollPosition(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return scrollPosition;
}
