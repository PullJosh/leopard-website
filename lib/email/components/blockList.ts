import { EmailContent } from "../sendEmail";

export function blockListComponent(blocks: EmailContent[]): EmailContent {
  return {
    html: blocks.map((child) => child.html).join(""),
    text: blocks.map((child) => child.text).join("\n\n"),
  };
}
