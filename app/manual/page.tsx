"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Translation, {
  TranslationGrid,
  TranslationHeader,
} from "../../components/Translation";
import classNames from "classnames";
import Nav, { NavSpace } from "../../components/Nav";

// export const metadata = {
//   title: "Manual",
// };

export default function Manual() {
  const searchParams = useSearchParams();
  const palette = searchParams?.get("p") ?? "motion";

  return (
    <>
      <div className="border-b border-gray-300">
        <Nav>
          <NavSpace />
        </Nav>
      </div>

      <PaletteTabs />

      <div className="mx-auto my-4 max-w-5xl px-8">
        {palette === "motion" && (
          <TranslationGrid>
            <TranslationHeader>Move steps</TranslationHeader>
            <Translation scratch="move (10) steps" js="this.move(10);" />

            <TranslationHeader>Turn right</TranslationHeader>
            <Translation
              scratch="turn right (15) degrees"
              js="this.direction += 15;"
            />

            <TranslationHeader>Turn Left</TranslationHeader>
            <Translation
              scratch="turn left (15) degrees"
              js="this.direction -= 15;"
            />

            <TranslationHeader>Go to target</TranslationHeader>
            <Translation
              scratch="go to (random position v)"
              js="this.goto(this.random(-240, 240), this.random(-180, 180));"
            />
            <Translation
              scratch="go to (mouse-pointer v)"
              js="this.goto(this.mouse.x, this.mouse.y);"
            />
            <Translation
              scratch="go to (Sprite1 v)"
              js="this.goto(this.sprites.sprite1.x, this.sprites.sprite1.y);"
            />

            <TranslationHeader>Go to x y</TranslationHeader>
            <Translation
              scratch="go to x: (200) y: (100)"
              js="this.goto(200, 100);"
            />

            <TranslationHeader>Glide to target</TranslationHeader>
            <Translation
              scratch="glide (1) secs to (random position v)"
              js="yield* this.glide(1, this.random(-240, 240), this.random(-180, 180));"
            />
            <Translation
              scratch="glide (1) secs to (mouse-pointer v)"
              js="yield* this.glide(1, this.mouse.x, this.mouse.y);"
            />
            <Translation
              scratch="glide (1) secs to (Sprite1 v)"
              js="yield* this.glide(1, this.sprites.sprite1.x, this.sprites.sprite1.y);"
            />

            <TranslationHeader>Glide to x y</TranslationHeader>
            <Translation
              scratch="glide (1) secs to x: (200) y: (100)"
              js="yield* this.glide(1, 200, 100);"
            />

            <TranslationHeader>Point in direction</TranslationHeader>
            <Translation
              scratch="point in direction (90)"
              js="this.direction = 90;"
            />

            <TranslationHeader>Point towards</TranslationHeader>
            <Translation
              scratch="point towards (mouse-pointer v)"
              js={`this.direction = this.radToScratch(
  Math.atan2(
    this.mouse.y - this.y,
    this.mouse.x - this.x
  )
);`}
            />
            <Translation
              scratch="point towards (Sprite1 v)"
              js={`this.direction = this.radToScratch(
  Math.atan2(
    this.sprites.sprite1.y - this.y,
    this.sprites.sprite1.x - this.x
  )
);`}
            />

            <TranslationHeader>Change x by</TranslationHeader>
            <Translation scratch="change x by (10)" js="this.x += 10;" />

            <TranslationHeader>Set x to</TranslationHeader>
            <Translation scratch="set x to (0)" js="this.x = 0;" />

            <TranslationHeader>Change y by</TranslationHeader>
            <Translation scratch="change y by (10)" js="this.y += 10;" />

            <TranslationHeader>Set y to</TranslationHeader>
            <Translation scratch="set y to (0)" js="this.y = 0;" />

            <TranslationHeader>If on edge, bounce</TranslationHeader>
            <Translation
              scratch="if on edge, bounce"
              js="this.ifOnEdgeBounce();"
            />

            <TranslationHeader>Set rotation style</TranslationHeader>
            <Translation
              scratch="set rotation style [left-right v]"
              js="this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;"
            />
            <Translation
              scratch="set rotation style [don't rotate v]"
              js="this.rotationStyle = Sprite.RotationStyle.DONT_ROTATE;"
            />
            <Translation
              scratch="set rotation style [all around v]"
              js="this.rotationStyle = Sprite.RotationStyle.ALL_AROUND;"
            />

            <TranslationHeader>X position</TranslationHeader>
            <Translation scratch="(x position)" js="this.x" />

            <TranslationHeader>Y position</TranslationHeader>
            <Translation scratch="(y position)" js="this.y" />

            <TranslationHeader>Direction</TranslationHeader>
            <Translation scratch="(direction)" js="this.direction" />
          </TranslationGrid>
        )}
        {palette === "looks" && (
          <TranslationGrid>
            <TranslationHeader>Say for seconds</TranslationHeader>
            <Translation
              scratch="say [Hello!] for (2) seconds"
              js='yield* this.sayAndWait("Hello!", 2);'
            />

            <TranslationHeader>Say</TranslationHeader>
            <Translation scratch="say [Hello!]" js='this.say("Hello!");' />

            <TranslationHeader>Think for seconds</TranslationHeader>
            <Translation
              scratch="think [Hmm...] for (2) seconds"
              js='yield* this.thinkAndWait("Hmm...", 2);'
            />

            <TranslationHeader>Think</TranslationHeader>
            <Translation scratch="think [Hmm...]" js='this.think("Hmm...");' />

            <TranslationHeader>Switch costume</TranslationHeader>
            <Translation
              scratch="switch costume to (costume1 v)"
              js={`this.costume = "costume1";

// Or switch to costume number
this.costumeNumber = 3;`}
            />

            <TranslationHeader>Next costume</TranslationHeader>
            <Translation scratch="next costume" js="this.costumeNumber++;" />

            <TranslationHeader>Switch backdrop</TranslationHeader>
            <Translation
              scratch="switch backdrop to (backdrop1 v)"
              js={`// In a sprite:
this.stage.costume = "backdrop1";

// In the stage:
this.costume = "backdrop1";`}
            />
            <Translation
              scratch="switch backdrop to (next backdrop v)"
              js={`// In a sprite:
this.stage.costumeNumber++;

// In the stage:
this.costumeNumber++;`}
            />
            <Translation
              scratch="switch backdrop to (previous backdrop v)"
              js={`// In a sprite:
this.stage.costumeNumber--;

// In the stage:
this.costumeNumber--;`}
            />
            <Translation
              scratch="switch backdrop to (random backdrop v)"
              js={`// In a sprite:
this.stage.costume = "random backdrop";

// In the stage:
this.costume = "random backdrop";`}
            />

            <TranslationHeader>Next Backdrop</TranslationHeader>
            <Translation
              scratch="next backdrop"
              js={`// In a sprite:
this.stage.costumeNumber++;

// In the stage:
this.costumeNumber++;`}
            />

            <TranslationHeader>Change size</TranslationHeader>
            <Translation scratch="change size by (10)" js="this.size += 10;" />

            <TranslationHeader>Set size</TranslationHeader>
            <Translation scratch="set size to (100)%" js="this.size = 100;" />

            <TranslationHeader>Change graphic effect</TranslationHeader>
            <Translation
              scratch="change [color v] effect by (25)"
              js="this.effects.color += 25;"
            />
            <Translation
              scratch="change [fisheye v] effect by (25)"
              js="this.effects.fisheye += 25;"
            />
            <Translation
              scratch="change [whirl v] effect by (25)"
              js="this.effects.whirl += 25;"
            />
            <Translation
              scratch="change [pixelate v] effect by (25)"
              js="this.effects.pixelate += 25;"
            />
            <Translation
              scratch="change [mosaic v] effect by (25)"
              js="this.effects.mosaic += 25;"
            />
            <Translation
              scratch="change [brightness v] effect by (25)"
              js="this.effects.brightness += 25;"
            />
            <Translation
              scratch="change [ghost v] effect by (25)"
              js="this.effects.ghost += 25;"
            />

            <TranslationHeader>Set graphic effect</TranslationHeader>
            <Translation
              scratch="set [color v] effect to (100)"
              js="this.effects.color = 100;"
            />
            <Translation
              scratch="set [fisheye v] effect to (100)"
              js="this.effects.fisheye = 100;"
            />
            <Translation
              scratch="set [whirl v] effect to (100)"
              js="this.effects.whirl = 100;"
            />
            <Translation
              scratch="set [pixelate v] effect to (100)"
              js="this.effects.pixelate = 100;"
            />
            <Translation
              scratch="set [mosaic v] effect to (100)"
              js="this.effects.mosaic = 100;"
            />
            <Translation
              scratch="set [brightness v] effect to (100)"
              js="this.effects.brightness = 100;"
            />
            <Translation
              scratch="set [ghost v] effect to (100)"
              js="this.effects.ghost = 100;"
            />

            <TranslationHeader>Clear graphic effects</TranslationHeader>
            <Translation
              scratch="clear graphic effects"
              js="this.effects.clear();"
            />

            <TranslationHeader>Show</TranslationHeader>
            <Translation scratch="show" js="this.visible = true;" />

            <TranslationHeader>Hide</TranslationHeader>
            <Translation scratch="hide" js="this.visible = false;" />

            <TranslationHeader>Go to layer</TranslationHeader>
            <Translation
              scratch="go to [front v] layer"
              js="this.moveAhead();"
            />
            <Translation
              scratch="go to [back v] layer"
              js="this.moveBehind();"
            />

            <TranslationHeader>Go forward/backward layers</TranslationHeader>
            <Translation
              scratch="go [forward v] (1) layers"
              js="this.moveAhead(1);"
            />
            <Translation
              scratch="go [backward v] (1) layers"
              js="this.moveBehind(1);"
            />

            <TranslationHeader>Costume number/name</TranslationHeader>
            <Translation
              scratch="(costume [number v])"
              js="this.costumeNumber"
            />
            <Translation scratch="(costume [name v])" js="this.costume" />

            <TranslationHeader>Backdrop number/name</TranslationHeader>
            <Translation
              scratch="(backdrop [number v])"
              js={`// In a sprite:
this.stage.costumeNumber

// In the stage:
this.costumeNumber`}
            />
            <Translation
              scratch="(backdrop [name v])"
              js={`// In a sprite:
this.stage.costume

// In the stage:
this.costume`}
            />

            <TranslationHeader>Size</TranslationHeader>
            <Translation scratch="(size)" js="this.size" />
          </TranslationGrid>
        )}
        {palette === "sound" && (
          <TranslationGrid>
            <TranslationHeader>Play sound until done</TranslationHeader>
            <Translation
              scratch="play sound (Meow v) until done"
              js='yield* this.playSoundUntilDone("meow");'
            />

            <TranslationHeader>Play sound</TranslationHeader>
            <Translation
              scratch="play sound (Meow v)"
              js='yield* this.startSound("meow");'
            />

            <TranslationHeader>Stop all sounds</TranslationHeader>
            <Translation scratch="stop all sounds" js="this.stopAllSounds();" />

            <TranslationHeader>Change effect</TranslationHeader>
            <Translation
              scratch="change [pitch v] effect by (10)"
              js="this.audioEffects.pitch += 10;"
            />
            <Translation
              scratch="change [pan left/right v] effect by (10)"
              js="this.audioEffects.pan += 10;"
            />

            <TranslationHeader>Set effect</TranslationHeader>
            <Translation
              scratch="set [pitch v] effect to (100)"
              js="this.audioEffects.pitch = 100;"
            />
            <Translation
              scratch="set [pan left/right v] effect to (100)"
              js="this.audioEffects.pan = 100;"
            />

            <TranslationHeader>Clear sound effects</TranslationHeader>
            <Translation
              scratch="clear sound effects"
              js="this.audioEffects.clear();"
            />

            <TranslationHeader>Change volume</TranslationHeader>
            <Translation
              scratch="change volume by (10)"
              js="this.audioEffects.volume += 10;"
            />

            <TranslationHeader>Set volume</TranslationHeader>
            <Translation
              scratch="set volume to (100)"
              js="this.audioEffects.volume = 100;"
            />

            <TranslationHeader>Volume</TranslationHeader>
            <Translation scratch="(volume)" js="this.audioEffects.volume" />
          </TranslationGrid>
        )}
        {palette === "events" && (
          <TranslationGrid>
            <TranslationHeader>When green flag clicked</TranslationHeader>
            <Translation
              scratch="when green flag clicked"
              js="new Trigger(Trigger.GREEN_FLAG, this.myScript)"
            />

            <TranslationHeader>When key pressed</TranslationHeader>
            <Translation
              scratch="when [space v] key pressed"
              js='new Trigger(Trigger.KEY_PRESSED, { key: "space" }, this.myScript)'
            />
            <Translation
              scratch="when [right arrow v] key pressed"
              js='new Trigger(Trigger.KEY_PRESSED, { key: "right arrow" }, this.myScript)'
            />
            <Translation scratch="when [any v] key pressed" />
            <Translation
              scratch="when [a v] key pressed"
              js='new Trigger(Trigger.KEY_PRESSED, { key: "a" }, this.myScript)'
            />
            <Translation
              scratch="when [1 v] key pressed"
              js='new Trigger(Trigger.KEY_PRESSED, { key: "1" }, this.myScript)'
            />

            <TranslationHeader>When this sprite clicked</TranslationHeader>
            <Translation
              scratch="when this sprite clicked"
              js="new Trigger(Trigger.CLICKED, this.myScript)"
            />

            <TranslationHeader>When backdrop switches</TranslationHeader>
            <Translation scratch="when backdrop switches to [backdrop1 v]" />

            <TranslationHeader>When greater than</TranslationHeader>
            <Translation
              scratch="when [loudness v] > (10)"
              js="new Trigger(Trigger.LOUDNESS_GREATER_THAN, { VALUE: 10 }, this.whenLoudnessGreaterThan)"
            />
            <Translation
              scratch="when [loudness v] > (amount)"
              js="new Trigger(Trigger.LOUDNESS_GREATER_THAN, { VALUE: () => this.vars.amount }, this.whenLoudnessGreaterThan)"
            />
            <Translation
              scratch="when [timer v] > (10)"
              js="new Trigger(Trigger.TIMER_GREATER_THAN, { VALUE: 10 }, this.whenTimerGreaterThan)"
            />
            <Translation
              scratch="when [timer v] > ((amount) / (2))"
              js="new Trigger(Trigger.TIMER_GREATER_THAN, { VALUE: () => this.vars.amount / 2 }, this.whenTimerGreaterThan)"
            />

            <TranslationHeader>When I receive</TranslationHeader>
            <Translation
              scratch="when I receive [message1 v]"
              js='new Trigger(Trigger.BROADCAST, { name: "message1" }, this.myScript.bind(this))'
            />

            <TranslationHeader>Broadcast</TranslationHeader>
            <Translation
              scratch="broadcast (message1 v)"
              js='this.broadcast("message1");'
            />

            <TranslationHeader>Broadcast and wait</TranslationHeader>
            <Translation
              scratch="broadcast (message1 v) and wait"
              js='yield* this.broadcastAndWait("message1");'
            />
          </TranslationGrid>
        )}
        {palette === "control" && (
          <TranslationGrid>
            <TranslationHeader>Wait seconds</TranslationHeader>
            <Translation scratch="wait (1) seconds" js="yield* this.wait(1);" />

            <TranslationHeader>Repeat</TranslationHeader>
            <Translation
              scratch="repeat (10)"
              js={`for (let i = 0; i < 10; i++) {
  // do something fun here
  yield;
}`}
            />

            <TranslationHeader>Forever</TranslationHeader>
            <Translation
              scratch="forever"
              js={`while (true) {
  // do something fun here
  yield;
}`}
            />

            <TranslationHeader>If</TranslationHeader>
            <Translation
              scratch="if <> then"
              js={`if (/* condition */) {
  // do something fun (maybe)
}`}
            />

            <TranslationHeader>If else</TranslationHeader>
            <Translation
              scratch={"if <> then\nelse\nend"}
              js={`if (/* condition */) {
  // do something fun (maybe)
} else {
  // otherwise do something else
}`}
            />

            <TranslationHeader>Wait until</TranslationHeader>
            <Translation
              scratch="wait until <>"
              js="while (!(/* condition */)) { yield; }"
            />

            <TranslationHeader>Repeat until</TranslationHeader>
            <Translation
              scratch="repeat until <>"
              js={`while (!(/* condition */)) {
  // do something fun here
  yield;
}`}
            />

            <TranslationHeader>Stop</TranslationHeader>
            <Translation scratch="stop [all v]" />
            <Translation scratch="stop [this script v]" js="return;" />
            <Translation scratch="stop [other scripts in sprite v]" />

            <TranslationHeader>When I start as a clone</TranslationHeader>
            <Translation
              scratch="when I start as a clone"
              js="new Trigger(Trigger.CLONE_START, this.myScript)"
            />

            <TranslationHeader>Create clone</TranslationHeader>
            <Translation
              scratch="create clone of (myself v)"
              js="this.createClone();"
            />
            <Translation
              scratch="create clone of (Sprite1 v)"
              js="this.sprites.sprite1.createClone();"
            />

            <TranslationHeader>Delete this clone</TranslationHeader>
            <Translation
              scratch="delete this clone"
              js="this.deleteThisClone();"
            />
          </TranslationGrid>
        )}
        {palette === "sensing" && (
          <TranslationGrid>
            <TranslationHeader>Touching target</TranslationHeader>
            <Translation
              scratch="<touching (mouse-pointer v)?>"
              js='this.touching("mouse")'
            />
            <Translation
              scratch="<touching (edge v)?>"
              js='this.touching("edge")'
            />
            <Translation
              scratch="<touching (Sprite1 v)?>"
              js="this.touching(this.sprites.sprite1.andClones())"
            />

            <TranslationHeader>Touching color</TranslationHeader>
            <Translation
              scratch="<touching color (#ffab1a)>"
              js="this.touching(Color.hsv(11, 90, 100))"
            />

            <TranslationHeader>Color touching color</TranslationHeader>
            <Translation
              scratch="<color (#ffab1a) is touching (#4d97fe)?"
              js="this.colorTouching(Color.hsv(11, 90, 100), Color.hsv(60, 70, 100))"
            />

            <TranslationHeader>Distance to target</TranslationHeader>
            <Translation
              scratch="(distance to (mouse-pointer v))"
              js="Math.hypot(this.mouse.x - this.x, this.mouse.y - this.y)"
            />
            <Translation
              scratch="(distance to (Sprite1 v))"
              js="Math.hypot(this.sprites.sprite1.x - this.x, this.sprites.sprite1.y - this.y)"
            />

            <TranslationHeader>Ask and wait</TranslationHeader>
            <Translation
              scratch="ask [What's your name?] and wait"
              js={`yield* this.askAndWait("What's your name?");`}
            />

            <TranslationHeader>Answer</TranslationHeader>
            <Translation scratch="(answer)" js="this.answer" />

            <TranslationHeader>Key pressed</TranslationHeader>
            <Translation
              scratch="<key (space v) pressed?>"
              js='this.keyPressed("space")'
            />
            <Translation
              scratch="<key (right arrow v) pressed?>"
              js='this.keyPressed("right arrow")'
            />
            <Translation
              scratch="<key (any v) pressed?>"
              js='this.keyPressed("any")'
            />
            <Translation
              scratch="<key (a v) pressed?>"
              js='this.keyPressed("a")'
            />
            <Translation
              scratch="<key (1 v) pressed?>"
              js='this.keyPressed("1")'
            />

            <TranslationHeader>Mouse down</TranslationHeader>
            <Translation scratch="<mouse down?>" js="this.mouse.down" />

            <TranslationHeader>Mouse x</TranslationHeader>
            <Translation scratch="(mouse x)" js="this.mouse.x" />

            <TranslationHeader>Mouse y</TranslationHeader>
            <Translation scratch="(mouse y)" js="this.mouse.y" />

            <TranslationHeader>Set drag mode</TranslationHeader>
            <Translation scratch="set drag mode [draggable v]" />
            <Translation scratch="set drag mode [not draggable v]" />

            <TranslationHeader>Loudness</TranslationHeader>
            <Translation scratch="(loudness)" js="this.loudness" />

            <TranslationHeader>Timer</TranslationHeader>
            <Translation scratch="(timer)" js="this.timer" />

            <TranslationHeader>Reset timer</TranslationHeader>
            <Translation scratch="reset timer" js="this.restartTimer();" />

            <TranslationHeader>Property of target</TranslationHeader>
            <Translation
              scratch="([x position v] of (Sprite1 v))"
              js="this.sprites.sprite1.x"
            />
            <Translation
              scratch="([y position v] of (Sprite1 v))"
              js="this.sprites.sprite1.y"
            />
            <Translation
              scratch="([direction v] of (Sprite1 v))"
              js="this.sprites.sprite1.direction"
            />
            <Translation
              scratch="([costume # v] of (Sprite1 v))"
              js="this.sprites.sprite1.costumeNumber"
            />
            <Translation
              scratch="([costume name v] of (Sprite1 v))"
              js="this.sprites.sprite1.costume.name"
            />
            <Translation
              scratch="([backdrop # v] of (Stage v))"
              js="this.stage.costumeNumber"
            />
            <Translation
              scratch="([backdrop name v] of (Stage v))"
              js="this.stage.costume.name"
            />
            <Translation
              scratch="([size v] of (Sprite1 v))"
              js="this.sprites.sprite1.size"
            />
            <Translation scratch="([volume v] of (Sprite1 v))" />
            <Translation
              scratch="([myCoolVariable v] of (Sprite1 v))"
              js="this.sprites.sprite1.vars.myCoolVariable"
            />

            <TranslationHeader>Current</TranslationHeader>
            <Translation
              scratch="(current [year v])"
              js="new Date().getFullYear()"
            />
            <Translation
              scratch="(current [month v])"
              js="new Date().getMonth() + 1"
            />
            <Translation
              scratch="(current [date v])"
              js="new Date().getDate()"
            />
            <Translation
              scratch="(current [day of week v])"
              js="new Date().getDay() + 1"
            />
            <Translation
              scratch="(current [hour v])"
              js="new Date().getHours()"
            />
            <Translation
              scratch="(current [minute v])"
              js="new Date().getMinutes()"
            />
            <Translation
              scratch="(current [second v])"
              js="new Date().getSeconds()"
            />

            <TranslationHeader>Days since 2000</TranslationHeader>
            <Translation
              scratch="(days since 2000)"
              js={`// This one's pretty beefy:
(((new Date().getTime() - new Date(2000, 0, 1)) / 1000 / 60 + new Date().getTimezoneOffset()) / 60 / 24)

// FYI, you can get the milliseconds since 1970 (Unix time) like this:
new Date().getTime()`}
            />

            <TranslationHeader>Username</TranslationHeader>
            <Translation scratch="(username)" />
          </TranslationGrid>
        )}
        {palette === "operators" && (
          <TranslationGrid>
            <TranslationHeader>Add (+)</TranslationHeader>
            <Translation scratch="((6) + (2))" js="6 + 2" />

            <TranslationHeader>Subtract (-)</TranslationHeader>
            <Translation scratch="((6) - (2))" js="6 - 2" />

            <TranslationHeader>Multiply (&times;)</TranslationHeader>
            <Translation scratch="((6) * (2))" js="6 * 2" />

            <TranslationHeader>Divide (&divide;)</TranslationHeader>
            <Translation scratch="((6) / (2))" js="6 / 2" />

            <TranslationHeader>Pick random</TranslationHeader>
            <Translation
              scratch="(pick random (1) to (10))"
              js="this.random(1, 10)"
            />

            <TranslationHeader>Greater than (&gt;)</TranslationHeader>
            <Translation scratch="<(20) > (15)>" js="20 > 25" />

            <TranslationHeader>Less than (&lt;)</TranslationHeader>
            <Translation scratch="<(15) < (20)>" js="15 < 20" />

            <TranslationHeader>Equal (=)</TranslationHeader>
            <Translation scratch="<(15) = (15)>" js="15 == 15" />

            <TranslationHeader>And</TranslationHeader>
            <Translation
              scratch="<<> and <>>"
              js="(/* condition 1 */) && (/* condition 2 */)"
            />

            <TranslationHeader>Or</TranslationHeader>
            <Translation
              scratch="<<> or <>>"
              js="(/* condition 1 */) || (/* condition 2 */)"
            />

            <TranslationHeader>Not</TranslationHeader>
            <Translation scratch="<not <>>" js="!(/* condition */)" />

            <TranslationHeader>Join</TranslationHeader>
            <Translation
              scratch="(join [scratch] [js])"
              js='"scratch" + "js"'
            />
            <Translation
              scratch="(join [1] [2])"
              js='"" + 1 + 2 // Add a blank string to join numbers rather than adding them'
            />

            <TranslationHeader>Letter of string</TranslationHeader>
            <Translation
              scratch="(letter [1] of [abcd])"
              js='"abcd"[0] // Start counting from 0'
            />
            <Translation
              scratch="(letter [4] of [abcd])"
              js='"abcd"[3] // Number must always be one less than in Scratch'
            />
            <Translation
              scratch="(letter (x position) of [abcd])"
              js='"abcd"[this.x - 1] // You can subtract inside the brackets if needed'
            />

            <TranslationHeader>Length of string</TranslationHeader>
            <Translation scratch="(length of [apple])" js='"apple".length' />

            <TranslationHeader>Contains</TranslationHeader>
            <Translation
              scratch="<[apple] contains [a]?>"
              js='"apple".includes("a")'
            />

            <TranslationHeader>Modulo (mod)</TranslationHeader>
            <Translation scratch="((7) mod (3))" js="7 % 3" />

            <TranslationHeader>Round</TranslationHeader>
            <Translation scratch="(round (3.5))" js="Math.round(3.5)" />

            <TranslationHeader>Math "of"</TranslationHeader>
            <Translation scratch="([abs v] of (-10))" js="Math.abs(-10)" />
            <Translation scratch="([floor v] of (3.5))" js="Math.floor(3.5)" />
            <Translation scratch="([ceiling v] of (3.5))" js="Math.ceil(3.5)" />
            <Translation scratch="([sqrt v] of (9))" js="Math.sqrt(9)" />
            <Translation
              scratch="([sin v] of (90))"
              js="Math.sin(this.degToRad(90))"
            />
            <Translation
              scratch="([cos v] of (90))"
              js="Math.cos(this.degToRad(90))"
            />
            <Translation
              scratch="([tan v] of (45))"
              js="Math.tan(this.degToRad(45))"
            />
            <Translation
              scratch="([asin v] of (1))"
              js="this.radToDeg(Math.asin(1))"
            />
            <Translation
              scratch="([acos v] of (1))"
              js="this.radToDeg(Math.acos(1))"
            />
            <Translation
              scratch="([atan v] of (1))"
              js="this.radToDeg(Math.atan(1))"
            />
            <Translation scratch="([ln v] of (10))" js="Math.log(10)" />
            <Translation scratch="([log v] of (10))" js="Math.log10(10)" />
            <Translation scratch="([e ^ v] of (2))" js="Math.E ** 2" />
            <Translation scratch="([10 ^ v] of (2))" js="10 ** 2" />
          </TranslationGrid>
        )}
        {palette === "variables" && (
          <TranslationGrid>
            <TranslationHeader>Variable</TranslationHeader>
            <Translation
              scratch="(my global variable)"
              js="this.stage.vars.myGlobalVariable"
            />
            <Translation
              scratch="(my sprite variable)"
              js="this.vars.mySpriteVariable"
            />
            <Translation scratch="(☁ my cloud variable)" />

            <TranslationHeader>Set variable</TranslationHeader>
            <Translation
              scratch="set [my global variable v] to [hello]"
              js='this.stage.vars.myGlobalVariable = "hello";'
            />
            <Translation
              scratch="set [my sprite variable v] to [hello]"
              js='this.vars.mySpriteVariable = "hello";'
            />
            <Translation scratch="set [☁ my cloud variable v] to [hello]" />

            <TranslationHeader>Change variable</TranslationHeader>
            <Translation
              scratch="change [my global variable v] by (10)"
              js="this.stage.vars.myGlobalVariable += 10;"
            />
            <Translation
              scratch="change [my sprite variable v] by (10)"
              js="this.vars.mySpriteVariable += 10;"
            />
            <Translation scratch="change [☁ my cloud variable v] by (10)" />

            <TranslationHeader>Show variable</TranslationHeader>
            <Translation
              scratch="show variable [my global variable v]"
              js="this.stage.watchers.myGlobalVar.visible = true;"
            />
            <Translation
              scratch="show variable [my sprite variable v]"
              js="this.watchers.mySpriteVar.visible = true;"
            />
            <Translation scratch="show variable [☁ my cloud variable v]" />

            <TranslationHeader>Hide variable</TranslationHeader>
            <Translation
              scratch="hide variable [my global variable v]"
              js="this.stage.watchers.myGlobalVar.visible = false;"
            />
            <Translation
              scratch="hide variable [my sprite variable v]"
              js="this.watchers.mySpriteVar.visible = false;"
            />
            <Translation scratch="hide variable [☁ my cloud variable v]" />

            <TranslationHeader>List</TranslationHeader>
            <Translation
              scratch="(my global list :: list)"
              js='this.stage.vars.myGlobalList.join(" ")'
            />
            <Translation
              scratch="(my sprite list :: list)"
              js='this.vars.mySpriteList.join(" ")'
            />

            <TranslationHeader>Add to list</TranslationHeader>
            <Translation
              scratch="add [thing] to [my global list v]"
              js='this.stage.vars.myGlobalList.push("thing");'
            />
            <Translation
              scratch="add [thing] to [my sprite list v]"
              js='this.vars.mySpriteList.push("thing");'
            />

            <TranslationHeader>Delete item of list</TranslationHeader>
            <Translation
              scratch="delete [8] of [my global list v]"
              js="this.stage.vars.myGlobalList.splice(7, 1); // Need to subtract 1 from index because arrays start at item 0 (not 1)"
            />
            <Translation
              scratch="delete [8] of [my sprite list v]"
              js="this.vars.mySpriteList.splice(7, 1); // Need to subtract 1 from index because arrays start at item 0 (not 1)"
            />

            <TranslationHeader>Delete all of list</TranslationHeader>
            <Translation
              scratch="delete all of [my global list v]"
              js="this.stage.vars.myGlobalList = [];"
            />
            <Translation
              scratch="delete all of [my sprite list v]"
              js="this.vars.mySpriteList = [];"
            />

            <TranslationHeader>Insert at location in list</TranslationHeader>
            <Translation
              scratch="insert [thing] at [8] of [my global list v]"
              js='this.stage.vars.myGlobalList.splice(7, 0, "thing");'
            />
            <Translation
              scratch="insert [thing] at [8] of [my sprite list v]"
              js='this.vars.mySpriteList.splice(7, 0, "thing");'
            />

            <TranslationHeader>Replace item of list</TranslationHeader>
            <Translation
              scratch="replace item [8] of [my global list v] with [thing]"
              js='this.stage.vars.myGlobalList.splice(7, 1, "thing");'
            />
            <Translation
              scratch="replace item [8] of [my sprite list v] with [thing]"
              js='this.vars.mySpriteList.splice(7, 1, "thing");'
            />

            <TranslationHeader>Item of list</TranslationHeader>
            <Translation
              scratch="(item [8] of [my global list v])"
              js="this.stage.vars.myGlobalList[7]"
            />
            <Translation
              scratch="(item [8] of [my sprite list v])"
              js="this.vars.mySpriteList[7]"
            />

            <TranslationHeader>Item number in list</TranslationHeader>
            <Translation
              scratch="(item # of [thing] in [my global list v])"
              js='this.stage.vars.myGlobalList.indexOf("thing") + 1'
            />
            <Translation
              scratch="(item # of [thing] in [my sprite list v])"
              js='this.vars.mySpriteList.indexOf("thing") + 1'
            />

            <TranslationHeader>Length of list</TranslationHeader>
            <Translation
              scratch="(length of [my global list v])"
              js="this.stage.vars.myGlobalList.length"
            />
            <Translation
              scratch="(length of [my sprite list v])"
              js="this.vars.mySpriteList.length"
            />

            <TranslationHeader>List contains item</TranslationHeader>
            <Translation
              scratch="<[my global list v] contains [thing]?>"
              js='this.stage.vars.myGlobalList.includes("thing")'
            />
            <Translation
              scratch="<[my sprite list v] contains [thing]?>"
              js='this.vars.mySpriteList.includes("thing")'
            />

            <TranslationHeader>Show list</TranslationHeader>
            <Translation
              scratch="show list [my global list v]"
              js="this.stage.watchers.myGlobalList.visible = true;"
            />
            <Translation
              scratch="show list [my sprite list v]"
              js="this.watchers.mySpriteList.visible = true;"
            />

            <TranslationHeader>Hide list</TranslationHeader>
            <Translation
              scratch="hide list [my global list v]"
              js="this.stage.watchers.myGlobalList.visible = false;"
            />
            <Translation
              scratch="hide list [my sprite list v]"
              js="this.watchers.mySpriteList.visible = false;"
            />
          </TranslationGrid>
        )}
        {palette === "my-blocks" && (
          <TranslationGrid>
            <Translation
              scratch={`when green flag clicked
my custom block [hello] [10]

define my custom block (message) (dist)
say (message) for (2) seconds
move (dist) steps`}
              js={`/* Custom blocks are created by adding additional
   methods (scripts) to a sprite. */

export default class Sprite1 extends Sprite {
  constructor(...args) { /* ... */ }

  *whenGreenFlagClicked() {
    yield* this.myCustomBlock("hello", 10);
  }

  *myCustomBlock(message, dist) {
    yield* this.sayAndWait(message, 2);
    this.move(dist);
  }
}`}
            />
          </TranslationGrid>
        )}
        {palette === "pen" && (
          <TranslationGrid>
            <TranslationHeader>Erase all</TranslationHeader>
            <Translation scratch="erase all" js="this.clearPen();" />

            <TranslationHeader>Stamp</TranslationHeader>
            <Translation scratch="stamp" js="this.stamp();" />

            <TranslationHeader>Pen down</TranslationHeader>
            <Translation scratch="pen down" js="this.penDown = true;" />

            <TranslationHeader>Pen up</TranslationHeader>
            <Translation scratch="pen up" js="this.penDown = false;" />

            <TranslationHeader>Set pen color</TranslationHeader>
            <Translation
              scratch="set pen color to (#4d97fe)"
              js={`// rgb:
this.penColor = Color.rgb(77, 151, 255);

// rgba:
this.penColor = Color.rgb(77, 151, 255, 0.5);

// hsv (hue from 0 to 100):
this.penColor = Color.hsv(60, 70, 100);

// hsva (hue from 0 to 100):
this.penColor = Color.hsv(60, 70, 100, 0.5);`}
            />

            <TranslationHeader>Change pen value</TranslationHeader>
            <Translation
              scratch="change pen (color v) by (10)"
              js="this.penColor.h += 10;"
            />
            <Translation
              scratch="change pen (saturation v) by (10)"
              js="this.penColor.s += 10;"
            />
            <Translation
              scratch="change pen (brightness v) by (10)"
              js="this.penColor.v += 10;"
            />
            <Translation
              scratch="change pen (transparency v) by (10)"
              js="this.penColor.a -= 0.1;"
            />

            <TranslationHeader>Set pen value</TranslationHeader>
            <Translation
              scratch="set pen (color v) to (10)"
              js="this.penColor.h = 10;"
            />
            <Translation
              scratch="set pen (saturation v) to (10)"
              js="this.penColor.s = 10;"
            />
            <Translation
              scratch="set pen (brightness v) to (10)"
              js="this.penColor.v = 10;"
            />
            <Translation
              scratch="set pen (transparency v) to (10)"
              js="this.penColor.a = 0.9;"
            />

            <TranslationHeader>Change pen size</TranslationHeader>
            <Translation
              scratch="change pen size by (10)"
              js="this.penSize += 10;"
            />

            <TranslationHeader>Set pen size</TranslationHeader>
            <Translation
              scratch="set pen size to (50)"
              js="this.penSize = 50;"
            />
          </TranslationGrid>
        )}
      </div>
    </>
  );
}

function PaletteTabs() {
  const [setStickyElement, isStickied] = useStickyWatcher();

  return (
    <nav
      className={classNames("sticky -top-px border-t bg-white", {
        "border-b": !isStickied,
        shadow: isStickied,
      })}
      ref={(elem) => {
        setStickyElement(elem);
      }}
    >
      <div className="mx-auto flex max-w-5xl flex-wrap px-8">
        <PaletteTab id="motion" color="#3373cc">
          Motion
        </PaletteTab>
        <PaletteTab id="looks" color="#774dcb">
          Looks
        </PaletteTab>
        <PaletteTab id="sound" color="#bd42bd">
          Sound
        </PaletteTab>
        <PaletteTab id="events" color="#cc9900">
          Events
        </PaletteTab>
        <PaletteTab id="control" color="#cf8c17">
          Control
        </PaletteTab>
        <PaletteTab id="sensing" color="#2e8fb8">
          Sensing
        </PaletteTab>
        <PaletteTab id="operators" color="#389438">
          Operators
        </PaletteTab>
        <PaletteTab id="variables" color="#db6e00">
          Variables
        </PaletteTab>
        <PaletteTab id="my-blocks" color="#ff4d6b">
          My Blocks
        </PaletteTab>
        <PaletteTab id="pen" color="#0b8e69">
          Pen
        </PaletteTab>
      </div>
    </nav>
  );
}

interface PaletteTabProps {
  id: string;
  children: React.ReactNode;
  color: string;
}

function PaletteTab({ id, children, color }: PaletteTabProps) {
  const searchParams = useSearchParams();
  const palette = searchParams?.get("p") ?? "motion";

  const selected = palette === id;

  return (
    <Link href={`?p=${id}`} scroll={false} legacyBehavior>
      <a
        className="relative block px-4 py-2 font-medium"
        style={{
          color: color,
          backgroundColor: selected ? `${color}33` : undefined,
        }}
      >
        {children}
        {selected && (
          <div
            className="absolute bottom-0 left-4 right-4 h-1 rounded-t-full"
            style={{ backgroundColor: color }}
          />
        )}
        <style jsx>
          {`
            a:hover {
              background: ${color}11;
            }
          `}
        </style>
      </a>
    </Link>
  );
}

function useStickyWatcher() {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [isStickied, setIsStickied] = useState(false);

  useEffect(() => {
    if (element) {
      const observer = new IntersectionObserver(
        ([e]) => {
          setIsStickied(e.intersectionRatio < 1);
        },
        { threshold: [1] },
      );

      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    }
  }, [element]);

  return [setElement, isStickied] as const;
}
