import { Session } from "@prisma/client";
import { NextApiResponse } from "next";

export function setSessionTokenCookie(
  res: NextApiResponse,
  session: Session | null,
): NextApiResponse {
  const cookieName = "leopard_session_token";
  const cookieValue = session?.token ?? "";
  const expires = session ? session.expires : new Date(0);

  return res.setHeader(
    "Set-Cookie",
    `${cookieName}=${cookieValue};HttpOnly;Secure;Path=/;Expires=${expires.toUTCString()}`,
  );
}
