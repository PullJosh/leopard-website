import DocsPage from "../../components/DocsPage";
import PaletteHeader from "../../components/PaletteHeader";
import Translation, {
  TranslationGrid,
  TranslationHeader
} from "../../components/Translation";

export default function Operators() {
  return (
    <DocsPage palette="Operators">
      <>
        <PaletteHeader>Operators</PaletteHeader>
        <TranslationGrid>
          <TranslationHeader>Add (+)</TranslationHeader>
          <Translation blockImg="operators/add.svg">6 + 2</Translation>

          <TranslationHeader>Subtract (-)</TranslationHeader>
          <Translation blockImg="operators/subtract.svg">6 - 2</Translation>

          <TranslationHeader>Multiply (&times;)</TranslationHeader>
          <Translation blockImg="operators/multiply.svg">6 * 2</Translation>

          <TranslationHeader>Divide (&divide;)</TranslationHeader>
          <Translation blockImg="operators/divide.svg">6 / 2</Translation>

          <TranslationHeader>Pick random</TranslationHeader>
          <Translation blockImg="operators/pickRandom.svg">
            this.random(1, 10)
          </Translation>

          <TranslationHeader>Greater than (&gt;)</TranslationHeader>
          <Translation blockImg="operators/greaterThan.svg">
            20 &gt; 25
          </Translation>

          <TranslationHeader>Less than (&lt;)</TranslationHeader>
          <Translation blockImg="operators/lessThan.svg">
            15 &lt; 20
          </Translation>

          <TranslationHeader>Equal (=)</TranslationHeader>
          <Translation blockImg="operators/equal.svg">15 == 15</Translation>

          <TranslationHeader>And</TranslationHeader>
          <Translation blockImg="operators/and.svg">
            (/* condition 1 */) && (/* condition 2 */)
          </Translation>

          <TranslationHeader>Or</TranslationHeader>
          <Translation blockImg="operators/or.svg">
            (/* condition 1 */) || (/* condition 2 */)
          </Translation>

          <TranslationHeader>Not</TranslationHeader>
          <Translation blockImg="operators/not.svg">
            !(/* condition */)
          </Translation>

          <TranslationHeader>Join</TranslationHeader>
          <Translation blockImg="operators/join.svg">
            "scratch" + "js"
          </Translation>
          <Translation blockImg="operators/joinNumbers.svg">
            "" + 1 + 2 // Add a blank string to join numbers rather than adding
            them
          </Translation>

          <TranslationHeader>Letter of string</TranslationHeader>
          <Translation blockImg="operators/letter1.svg">
            "abcd"[0] // Start counting from 0
          </Translation>
          <Translation blockImg="operators/letter4.svg">
            "abcd"[3] // Number must always be one less than in Scratch
          </Translation>
          <Translation blockImg="operators/letterX.svg">
            "abcd"[this.x - 1] // You can subtract inside the brackets if needed
          </Translation>

          <TranslationHeader>Length of string</TranslationHeader>
          <Translation blockImg="operators/length.svg">
            "abcd".length
          </Translation>

          <TranslationHeader>Contains</TranslationHeader>
          <Translation blockImg="operators/contains.svg">
            "apple".includes("a")
          </Translation>

          <TranslationHeader>Modulo (mod)</TranslationHeader>
          <Translation blockImg="operators/mod.svg">7 % 3</Translation>

          <TranslationHeader>Round</TranslationHeader>
          <Translation blockImg="operators/round.svg">
            Math.round(3.5)
          </Translation>

          <TranslationHeader>Math "of"</TranslationHeader>
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
            Math.sin(this.degToRad(90))
          </Translation>
          <Translation blockImg="operators/cosOf.svg">
            Math.cos(this.degToRad(90))
          </Translation>
          <Translation blockImg="operators/tanOf.svg">
            Math.tan(this.degToRad(45))
          </Translation>
          <Translation blockImg="operators/asinOf.svg">
            this.radToDeg(Math.asin(1))
          </Translation>
          <Translation blockImg="operators/acosOf.svg">
            this.radToDeg(Math.acos(1))
          </Translation>
          <Translation blockImg="operators/atanOf.svg">
            this.radToDeg(Math.atan(1))
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
