"use client";

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
