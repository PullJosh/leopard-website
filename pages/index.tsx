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
            scratch-js is a javascript library for making games that is designed
            to closely mimic{" "}
            <a href="https://scratch.mit.edu/" target="_blank">
              Scratch
            </a>
            .
          </p>

          <img
            src="/translation-example.png"
            alt="Example of Scratch blocks translated to Javascript"
          />
        </div>
      </header>

      <div className="center">
        <Preview id={id} />
        <p style={{ color: "hsl(354, 85%, 44%)" }}>
          <b>Warning:</b> Most projects still won't work, but relatively simple
          Scratch 3.0 creations should translate just fine. You can even
          translate unshared projects, if you'd like. Have fun! ;)
        </p>
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
