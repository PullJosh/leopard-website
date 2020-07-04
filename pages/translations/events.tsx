import DocsPage from "../../components/DocsPage";
import PaletteHeader from "../../components/PaletteHeader";
import Translation, {
  TranslationGrid,
  TranslationHeader
} from "../../components/Translation";

export default function Events() {
  return (
    <DocsPage palette="Events">
      <>
        <PaletteHeader>Events</PaletteHeader>
        <p className="mb-4">
          Each hat block becomes a `Trigger` in the constructor of your
          sprite/stage.
        </p>
        <TranslationGrid>
          <TranslationHeader>When green flag clicked</TranslationHeader>
          <Translation blockImg="events/whenGreenFlagClicked.svg">
            new Trigger(Trigger.GREEN_FLAG, this.myScript)
          </Translation>

          <TranslationHeader>When key pressed</TranslationHeader>
          <Translation blockImg="events/whenSpacePressed.svg">
            {`new Trigger(Trigger.KEY_PRESSED, { key: "space" }, this.myScript)`}
          </Translation>
          <Translation blockImg="events/whenRightPressed.svg">
            {`new Trigger(Trigger.KEY_PRESSED, { key: "right arrow" }, this.myScript)`}
          </Translation>
          <Translation blockImg="events/whenAnyPressed.svg" />
          <Translation blockImg="events/whenAPressed.svg">
            {`new Trigger(Trigger.KEY_PRESSED, { key: "a" }, this.myScript)`}
          </Translation>
          <Translation blockImg="events/when1Pressed.svg">
            {`new Trigger(Trigger.KEY_PRESSED, { key: "1" }, this.myScript)`}
          </Translation>

          <TranslationHeader>When this sprite clicked</TranslationHeader>
          <Translation blockImg="events/whenSpriteClicked.svg">
            new Trigger(Trigger.CLICKED, this.myScript)
          </Translation>

          <TranslationHeader>When backdrop switches</TranslationHeader>
          <Translation blockImg="events/whenBackdropSwitches.svg" />

          <TranslationHeader>When greater than</TranslationHeader>
          <Translation blockImg="events/whenLoudnessGreater.svg" />
          <Translation blockImg="events/whenTimerGreater.svg" />

          <TranslationHeader>When I receive</TranslationHeader>
          <Translation blockImg="events/whenIReceive.svg">
            {`new Trigger(Trigger.BROADCAST, { name: "message1" }, this.myScript.bind(this))`}
          </Translation>

          <TranslationHeader>Broadcast</TranslationHeader>
          <Translation blockImg="events/broadcast.svg">
            this.broadcast("message1");
          </Translation>

          <TranslationHeader>Broadcast and wait</TranslationHeader>
          <Translation blockImg="events/broadcastAndWait.svg">
            yield* this.broadcastAndWait("message1");
          </Translation>
        </TranslationGrid>
      </>
    </DocsPage>
  );
}
