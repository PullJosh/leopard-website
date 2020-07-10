import DocsPage from "../../components/DocsPage";
import PaletteHeader from "../../components/PaletteHeader";
import Translation, {
  TranslationGrid,
  TranslationHeader
} from "../../components/Translation";

export default function Variables() {
  return (
    <DocsPage palette="Variables">
      <>
        <PaletteHeader>Variables</PaletteHeader>
        <TranslationGrid>
          <TranslationHeader>Variable</TranslationHeader>
          <Translation blockImg="variables/globalVar.svg">
            this.stage.vars.myGlobalVar
          </Translation>
          <Translation blockImg="variables/spriteVar.svg">
            this.vars.mySpriteVar
          </Translation>
          <Translation blockImg="variables/cloudVar.svg" />

          <TranslationHeader>Set variable</TranslationHeader>
          <Translation blockImg="variables/setGlobalVar.svg">
            this.stage.vars.myGlobalVariable = "hello";
          </Translation>
          <Translation blockImg="variables/setSpriteVar.svg">
            this.vars.mySpriteVariable = "hello";
          </Translation>
          <Translation blockImg="variables/setCloudVar.svg" />

          <TranslationHeader>Change variable</TranslationHeader>
          <Translation blockImg="variables/changeGlobalVar.svg">
            this.stage.vars.myGlobalVar += 10;
          </Translation>
          <Translation blockImg="variables/changeSpriteVar.svg">
            this.vars.mySpriteVar += 10;
          </Translation>
          <Translation blockImg="variables/changeCloudVar.svg" />

          <TranslationHeader>Show variable</TranslationHeader>
          <Translation blockImg="variables/showGlobalVar.svg">
            this.stage.watchers.myGlobalVar.visible = true;
          </Translation>
          <Translation blockImg="variables/showSpriteVar.svg">
            this.watchers.mySpriteVar.visible = true;
          </Translation>
          <Translation blockImg="variables/showCloudVar.svg" />

          <TranslationHeader>Hide variable</TranslationHeader>
          <Translation blockImg="variables/hideGlobalVar.svg">
            this.stage.watchers.myGlobalVar.visible = false;
          </Translation>
          <Translation blockImg="variables/hideSpriteVar.svg">
            this.watchers.mySpriteVar.visible = false;
          </Translation>
          <Translation blockImg="variables/hideCloudVar.svg" />

          <TranslationHeader>List</TranslationHeader>
          <Translation blockImg="variables/globalList.svg">
            this.stage.vars.myGlobalList.join(" ")
          </Translation>
          <Translation blockImg="variables/spriteList.svg">
            this.vars.mySpriteList.join(" ")
          </Translation>

          <TranslationHeader>Add to list</TranslationHeader>
          <Translation blockImg="variables/addToGlobalList.svg">
            this.stage.vars.myGlobalList.push("thing");
          </Translation>
          <Translation blockImg="variables/addToSpriteList.svg">
            this.vars.mySpriteList.push("thing");
          </Translation>

          <TranslationHeader>Delete item of list</TranslationHeader>
          <Translation blockImg="variables/deleteOfGlobalList.svg">
            this.stage.vars.myGlobalList.splice(7, 1); // Need to subtract 1
            from index because arrays start at item 0 (not 1)
          </Translation>
          <Translation blockImg="variables/deleteOfSpriteList.svg">
            this.vars.mySpriteList.splice(7, 1); // Need to subtract 1 from
            index because arrays start at item 0 (not 1)
          </Translation>

          <TranslationHeader>Delete all of list</TranslationHeader>
          <Translation blockImg="variables/deleteAllOfGlobalList.svg">
            this.stage.vars.myGlobalList = [];
          </Translation>
          <Translation blockImg="variables/deleteAllOfSpriteList.svg">
            this.vars.mySpriteList = [];
          </Translation>

          <TranslationHeader>Insert at location in list</TranslationHeader>
          <Translation blockImg="variables/insertInGlobalList.svg">
            this.stage.vars.myGlobalList.splice(7, 0, "thing");
          </Translation>
          <Translation blockImg="variables/insertInSpriteList.svg">
            this.vars.mySpriteList.splice(7, 0, "thing");
          </Translation>

          <TranslationHeader>Replace item of list</TranslationHeader>
          <Translation blockImg="variables/replaceOfGlobalList.svg">
            this.stage.vars.myGlobalList.splice(7, 1, "thing");
          </Translation>
          <Translation blockImg="variables/replaceOfSpriteList.svg">
            this.vars.mySpriteList.splice(7, 1, "thing");
          </Translation>

          <TranslationHeader>Item of list</TranslationHeader>
          <Translation blockImg="variables/itemOfGlobalList.svg">
            this.stage.vars.myGlobalList[7]
          </Translation>
          <Translation blockImg="variables/itemOfSpriteList.svg">
            this.vars.mySpriteList[7]
          </Translation>

          <TranslationHeader>Item number in list</TranslationHeader>
          <Translation blockImg="variables/itemNumberInGlobalList.svg">
            this.stage.vars.myGlobalList.indexOf("thing") + 1
          </Translation>
          <Translation blockImg="variables/itemNumberInSpriteList.svg">
            this.vars.mySpriteList.indexOf("thing") + 1
          </Translation>

          <TranslationHeader>Length of list</TranslationHeader>
          <Translation blockImg="variables/lengthOfGlobalList.svg">
            this.stage.vars.myGlobalList.length
          </Translation>
          <Translation blockImg="variables/lengthOfSpriteList.svg">
            this.vars.mySpriteList.length
          </Translation>

          <TranslationHeader>List contains item</TranslationHeader>
          <Translation blockImg="variables/globalListContains.svg">
            this.stage.vars.myGlobalList.includes("thing")
          </Translation>
          <Translation blockImg="variables/spriteListContains.svg">
            this.vars.mySpriteList.includes("thing")
          </Translation>

          <TranslationHeader>Show list</TranslationHeader>
          <Translation blockImg="variables/showGlobalList.svg">
            this.stage.watchers.myGlobalList.visible = true;
          </Translation>
          <Translation blockImg="variables/showSpriteList.svg">
            this.watchers.mySpriteList.visible = true;
          </Translation>

          <TranslationHeader>Hide list</TranslationHeader>
          <Translation blockImg="variables/hideGlobalList.svg">
            this.stage.watchers.myGlobalList.visible = false;
          </Translation>
          <Translation blockImg="variables/hideSpriteList.svg">
            this.watchers.mySpriteList.visible = false;
          </Translation>
        </TranslationGrid>
      </>
    </DocsPage>
  );
}
