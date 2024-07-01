import type { EmailTemplateOutput } from "../emailUtils";

import { baseTemplate as base } from "./base";
import { documentComponent as doc } from "../components/document";
import { blockListComponent as blockList } from "../components/blockList";
import { paragraphComponent as p } from "../components/paragraph";
import { buttonComponent as button } from "../components/button";

interface EmailAddressVerificationTemplateOptions {
  username: string;
  verificationURL: string | URL;
}

export function emailAddressVerificationTemplate({
  username,
  verificationURL,
}: EmailAddressVerificationTemplateOptions): EmailTemplateOutput {
  // If `verificationURL` is a relative URL, convert it to an absolute URL
  verificationURL = new URL(verificationURL, process.env.NEXT_PUBLIC_BASE_URL)
    .href;

  return base({
    subject: "Verify your email address - Leopard",
    content: doc({
      previewText:
        "To complete your Leopard registration, please verify your email address by clicking the button below.",
      logo: {
        href: "https://leopardjs.com",
        src: new URL("/email/logo.png", process.env.NEXT_PUBLIC_BASE_URL).href,
        alt: "Leopard",
        height: 60,
      },
      content: blockList([
        p(`Hello ${username},`, "first"),
        p({
          text: `You recently registered for a Leopard account. To complete your registration, please verify your email address by clicking the button below.`,
          html: `<strong>You recently registered for a Leopard account.</strong> To complete your registration, please verify your email address by clicking the button below.`,
        }),
        button("Verify email", verificationURL),
        p({
          text: `Or copy and paste the following link: ${verificationURL}`,
          html: `Or copy and paste the following link: <a href="${verificationURL}">${verificationURL}</a>`,
        }),
        p({
          text: "If you did not register for a Leopard account, you can safely ignore this email.",
          html: "<strong>If you did not register for a Leopard account, you can safely ignore this email.</strong>",
        }),
        p("We're excited to have you!", "last"),
      ]),
      footer: {
        html: "<span>Leopard JS</span>",
        text: "Leopard JS",
      },
    }),
  });
}
