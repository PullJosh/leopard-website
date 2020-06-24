import Link from "next/link";

import Preview from "../components/Preview";
import Footer from "../components/Footer";

function Index({ id }) {
  return (
    <div className="Page">
      <header className="header">
        <div className="center">
          <nav className="nav">
            <h1 className="site-title">
              <Link href="/">
                <a>scratch-js</a>
              </Link>
            </h1>
            <Link href="/docs/motion">
              <a className="nav-link">Docs</a>
            </Link>
          </nav>
          <p>
            scratch-js converts your{" "}
            <a href="https://scratch.mit.edu/" target="_blank">
              Scratch
            </a>{" "}
            projects to JavaScript!
          </p>
          <img
            src="/translation-example.png"
            alt="Example of Scratch blocks translated to Javascript"
          />
          <p style={{ fontSize: "0.8em" }}>
            Scratch is great, but it can be limiting. With JavaScript, you
            get...
            <ul>
              <li>
                <b>Features:</b> Cool tricks that Scratch just can't do.
              </li>
              <li>
                <b>Speed:</b> Faster projects let you do more.
              </li>
              <li>
                <b>Publishing options:</b> Run your projects on <i>any</i>{" "}
                website, not just Scratch.
              </li>
            </ul>
          </p>
        </div>
      </header>

      <div className="center">
        <Preview id={id} />
        <Footer />
      </div>

      <style jsx global>
        {`
          body {
            margin: 0;
            overflow-x: hidden;
            background: hsl(210, 36%, 96%);
            font-size: 20px;
          }
        `}
      </style>
      <style jsx>
        {`
          .header {
            background: #fff;
            border-top: 8px solid hsl(243, 94%, 66%);
            padding: 16px;
            color: hsl(209, 28%, 39%);

            padding-bottom: calc(96px + 16px);
            margin-bottom: -96px;
          }

          .header + .center {
            background: hsl(210, 36%, 96%);
            border-radius: 16px;
          }

          .center {
            box-sizing: content-box;
            max-width: 480px;
            padding: 32px;
            margin: 0 auto;
          }

          .nav {
            display: flex;
            align-items: center;
          }

          .site-title {
            margin-right: auto;
          }
          .site-title a {
            color: hsl(211, 39%, 23%);
            text-decoration: none;
          }
          .site-title a:hover,
          .site-title a:focus {
            text-decoration: underline;
          }

          .Page img {
            margin-left: 50%;
            transform: translateX(-50%);
          }
        `}
      </style>
    </div>
  );
}

Index.getInitialProps = ({ query }) => {
  let { id } = query;
  if (id === undefined) {
    id = null;
  } else {
    id = parseInt(id, 10);
  }
  return { id };
};

export default Index;
