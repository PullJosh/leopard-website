import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

export interface EmailContent {
  text: string;
  html: string;
}

export interface EmailTemplateOutput {
  subject: string;
  content: EmailContent;
}

export const { theme } = resolveConfig(tailwindConfig);
export const remToPx = (rem: string) =>
  `${Number(rem.replace("rem", "")) * 16}px`;
