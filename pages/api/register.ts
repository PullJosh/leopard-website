import { NextApiRequest, NextApiResponse } from "next";
import { validatePassword, validateUsername } from "../../lib/validateUserInfo";
import bcrypt from "bcrypt";
import zod from "zod";

import { setSessionTokenCookie } from "../../lib/setSessionTokenCookie";
import { createUserSession } from "../../lib/createUserSession";

import prisma from "../../lib/prisma";

const registerSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  over13: zod.boolean(),
});

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body = registerSchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({
      message: "Invalid request body",
      errors: body.error.errors,
    });
  }

  const { username, password, over13 } = body.data;

  if (!over13) {
    return res.status(400).json({
      message: "You must be over 13 to register",
    });
  }

  // if (!tos) {
  //   return res.status(400).json({
  //     message: "You must accept the terms of service to register",
  //   });
  // }

  const usernameErrors = validateUsername(username);
  if (usernameErrors.length > 0) {
    return res.status(400).json({
      message: `Invalid username (${usernameErrors.join(";")})`,
    });
  }

  const passwordErrors = validatePassword(password);
  if (passwordErrors.length > 0) {
    return res.status(400).json({
      message: `Invalid password (${passwordErrors.join(";")})`,
    });
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
  });

  if (existingUser) {
    if (await bcrypt.compare(password, existingUser.passwordHash)) {
      const session = await createUserSession(existingUser.id);
      return setSessionTokenCookie(res, session)
        .status(200)
        .json({ user: existingUser });
    }

    return res.status(400).json({
      message:
        "A user with that username already exists. Did you mean to sign in instead?",
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        passwordHash: await bcrypt.hash(password, 10),
        username,
      },
    });

    let expires = new Date();
    expires.setDate(expires.getDate() + 14);

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        token: crypto.randomUUID(), // No reason why this needs to be a UUID. It's just an easy random string to generate.
        expires,
      },
    });

    return setSessionTokenCookie(res, session).status(200).json({ user });
  } catch (err) {
    console.error("Error on /register:", err);
    res.status(500).json({ message: "An unknown error occurred" });
  }
}
