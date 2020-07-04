import DocsPage from "../../components/DocsPage";
import PaletteHeader from "../../components/PaletteHeader";
import Translation, {
  TranslationGrid,
  TranslationHeader
} from "../../components/Translation";

export default function Sensing() {
  return (
    <DocsPage palette="Sensing">
      <>
        <PaletteHeader>Sensing</PaletteHeader>
        <TranslationGrid>
          <TranslationHeader>Touching target</TranslationHeader>
          <Translation blockImg="sensing/touchingMouse.svg">
            this.touching("mouse")
          </Translation>
          <Translation blockImg="sensing/touchingEdge.svg" />
          <Translation blockImg="sensing/touchingSprite.svg">
            this.touching(this.sprites.sprite1.andClones())
          </Translation>

          <TranslationHeader>Touching color</TranslationHeader>
          <Translation blockImg="sensing/touchingColor.svg">
            this.touching(Color.hsv(11, 90, 100))
          </Translation>

          <TranslationHeader>Color touching color</TranslationHeader>
          <Translation blockImg="sensing/colorTouchingColor.svg">
            this.colorTouching(Color.hsv(11, 90, 100), Color.hsv(60, 70, 100))
          </Translation>

          <TranslationHeader>Distance to target</TranslationHeader>
          <Translation blockImg="sensing/distanceToMouse.svg">
            Math.hypot(this.mouse.x - this.x, this.mouse.y - this.y)
          </Translation>
          <Translation blockImg="sensing/distanceToSprite.svg">
            Math.hypot(this.sprites.sprite1.x - this.x, this.sprites.sprite1.y -
            this.y)
          </Translation>

          <TranslationHeader>Ask and wait</TranslationHeader>
          <Translation blockImg="sensing/askAndWait.svg">
            yield* this.askAndWait("What's your name?");
          </Translation>

          <TranslationHeader>Answer</TranslationHeader>
          <Translation blockImg="sensing/answer.svg">this.answer</Translation>

          <TranslationHeader>Key pressed</TranslationHeader>
          <Translation blockImg="sensing/keySpacePressed.svg">
            this.keyPressed("space")
          </Translation>
          <Translation blockImg="sensing/keyRightPressed.svg">
            this.keyPressed("right arrow")
          </Translation>
          <Translation blockImg="sensing/keyAnyPressed.svg">
            this.keyPressed("any")
          </Translation>
          <Translation blockImg="sensing/keyAPressed.svg">
            this.keyPressed("a")
          </Translation>
          <Translation blockImg="sensing/key1Pressed.svg">
            this.keyPressed("1")
          </Translation>

          <TranslationHeader>Mouse down</TranslationHeader>
          <Translation blockImg="sensing/mouseDown.svg">
            this.mouse.down
          </Translation>

          <TranslationHeader>Mouse x</TranslationHeader>
          <Translation blockImg="sensing/mouseX.svg">this.mouse.x</Translation>

          <TranslationHeader>Mouse y</TranslationHeader>
          <Translation blockImg="sensing/mouseY.svg">this.mouse.y</Translation>

          <TranslationHeader>Set drag mode</TranslationHeader>
          <Translation blockImg="sensing/setDragModeDraggable.svg" />
          <Translation blockImg="sensing/setDragModeNotDraggable.svg" />

          <TranslationHeader>Loudness</TranslationHeader>
          <Translation blockImg="sensing/loudness.svg" />

          <TranslationHeader>Timer</TranslationHeader>
          <Translation blockImg="sensing/timer.svg">this.timer</Translation>

          <TranslationHeader>Reset timer</TranslationHeader>
          <Translation blockImg="sensing/resetTimer.svg">
            this.restartTimer();
          </Translation>

          <TranslationHeader>Property of target</TranslationHeader>
          <Translation blockImg="sensing/xOfSprite.svg">
            this.sprites.sprite1.x
          </Translation>
          <Translation blockImg="sensing/yOfSprite.svg">
            this.sprites.sprite1.y
          </Translation>
          <Translation blockImg="sensing/directionOfSprite.svg">
            this.sprites.sprite1.direction
          </Translation>
          <Translation blockImg="sensing/costumeNumberOfSprite.svg">
            this.sprites.sprite1.costumeNumber
          </Translation>
          <Translation blockImg="sensing/costumeNameOfSprite.svg">
            this.sprites.sprite1.costume.name
          </Translation>
          <Translation blockImg="sensing/backdropNumberOfStage.svg">
            this.stage.costumeNumber
          </Translation>
          <Translation blockImg="sensing/backdropNameOfStage.svg">
            this.stage.costume.name
          </Translation>
          <Translation blockImg="sensing/sizeOfSprite.svg">
            this.sprites.sprite1.size
          </Translation>
          <Translation blockImg="sensing/volumeOfSprite.svg" />
          <Translation blockImg="sensing/variableOfSprite.svg">
            this.sprites.sprite1.vars.myCoolVariable
          </Translation>

          <TranslationHeader>Current</TranslationHeader>
          <Translation blockImg="sensing/currentYear.svg">
            (new Date().getFullYear())
          </Translation>
          <Translation blockImg="sensing/currentMonth.svg">
            (new Date().getMonth() + 1)
          </Translation>
          <Translation blockImg="sensing/currentDate.svg">
            (new Date().getDate())
          </Translation>
          <Translation blockImg="sensing/currentDayOfWeek.svg">
            (new Date().getDay() + 1)
          </Translation>
          <Translation blockImg="sensing/currentHour.svg">
            (new Date().getHours())
          </Translation>
          <Translation blockImg="sensing/currentMinute.svg">
            (new Date().getMinutes())
          </Translation>
          <Translation blockImg="sensing/currentSecond.svg">
            (new Date().getSeconds())
          </Translation>

          <TranslationHeader>Days since 2000</TranslationHeader>
          <Translation blockImg="sensing/daysSince2000.svg">
            {`// This one's pretty beefy:\n(((new Date().getTime() - new Date(2000, 0, 1)) / 1000 / 60 + new Date().getTimezoneOffset()) / 60 / 24)\n\n// FYI, you can get the milliseconds since 1970 (Unix time) like this:\nnew Date().getTime()`}
          </Translation>

          <TranslationHeader>Username</TranslationHeader>
          <Translation blockImg="sensing/username.svg" />
        </TranslationGrid>
      </>
    </DocsPage>
  );
}
