import { EmailContent } from "../emailUtils";

export function paragraphComponent(
  children: string | EmailContent,
  className?: string,
): EmailContent {
  const html = typeof children === "string" ? children : children.html;
  const text = typeof children === "string" ? children : children.text;

  return {
    html: className ? `<p class="${className}">${html}</p>` : `<p>${html}</p>`,
    text: `${text}`,
  };
}
