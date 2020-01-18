export default function Footer() {
  return (
    <footer className="footer">
      <a
        className="link"
        href="https://github.com/PullJosh/scratch-js"
        target="_blank"
      >
        scratch-js
      </a>
      <a
        className="link"
        href="https://github.com/PullJosh/sb-edit"
        target="_blank"
      >
        sb-edit
      </a>
      <a
        className="link"
        href="https://github.com/PullJosh/scratch-js-website"
        target="_blank"
      >
        scratch-js-website
      </a>

      <style jsx>
        {`
          .footer {
            margin-top: 16px;
            padding: 16px 0;
            border-top: 1px solid #ddd;
          }
          .link {
            color: #888;
            font-family: monospace;
            font-size: 16px;
            text-decoration: none;
            margin-right: 16px;
          }
          .link:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </footer>
  );
}
