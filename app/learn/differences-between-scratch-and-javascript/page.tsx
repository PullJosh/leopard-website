import { InlineBlock } from "../../../components/InlineBlock";

import dynamic from "next/dynamic";
const ReadonlyCodeDemo = dynamic(
  () => import("../../../components/ReadonlyCodeDemo"),
  { ssr: false },
);

export default function LearnPage() {
  return (
    <div className="prose">
      <h1>Major differences between Scratch and JavaScript</h1>
      <p className="lead">
        Scratch and JavaScript are completely different languages that serve
        different purposes, so they work entirely differently.
      </p>
      <p>
        Some Scratch blocks have identical replicas in JavaScript. For example,
        the JavaScript code <code>alert(1 + 1)</code> is a lot like the Scratch
        code <InlineBlock>say ((1) + (1))</InlineBlock>. But in most cases, the
        comparison is not so simple.
      </p>

      <h3>JavaScript does not have sprites</h3>
      <p>
        JavaScript is used to add interactive functionality to websites. Instead
        of using sprites to display content on screen, websites use a separate
        language called HTML to put information on the page. HTML has many
        different "elements". For example, the <code>&lt;button&gt;</code>{" "}
        element is used to create a button, the <code>&lt;img /&gt;</code>{" "}
        element is used to create an image, and the <code>&lt;a&gt;</code>{" "}
        element to create a link.
      </p>
      <p>
        JavaScript can take these elements and make them interactive. For
        example, the following HTML code sets up a button and the JavaScript
        code pops up a message when you click it.
      </p>

      <ReadonlyCodeDemo
        html={`<button id="myButton">Click me</button>`}
        js={`const myButton = document.getElementById("myButton");

myButton.addEventListener("click", () => {
  alert("You clicked the button!");
});`}
      />

      <p>
        Additionally, if you want to change the way something looks, you can
        style it using <strong className="font-semibold">another</strong>{" "}
        language called CSS.
      </p>

      <ReadonlyCodeDemo
        html={`<img\n  src="http://leopardjs.com/leopard-logo.svg"\n  alt="Leopard Logo"\n/>`}
        css={`img {\n rotate: 45deg;\n}`}
        previewCSS={`
          img {
            width: 100px;
            margin: 32px 16;
          }
        `}
      />
      <p>
        If you're making a web application, this style of programming is
        perfect. You can create pages of content with interactive buttons and
        everything works wonderfully. But if you're trying to create a game,
        this doesn't really work.
      </p>
    </div>
  );
}
