import DocsPage from "../../components/DocsPage";

export default function Docs() {
  return (
    <DocsPage>
      <div style={{ maxWidth: 600, fontSize: 18, lineHeight: 1.5 }}>
        <h2>I just downloaded a ZIP. Now what?</h2>
        <p>
          Awesome! When you use the download button on the homepage, you get a
          zipped up copy of the JavaScript source code for your Scratch project.
        </p>
        <p>
          <b>Step 1: Unzip/extract the ZIP.</b> A zip is an entire folder that
          got crunched down into one file. We do this so that you don't have to
          download all of the separate files individually. Unzipping/extracting
          is the process of turning the one file you downloaded back into all of
          the files it was originally meant to be.
        </p>
        <p>
          <b>
            Step 2: Open <code>index.html</code> in a web browser.
          </b>{" "}
          The folder contains a file called <code>index.html</code>. If you open
          it in a browser (like Chrome, Firefox, Safari, Edge, etc...) you would
          expect to see your project. <b>But it doesn't work!</b>
        </p>
        <p>
          <b>Step 3: Be sad that it doesn't work.</b> 😢
        </p>
        <p>
          <b>Step 4: Realize that it's okay!</b> You can solve just about any
          problem you put your mind to, and this is no exception. If you open
          the console in your web browser (right click -> inspect -> console),
          there will be an error that looks something like this:
        </p>
        <pre>
          <code>
            {`Access to script at 'file:///[someplace cool]/index.mjs'
from origin 'null' has been blocked by CORS policy: Cross origin
requests are only supported for protocol schemes: http, data,
chrome, chrome-extension, https.`}
          </code>
        </pre>
        <p>
          If you{" "}
          <a
            href="https://www.google.com/search?q=Access+to+script+at+file+from+origin+%27null%27+has+been+blocked+by+CORS+policy"
            target="_blank"
          >
            search for a bit
          </a>
          , you'll find out that{" "}
          <b>
            we aren't allowed to load scripts with <code>type="module"</code>{" "}
            from local files.
          </b>{" "}
          To fix this, we need to trick the browser into thinking that the files
          you downloaded exist on a server somewhere, not your own computer.
        </p>
        <p>
          <b>
            Step 5: Serve the files on <code>localhost</code>.
          </b>{" "}
          There are lots of ways to do this, and if you already have a method
          you like, then you're certainly welcome to use it! If you don't, I
          recommend{" "}
          <a href="https://zeit.co/download" target="_blank">
            Zeit Now
          </a>
          . To install Now, first you need npm, which{" "}
          <a href="https://www.npmjs.com/get-npm" target="_blank">
            you can get here
          </a>
          . Once npm is ready, run the command{" "}
          <pre>
            <code>npm i -g now</code>
          </pre>{" "}
          in a terminal to install Now. Then, open a terminal{" "}
          <a
            href="https://www.google.com/search?q=how+to+open+a+terminal+in+a+folder"
            target="_blank"
          >
            inside the folder
          </a>{" "}
          you downloaded and unzipped. Once you're there, run the command{" "}
          <pre>
            <code>now dev</code>
          </pre>{" "}
          to start serving the files on localhost. Lastly, visit{" "}
          <a href="http://localhost:3000/" target="_blank">
            http://localhost:3000/
          </a>{" "}
          and everything should be working!
        </p>
        <p>
          <b>Step 6 (bonus): Publish your project.</b> If you send someone the
          localhost link, they won't be able to see what you've done. Remember
          that the files only exist on your computer, and we're just tricking
          your browser into thinking that they are on the internet. Forunately,
          it's easy to publish your project with Now. Simply run the{" "}
          <code>now</code> command instead of <code>now dev</code> and your
          project will be put online! Now will give you a link that you can
          share with all your friends. :)
        </p>
      </div>

      <style jsx>
        {`
          code {
            background: hsl(210, 36%, 96%);
            padding: 2px 4px;
            margin: -2px -4px;
            border-radius: 4px;
          }
          pre > code {
            display: block;
            overflow: auto;
            padding: 8px 16px;
          }
        `}
      </style>
    </DocsPage>
  );
}
