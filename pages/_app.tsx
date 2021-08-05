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

  return (
    <>
      <style jsx global>
        {`
          * {
            box-sizing: border-box;
          }

          ::selection {
            background: hsl(243, 94%, 66%);
            color: #fff;
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
