import { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcrypt";

import { setSessionTokenCookie } from "../../lib/setSessionTokenCookie";
import { createUserSession } from "../../lib/createUserSession";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function signIn(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
  });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(400).json({
      message: "Your username or password is incorrect",
    });
  }

  const session = await createUserSession(user.id);
  return setSessionTokenCookie(res, session).status(200).json({ user });
}
