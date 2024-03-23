import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
import { setSessionTokenCookie } from "../../lib/setSessionTokenCookie";
const prisma = new PrismaClient();

export default async function signOut(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.cookies["leopard_session_token"];

  await prisma.session.delete({
    where: { token },
  });

  return setSessionTokenCookie(res, null).status(200).json({ user: null });
}
