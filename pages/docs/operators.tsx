import DocsPage from "../../components/DocsPage";
import PaletteHeader from "../../components/PaletteHeader";
import Translation, { TranslationGrid } from "../../components/Translation";

export default function Operators() {
  return (
    <DocsPage palette="Operators">
      <>
        <PaletteHeader>Operators</PaletteHeader>
        <TranslationGrid>
          <h3>Add (+)</h3>
          <Translation blockImg="operators/add.svg">6 + 2</Translation>

          <h3>Subtract (-)</h3>
          <Translation blockImg="operators/subtract.svg">6 - 2</Translation>

          <h3>Multiply (&times;)</h3>
          <Translation blockImg="operators/multiply.svg">6 * 2</Translation>

          <h3>Divide (&divide;)</h3>
          <Translation blockImg="operators/divide.svg">6 / 2</Translation>

          <h3>Pick random</h3>
          <Translation blockImg="operators/pickRandom.svg">
            this.random(1, 10)
          </Translation>

          <h3>Greater than (&gt;)</h3>
          <Translation blockImg="operators/greaterThan.svg">
            20 &gt; 25
          </Translation>

          <h3>Less than (&lt;)</h3>
          <Translation blockImg="operators/lessThan.svg">
            15 &lt; 20
          </Translation>

          <h3>Equal (=)</h3>
          <Translation blockImg="operators/equal.svg">15 == 15</Translation>

          <h3>And</h3>
          <Translation blockImg="operators/and.svg">
            (/* condition 1 */) && (/* condition 2 */)
          </Translation>

          <h3>Or</h3>
          <Translation blockImg="operators/or.svg">
            (/* condition 1 */) || (/* condition 2 */)
          </Translation>

          <h3>Not</h3>
          <Translation blockImg="operators/not.svg">
            !(/* condition */)
          </Translation>

          <h3>Join</h3>
          <Translation blockImg="operators/join.svg">
            "scratch" + "js"
          </Translation>
          <Translation blockImg="operators/joinNumbers.svg">
            "" + 1 + 2 // Add a blank string to join numbers rather than adding
            them
          </Translation>

          <h3>Letter of string</h3>
          <Translation blockImg="operators/letter1.svg">
            "abcd"[0] // Start counting from 0
          </Translation>
          <Translation blockImg="operators/letter4.svg">
            "abcd"[3] // Number must always be one less than in Scratch
          </Translation>
          <Translation blockImg="operators/letterX.svg">
            "abcd"[this.x - 1] // You can subtract inside the brackets if needed
          </Translation>

          <h3>Length of string</h3>
          <Translation blockImg="operators/length.svg">
            "abcd".length
          </Translation>

          <h3>Contains</h3>
          <Translation blockImg="operators/contains.svg">
            "apple".includes("a")
          </Translation>

          <h3>Modulo (mod)</h3>
          <Translation blockImg="operators/mod.svg">7 % 3</Translation>

          <h3>Round</h3>
          <Translation blockImg="operators/round.svg">
            Math.round(3.5)
          </Translation>

          <h3>Math "of"</h3>
          <Translation blockImg="operators/absOf.svg">
            Math.abs(-10)
          </Translation>
          <Translation blockImg="operators/floorOf.svg">
            Math.floor(3.5)
          </Translation>
          <Translation blockImg="operators/ceilingOf.svg">
            Math.ceil(3.5)
          </Translation>
          <Translation blockImg="operators/sqrtOf.svg">
            Math.sqrt(9)
          </Translation>
          <Translation blockImg="operators/sinOf.svg">
            Math.sin(this.scratchToRad(90))
          </Translation>
          <Translation blockImg="operators/cosOf.svg">
            Math.cos(this.scratchToRad(90))
          </Translation>
          <Translation blockImg="operators/tanOf.svg">
            Math.tan(this.scratchToRad(45))
          </Translation>
          <Translation blockImg="operators/asinOf.svg">
            this.radToScratch(Math.asin(1))
          </Translation>
          <Translation blockImg="operators/acosOf.svg">
            this.radToScratch(Math.acos(1))
          </Translation>
          <Translation blockImg="operators/atanOf.svg">
            this.radToScratch(Math.atan(1))
          </Translation>
          <Translation blockImg="operators/lnOf.svg">Math.log(10)</Translation>
          <Translation blockImg="operators/logOf.svg">
            Math.log10(10)
          </Translation>
          <Translation blockImg="operators/eOf.svg">Math.E ** 2</Translation>
          <Translation blockImg="operators/10Of.svg">10 ** 2</Translation>
        </TranslationGrid>
      </>
    </DocsPage>
  );
}
