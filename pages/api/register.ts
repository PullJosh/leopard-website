import { NextApiRequest, NextApiResponse } from "next";
import {
  validateBirthdayMonth,
  validatePassword,
  validateUsername,
} from "../../lib/validateUserInfo";
import bcrypt from "bcrypt";
import zod from "zod";

import { setSessionTokenCookie } from "../../lib/setSessionTokenCookie";

import prisma from "../../lib/prisma";
import { sendEmail } from "../../lib/email/sendEmail";
import { emailAddressVerificationTemplate } from "../../lib/email/templates/emailAddressVerification";

const registerSchema = zod.object({
  email: zod.string().email(),
  username: zod.string(),
  password: zod.string(),
  birthday: zod.string(),
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

  const { email, username, password, birthday } = body.data;

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

  // `validateBirthdayMonth` also checks if the user is at least 13 years old
  const birthdayErrors = validateBirthdayMonth(birthday);
  if (birthdayErrors.length > 0) {
    return res.status(400).json({
      message: `Invalid birthday (${birthdayErrors.join(";")})`,
    });
  }

  const existingUsernameUser = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
      },
    },
  });

  if (existingUsernameUser) {
    return res.status(400).json({
      message:
        "A user with that username already exists. Did you mean to sign in instead?",
    });
  }

  const existingEmailAddress = await prisma.emailAddress.findFirst({
    where: {
      address: {
        equals: email,
      },
    },
  });

  if (existingEmailAddress) {
    return res.status(400).json({
      message:
        "A user with that email address already exists. Did you mean to sign in instead?",
    });
  }

  try {
    const verificationToken = crypto.randomUUID();

    const user = await prisma.user.create({
      data: {
        passwordHash: await bcrypt.hash(password, 10),
        username,
        birthdayMonth: new Date(birthday),
        emails: {
          create: [
            {
              address: email,
              verificationToken,
              verificationSentAt: new Date(),
            },
          ],
        },
      },
    });

    // Send verification email
    await sendEmail({
      to: [email],
      ...emailAddressVerificationTemplate({
        username,
        verificationURL: `/verify-email?token=${verificationToken}`,
      }),
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
