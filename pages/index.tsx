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
            <Link href="/translations/motion">
              <a className="nav-link">Block Translations</a>
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
        </div>
      </header>

      <div className="content">
        <div className="center">
          <Preview id={id} />

          <h2>Scratch is great, but it can be limiting.</h2>
          <p>
            With JavaScript, you get...
            <ul>
              <li>
                <strong>Features:</strong> Cool tricks that Scratch just can't
                do.
              </li>
              <li>
                <strong>Speed:</strong> Faster projects let you do more.
              </li>
              <li>
                <strong>Publishing options:</strong> Run your projects on{" "}
                <i>any</i> website, not just Scratch.
              </li>
            </ul>
          </p>

          <Footer />
        </div>
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

          .header img {
            margin-left: 50%;
            transform: translateX(-50%);
          }

          .header {
            background: #fff;
            border-top: 8px solid hsl(243, 94%, 66%);
            padding: 16px;
            color: hsl(209, 28%, 39%);

            padding-bottom: calc(96px + 16px);
            margin-bottom: -96px;
          }

          .content {
            color: hsl(209, 28%, 39%);
          }
          .content > .center {
            background: hsl(210, 36%, 96%);
            border-radius: 16px;
          }
          .content h2 {
            font-size: 1.3em;
            color: hsl(209, 34%, 30%);
            margin-top: 2em;
          }
          .content strong {
            color: hsl(209, 34%, 30%);
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
