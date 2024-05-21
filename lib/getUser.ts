import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

import prisma from "./prisma";
import type { Prisma } from "@prisma/client";
import { cookies } from "next/headers";

export const sessionTokenCookieName = "leopard_session_token";

export function getSessionToken(req: NextRequest | NextApiRequest) {
  const getCookie = (name: string): string | undefined => {
    try {
      // App router
      return cookies().get(name)?.value ?? undefined;
    } catch (err) {
      // Pages router
      return (req as NextApiRequest).cookies[name] ?? undefined;
    }
  };

  return getCookie(sessionTokenCookieName);
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

  console.log(typeof reqOrToken === "string" || reqOrToken === undefined);
  console.log(token);

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
