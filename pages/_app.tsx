import { useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import { SessionProvider } from "../components/SessionProvider";
import AccountModal from "../components/AccountModal";

import "../tailwind.css";

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

  return (
    <SessionProvider>
      <AccountModal>
        <Component {...pageProps} />
      </AccountModal>
    </SessionProvider>
  );
}
