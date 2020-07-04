import DocsPage from "../../components/DocsPage";
import PaletteHeader from "../../components/PaletteHeader";
import Translation, {
  TranslationGrid,
  TranslationHeader
} from "../../components/Translation";

export default function Pen() {
  return (
    <DocsPage palette="Pen">
      <>
        <PaletteHeader>Pen</PaletteHeader>
        <TranslationGrid>
          <TranslationHeader>Erase all</TranslationHeader>
          <Translation blockImg="pen/eraseAll.svg">
            this.clearPen();
          </Translation>

          <TranslationHeader>Stamp</TranslationHeader>
          <Translation blockImg="pen/stamp.svg">this.stamp();</Translation>

          <TranslationHeader>Pen down</TranslationHeader>
          <Translation blockImg="pen/penDown.svg">
            this.penDown = true;
          </Translation>

          <TranslationHeader>Pen up</TranslationHeader>
          <Translation blockImg="pen/penUp.svg">
            this.penDown = false;
          </Translation>

          <TranslationHeader>Set pen color</TranslationHeader>
          <Translation blockImg="pen/setPenColorToColor.svg">
            {`// rgb:
this.penColor = Color.rgb(77, 151, 255);

// rgba:
this.penColor = Color.rgb(77, 151, 255, 0.5);

// hsv (hue from 0 to 100):
this.penColor = Color.hsv(60, 70, 100);

// hsva (hue from 0 to 100):
this.penColor = Color.hsv(60, 70, 100, 0.5);`}
          </Translation>

          <TranslationHeader>Change pen value</TranslationHeader>
          <Translation blockImg="pen/changePenColor.svg">
            this.penColor.h += 10;
          </Translation>
          <Translation blockImg="pen/changePenSaturation.svg">
            this.penColor.s += 10;
          </Translation>
          <Translation blockImg="pen/changePenBrightness.svg">
            this.penColor.v += 10;
          </Translation>
          <Translation blockImg="pen/changePenTransparency.svg">
            this.penColor.a -= 0.1;
          </Translation>

          <TranslationHeader>Set pen value</TranslationHeader>
          <Translation blockImg="pen/setPenColor.svg">
            this.penColor.h = 10;
          </Translation>
          <Translation blockImg="pen/setPenSaturation.svg">
            this.penColor.s = 10;
          </Translation>
          <Translation blockImg="pen/setPenBrightness.svg">
            this.penColor.v = 10;
          </Translation>
          <Translation blockImg="pen/setPenTransparency.svg">
            this.penColor.a = 0.9;
          </Translation>

          <TranslationHeader>Change pen size</TranslationHeader>
          <Translation blockImg="pen/changePenSize.svg">
            this.penSize += 10;
          </Translation>

          <TranslationHeader>Set pen size</TranslationHeader>
          <Translation blockImg="pen/setPenSize.svg">
            this.penSize = 50;
          </Translation>
        </TranslationGrid>
      </>
    </DocsPage>
  );
}
