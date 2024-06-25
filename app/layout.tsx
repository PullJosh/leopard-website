import "../tailwind.css";

import AccountModal from "../components/AccountModal";
import { SessionProvider } from "../components/SessionProvider";
import TopBorder from "../components/TopBorder";
import { Toasts, ToastsProvider } from "../components/Toasts";
import { cookies } from "next/headers";
import { getUser, sessionTokenCookieName } from "../lib/getUser";

export const metadata = {
  title: {
    template: "%s | Leopard",
    default: "Leopard",
  },
  description: "Convert Scratch projects to JavaScript",
};

/*
  Almost all pages in this app are server rendered, so we're okay with making the root
  layout server rendered as well. This removes the possibility of having purely static
  pages, but that's an acceptable tradeoff.
*/

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Let's fetch the user session data on the server so that it's available immediately
  // on the first page load.
  const token = cookies().get(sessionTokenCookieName)?.value;
  const user = await getUser(token);

  return (
    <html lang="en">
      <body>
        <SessionProvider serverUser={user}>
          <ToastsProvider>
            <AccountModal>
              <TopBorder />
              {children}
              <Toasts />
            </AccountModal>
          </ToastsProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
