"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export interface User {
  id: string;
  username: string;
}

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
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const fetching = useRef(false);
  const refetchUser = useCallback(async () => {
    if (fetching.current) return;

    fetching.current = true;
    const res = await fetch("/api/me").then((res) => res.json());
    setUser(res.user);
    fetching.current = false;
  }, []);

  useEffect(() => {
    refetchUser();
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
