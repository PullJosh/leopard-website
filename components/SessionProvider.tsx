"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { User } from "../lib/getUser";

const SessionContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  refetchUser: () => void;
}>({
  user: null,
  setUser: () => {},
  refetchUser: () => {},
});

interface SessionProviderProps {
  children: React.ReactNode;
  serverUser?: User | null;
}

export function SessionProvider({
  children,
  serverUser = null,
}: SessionProviderProps) {
  const [user, setUser] = useState<User | null>(serverUser);

  const fetching = useRef(false);
  const refetchUser = useCallback(async () => {
    if (fetching.current) return;

    fetching.current = true;
    const res = await fetch("/api/me").then((res) => res.json());
    setUser(res.user);
    fetching.current = false;
  }, []);

  useEffect(() => {
    if (!serverUser) {
      refetchUser();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SessionContext.Provider value={{ user, setUser, refetchUser }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
