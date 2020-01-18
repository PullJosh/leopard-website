import DocsPage from "../../components/DocsPage";
import PaletteHeader from "../../components/PaletteHeader";
import Translation, { TranslationGrid } from "../../components/Translation";

export default function Pen() {
  return (
    <DocsPage palette="Pen">
      <>
        <PaletteHeader>Pen</PaletteHeader>
        <TranslationGrid>
          <h3>Erase all</h3>
          <Translation blockImg="pen/eraseAll.svg">
            this.clearPen();
          </Translation>

          <h3>Stamp</h3>
          <Translation blockImg="pen/stamp.svg">this.stamp();</Translation>

          <h3>Pen down</h3>
          <Translation blockImg="pen/penDown.svg">
            this.penDown = true;
          </Translation>

          <h3>Pen up</h3>
          <Translation blockImg="pen/penUp.svg">
            this.penDown = false;
          </Translation>

          <h3>Set pen color</h3>
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

          <h3>Change pen value</h3>
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

          <h3>Set pen value</h3>
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

          <h3>Change pen size</h3>
          <Translation blockImg="pen/changePenSize.svg">
            this.penSize += 10;
          </Translation>

          <h3>Set pen size</h3>
          <Translation blockImg="pen/setPenSize.svg">
            this.penSize = 50;
          </Translation>
        </TranslationGrid>
      </>
    </DocsPage>
  );
}
