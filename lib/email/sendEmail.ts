import { SES } from "aws-sdk";

const ses = new SES({
  region: "us-east-1",
});

interface SendEmailOptions {
  to: string[];
  from?: string;
  subject: string;
  content: {
    text: string;
    html: string;
  };
}

export async function sendEmail({
  to,
  from = "Leopard Support <support@leopardjs.com>",
  subject,
  content,
}: SendEmailOptions) {
  return await ses
    .sendEmail({
      Destination: { ToAddresses: to },
      Source: from,
      Message: {
        Subject: { Data: subject, Charset: "utf-8" },
        Body: {
          Text: { Data: content.text, Charset: "utf-8" },
          Html: { Data: content.html, Charset: "utf-8" },
        },
      },
    })
    .promise();
}
