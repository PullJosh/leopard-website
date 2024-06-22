import { EmailContent, EmailTemplateOutput } from "../emailUtils";

// We include all the CSS for every component in every email
import { CSS as documentCSS } from "../components/document";
import { CSS as buttonCSS } from "../components/button";

const CSS = [documentCSS, buttonCSS].join("\n\n");

interface BaseTemplateOptions {
  subject: string;
  content: EmailContent;
}

export function baseTemplate({
  subject,
  content,
}: BaseTemplateOptions): EmailTemplateOutput {
  return {
    subject: subject,
    content: {
      text: content.text,
      html: `<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>${subject}</title>
    <style>${CSS}</style>
  </head>
  <body class="">
    ${content.html}
  </body>
</html>`,
    },
  };
}
