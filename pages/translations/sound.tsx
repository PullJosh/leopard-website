import DocsPage from "../../components/DocsPage";
import PaletteHeader from "../../components/PaletteHeader";
import Translation, {
  TranslationGrid,
  TranslationHeader
} from "../../components/Translation";

export default function Sound() {
  return (
    <DocsPage palette="Sound">
      <>
        <PaletteHeader>Sound</PaletteHeader>
        <TranslationGrid>
          <TranslationHeader>Play sound until done</TranslationHeader>
          <Translation blockImg="sound/playSoundUntilDone.svg">
            yield* this.playSoundUntilDone("meow");
          </Translation>

          <TranslationHeader>Play sound</TranslationHeader>
          <Translation blockImg="sound/playSound.svg">
            yield* this.startSound("meow");
          </Translation>

          <TranslationHeader>Stop all sounds</TranslationHeader>
          <Translation blockImg="sound/stopAllSounds.svg">
            this.stopAllSounds();
          </Translation>

          <TranslationHeader>Change effect</TranslationHeader>
          <Translation blockImg="sound/changePitchEffect.svg">
            this.audioEffects.pitch += 10;
          </Translation>
          <Translation blockImg="sound/changePanEffect.svg">
            this.audioEffects.pan += 10;
          </Translation>

          <TranslationHeader>Set effect</TranslationHeader>
          <Translation blockImg="sound/setPitchEffect.svg">
            this.audioEffects.pitch = 100;
          </Translation>
          <Translation blockImg="sound/setPanEffect.svg">
            this.audioEffects.pan = 100;
          </Translation>

          <TranslationHeader>Clear sound effects</TranslationHeader>
          <Translation blockImg="sound/clearSoundEffects.svg">
            this.audioEffects.clear();
          </Translation>

          <TranslationHeader>Change volume</TranslationHeader>
          <Translation blockImg="sound/changeVolume.svg">
            this.audioEffects.volume += 10;
          </Translation>

          <TranslationHeader>Set volume</TranslationHeader>
          <Translation blockImg="sound/setVolume.svg">
            this.audioEffects.volume = 100;
          </Translation>

          <TranslationHeader>Volume</TranslationHeader>
          <Translation blockImg="sound/volume.svg">
            this.audioEffects.volume
          </Translation>
        </TranslationGrid>
      </>
    </DocsPage>
  );
}
