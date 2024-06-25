import type { AppProps } from "next/app";
import { SessionProvider } from "../components/SessionProvider";
import AccountModal from "../components/AccountModal";

import "../tailwind.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <AccountModal>
        <Component {...pageProps} />
      </AccountModal>
    </SessionProvider>
  );
}
