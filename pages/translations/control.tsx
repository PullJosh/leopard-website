import DocsPage from "../../components/DocsPage";
import PaletteHeader from "../../components/PaletteHeader";
import Translation, {
  TranslationGrid,
  TranslationHeader
} from "../../components/Translation";

export default function Control() {
  return (
    <DocsPage palette="Control">
      <>
        <PaletteHeader>Control</PaletteHeader>
        <TranslationGrid>
          <TranslationHeader>Wait seconds</TranslationHeader>
          <Translation blockImg="control/waitSeconds.svg">
            yield* this.wait(1);
          </Translation>

          <TranslationHeader>Repeat</TranslationHeader>
          <Translation blockImg="control/repeat.svg">
            {`for (let i = 0; i < 10; i++) {\n  // do something fun here\n  yield;\n}`}
          </Translation>

          <TranslationHeader>Forever</TranslationHeader>
          <Translation blockImg="control/forever.svg">
            {`while (true) {\n  // do something fun here\n  yield;\n}`}
          </Translation>

          <TranslationHeader>If</TranslationHeader>
          <Translation blockImg="control/if.svg">
            {`if (/* condition */) {\n  // do something fun (maybe)\n}`}
          </Translation>

          <TranslationHeader>If else</TranslationHeader>
          <Translation blockImg="control/ifElse.svg">
            {`if (/* condition */) {\n  // do something fun (maybe)\n} else {\n  // otherwise do something else\n}`}
          </Translation>

          <TranslationHeader>Wait until</TranslationHeader>
          <Translation blockImg="control/waitUntil.svg">
            {`while (!(/* condition */)) { yield; }`}
          </Translation>

          <TranslationHeader>Repeat until</TranslationHeader>
          <Translation blockImg="control/repeatUntil.svg">
            {`while (!(/* condition */)) {\n  // do something fun here\n  yield;\n}`}
          </Translation>

          <TranslationHeader>Stop</TranslationHeader>
          <Translation blockImg="control/stopAll.svg" />
          <Translation blockImg="control/stopThisScript.svg">
            return;
          </Translation>
          <Translation blockImg="control/stopOtherScripts.svg" />

          <TranslationHeader>When I start as a clone</TranslationHeader>
          <Translation blockImg="control/whenIStartAsClone.svg">
            new Trigger(Trigger.CLONE_START, this.myScript) // See "events" for
            more info about hat blocks
          </Translation>

          <TranslationHeader>Create clone</TranslationHeader>
          <Translation blockImg="control/createCloneOfMyself.svg">
            this.createClone();
          </Translation>
          <Translation blockImg="control/createCloneOfSprite.svg">
            this.sprites.sprite1.createClone();
          </Translation>

          <TranslationHeader>Delete this clone</TranslationHeader>
          <Translation blockImg="control/deleteThisClone.svg">
            this.deleteThisClone();
          </Translation>
        </TranslationGrid>
      </>
    </DocsPage>
  );
}
