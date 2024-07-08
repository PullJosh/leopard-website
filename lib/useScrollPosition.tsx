"use client";

import { useCallback, useEffect, useState } from "react";

export function useScrollPosition(ref?: React.RefObject<HTMLElement>) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const onScroll = useCallback(() => {
    if (ref?.current) {
      setScrollPosition(ref.current.scrollTop);
    } else {
      setScrollPosition(window.scrollY);
    }
  }, [ref]);

  useEffect(() => {
    if (ref?.current) {
      const elem = ref.current;
      elem.addEventListener("scroll", onScroll);
      return () => elem.removeEventListener("scroll", onScroll);
    } else {
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [ref, onScroll]);

  return scrollPosition;
}
