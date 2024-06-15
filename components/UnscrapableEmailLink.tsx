"use client";

/*
  I want to add a mailto link to the page, but I don't want the email address to be scraped by bots.
  Let's encode the email address with base64 so that it doesn't appear anywhere in the code or on the
  page, and only decode it when the link is clicked.
*/

interface UnscrapableEmailLinkProps {
  base64EncodedEmail: string;
  subject?: string;
  body?: string;
  children: React.ReactNode;
  className?: string;
}

export function UnscrapableEmailLink({
  base64EncodedEmail,
  subject = "",
  body = "",
  children,
  className,
}: UnscrapableEmailLinkProps) {
  return (
    <a
      href="#"
      className={className}
      onClick={(event) => {
        const emailAddress = atob(base64EncodedEmail);
        let mailto = `mailto:${emailAddress}`;
        if (subject) {
          mailto += `?subject=${encodeURIComponent(subject)}`;
        }
        if (body) {
          mailto += `${subject ? "&" : "?"}body=${encodeURIComponent(body)}`;
        }
        event.currentTarget.href = mailto;
      }}
    >
      {children}
    </a>
  );
}
