import Link from "next/link";
import ScratchBlocks, { InlineBlock } from "../../../components/ScratchBlocks";

export default function LearnPage() {
  return (
    <div className="prose">
      <h1>How do I create a Leopard project?</h1>
      <p className="lead">
        If you already know Scratch and want to learn JavaScript, Leopard is the
        perfect tool to do it.
      </p>

      <h2>Automatic Conversion</h2>
      <p>
        The easiest way to get started with Leopard is to use the automatic
        translator. Visit the{" "}
        <Link href="https://leopardjs.com/">Leopard homepage</Link> and enter
        the URL of a Scratch project.
      </p>
    </div>
  );
}
