import DocsPage from "../../components/DocsPage";

export default function Docs() {
  return (
    <DocsPage>
      <div style={{ maxWidth: 600, fontSize: 18, lineHeight: 1.5 }}>
        <h2>Get started with scratch-js</h2>
        <p>
          Hey everybody! Eventually I'm going to write a snazzy tutorial for
          getting started with scratch-js. Unfortunately, I'm a pretty lazy guy,
          so that isn't done yet.
        </p>
        <p>
          For now, you can use the translator on the homepage to look at
          examples of generated scratch-js code. There are also example
          translations for every (working) Scratch block available at the links
          above.
        </p>
      </div>
    </DocsPage>
  );
}
