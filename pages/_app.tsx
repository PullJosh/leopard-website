import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";

import "../tailwind.css";

export default function MyApp({ Component, pageProps }) {
  // Log route changes to Google Analytics
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}
