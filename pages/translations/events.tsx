import DocsPage from "../../components/DocsPage";
import PaletteHeader from "../../components/PaletteHeader";
import Translation, { TranslationGrid } from "../../components/Translation";

export default function Events() {
  return (
    <DocsPage palette="Events">
      <>
        <PaletteHeader>Events</PaletteHeader>
        <p>
          Each hat block becomes a `Trigger`, which you can learn more about{" "}
          <s>here</s> <i>that documentation isn't ready yet</i>.
        </p>
        <TranslationGrid>
          <h3>When green flag clicked</h3>
          <Translation blockImg="events/whenGreenFlagClicked.svg">
            new Trigger(Trigger.GREEN_FLAG, this.myScript)
          </Translation>

          <h3>When key pressed</h3>
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

          <h3>When this sprite clicked</h3>
          <Translation blockImg="events/whenSpriteClicked.svg">
            new Trigger(Trigger.CLICKED, this.myScript)
          </Translation>

          <h3>When backdrop switches</h3>
          <Translation blockImg="events/whenBackdropSwitches.svg" />

          <h3>When greater than</h3>
          <Translation blockImg="events/whenLoudnessGreater.svg" />
          <Translation blockImg="events/whenTimerGreater.svg" />

          <h3>When I receive</h3>
          <Translation blockImg="events/whenIReceive.svg">
            {`new Trigger(Trigger.BROADCAST, { name: "message1" }, this.myScript.bind(this))`}
          </Translation>

          <h3>Broadcast</h3>
          <Translation blockImg="events/broadcast.svg">
            this.broadcast("message1");
          </Translation>

          <h3>Broadcast and wait</h3>
          <Translation blockImg="events/broadcastAndWait.svg">
            yield* this.broadcastAndWait("message1");
          </Translation>
        </TranslationGrid>
      </>
    </DocsPage>
  );
}
