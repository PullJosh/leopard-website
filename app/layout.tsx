import "../tailwind.css";

import AccountModal from "../components/AccountModal";
import { SessionProvider } from "../components/SessionProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import TopBorder from "../components/TopBorder";
import Nav, { NavSpace, NavUserInfo } from "../components/Nav";

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
          <AccountModal>
            <TopBorder />
            {children}
          </AccountModal>
        </SessionProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
