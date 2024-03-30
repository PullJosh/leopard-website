export interface Palette {
  name: string;
  color: `#${string}`;
  translations: {
    scratch: string;
    js?: string;
  }[];
}

export const palettes: Palette[] = [
  {
    name: "Motion",
    color: "#3373cc",
    translations: [
      { scratch: "move (10) steps", js: "this.move(10);" },
      { scratch: "turn right (15) degrees", js: "this.direction += 15;" },
      { scratch: "turn left (15) degrees", js: "this.direction -= 15;" },
      {
        scratch: "go to (random position v)",
        js: "this.goto(this.random(-240, 240), this.random(-180, 180));",
      },
      {
        scratch: "go to (mouse-pointer v)",
        js: "this.goto(this.mouse.x, this.mouse.y);",
      },
      {
        scratch: "go to (Sprite1 v)",
        js: "this.goto(this.sprites.sprite1.x, this.sprites.sprite1.y);",
      },
      { scratch: "go to x: (200) y: (100)", js: "this.goto(200, 100);" },
      {
        scratch: "glide (1) secs to (random position v)",
        js: "yield* this.glide(1, this.random(-240, 240), this.random(-180, 180));",
      },
      {
        scratch: "glide (1) secs to (mouse-pointer v)",
        js: "yield* this.glide(1, this.mouse.x, this.mouse.y);",
      },
      {
        scratch: "glide (1) secs to (Sprite1 v)",
        js: "yield* this.glide(1, this.sprites.sprite1.x, this.sprites.sprite1.y);",
      },
      {
        scratch: "glide (1) secs to x: (200) y: (100)",
        js: "yield* this.glide(1, 200, 100);",
      },
      { scratch: "point in direction (90)", js: "this.direction = 90;" },
      {
        scratch: "point towards (mouse-pointer v)",
        js: `this.direction = this.radToScratch(\n  Math.atan2(\n    this.mouse.y - this.y,\n    this.mouse.x - this.x\n  )\n);`,
      },
      {
        scratch: "point towards (Sprite1 v)",
        js: `this.direction = this.radToScratch(\n  Math.atan2(\n    this.sprites.sprite1.y - this.y,\n    this.sprites.sprite1.x - this.x\n  )\n);`,
      },
      { scratch: "change x by (10)", js: "this.x += 10;" },
      { scratch: "set x to (0)", js: "this.x = 0;" },
      { scratch: "change y by (10)", js: "this.y += 10;" },
      { scratch: "set y to (0)", js: "this.y = 0;" },
      { scratch: "if on edge, bounce", js: "this.ifOnEdgeBounce();" },
      {
        scratch: "set rotation style [left-right v]",
        js: "this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;",
      },
      {
        scratch: "set rotation style [don't rotate v]",
        js: "this.rotationStyle = Sprite.RotationStyle.DONT_ROTATE;",
      },
      {
        scratch: "set rotation style [all around v]",
        js: "this.rotationStyle = Sprite.RotationStyle.ALL_AROUND;",
      },
      { scratch: "(x position)", js: "this.x" },
      { scratch: "(y position)", js: "this.y" },
      { scratch: "(direction)", js: "this.direction" },
    ],
  },
  {
    name: "Looks",
    color: "#774dcb",
    translations: [
      {
        scratch: "say [Hello!] for (2) seconds",
        js: 'yield* this.sayAndWait("Hello!", 2);',
      },
      { scratch: "say [Hello!]", js: 'this.say("Hello!");' },
      {
        scratch: "think [Hmm...] for (2) seconds",
        js: 'yield* this.thinkAndWait("Hmm...", 2);',
      },
      { scratch: "think [Hmm...]", js: 'this.think("Hmm...");' },
      {
        scratch: "switch costume to (costume1 v)",
        js: `this.costume = "costume1"; // Or switch to costume number this.costumeNumber = 3;`,
      },
      { scratch: "next costume", js: "this.costumeNumber++;" },
      {
        scratch: "switch backdrop to (backdrop1 v)",
        js: '// In a sprite:\nthis.stage.costume = "backdrop1";\n\n// In the stage:\nthis.costume = "backdrop1";',
      },
      {
        scratch: "switch backdrop to (next backdrop v)",
        js: "// In a sprite:\nthis.stage.costumeNumber++;\n\n// In the stage:\nthis.costumeNumber++;",
      },
      {
        scratch: "switch backdrop to (previous backdrop v)",
        js: "// In a sprite:\nthis.stage.costumeNumber--;\n\n// In the stage:\nthis.costumeNumber--;",
      },
      {
        scratch: "switch backdrop to (random backdrop v)",
        js: '// In a sprite:\nthis.stage.costume = "random backdrop";\n\n// In the stage:\nthis.costume = "random backdrop";',
      },
      {
        scratch: "next backdrop",
        js: "// In a sprite:\nthis.stage.costumeNumber++;\n\n// In the stage:\nthis.costumeNumber++;",
      },
      { scratch: "change size by (10)", js: "this.size += 10;" },
      { scratch: "set size to (100)%", js: "this.size = 100;" },
      {
        scratch: "change [color v] effect by (25)",
        js: "this.effects.color += 25;",
      },
      {
        scratch: "change [fisheye v] effect by (25)",
        js: "this.effects.fisheye += 25;",
      },
      {
        scratch: "change [whirl v] effect by (25)",
        js: "this.effects.whirl += 25;",
      },
      {
        scratch: "change [pixelate v] effect by (25)",
        js: "this.effects.pixelate += 25;",
      },
      {
        scratch: "change [mosaic v] effect by (25)",
        js: "this.effects.mosaic += 25;",
      },
      {
        scratch: "change [brightness v] effect by (25)",
        js: "this.effects.brightness += 25;",
      },
      {
        scratch: "change [ghost v] effect by (25)",
        js: "this.effects.ghost += 25;",
      },
      {
        scratch: "set [color v] effect to (100)",
        js: "this.effects.color = 100;",
      },
      {
        scratch: "set [fisheye v] effect to (100)",
        js: "this.effects.fisheye = 100;",
      },
      {
        scratch: "set [whirl v] effect to (100)",
        js: "this.effects.whirl = 100;",
      },
      {
        scratch: "set [pixelate v] effect to (100)",
        js: "this.effects.pixelate = 100;",
      },
      {
        scratch: "set [mosaic v] effect to (100)",
        js: "this.effects.mosaic = 100;",
      },
      {
        scratch: "set [brightness v] effect to (100)",
        js: "this.effects.brightness = 100;",
      },
      {
        scratch: "set [ghost v] effect to (100)",
        js: "this.effects.ghost = 100;",
      },
      { scratch: "clear graphic effects", js: "this.effects.clear();" },
      { scratch: "show", js: "this.visible = true;" },
      { scratch: "hide", js: "this.visible = false;" },
      { scratch: "go to [front v] layer", js: "this.moveAhead();" },
      { scratch: "go to [back v] layer", js: "this.moveBehind();" },
      { scratch: "go [forward v] (1) layers", js: "this.moveAhead(1);" },
      { scratch: "go [backward v] (1) layers", js: "this.moveBehind(1);" },
      { scratch: "(costume [number v])", js: "this.costumeNumber" },
      { scratch: "(costume [name v])", js: "this.costume" },
      {
        scratch: "(backdrop [number v])",
        js: "// In a sprite:\nthis.stage.costumeNumber\n\n// In the stage:\nthis.costumeNumber",
      },
      {
        scratch: "(backdrop [name v])",
        js: "// In a sprite:\nthis.stage.costume\n\n// In the stage:\nthis.costume",
      },
      { scratch: "(size)", js: "this.size" },
    ],
  },
  {
    name: "Sound",
    color: "#bd42bd",
    translations: [
      {
        scratch: "play sound (Meow v) until done",
        js: 'yield* this.playSoundUntilDone("meow");',
      },
      {
        scratch: "play sound (Meow v)",
        js: 'yield* this.startSound("meow");',
      },
      { scratch: "stop all sounds", js: "this.stopAllSounds();" },
      {
        scratch: "change [pitch v] effect by (10)",
        js: "this.audioEffects.pitch += 10;",
      },
      {
        scratch: "change [pan left/right v] effect by (10)",
        js: "this.audioEffects.pan += 10;",
      },
      {
        scratch: "set [pitch v] effect to (100)",
        js: "this.audioEffects.pitch = 100;",
      },
      {
        scratch: "set [pan left/right v] effect to (100)",
        js: "this.audioEffects.pan = 100;",
      },
      { scratch: "clear sound effects", js: "this.audioEffects.clear();" },
      {
        scratch: "change volume by (10)",
        js: "this.audioEffects.volume += 10;",
      },
      { scratch: "set volume to (100)", js: "this.audioEffects.volume = 100;" },
      { scratch: "(volume)", js: "this.audioEffects.volume" },
    ],
  },
  {
    name: "Events",
    color: "#cc9900",
    translations: [
      {
        scratch: "when green flag clicked",
        js: "new Trigger(Trigger.GREEN_FLAG, this.myScript)",
      },
      {
        scratch: "when [space v] key pressed",
        js: 'new Trigger(Trigger.KEY_PRESSED, { key: "space" }, this.myScript)',
      },
      {
        scratch: "when [right arrow v] key pressed",
        js: 'new Trigger(Trigger.KEY_PRESSED, { key: "right arrow" }, this.myScript)',
      },
      { scratch: "when [any v] key pressed" },
      {
        scratch: "when [a v] key pressed",
        js: 'new Trigger(Trigger.KEY_PRESSED, { key: "a" }, this.myScript)',
      },
      {
        scratch: "when [1 v] key pressed",
        js: 'new Trigger(Trigger.KEY_PRESSED, { key: "1" }, this.myScript)',
      },
      {
        scratch: "when this sprite clicked",
        js: "new Trigger(Trigger.CLICKED, this.myScript)",
      },
      { scratch: "when backdrop switches to [backdrop1 v]" },
      {
        scratch: "when [loudness v] > (10)",
        js: "new Trigger(Trigger.LOUDNESS_GREATER_THAN, { VALUE: 10 }, this.whenLoudnessGreaterThan)",
      },
      {
        scratch: "when [loudness v] > (amount)",
        js: "new Trigger(Trigger.LOUDNESS_GREATER_THAN, { VALUE: () => this.vars.amount }, this.whenLoudnessGreaterThan)",
      },
      {
        scratch: "when [timer v] > (10)",
        js: "new Trigger(Trigger.TIMER_GREATER_THAN, { VALUE: 10 }, this.whenTimerGreaterThan)",
      },
      {
        scratch: "when [timer v] > ((amount) / (2))",
        js: "new Trigger(Trigger.TIMER_GREATER_THAN, { VALUE: () => this.vars.amount / 2 }, this.whenTimerGreaterThan)",
      },
      {
        scratch: "when I receive [message1 v]",
        js: 'new Trigger(Trigger.BROADCAST, { name: "message1" }, this.myScript.bind(this))',
      },
      {
        scratch: "broadcast (message1 v)",
        js: 'this.broadcast("message1");',
      },
      {
        scratch: "broadcast (message1 v) and wait",
        js: 'yield* this.broadcastAndWait("message1");',
      },
    ],
  },
  {
    name: "Control",
    color: "#cf8c17",
    translations: [
      { scratch: "wait (1) seconds", js: "yield* this.wait(1);" },
      {
        scratch: "repeat (10)",
        js: "for (let i = 0; i < 10; i++) {\n  // do something fun here\n  yield;\n}",
      },
      {
        scratch: "forever",
        js: "while (true) {\n  // do something fun here\n  yield;\n}",
      },
      {
        scratch: "if <> then",
        js: "if (/* condition */) {\n  // do something fun (maybe)\n}",
      },
      {
        scratch: "if <> then\nelse\nend",
        js: "if (/* condition */) {\n  // do something fun (maybe)\n} else {\n  // otherwise do something else\n}",
      },
      { scratch: "wait until <>", js: "while (!(/* condition */)) { yield; }" },
      {
        scratch: "repeat until <>",
        js: "while (!(/* condition */)) {\n  // do something fun here\n  yield;\n}",
      },
      { scratch: "stop [all v]" },
      { scratch: "stop [this script v]", js: "return;" },
      { scratch: "stop [other scripts in sprite v]" },
      {
        scratch: "when I start as a clone",
        js: "new Trigger(Trigger.CLONE_START, this.myScript)",
      },
      { scratch: "create clone of (myself v)", js: "this.createClone();" },
      {
        scratch: "create clone of (Sprite1 v)",
        js: "this.sprites.sprite1.createClone();",
      },
      { scratch: "delete this clone", js: "this.deleteThisClone();" },
    ],
  },
  {
    name: "Sensing",
    color: "#2e8fb8",
    translations: [
      {
        scratch: "<touching (mouse-pointer v)?>",
        js: 'this.touching("mouse")',
      },
      {
        scratch: "<touching (edge v)?>",
        js: 'this.touching("edge")',
      },
      {
        scratch: "<touching (Sprite1 v)?>",
        js: "this.touching(this.sprites.sprite1.andClones())",
      },
      {
        scratch: "<touching color (#ffab1a)>",
        js: "this.touching(Color.hsv(11, 90, 100))",
      },
      {
        scratch: "<color (#ffab1a) is touching (#4d97fe)?",
        js: "this.colorTouching(Color.hsv(11, 90, 100), Color.hsv(60, 70, 100))",
      },
      {
        scratch: "(distance to (mouse-pointer v))",
        js: "Math.hypot(this.mouse.x - this.x, this.mouse.y - this.y)",
      },
      {
        scratch: "(distance to (Sprite1 v))",
        js: "Math.hypot(this.sprites.sprite1.x - this.x, this.sprites.sprite1.y - this.y)",
      },
      {
        scratch: "ask [What's your name?] and wait",
        js: `yield* this.askAndWait("What's your name?");`,
      },
      { scratch: "(answer)", js: "this.answer" },
      {
        scratch: "<key (space v) pressed?>",
        js: 'this.keyPressed("space")',
      },
      {
        scratch: "<key (right arrow v) pressed?>",
        js: 'this.keyPressed("right arrow")',
      },
      {
        scratch: "<key (any v) pressed?>",
        js: 'this.keyPressed("any")',
      },
      {
        scratch: "<key (a v) pressed?>",
        js: 'this.keyPressed("a")',
      },
      {
        scratch: "<key (1 v) pressed?>",
        js: 'this.keyPressed("1")',
      },
      { scratch: "<mouse down?>", js: "this.mouse.down" },
      { scratch: "(mouse x)", js: "this.mouse.x" },
      { scratch: "(mouse y)", js: "this.mouse.y" },
      { scratch: "set drag mode [draggable v]" },
      { scratch: "set drag mode [not draggable v]" },
      { scratch: "(loudness)", js: "this.loudness" },
      { scratch: "(timer)", js: "this.timer" },
      { scratch: "reset timer", js: "this.restartTimer();" },
      {
        scratch: "([x position v] of (Sprite1 v))",
        js: "this.sprites.sprite1.x",
      },
      {
        scratch: "([y position v] of (Sprite1 v))",
        js: "this.sprites.sprite1.y",
      },
      {
        scratch: "([direction v] of (Sprite1 v))",
        js: "this.sprites.sprite1.direction",
      },
      {
        scratch: "([costume # v] of (Sprite1 v))",
        js: "this.sprites.sprite1.costumeNumber",
      },
      {
        scratch: "([costume name v] of (Sprite1 v))",
        js: "this.sprites.sprite1.costume.name",
      },
      {
        scratch: "([backdrop # v] of (Stage v))",
        js: "this.stage.costumeNumber",
      },
      {
        scratch: "([backdrop name v] of (Stage v))",
        js: "this.stage.costume.name",
      },
      { scratch: "([size v] of (Sprite1 v))", js: "this.sprites.sprite1.size" },
      { scratch: "([volume v] of (Sprite1 v))" },
      {
        scratch: "([myCoolVariable v] of (Sprite1 v))",
        js: "this.sprites.sprite1.vars.myCoolVariable",
      },
      { scratch: "(current [year v])", js: "new Date().getFullYear()" },
      { scratch: "(current [month v])", js: "new Date().getMonth() + 1" },
      { scratch: "(current [date v])", js: "new Date().getDate()" },
      { scratch: "(current [day of week v])", js: "new Date().getDay() + 1" },
      { scratch: "(current [hour v])", js: "new Date().getHours()" },
      { scratch: "(current [minute v])", js: "new Date().getMinutes()" },
      { scratch: "(current [second v])", js: "new Date().getSeconds()" },
      {
        scratch: "(days since 2000)",
        js: `// This one's pretty beefy:\n(((new Date().getTime() - new Date(2000, 0, 1)) / 1000 / 60 + new Date().getTimezoneOffset()) / 60 / 24)\n\n// FYI, you can get the milliseconds since 1970 (Unix time) like this:\nnew Date().getTime()`,
      },
      { scratch: "(username)" },
    ],
  },
  {
    name: "Operators",
    color: "#389438",
    translations: [
      { scratch: "((6) + (2))", js: "6 + 2" },
      { scratch: "((6) - (2))", js: "6 - 2" },
      { scratch: "((6) * (2))", js: "6 * 2" },
      { scratch: "((6) / (2))", js: "6 / 2" },
      { scratch: "(pick random (1) to (10))", js: "this.random(1, 10)" },
      { scratch: "<(20) > (15)>", js: "20 > 25" },
      { scratch: "<(15) < (20)>", js: "15 < 20" },
      { scratch: "<(15) = (15)>", js: "15 == 15" },
      {
        scratch: "<<> and <>>",
        js: "(/* condition 1 */) && (/* condition 2 */)",
      },
      {
        scratch: "<<> or <>>",
        js: "(/* condition 1 */) || (/* condition 2 */)",
      },
      { scratch: "<not <>>", js: "!(/* condition */)" },
      {
        scratch: "(join [scratch] [js])",
        js: '"scratch" + "js"',
      },
      {
        scratch: "(join [1] [2])",
        js: '"" + 1 + 2 // Add a blank string to join numbers rather than adding them',
      },
      {
        scratch: "(letter [1] of [abcd])",
        js: '"abcd"[0] // Start counting from 0',
      },
      {
        scratch: "(letter [4] of [abcd])",
        js: '"abcd"[3] // Number must always be one less than in Scratch',
      },
      {
        scratch: "(letter (x position) of [abcd])",
        js: '"abcd"[this.x - 1] // You can subtract inside the brackets if needed',
      },
      { scratch: "(length of [apple])", js: '"apple".length' },
      {
        scratch: "<[apple] contains [a]?>",
        js: '"apple".includes("a")',
      },
      { scratch: "((7) mod (3))", js: "7 % 3" },
      { scratch: "(round (3.5))", js: "Math.round(3.5)" },
      { scratch: "([abs v] of (-10))", js: "Math.abs(-10)" },
      { scratch: "([floor v] of (3.5))", js: "Math.floor(3.5)" },
      { scratch: "([ceiling v] of (3.5))", js: "Math.ceil(3.5)" },
      { scratch: "([sqrt v] of (9))", js: "Math.sqrt(9)" },
      { scratch: "([sin v] of (90))", js: "Math.sin(this.degToRad(90))" },
      { scratch: "([cos v] of (90))", js: "Math.cos(this.degToRad(90))" },
      { scratch: "([tan v] of (45))", js: "Math.tan(this.degToRad(45))" },
      { scratch: "([asin v] of (1))", js: "this.radToDeg(Math.asin(1))" },
      { scratch: "([acos v] of (1))", js: "this.radToDeg(Math.acos(1))" },
      { scratch: "([atan v] of (1))", js: "this.radToDeg(Math.atan(1))" },
      { scratch: "([ln v] of (10))", js: "Math.log(10)" },
      { scratch: "([log v] of (10))", js: "Math.log10(10)" },
      { scratch: "([e ^ v] of (2))", js: "Math.E ** 2" },
      { scratch: "([10 ^ v] of (2))", js: "10 ** 2" },
    ],
  },
  {
    name: "Variables",
    color: "#db6e00",
    translations: [
      {
        scratch: "(my global variable)",
        js: "this.stage.vars.myGlobalVariable",
      },
      { scratch: "(my sprite variable)", js: "this.vars.mySpriteVariable" },
      { scratch: "(☁ my cloud variable)" },
      {
        scratch: "set [my global variable v] to [hello]",
        js: 'this.stage.vars.myGlobalVariable = "hello";',
      },
      {
        scratch: "set [my sprite variable v] to [hello]",
        js: 'this.vars.mySpriteVariable = "hello";',
      },
      { scratch: "set [☁ my cloud variable v] to [hello]" },
      {
        scratch: "change [my global variable v] by (10)",
        js: "this.stage.vars.myGlobalVariable += 10;",
      },
      {
        scratch: "change [my sprite variable v] by (10)",
        js: "this.vars.mySpriteVariable += 10;",
      },
      { scratch: "change [☁ my cloud variable v] by (10)" },
      {
        scratch: "show variable [my global variable v]",
        js: "this.stage.watchers.myGlobalVar.visible = true;",
      },
      {
        scratch: "show variable [my sprite variable v]",
        js: "this.watchers.mySpriteVar.visible = true;",
      },
      { scratch: "show variable [☁ my cloud variable v]" },
      {
        scratch: "hide variable [my global variable v]",
        js: "this.stage.watchers.myGlobalVar.visible = false;",
      },
      {
        scratch: "hide variable [my sprite variable v]",
        js: "this.watchers.mySpriteVar.visible = false;",
      },
      { scratch: "hide variable [☁ my cloud variable v]" },
      {
        scratch: "(my global list :: list)",
        js: 'this.stage.vars.myGlobalList.join(" ")',
      },
      {
        scratch: "(my sprite list :: list)",
        js: 'this.vars.mySpriteList.join(" ")',
      },
      {
        scratch: "add [thing] to [my global list v]",
        js: 'this.stage.vars.myGlobalList.push("thing");',
      },
      {
        scratch: "add [thing] to [my sprite list v]",
        js: 'this.vars.mySpriteList.push("thing");',
      },
      {
        scratch: "delete [8] of [my global list v]",
        js: "this.stage.vars.myGlobalList.splice(7, 1); // Need to subtract 1 from index because arrays start at item 0 (not 1)",
      },
      {
        scratch: "delete [8] of [my sprite list v]",
        js: "this.vars.mySpriteList.splice(7, 1); // Need to subtract 1 from index because arrays start at item 0 (not 1)",
      },
      {
        scratch: "delete all of [my global list v]",
        js: "this.stage.vars.myGlobalList = [];",
      },
      {
        scratch: "delete all of [my sprite list v]",
        js: "this.vars.mySpriteList = [];",
      },
      {
        scratch: "insert [thing] at [8] of [my global list v]",
        js: 'this.stage.vars.myGlobalList.splice(7, 0, "thing");',
      },
      {
        scratch: "insert [thing] at [8] of [my sprite list v]",
        js: 'this.vars.mySpriteList.splice(7, 0, "thing");',
      },
      {
        scratch: "replace item [8] of [my global list v] with [thing]",
        js: 'this.stage.vars.myGlobalList.splice(7, 1, "thing");',
      },
      {
        scratch: "replace item [8] of [my sprite list v] with [thing]",
        js: 'this.vars.mySpriteList.splice(7, 1, "thing");',
      },
      {
        scratch: "(item [8] of [my global list v])",
        js: "this.stage.vars.myGlobalList[7]",
      },
      {
        scratch: "(item [8] of [my sprite list v])",
        js: "this.vars.mySpriteList[7]",
      },
      {
        scratch: "(item # of [thing] in [my global list v])",
        js: 'this.stage.vars.myGlobalList.indexOf("thing") + 1',
      },
      {
        scratch: "(item # of [thing] in [my sprite list v])",
        js: 'this.vars.mySpriteList.indexOf("thing") + 1',
      },
      {
        scratch: "(length of [my global list v])",
        js: "this.stage.vars.myGlobalList.length",
      },
      {
        scratch: "(length of [my sprite list v])",
        js: "this.vars.mySpriteList.length",
      },
      {
        scratch: "<[my global list v] contains [thing]?>",
        js: 'this.stage.vars.myGlobalList.includes("thing")',
      },
      {
        scratch: "<[my sprite list v] contains [thing]?>",
        js: 'this.vars.mySpriteList.includes("thing")',
      },
      {
        scratch: "show list [my global list v]",
        js: "this.stage.watchers.myGlobalList.visible = true;",
      },
      {
        scratch: "show list [my sprite list v]",
        js: "this.watchers.mySpriteList.visible = true;",
      },
      {
        scratch: "hide list [my global list v]",
        js: "this.stage.watchers.myGlobalList.visible = false;",
      },
      {
        scratch: "hide list [my sprite list v]",
        js: "this.watchers.mySpriteList.visible = false;",
      },
    ],
  },
  {
    name: "My Blocks",
    color: "#ff4d6b",
    translations: [
      {
        scratch: `when green flag clicked\nmy custom block [hello] [10]\n\ndefine my custom block (message) (dist)\nsay (message) for (2) seconds\nmove (dist) steps`,
        js: `/* Custom blocks are created by adding additional methods (scripts) to a sprite. */
export default class Sprite1 extends Sprite {
  constructor(...args) { /* ... */ },
  *whenGreenFlagClicked() {
    yield* this.myCustomBlock("hello", 10);
  },
  *myCustomBlock(message, dist) {
    yield* this.sayAndWait(message, 2);
    this.move(dist);
  }
}`,
      },
    ],
  },
  {
    name: "Pen",
    color: "#0b8e69",
    translations: [
      { scratch: "erase all", js: "this.clearPen();" },
      { scratch: "stamp", js: "this.stamp();" },
      { scratch: "pen down", js: "this.penDown = true;" },
      { scratch: "pen up", js: "this.penDown = false;" },
      {
        scratch: "set pen color to (#4d97fe)",
        js: `this.penColor = Color.rgb(77, 151, 255); // rgb
this.penColor = Color.rgb(77, 151, 255, 0.5); // OR rgba
this.penColor = Color.hsv(60, 70, 100); // OR hsv (hue from 0 to 100)
this.penColor = Color.hsv(60, 70, 100, 0.5); // OR hsva (hue from 0 to 100)`,
      },
      { scratch: "change pen (color v) by (10)", js: "this.penColor.h += 10;" },
      {
        scratch: "change pen (saturation v) by (10)",
        js: "this.penColor.s += 10;",
      },
      {
        scratch: "change pen (brightness v) by (10)",
        js: "this.penColor.v += 10;",
      },
      {
        scratch: "change pen (transparency v) by (10)",
        js: "this.penColor.a -= 0.1;",
      },
      { scratch: "set pen (color v) to (10)", js: "this.penColor.h = 10;" },
      {
        scratch: "set pen (saturation v) to (10)",
        js: "this.penColor.s = 10;",
      },
      {
        scratch: "set pen (brightness v) to (10)",
        js: "this.penColor.v = 10;",
      },
      {
        scratch: "set pen (transparency v) to (10)",
        js: "this.penColor.a = 0.9;",
      },
      { scratch: "change pen size by (10)", js: "this.penSize += 10;" },
      { scratch: "set pen size to (50)", js: "this.penSize = 50;" },
    ],
  },
];
