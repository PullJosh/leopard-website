import DocsPage from "../../components/DocsPage";
import PaletteHeader from "../../components/PaletteHeader";
import Translation, { TranslationGrid } from "../../components/Translation";

export default function Control() {
  return (
    <DocsPage palette="Control">
      <>
        <PaletteHeader>Control</PaletteHeader>
        <TranslationGrid>
          <h3>Wait seconds</h3>
          <Translation blockImg="control/waitSeconds.svg">
            yield* this.wait(1);
          </Translation>

          <h3>Repeat</h3>
          <Translation blockImg="control/repeat.svg">
            {`for (let i = 0; i < 10; i++) {\n  // do something fun here\n  yield;\n}`}
          </Translation>

          <h3>Forever</h3>
          <Translation blockImg="control/forever.svg">
            {`while (true) {\n  // do something fun here\n  yield;\n}`}
          </Translation>

          <h3>If</h3>
          <Translation blockImg="control/if.svg">
            {`if (/* condition */) {\n  // do something fun (maybe)\n}`}
          </Translation>

          <h3>If else</h3>
          <Translation blockImg="control/ifElse.svg">
            {`if (/* condition */) {\n  // do something fun (maybe)\n} else {\n  // otherwise do something else\n}`}
          </Translation>

          <h3>Wait until</h3>
          <Translation blockImg="control/waitUntil.svg">
            {`while (!(/* condition */)) { yield; }`}
          </Translation>

          <h3>Repeat until</h3>
          <Translation blockImg="control/repeatUntil.svg">
            {`while (!(/* condition */)) {\n  // do something fun here\n  yield;\n}`}
          </Translation>

          <h3>Stop</h3>
          <Translation blockImg="control/stopAll.svg" />
          <Translation blockImg="control/stopThisScript.svg">
            return;
          </Translation>
          <Translation blockImg="control/stopOtherScripts.svg" />

          <h3>When I start as a clone</h3>
          <Translation blockImg="control/whenIStartAsClone.svg">
            new Trigger(Trigger.CLONE_START, this.myScript) // See "events" for
            more info about hat blocks
          </Translation>

          <h3>Create clone</h3>
          <Translation blockImg="control/createCloneOfMyself.svg">
            this.createClone();
          </Translation>
          <Translation blockImg="control/createCloneOfSprite.svg">
            this.sprites.sprite1.createClone();
          </Translation>

          <h3>Delete this clone</h3>
          <Translation blockImg="control/deleteThisClone.svg">
            this.deleteThisClone();
          </Translation>
        </TranslationGrid>
      </>
    </DocsPage>
  );
}
