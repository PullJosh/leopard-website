import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";

import "../tailwind.css";
import AccountModal from "../components/AccountModal";

interface User {
  id: string;
  username: string;
}

function useUser() {
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

  return { user, setUser, refetchUser };
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

export function useSession() {
  return useContext(SessionContext);
}

export default function MyApp({ Component, pageProps }: AppProps) {
  // Log route changes to Google Analytics
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const { user, setUser, refetchUser } = useUser();

  return (
    <SessionContext.Provider value={{ user, setUser, refetchUser }}>
      <AccountModal>
        <Component {...pageProps} />
      </AccountModal>
    </SessionContext.Provider>
  );
}
