import { NextApiRequest } from "next";

import prisma from "./db";

export function getSessionToken(req: NextApiRequest) {
  const token = req.cookies["leopard_session_token"];
  return token;
}

export async function getUser(req: NextApiRequest) {
  const token = getSessionToken(req);

  try {
    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: true,
      },
    });

    return session?.user ?? null;
  } catch (err) {
    return null;
  }
}
