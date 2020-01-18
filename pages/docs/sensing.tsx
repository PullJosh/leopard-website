import DocsPage from "../../components/DocsPage";
import PaletteHeader from "../../components/PaletteHeader";
import Translation, { TranslationGrid } from "../../components/Translation";

export default function Sensing() {
  return (
    <DocsPage palette="Sensing">
      <>
        <PaletteHeader>Sensing</PaletteHeader>
        <TranslationGrid>
          <h3>Touching target</h3>
          <Translation blockImg="sensing/touchingMouse.svg">
            this.touching("mouse")
          </Translation>
          <Translation blockImg="sensing/touchingEdge.svg" />
          <Translation blockImg="sensing/touchingSprite.svg">
            this.touching(this.sprites.sprite1.andClones())
          </Translation>

          <h3>Touching color</h3>
          <Translation blockImg="sensing/touchingColor.svg">
            this.touching(Color.hsv(11, 90, 100))
          </Translation>

          <h3>Color touching color</h3>
          <Translation blockImg="sensing/colorTouchingColor.svg">
            this.colorTouching(Color.hsv(11, 90, 100), Color.hsv(60, 70, 100))
          </Translation>

          <h3>Distance to target</h3>
          <Translation blockImg="sensing/distanceToMouse.svg">
            Math.hypot(this.mouse.x - this.x, this.mouse.y - this.y)
          </Translation>
          <Translation blockImg="sensing/distanceToSprite.svg">
            Math.hypot(this.sprites.sprite1.x - this.x, this.sprites.sprite1.y -
            this.y)
          </Translation>

          <h3>Ask and wait</h3>
          <Translation blockImg="sensing/askAndWait.svg">
            yield* this.askAndWait("What's your name?");
          </Translation>

          <h3>Answer</h3>
          <Translation blockImg="sensing/answer.svg">this.answer</Translation>

          <h3>Key pressed</h3>
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

          <h3>Mouse down</h3>
          <Translation blockImg="sensing/mouseDown.svg">
            this.mouse.down
          </Translation>

          <h3>Mouse x</h3>
          <Translation blockImg="sensing/mouseX.svg">this.mouse.x</Translation>

          <h3>Mouse y</h3>
          <Translation blockImg="sensing/mouseY.svg">this.mouse.y</Translation>

          <h3>Set drag mode</h3>
          <Translation blockImg="sensing/setDragModeDraggable.svg" />
          <Translation blockImg="sensing/setDragModeNotDraggable.svg" />

          <h3>Loudness</h3>
          <Translation blockImg="sensing/loudness.svg" />

          <h3>Timer</h3>
          <Translation blockImg="sensing/timer.svg">this.timer</Translation>

          <h3>Reset timer</h3>
          <Translation blockImg="sensing/resetTimer.svg">
            this.restartTimer();
          </Translation>

          <h3>Property of target</h3>
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

          <h3>Current</h3>
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

          <h3>Days since 2000</h3>
          <Translation blockImg="sensing/daysSince2000.svg">
            {`// This one's pretty beefy:\n(((new Date().getTime() - new Date(2000, 0, 1)) / 1000 / 60 + new Date().getTimezoneOffset()) / 60 / 24)\n\n// FYI, you can get the milliseconds since 1970 (Unix time) like this:\nnew Date().getTime()`}
          </Translation>

          <h3>Username</h3>
          <Translation blockImg="sensing/username.svg" />
        </TranslationGrid>
      </>
    </DocsPage>
  );
}
