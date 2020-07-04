import DocsPage from "../../components/DocsPage";
import PaletteHeader from "../../components/PaletteHeader";
import Translation, { TranslationGrid } from "../../components/Translation";

export default function MyBlocks() {
  return (
    <DocsPage palette="My Blocks">
      <>
        <PaletteHeader>My Blocks</PaletteHeader>
        <p className="mb-4">
          Custom blocks are created by adding additional methods (scripts) to a
          sprite.
        </p>
        <TranslationGrid>
          <Translation blockImg="myBlocks/customBlockExample.svg">
            {`export default class Sprite1 extends Sprite {
  constructor(...args) { /* ... */ }

  *whenGreenFlagClicked() {
    yield* this.myCustomBlock("hello", 10);
  }

  *myCustomBlock(message, dist) {
    yield* this.sayAndWait(message, 2);
    this.move(dist);
  }
}`}
          </Translation>
        </TranslationGrid>
      </>
    </DocsPage>
  );
}
