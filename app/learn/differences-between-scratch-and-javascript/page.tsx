import ScratchBlocks, { InlineBlock } from "../../../components/ScratchBlocks";

import dynamic from "next/dynamic";
const ReadonlyCodeDemo = dynamic(
  () => import("../../../components/ReadonlyCodeDemo"),
  { ssr: false },
);

import NoCat from "../../../public/learn/no-cat.png";
import Image from "next/image";
import { Code } from "../../../components/Code";

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

      <h2 className="clear-both">JavaScript does not have sprites</h2>
      <Image
        src={NoCat}
        alt="Crossed out Scratch Cat"
        className="float-right m-4"
      />
      <p>
        JavaScript is used to add interactive functionality to websites. Instead
        of using <em>sprites</em> to display content on screen, the content that
        appears on a webpage is written in a special language called HTML.
      </p>
      <p>
        HTML has many different "elements". For example, the{" "}
        <code>&lt;button&gt;</code> element is used to create a button, the{" "}
        <code>&lt;img /&gt;</code> element is used to create an image, and the{" "}
        <code>&lt;a&gt;</code> element to create a link.
      </p>
      <p>
        JavaScript can take these elements and make them interactive. The
        following HTML code sets up a button and the JavaScript code pops up a
        message when you click it.
      </p>
      <ReadonlyCodeDemo
        className="my-8"
        html={`<button id="myButton">Click me</button>`}
        js={`const myButton = document.getElementById("myButton");

myButton.addEventListener("click", () => {
  alert("You clicked the button!");
});`}
      />
      <p>
        Additionally, if you want to change the way something looks, you can{" "}
        <strong className="font-semibold">style</strong> it using{" "}
        <em>another</em> language called CSS.
      </p>

      <ReadonlyCodeDemo
        className="my-8"
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

      <h2>
        To create a game, use the <code>&lt;canvas&gt;</code> element
      </h2>
      <p>
        One of the most powerful HTML elements is the canvas. A canvas is a
        rectangular space where you can draw anything (just like a real canvas!)
      </p>
      <p>
        This code sets up a canvas element and then uses JavaScript to draw a
        rectangle, a circle, and some words.
      </p>
      <ReadonlyCodeDemo
        className="my-8"
        html={`<canvas id="myCanvas" />`}
        js={`const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Black rectangle
ctx.fillRect(10, 10, 100, 100);

// Red circle
ctx.fillStyle = "red";
ctx.beginPath();
ctx.arc(150, 100, 50, 0, Math.PI * 2);
ctx.fill();

// Blue text
ctx.fillStyle = "blue";
ctx.font = "16px Arial";
ctx.fillText("Hello, world!", 150, 30);`}
        previewCSS={`canvas { border: 1px solid black; }`}
      />
      <p>
        Notice that the JavaScript code runs instantly, so you don't see the
        drawing process happen. You only see the final product.
      </p>
      <p>
        Building a game using canvas is sort of like making a Scratch game using
        only pen blocks. Nothing appears on the canvas unless you manually draw
        it yourself using code.
      </p>

      <h2>JavaScript code is just one big script</h2>
      <p>
        In Scratch, your project can have lots of different scripts. You might
        have multiple “when green flag clicked” blocks spread out across many
        different sprites, and you could end up with lots of separate “forever”
        loops running at once.
      </p>
      <p>
        JavaScript works differently. The main, default behavior is to have one
        script that does everything. There aren't separate scripts that belong
        to particular sprites. Instead, the one big script is able to manipulate
        everything on the page simultaneously. You can change the text of one
        element and the color of another in a single piece of code.
      </p>
      <ReadonlyCodeDemo
        className="my-8"
        html={`<h1>Old title</h1>
<p>This is a paragraph.</p>`}
        js={`// Change the title from "Old title" to "New title created by JS"
const header = document.querySelector("h1");
header.textContent = "New title created by JS";

// Change the paragraph color to red
const paragraph = document.querySelector("p");
paragraph.style.color = "red";`}
        previewCSS={`canvas { border: 1px solid black; }`}
      />
      <p>
        If you want to do multiple things simultaneously in JavaScript, you can
        use "event listeners". Event listeners are sort of like hat blocks, but
        they are created and removed dynamically. It's kinda like this:
      </p>
      <div className="not-prose grid items-start md:grid-cols-2">
        <ScratchBlocks scale={0.8}>{`
        when gf clicked // When the button is clicked, show a message
        when [My Button v] clicked ({ do stuff :: custom } @addInput:: grey ring) :: events

        define do stuff
        say [You clicked the button!]
      `}</ScratchBlocks>
        <div className="overflow-auto rounded-md bg-gray-200 px-4 py-2">
          <Code className="text-sm">{`const myButton = document.getElementById("myButton");

// When the button is clicked, show a message
myButton.addEventListener("click", doStuff);

function doStuff() {
  alert("You clicked the button!");
}`}</Code>
        </div>
      </div>
      <p>
        Additionally, if you don't want to write all of your code in one huge
        file, JavaScript allows you to split up your code into multiple tabs and
        "import" code from one file to another. Unlike Scratch, which has one
        code tab per sprite and runs each script{" "}
        <em>for its particular sprite</em>, JavaScript doesn't really care which
        file you put your code in. The way you split your code up mostly comes
        down to personal preference.
      </p>

      <h2>Leopard makes JavaScript more like Scratch</h2>
      <p>
        If you're anything like me, facing all these differences for the first
        time is overwhelming. There needs to be an easier way to get started
        with JavaScript.
      </p>
      <p>
        That's why we created Leopard. Leopard is a tool that helps you write
        JavaScript code in a way that feels familiar if you already know
        Scratch.
      </p>
      <p>With Leopard, you can…</p>
      <ul>
        <li>
          Easily create a <code>&lt;canvas&gt;</code> game just like you would
          in Scratch
        </li>
        <li>
          <strong className="font-semibold">Automatically</strong> convert your
          Scratch projects to JavaScript code
        </li>
        <li>Create sprites in JavaScript, just like in Scratch</li>
        <li>
          Turn each Scratch block into an equivalent JavaScript method (for
          example, <InlineBlock>move (10) steps</InlineBlock> becomes{" "}
          <code>this.move(10)</code>)
        </li>
        <li>
          Write multiple scripts that run simultaneously, just like Scratch.
          (For example, you can have multiple forever loops running at once.)
        </li>
      </ul>
      <p>
        When you create a Leopard project, you are really making a web page with
        HTML, CSS, and JavaScript. But we help you out by automatically setting
        up a canvas and creating a Leopard project (which works just like a
        Scratch project) on it. If you're happy working on a 480x360 grid then
        that's all you need to do. But if you want to do more, you have the full
        power of the web at your fingertips.
      </p>
      <p>
        Leopard is designed to be a transition tool. It's the perfect on-ramp
        from Scratch to JavaScript. If you know Scratch but want to learn
        JavaScript, try creating projects with Leopard. You'll learn a ton, and
        soon you'll find yourself breaking out of the boundaries of Scratch to
        do things that were never possible before. And the Leopard community
        will be here to support you through the entire process.
      </p>
    </div>
  );
}
