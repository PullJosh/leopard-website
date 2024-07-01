import prisma from "../lib/prisma";

interface CreateUserSessionOptions {
  deleteOtherSessions?: boolean;
  expiryDays?: number;
}

export async function createUserSession(
  userId: string,
  options: CreateUserSessionOptions = {},
) {
  const { deleteOtherSessions = false, expiryDays = 14 } = options;

  if (deleteOtherSessions) {
    await prisma.session.deleteMany({
      where: { userId },
    });
  }

  let expires = new Date();
  expires.setDate(expires.getDate() + expiryDays);

  const session = await prisma.session.create({
    data: {
      userId,
      token: crypto.randomUUID(), // No reason why this needs to be a UUID. It's just an easy random string to generate.
      expires,
    },
  });

  return session;
}
