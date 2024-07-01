import type { Session } from "@prisma/client";
import { NextApiResponse } from "next";

export function setSessionTokenCookie(
  res: NextApiResponse,
  session: Session | null,
): NextApiResponse {
  const cookieName = "leopard_session_token";
  const cookieValue = session?.token ?? "";
  const expires = session ? session.expires : new Date(0);

  let cookie = `${cookieName}=${cookieValue}`;
  cookie += ";HttpOnly";
  if (process.env.NODE_ENV === "production") {
    // In Safari, secure cookies are only sent over HTTPS and
    // do not work on localhost.
    cookie += ";Secure";
  }
  cookie += ";Path=/";
  cookie += `;Expires=${expires.toUTCString()}`;

  return res.setHeader("Set-Cookie", cookie);
}
