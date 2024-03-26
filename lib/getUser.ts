import { NextApiRequest } from "next";

import prisma from "./prisma";
import type { Prisma } from "@prisma/client";

import { NextRequest } from "next/server";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export function getSessionToken(req: NextRequest | NextApiRequest) {
  const getCookie = (name: string) =>
    (req.cookies instanceof RequestCookies
      ? req.cookies.get(name)?.value
      : req.cookies[name]) ?? undefined;

  const token = getCookie("leopard_session_token");
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

export async function getUser(
  req: NextRequest | NextApiRequest,
): Promise<User | null> {
  const token = getSessionToken(req);

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
