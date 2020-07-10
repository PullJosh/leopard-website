import DocsPage from "../../components/DocsPage";
import PaletteHeader from "../../components/PaletteHeader";
import Translation, {
  TranslationGrid,
  TranslationHeader
} from "../../components/Translation";

export default function Looks() {
  return (
    <DocsPage palette="Looks">
      <>
        <PaletteHeader>Looks</PaletteHeader>
        <TranslationGrid>
          <TranslationHeader>Say for seconds</TranslationHeader>
          <Translation blockImg="looks/sayForSecs.svg">
            yield* this.sayAndWait("Hello!", 2);
          </Translation>

          <TranslationHeader>Say</TranslationHeader>
          <Translation blockImg="looks/say.svg">
            this.say("Hello!");
          </Translation>

          <TranslationHeader>Think for seconds</TranslationHeader>
          <Translation blockImg="looks/thinkForSecs.svg">
            yield* this.thinkAndWait("Hello!", 2);
          </Translation>

          <TranslationHeader>Think</TranslationHeader>
          <Translation blockImg="looks/think.svg">
            this.think("Hello!");
          </Translation>

          <TranslationHeader>Switch costume</TranslationHeader>
          <Translation blockImg="looks/switchCostume.svg">
            {`this.costume = "costume1";\n\n// Or switch to costume number\nthis.costumeNumber = 3;`}
          </Translation>

          <TranslationHeader>Next costume</TranslationHeader>
          <Translation blockImg="looks/nextCostume.svg">
            this.costumeNumber++;
          </Translation>

          <TranslationHeader>Switch backdrop</TranslationHeader>
          <Translation blockImg="looks/switchBackdropToName.svg">
            {`// In a sprite:\nthis.stage.costume = "backdrop1";\n\n// In the stage:\nthis.costume = "backdrop1";`}
          </Translation>
          <Translation blockImg="looks/switchBackdropToNext.svg">
            {`// In a sprite:\nthis.stage.costumeNumber++;\n\n// In the stage:\nthis.costumeNumber++;`}
          </Translation>
          <Translation blockImg="looks/switchBackdropToPrevious.svg">
            {`// In a sprite:\nthis.stage.costumeNumber--;\n\n// In the stage:\nthis.costumeNumber--;`}
          </Translation>
          <Translation blockImg="looks/switchBackdropToRandom.svg">
            {`// In a sprite: \nthis.stage.costume = "random backdrop";\n\n// In the stage:\nthis.costume = "random backdrop";`}
          </Translation>

          <TranslationHeader>Next Backdrop</TranslationHeader>
          <Translation blockImg="looks/nextBackdrop.svg">
            {`// In a sprite:\nthis.stage.costumeNumber++;\n\n// In the stage:\nthis.costumeNumber++;`}
          </Translation>

          <TranslationHeader>Change size</TranslationHeader>
          <Translation blockImg="looks/changeSize.svg">
            this.size += 10;
          </Translation>

          <TranslationHeader>Set size</TranslationHeader>
          <Translation blockImg="looks/setSize.svg">
            this.size = 100;
          </Translation>

          <TranslationHeader>Change graphic effect</TranslationHeader>
          <Translation blockImg="looks/changeColorEffect.svg">
            this.effects.color += 25;
          </Translation>
          <Translation blockImg="looks/changeFisheyeEffect.svg">
            this.effects.fisheye += 25;
          </Translation>
          <Translation blockImg="looks/changeWhirlEffect.svg">
            this.effects.whirl += 25;
          </Translation>
          <Translation blockImg="looks/changePixelateEffect.svg">
            this.effects.pixelate += 25;
          </Translation>
          <Translation blockImg="looks/changeMosaicEffect.svg">
            this.effects.mosaic += 25;
          </Translation>
          <Translation blockImg="looks/changeBrightnessEffect.svg">
            this.effects.brightness += 25;
          </Translation>
          <Translation blockImg="looks/changeGhostEffect.svg">
            this.effects.ghost += 25;
          </Translation>

          <TranslationHeader>Set graphic effect</TranslationHeader>
          <Translation blockImg="looks/setColorEffect.svg">
            this.effects.color = 100;
          </Translation>
          <Translation blockImg="looks/setFisheyeEffect.svg">
            this.effects.fisheye = 100;
          </Translation>
          <Translation blockImg="looks/setWhirlEffect.svg">
            this.effects.whirl = 100;
          </Translation>
          <Translation blockImg="looks/setPixelateEffect.svg">
            this.effects.pixelate = 100;
          </Translation>
          <Translation blockImg="looks/setMosaicEffect.svg">
            this.effects.mosaic = 100;
          </Translation>
          <Translation blockImg="looks/setBrightnessEffect.svg">
            this.effects.brightness = 100;
          </Translation>
          <Translation blockImg="looks/setGhostEffect.svg">
            this.effects.ghost = 100;
          </Translation>

          <TranslationHeader>Clear graphic effects</TranslationHeader>
          <Translation blockImg="looks/clearGraphicEffects.svg">
            this.effects.clear();
          </Translation>

          <TranslationHeader>Show</TranslationHeader>
          <Translation blockImg="looks/show.svg">
            this.visible = true;
          </Translation>

          <TranslationHeader>Hide</TranslationHeader>
          <Translation blockImg="looks/hide.svg">
            this.visible = false;
          </Translation>

          <TranslationHeader>Go to layer</TranslationHeader>
          <Translation blockImg="looks/goToFront.svg">
            this.moveAhead();
          </Translation>
          <Translation blockImg="looks/goToBack.svg">
            this.moveBehind();
          </Translation>

          <TranslationHeader>Go forward/backward layers</TranslationHeader>
          <Translation blockImg="looks/goForwardLayers.svg">
            this.moveAhead(1);
          </Translation>
          <Translation blockImg="looks/goBackwardLayers.svg">
            this.moveBehind(1);
          </Translation>

          <TranslationHeader>Costume number/name</TranslationHeader>
          <Translation blockImg="looks/costumeNumber.svg">
            this.costumeNumber
          </Translation>
          <Translation blockImg="looks/costumeName.svg">
            this.costume
          </Translation>

          <TranslationHeader>Backdrop number/name</TranslationHeader>
          <Translation blockImg="looks/backdropNumber.svg">
            {`// In a sprite:\nthis.stage.costumeNumber\n\n// In the stage:\nthis.costumeNumber`}
          </Translation>
          <Translation blockImg="looks/backdropName.svg">
            {`// In a sprite:\nthis.stage.costume\n\n// In the stage:\nthis.costume`}
          </Translation>

          <TranslationHeader>Size</TranslationHeader>
          <Translation blockImg="looks/size.svg">this.size</Translation>
        </TranslationGrid>
      </>
    </DocsPage>
  );
}
