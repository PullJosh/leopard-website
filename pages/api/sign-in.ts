import { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcrypt";

import { setSessionTokenCookie } from "../../lib/setSessionTokenCookie";
import { createUserSession } from "../../lib/createUserSession";

import prisma from "../../lib/prisma";
import { isEmailAddress } from "../../lib/validateUserInfo";

export default async function signIn(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email_or_username, password } = req.body;

  if (typeof email_or_username !== "string") {
    return res.status(400).json({
      message: "You must provide an email or username",
    });
  }

  if (typeof password !== "string") {
    return res.status(400).json({
      message: "You must provide a password",
    });
  }

  const user = isEmailAddress(email_or_username)
    ? await prisma.user.findFirst({
        where: {
          emails: {
            some: {
              address: {
                equals: email_or_username,
                mode: "insensitive",
              },
            },
          },
        },
      })
    : await prisma.user.findFirst({
        where: {
          username: {
            equals: email_or_username,
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
