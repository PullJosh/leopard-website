import DocsPage from "../../components/DocsPage";
import PaletteHeader from "../../components/PaletteHeader";
import Translation, { TranslationGrid } from "../../components/Translation";

export default function Variables() {
  return (
    <DocsPage palette="Variables">
      <>
        <PaletteHeader>Variables</PaletteHeader>
        <TranslationGrid>
          <h3>Variable</h3>
          <Translation blockImg="variables/globalVar.svg">
            this.stage.vars.myGlobalVar
          </Translation>
          <Translation blockImg="variables/spriteVar.svg">
            this.vars.mySpriteVar
          </Translation>
          <Translation blockImg="variables/cloudVar.svg" />

          <h3>Set variable</h3>
          <Translation blockImg="variables/setGlobalVar.svg">
            this.stage.vars.myGlobalVariable = "hello";
          </Translation>
          <Translation blockImg="variables/setSpriteVar.svg">
            this.vars.mySpriteVariable = "hello";
          </Translation>
          <Translation blockImg="variables/setCloudVar.svg" />

          <h3>Change variable</h3>
          <Translation blockImg="variables/changeGlobalVar.svg">
            this.stage.vars.myGlobalVar += 10;
          </Translation>
          <Translation blockImg="variables/changeSpriteVar.svg">
            this.vars.mySpriteVar += 10;
          </Translation>
          <Translation blockImg="variables/changeCloudVar.svg" />

          <h3>Show variable</h3>
          <Translation blockImg="variables/showGlobalVar.svg" />
          <Translation blockImg="variables/showSpriteVar.svg" />
          <Translation blockImg="variables/showCloudVar.svg" />

          <h3>Hide variable</h3>
          <Translation blockImg="variables/hideGlobalVar.svg" />
          <Translation blockImg="variables/hideSpriteVar.svg" />
          <Translation blockImg="variables/hideCloudVar.svg" />

          <h3>List</h3>
          <Translation blockImg="variables/globalList.svg">
            this.stage.vars.myGlobalList.join(" ")
          </Translation>
          <Translation blockImg="variables/spriteList.svg">
            this.vars.mySpriteList.join(" ")
          </Translation>

          <h3>Add to list</h3>
          <Translation blockImg="variables/addToGlobalList.svg">
            this.stage.vars.myGlobalList.push("thing");
          </Translation>
          <Translation blockImg="variables/addToSpriteList.svg">
            this.vars.mySpriteList.push("thing");
          </Translation>

          <h3>Delete item of list</h3>
          <Translation blockImg="variables/deleteOfGlobalList.svg">
            this.stage.vars.myGlobalList.splice(7, 1); // Need to subtract 1
            from index because arrays start at item 0 (not 1)
          </Translation>
          <Translation blockImg="variables/deleteOfSpriteList.svg">
            this.vars.mySpriteList.splice(7, 1); // Need to subtract 1 from
            index because arrays start at item 0 (not 1)
          </Translation>

          <h3>Delete all of list</h3>
          <Translation blockImg="variables/deleteAllOfGlobalList.svg">
            this.stage.vars.myGlobalList = [];
          </Translation>
          <Translation blockImg="variables/deleteAllOfSpriteList.svg">
            this.vars.mySpriteList = [];
          </Translation>

          <h3>Insert at location in list</h3>
          <Translation blockImg="variables/insertInGlobalList.svg">
            this.stage.vars.myGlobalList.splice(7, 0, "thing");
          </Translation>
          <Translation blockImg="variables/insertInSpriteList.svg">
            this.vars.mySpriteList.splice(7, 0, "thing");
          </Translation>

          <h3>Replace item of list</h3>
          <Translation blockImg="variables/replaceOfGlobalList.svg">
            this.stage.vars.myGlobalList.splice(7, 1, "thing");
          </Translation>
          <Translation blockImg="variables/replaceOfSpriteList.svg">
            this.vars.mySpriteList.splice(7, 1, "thing");
          </Translation>

          <h3>Item of list</h3>
          <Translation blockImg="variables/itemOfGlobalList.svg">
            this.stage.vars.myGlobalList[7]
          </Translation>
          <Translation blockImg="variables/itemOfSpriteList.svg">
            this.vars.mySpriteList[7]
          </Translation>

          <h3>Item number in list</h3>
          <Translation blockImg="variables/itemNumberInGlobalList.svg">
            this.stage.vars.myGlobalList.indexOf("thing") + 1
          </Translation>
          <Translation blockImg="variables/itemNumberInSpriteList.svg">
            this.vars.mySpriteList.indexOf("thing") + 1
          </Translation>

          <h3>Length of list</h3>
          <Translation blockImg="variables/lengthOfGlobalList.svg">
            this.stage.vars.myGlobalList.length
          </Translation>
          <Translation blockImg="variables/lengthOfSpriteList.svg">
            this.vars.mySpriteList.length
          </Translation>

          <h3>List contains item</h3>
          <Translation blockImg="variables/globalListContains.svg">
            this.stage.vars.myGlobalList.includes("thing")
          </Translation>
          <Translation blockImg="variables/spriteListContains.svg">
            this.vars.mySpriteList.includes("thing")
          </Translation>

          <h3>Show list</h3>
          <Translation blockImg="variables/showGlobalList.svg" />
          <Translation blockImg="variables/showSpriteList.svg" />

          <h3>Hide list</h3>
          <Translation blockImg="variables/hideGlobalList.svg" />
          <Translation blockImg="variables/hideSpriteList.svg" />
        </TranslationGrid>
      </>
    </DocsPage>
  );
}
