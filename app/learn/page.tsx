import Link from "next/link";

export default function LearnPage() {
  return (
    <>
      <div className="prose">
        <h1>JavaScript for Scratchers</h1>
        <p className="lead">
          If you already know Scratch, you might be ready to level up your
          programming skills and learn JavaScript.
        </p>

        <h2>Why learn JavaScript?</h2>
        <p>
          Scratch is extremely limited. Your project is confined to a 480x360
          window, you can only use the blocks that are provided to you, and
          Scratch's variables, lists, and custom blocks are not powerful enough
          to easily build great projects.
        </p>
        <p>
          In contrast, JavaScript is the most popular programming language in
          the world and it is vastly more capable. JavaScript is the coding
          language that is used to power the interactive parts of every webpage
          on the internet. And that's a big deal, because more and more of our
          apps run in web browsers every year. Even many native apps are{" "}
          <Link href="https://www.electronjs.org/">
            powered by web technologies
          </Link>
          .
        </p>
        <p>
          If you want to make a game, app, or website, JavaScript is an
          excellent tool for the job. This tutorial will teach you how.
        </p>

        <Link href="/learn/differences-between-scratch-and-javascript">
          Up next: Differences between Scratch and JavaScript
        </Link>
      </div>
    </>
  );
}
