import { remToPx, theme, EmailContent } from "../emailUtils";

interface DocumentComponentOptions {
  logo: {
    href: string;
    src: string;
    alt: string;
    height?: number;
  };
  content: EmailContent;
  footer: EmailContent;
  previewText: string; // The text that will be displayed in the email client's preview
}

export function documentComponent({
  logo,
  content,
  footer,
  previewText,
}: DocumentComponentOptions): EmailContent {
  const html = `<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
  <tr>
    <td>&nbsp;</td>
    <td class="container">
      <div class="header">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td class="align-center">
              <a href="${logo.href}"><img src="${logo.src}" height="${
                logo.height ?? 40
              }" alt="${logo.alt}"></a>
            </td>
          </tr>
        </table>
      </div>
      <div class="content">

        <!-- START CENTERED WHITE CONTAINER -->
        <span class="preheader">${previewText}</span>
        <table role="presentation" class="main">

          <!-- START MAIN CONTENT AREA -->
          <tr>
            <td class="wrapper">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    ${content.html}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        <!-- END MAIN CONTENT AREA -->
        </table>

        <!-- START FOOTER -->
        <div class="footer">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td class="content-block">
                ${footer.html}
              </td>
            </tr>
          </table>
        </div>
        <!-- END FOOTER -->

      <!-- END CENTERED WHITE CONTAINER -->
      </div>
    </td>
    <td>&nbsp;</td>
  </tr>
</table>`;

  return {
    html,
    text: `${content.text}\n\n\n${footer.text}`,
  };
}

export const CSS = `/* -------------------------------------
  GLOBAL RESETS
------------------------------------- */

img {
  border: none;
  -ms-interpolation-mode: bicubic;
  max-width: 100%; 
}

body {
  background-color: ${theme.colors.gray[200]};
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
  padding: 0;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%; 
}

table {
  border-collapse: separate;
  mso-table-lspace: 0pt;
  mso-table-rspace: 0pt;
  min-width: 100%;
  width: 100%; }
  table td {
    font-family: sans-serif;
    font-size: 14px;
    vertical-align: top; 
}

/* -------------------------------------
  BODY & CONTAINER
------------------------------------- */

.body {
  background-color: ${theme.colors.gray[200]};
  width: 100%; 
}

/* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
.container {
  display: block;
  Margin: 0 auto !important;
  /* makes it centered */
  max-width: 580px;
  padding: 10px;
  width: 580px; 
}

/* This should also be a block element, so that it will fill 100% of the .container */
.content {
  box-sizing: border-box;
  display: block;
  Margin: 0 auto;
  max-width: 580px;
  padding: 10px; 
}

/* -------------------------------------
  HEADER, FOOTER, MAIN
------------------------------------- */
.main {
  background: #ffffff;
  border-radius: ${remToPx(theme.borderRadius.lg)};
  width: 100%; 
}

.header {
  padding: 20px 0;
}

.wrapper {
  box-sizing: border-box;
  padding: 20px; 
}

.content-block {
  padding-bottom: 10px;
  padding-top: 10px;
}

.footer {
  clear: both;
  Margin-top: 10px;
  text-align: center;
  width: 100%; 
}
.footer td,
.footer p,
.footer span,
.footer a {
  color: #9a9ea6;
  font-size: 12px;
  text-align: center; 
}

/* -------------------------------------
  TYPOGRAPHY
------------------------------------- */
h1,
h2,
h3,
h4 {
  color: #06090f;
  font-family: sans-serif;
  font-weight: 400;
  line-height: 1.4;
  margin: 0;
  margin-bottom: 30px; 
}

h1 {
  font-size: 35px;
  font-weight: 300;
  text-align: center;
  text-transform: capitalize; 
}

p,
ul,
ol {
  font-family: sans-serif;
  font-size: 14px;
  font-weight: normal;
  margin: 0;
  margin-bottom: 15px; 
}
p li,
ul li,
ol li {
  list-style-position: inside;
  margin-left: 5px; 
}

a {
  color: ${theme.colors.indigo[700]};
  text-decoration: underline; 
}

/* -------------------------------------
  OTHER STYLES THAT MIGHT BE USEFUL
------------------------------------- */
.last {
  margin-bottom: 0; 
}

.first {
  margin-top: 0; 
}

.align-center {
  text-align: center; 
}

.align-right {
  text-align: right; 
}

.align-left {
  text-align: left; 
}

.clear {
  clear: both; 
}

.mt0 {
  margin-top: 0; 
}

.mb0 {
  margin-bottom: 0; 
}

.preheader {
  color: transparent;
  display: none;
  height: 0;
  max-height: 0;
  max-width: 0;
  opacity: 0;
  overflow: hidden;
  mso-hide: all;
  visibility: hidden;
  width: 0; 
}

hr {
  border: 0;
  border-bottom: 1px solid #f6f6f6;
  Margin: 20px 0; 
}

/* -------------------------------------
  RESPONSIVE AND MOBILE FRIENDLY STYLES
------------------------------------- */
@media only screen and (max-width: 620px) {
  table[class=body] h1 {
    font-size: 28px !important;
    margin-bottom: 10px !important; 
  }
  table[class=body] p,
  table[class=body] ul,
  table[class=body] ol,
  table[class=body] td,
  table[class=body] span,
  table[class=body] a {
    font-size: 16px !important; 
  }
  table[class=body] .wrapper,
  table[class=body] .article {
    padding: 10px !important; 
  }
  table[class=body] .content {
    padding: 0 !important; 
  }
  table[class=body] .container {
    padding: 0 !important;
    width: 100% !important; 
  }
  table[class=body] .main {
    border-left-width: 0 !important;
    border-radius: 0 !important;
    border-right-width: 0 !important; 
  }
  table[class=body] .img-responsive {
    height: auto !important;
    max-width: 100% !important;
    width: auto !important; 
  }
}

/* -------------------------------------
  PRESERVE THESE STYLES IN THE HEAD
------------------------------------- */
@media all {
  .ExternalClass {
    width: 100%; 
  }
  .ExternalClass,
  .ExternalClass p,
  .ExternalClass span,
  .ExternalClass font,
  .ExternalClass td,
  .ExternalClass div {
    line-height: 100%; 
  }
}`;
