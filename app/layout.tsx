import "../tailwind.css";

import AccountModal from "../components/AccountModal";
import { SessionProvider } from "../components/SessionProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import TopBorder from "../components/TopBorder";
import { Toasts, ToastsProvider } from "../components/Toasts";
import Link from "next/link";

export const metadata = {
  title: {
    template: "%s | Leopard",
    default: "Leopard",
  },
  description: "Convert Scratch projects to JavaScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ToastsProvider>
            <AccountModal>
              <TopBorder />
              {children}
              <Toasts />
            </AccountModal>
          </ToastsProvider>
        </SessionProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
