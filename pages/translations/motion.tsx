import DocsPage from "../../components/DocsPage";
import PaletteHeader from "../../components/PaletteHeader";
import Translation, {
  TranslationGrid,
  TranslationHeader
} from "../../components/Translation";

export default function Motion() {
  return (
    <DocsPage palette="Motion">
      <>
        <PaletteHeader>Motion</PaletteHeader>
        <TranslationGrid>
          <TranslationHeader>Move steps</TranslationHeader>
          <Translation blockImg="motion/moveSteps.svg">
            this.move(10);
          </Translation>

          <TranslationHeader>Turn right</TranslationHeader>
          <Translation blockImg="motion/turnRight.svg">
            this.direction += 15;
          </Translation>

          <TranslationHeader>Turn Left</TranslationHeader>
          <Translation blockImg="motion/turnLeft.svg">
            this.direction -= 15;
          </Translation>

          <TranslationHeader>Go to target</TranslationHeader>
          <Translation blockImg="motion/goToRandom.svg">
            this.goto(this.random(-240, 240), this.random(-180, 180));
          </Translation>
          <Translation blockImg="motion/goToMouse.svg">
            this.goto(this.mouse.x, this.mouse.y);
          </Translation>
          <Translation blockImg="motion/goToSprite.svg">
            this.goto(this.sprites.sprite1.x, this.sprites.sprite1.y);
          </Translation>

          <TranslationHeader>Go to x y</TranslationHeader>
          <Translation blockImg="motion/goToXY.svg">
            this.goto(200, 100);
          </Translation>

          <TranslationHeader>Glide to target</TranslationHeader>
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

          <TranslationHeader>Glide to x y</TranslationHeader>
          <Translation blockImg="motion/glideToXY.svg">
            yield* this.glide(1, 200, 100);
          </Translation>

          <TranslationHeader>Point in direction</TranslationHeader>
          <Translation blockImg="motion/pointInDirection.svg">
            this.direction = 90;
          </Translation>

          <TranslationHeader>Point towards</TranslationHeader>
          <Translation blockImg="motion/pointTowardsMouse.svg">
            this.direction = this.radToScratch(Math.atan2(this.mouse.y - this.y,
            this.mouse.x - this.x));
          </Translation>
          <Translation blockImg="motion/pointTowardsSprite.svg">
            this.direction = this.radToScratch(Math.atan2(this.sprites.sprite1.y
            - this.y, this.sprites.sprite1.x - this.x));
          </Translation>

          <TranslationHeader>Change x by</TranslationHeader>
          <Translation blockImg="motion/changeXBy.svg">
            this.x += 10;
          </Translation>

          <TranslationHeader>Set x to</TranslationHeader>
          <Translation blockImg="motion/setXTo.svg">this.x = 0;</Translation>

          <TranslationHeader>Change y by</TranslationHeader>
          <Translation blockImg="motion/changeYBy.svg">
            this.y += 10;
          </Translation>

          <TranslationHeader>Set y to</TranslationHeader>
          <Translation blockImg="motion/setYTo.svg">this.y = 0;</Translation>

          <TranslationHeader>If on edge, bounce</TranslationHeader>
          <Translation blockImg="motion/ifOnEdgeBounce.svg" />

          <TranslationHeader>Set rotation style</TranslationHeader>
          <Translation blockImg="motion/setRotationStyleLeftRight.svg">
            this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
          </Translation>
          <Translation blockImg="motion/setRotationStyleNone.svg">
            this.rotationStyle = Sprite.RotationStyle.DONT_ROTATE;
          </Translation>
          <Translation blockImg="motion/setRotationStyleAllAround.svg">
            this.rotationStyle = Sprite.RotationStyle.ALL_AROUND;
          </Translation>

          <TranslationHeader>X position</TranslationHeader>
          <Translation blockImg="motion/xPosition.svg">this.x</Translation>

          <TranslationHeader>Y position</TranslationHeader>
          <Translation blockImg="motion/yPosition.svg">this.y</Translation>

          <TranslationHeader>Direction</TranslationHeader>
          <Translation blockImg="motion/direction.svg">
            this.direction
          </Translation>
        </TranslationGrid>
      </>
    </DocsPage>
  );
}
