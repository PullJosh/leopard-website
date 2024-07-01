"use server";

import { sendEmail } from "../lib/email/sendEmail";
import { emailAddressVerificationTemplate } from "../lib/email/templates/emailAddressVerification";

import prisma from "../lib/prisma";

export async function sendEmailVerification(emailId: string) {
  const emailAddress = await prisma.emailAddress.findUnique({
    where: { id: emailId },
    select: {
      address: true,
      verificationToken: true,
      verificationSentAt: true,
      verified: true,
      user: { select: { username: true } },
    },
  });

  if (!emailAddress) {
    throw new Error("Failed to send verification email (address not found)");
  }

  // Don't send another email if one was sent in the last minute
  if (
    emailAddress.verificationSentAt &&
    emailAddress.verificationSentAt.getTime() > Date.now() - 1000 * 60
  ) {
    throw new Error(
      "A verification email was sent recently. Please wait a minute before sending another.",
    );
  }

  const verificationToken =
    emailAddress.verificationToken ?? crypto.randomUUID();

  await sendEmail({
    to: [emailAddress.address],
    ...emailAddressVerificationTemplate({
      username: emailAddress.user.username,
      verificationURL: `/verify-email?token=${verificationToken}`,
    }),
  });

  const updatedEmailAddress = await prisma.emailAddress.update({
    where: { id: emailId },
    data: { verificationSentAt: new Date(), verificationToken },
  });

  return updatedEmailAddress;
}
