import DocsPage from "../../components/DocsPage";
import PaletteHeader from "../../components/PaletteHeader";
import Translation, { TranslationGrid } from "../../components/Translation";

export default function Looks() {
  return (
    <DocsPage palette="Looks">
      <>
        <PaletteHeader>Looks</PaletteHeader>
        <TranslationGrid>
          <h3>Say for seconds</h3>
          <Translation blockImg="looks/sayForSecs.svg">
            yield* this.sayAndWait("Hello!", 2);
          </Translation>

          <h3>Say</h3>
          <Translation blockImg="looks/say.svg">
            this.say("Hello!");
          </Translation>

          <h3>Think for seconds</h3>
          <Translation blockImg="looks/thinkForSecs.svg">
            yield* this.thinkAndWait("Hello!", 2);
          </Translation>

          <h3>Think</h3>
          <Translation blockImg="looks/think.svg">
            this.think("Hello!");
          </Translation>

          <h3>Switch costume</h3>
          <Translation blockImg="looks/switchCostume.svg">
            {`this.costume = "costume1";\n\n// Or switch to costume number\nthis.costumeNumber = 3;`}
          </Translation>

          <h3>Next costume</h3>
          <Translation blockImg="looks/nextCostume.svg">
            this.costumeNumber++;
          </Translation>

          <h3>Switch backdrop</h3>
          <Translation blockImg="looks/switchBackdropToName.svg">
            {`// In a sprite:\nthis.stage.costume = "backdrop1";\n\n// In the stage:\nthis.costume = "backdrop1";`}
          </Translation>
          <Translation blockImg="looks/switchBackdropToNext.svg">
            {`// In a sprite:\nthis.stage.costumeNumber++;\n\n// In the stage:\nthis.costumeNumber++;`}
          </Translation>
          <Translation blockImg="looks/switchBackdropToPrevious.svg">
            {`// In a sprite:\nthis.stage.costumeNumber--;\n\n// In the stage:\nthis.costumeNumber--;`}
          </Translation>
          <Translation blockImg="looks/switchBackdropToRandom.svg"></Translation>

          <h3>Next Backdrop</h3>
          <Translation blockImg="looks/nextBackdrop.svg">
            {`// In a sprite:\nthis.stage.costumeNumber++;\n\n// In the stage:\nthis.costumeNumber++;`}
          </Translation>

          <h3>Change size</h3>
          <Translation blockImg="looks/changeSize.svg">
            this.size += 10;
          </Translation>

          <h3>Set size</h3>
          <Translation blockImg="looks/setSize.svg">
            this.size = 100;
          </Translation>

          <h3>Change graphic effect</h3>
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

          <h3>Set graphic effect</h3>
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

          <h3>Clear graphic effects</h3>
          <Translation blockImg="looks/clearGraphicEffects.svg">
            this.effects.clear();
          </Translation>

          <h3>Show</h3>
          <Translation blockImg="looks/show.svg">
            this.visible = true;
          </Translation>

          <h3>Hide</h3>
          <Translation blockImg="looks/hide.svg">
            this.visible = false;
          </Translation>

          <h3>Go to layer</h3>
          <Translation blockImg="looks/goToFront.svg" />
          <Translation blockImg="looks/goToBack.svg" />

          <h3>Go forward/backward layers</h3>
          <Translation blockImg="looks/goForwardLayers.svg" />
          <Translation blockImg="looks/goBackwardLayers.svg" />

          <h3>Costume number/name</h3>
          <Translation blockImg="looks/costumeNumber.svg">
            this.costumeNumber
          </Translation>
          <Translation blockImg="looks/costumeName.svg">
            this.costume
          </Translation>

          <h3>Backdrop number/name</h3>
          <Translation blockImg="looks/backdropNumber.svg">
            {`// In a sprite:\nthis.stage.costumeNumber\n\n// In the stage:\nthis.costumeNumber`}
          </Translation>
          <Translation blockImg="looks/backdropName.svg">
            {`// In a sprite:\nthis.stage.costume\n\n// In the stage:\nthis.costume`}
          </Translation>

          <h3>Size</h3>
          <Translation blockImg="looks/size.svg">this.size</Translation>
        </TranslationGrid>
      </>
    </DocsPage>
  );
}
