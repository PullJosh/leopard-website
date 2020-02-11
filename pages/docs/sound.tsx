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
            yield* this.playSoundUntilDone("meow");
          </Translation>

          <h3>Play sound</h3>
          <Translation blockImg="sound/playSound.svg">
            yield* this.startSound("meow");
          </Translation>

          <h3>Stop all sounds</h3>
          <Translation blockImg="sound/stopAllSounds.svg">
            this.stopAllSounds();
          </Translation>

          <h3>Change effect</h3>
          <Translation blockImg="sound/changePitchEffect.svg">
            this.audioEffects.pitch += 10;
          </Translation>
          <Translation blockImg="sound/changePanEffect.svg">
            this.audioEffects.pan += 10;
          </Translation>

          <h3>Set effect</h3>
          <Translation blockImg="sound/setPitchEffect.svg">
            this.audioEffects.pitch = 100;
          </Translation>
          <Translation blockImg="sound/setPanEffect.svg">
            this.audioEffects.pan = 100;
          </Translation>

          <h3>Clear sound effects</h3>
          <Translation blockImg="sound/clearSoundEffects.svg">
            this.audioEffects.clear();
          </Translation>

          <h3>Change volume</h3>
          <Translation blockImg="sound/changeVolume.svg">
            this.audioEffects.volume += 10;
          </Translation>

          <h3>Set volume</h3>
          <Translation blockImg="sound/setVolume.svg">
            this.audioEffects.volume = 100;
          </Translation>

          <h3>Volume</h3>
          <Translation blockImg="sound/volume.svg">
            this.audioEffects.volume
          </Translation>
        </TranslationGrid>
      </>
    </DocsPage>
  );
}
