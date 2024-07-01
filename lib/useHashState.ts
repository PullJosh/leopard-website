"use client";

import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export function useHashState<T>(
  defaultValue: T,
  encode: (value: T) => string,
  decode: (str: string) => T,
) {
  const [hash, setHashState] = useState<string>(() => encode(defaultValue));

  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) setHashState(decodeURIComponent(hash.slice(1)));

    window.addEventListener("hashchange", () => {
      setHashState(decodeURIComponent(window.location.hash.slice(1)));
    });
    router.events.on("hashChangeComplete", () => {
      setHashState(decodeURIComponent(window.location.hash.slice(1)));
    });
  }, [router]);

  const setHash = (newHash: string) => {
    window.location.hash = newHash;
    router.push(window.location.hash, undefined, { shallow: true });
    setHashState(newHash);
  };

  const value = useMemo(() => decode(hash), [decode, hash]);
  const setValue = (newValue: T) => setHash(encode(newValue));

  return [value, setValue] as const;
}
