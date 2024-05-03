import { NextApiRequest } from "next";

import prisma from "./prisma";
import type { Prisma } from "@prisma/client";

import { NextRequest } from "next/server";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export const sessionTokenCookieName = "leopard_session_token";

export function getSessionToken(req: NextRequest | NextApiRequest) {
  const getCookie = (name: string) =>
    (req.cookies instanceof RequestCookies
      ? req.cookies.get(name)?.value
      : req.cookies[name]) ?? undefined;

  const token = getCookie(sessionTokenCookieName);
  return token;
}

const userSelect = {
  id: true,
  username: true,
  role: true,
  createdAt: true,

  passwordHash: false,
} satisfies Prisma.UserSelect;

export type User = Prisma.UserGetPayload<{
  select: typeof userSelect;
}>;

type Req = NextRequest | NextApiRequest;
type Token = string | undefined;

export async function getUser(reqOrToken: Req | Token): Promise<User | null> {
  const token =
    typeof reqOrToken === "string" || reqOrToken === undefined
      ? reqOrToken
      : getSessionToken(reqOrToken);

  if (!token) {
    return null;
  }

  try {
    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: {
          select: userSelect,
        },
      },
    });

    return session?.user ?? null;
  } catch (err) {
    return null;
  }
}
