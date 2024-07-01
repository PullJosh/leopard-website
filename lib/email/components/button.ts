import { remToPx, theme, EmailContent } from "../emailUtils";

export function buttonComponent(text: string, href: string): EmailContent {
  return {
    html: `<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
  <tbody>
    <tr>
      <td align="left">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
          <tbody>
            <tr>
              <td> <a href="${href}" target="_blank">${text}</a> </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`,
    text: `${text}: ${href}`,
  };
}

export const CSS = `
/* -------------------------------------
  BUTTONS
------------------------------------- */
.btn {
  box-sizing: border-box;
  min-width: 100%;
  width: 100%;
}
.btn > tbody > tr > td {
  padding-bottom: 15px;
}
.btn table {
  min-width: auto;
  width: auto;
}
.btn table td {
  background-color: #ffffff;
  border-radius: ${remToPx(theme.borderRadius.md)};
  text-align: center; 
}
.btn a {
  background-color: #ffffff;
  border: solid 1px ${theme.colors.indigo[600]};
  border-radius: ${remToPx(theme.borderRadius.md)};
  box-sizing: border-box;
  color: ${theme.colors.indigo[600]};
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  margin: 0;
  padding: 12px 25px;
  text-decoration: none;
  text-transform: capitalize; 
}
.btn-primary table td {
  background-color: ${theme.colors.indigo[600]}; 
}
.btn-primary a {
  background-color: ${theme.colors.indigo[600]};
  border-color: ${theme.colors.indigo[600]};
  color: #ffffff; 
}

/* -------------------------------------
  RESPONSIVE AND MOBILE FRIENDLY BUTTON STYLES
------------------------------------- */
@media only screen and (max-width: 620px) {
  table[class=body] .btn table {
    width: 100% !important;
  }
  table[class=body] .btn a {
    width: 100% !important;
  }
}
`;
