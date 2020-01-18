import DocsPage from "../../components/DocsPage";
import PaletteHeader from "../../components/PaletteHeader";
import Translation, { TranslationGrid } from "../../components/Translation";

export default function Sound() {
  return (
    <DocsPage palette="Sound">
      <>
        <PaletteHeader>Sound</PaletteHeader>
        <TranslationGrid>
          <h3>Play sound until done</h3>
          <Translation blockImg="sound/playSoundUntilDone.svg">
            {`// Current API requires passing URL of sound (can be relative).\n// This may change in the future.\nyield* this.playSound("https://example.com/meow.mp3");`}
          </Translation>

          <h3>Play sound</h3>
          <Translation blockImg="sound/playSound.svg">
            {`// Current API requires passing URL of sound (can be relative).\n// This may change in the future.\nthis.playSound("https://example.com/meow.mp3");`}
          </Translation>

          <h3>Stop all sounds</h3>
          <Translation blockImg="sound/stopAllSounds.svg">
            this.stopAllSounds();
          </Translation>

          <h3>Change effect</h3>
          <Translation blockImg="sound/changePitchEffect.svg" />
          <Translation blockImg="sound/changePanEffect.svg" />

          <h3>Set effect</h3>
          <Translation blockImg="sound/setPitchEffect.svg" />
          <Translation blockImg="sound/setPanEffect.svg" />

          <h3>Clear sound effects</h3>
          <Translation blockImg="sound/clearSoundEffects.svg" />

          <h3>Change volume</h3>
          <Translation blockImg="sound/changeVolume.svg" />

          <h3>Set volume</h3>
          <Translation blockImg="sound/setVolume.svg" />

          <h3>Volume</h3>
          <Translation blockImg="sound/volume.svg" />
        </TranslationGrid>
      </>
    </DocsPage>
  );
}
