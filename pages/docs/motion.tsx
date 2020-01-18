import DocsPage from "../../components/DocsPage";
import PaletteHeader from "../../components/PaletteHeader";
import Translation, { TranslationGrid } from "../../components/Translation";

export default function Motion() {
  return (
    <DocsPage palette="Motion">
      <>
        <PaletteHeader>Motion</PaletteHeader>
        <TranslationGrid>
          <h3>Move steps</h3>
          <Translation blockImg="motion/moveSteps.svg">
            this.move(10);
          </Translation>

          <h3>Turn right</h3>
          <Translation blockImg="motion/turnRight.svg">
            this.direction += 15;
          </Translation>

          <h3>Turn Left</h3>
          <Translation blockImg="motion/turnLeft.svg">
            this.direction -= 15;
          </Translation>

          <h3>Go to target</h3>
          <Translation blockImg="motion/goToRandom.svg">
            this.goto(this.random(-240, 240), this.random(-180, 180));
          </Translation>
          <Translation blockImg="motion/goToMouse.svg">
            this.goto(this.mouse.x, this.mouse.y);
          </Translation>
          <Translation blockImg="motion/goToSprite.svg">
            this.goto(this.sprites.sprite1.x, this.sprites.sprite1.y);
          </Translation>

          <h3>Go to x y</h3>
          <Translation blockImg="motion/goToXY.svg">
            this.goto(200, 100);
          </Translation>

          <h3>Glide to target</h3>
          <Translation blockImg="motion/glideToRandom.svg">
            yield* this.glide(1, this.random(-240, 240), this.random(-180,
            180));
          </Translation>
          <Translation blockImg="motion/glideToMouse.svg">
            yield* this.glide(1, this.mouse.x, this.mouse.y);
          </Translation>
          <Translation blockImg="motion/glideToSprite.svg">
            yield* this.glide(1, this.sprites.sprite1.x,
            this.sprites.sprite1.y);
          </Translation>

          <h3>Glide to x y</h3>
          <Translation blockImg="motion/glideToXY.svg">
            yield* this.glide(1, 200, 100);
          </Translation>

          <h3>Point in direction</h3>
          <Translation blockImg="motion/pointInDirection.svg">
            this.direction = 90;
          </Translation>

          <h3>Point towards</h3>
          <Translation blockImg="motion/pointTowardsMouse.svg">
            this.direction = this.radToScratch(Math.atan2(this.mouse.y - this.y,
            this.mouse.x - this.x));
          </Translation>
          <Translation blockImg="motion/pointTowardsSprite.svg">
            this.direction = this.radToScratch(Math.atan2(this.sprites.sprite1.y
            - this.y, this.sprites.sprite1.x - this.x));
          </Translation>

          <h3>Change x by</h3>
          <Translation blockImg="motion/changeXBy.svg">
            this.x += 10;
          </Translation>

          <h3>Set x to</h3>
          <Translation blockImg="motion/setXTo.svg">this.x = 0;</Translation>

          <h3>Change y by</h3>
          <Translation blockImg="motion/changeYBy.svg">
            this.y += 10;
          </Translation>

          <h3>Set y to</h3>
          <Translation blockImg="motion/setYTo.svg">this.y = 0;</Translation>

          <h3>If on edge, bounce</h3>
          <Translation blockImg="motion/ifOnEdgeBounce.svg" />

          <h3>Set rotation style</h3>
          <Translation blockImg="motion/setRotationStyleLeftRight.svg">
            this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
          </Translation>
          <Translation blockImg="motion/setRotationStyleNone.svg">
            this.rotationStyle = Sprite.RotationStyle.DONT_ROTATE;
          </Translation>
          <Translation blockImg="motion/setRotationStyleAllAround.svg">
            this.rotationStyle = Sprite.RotationStyle.ALL_AROUND;
          </Translation>

          <h3>X position</h3>
          <Translation blockImg="motion/xPosition.svg">this.x</Translation>

          <h3>Y position</h3>
          <Translation blockImg="motion/yPosition.svg">this.y</Translation>

          <h3>Direction</h3>
          <Translation blockImg="motion/direction.svg">
            this.direction
          </Translation>
        </TranslationGrid>
      </>
    </DocsPage>
  );
}
