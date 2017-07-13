//-------------------------------------
//Functions for picking up and crafting
//-------------------------------------

//-------------------------------------
//Misc items you can gather
//-------------------------------------
//rocks
function pickUpRock(){
	MiscItems.ROCK += 3;
}
//clay
function pickUpClay(){
	MiscItems.CLAY += 1;
}
//sticks
function pickUpStick(){
	MiscItems.STICK += 4;
}
//palmleaves
function pickUpPalmLeaf(){
	MiscItems.PALMLEAF += 3;
}
//logs
function pickUpLog(){
	MiscItems.LOG += 2;
}
//vines
function pickUpVine(){
	MiscItems.VINE += 2;
}
//iron
function mineIronOre(){
	MiscItems.IRONORE += 1;
}
//copper
function mineCopperOre(){
	MiscItems.COPPERORE += 1;
}
//tin
function mineTinOre(){
	MiscItems.TINORE += 1;
}

//-------------------------------------
//tools you can make
//-------------------------------------
//stonepick
function craftStonePick(){
	MiscItems.ROCK -= 2;
	MiscItems.STICK -= 1;
	MiscItems.VINE -= 1;
	Tools.STONEPICK += 1;
}
//stoneaxe
function craftStoneAxe(){
	MiscItems.ROCK -= 2;
	MiscItems.STICK -= 1;
	MiscItems.VINE -= 1;
	Tools.STONEAXE += 1;
}
//stoneknife
function craftStoneKnife(){
	MiscItems.ROCK -= 1;
	MiscItems.STICK -= 1;
	MiscItems.VINE -= 1;
	Tools.STONEKNIFE += 1;
}
//stonehammer
function craftStoneHammer(){
	MiscItems.ROCK -= 2;
	MiscItems.STICK -= 1;
	MiscItems.VINE -= 1;
	Tools.STONEHAMMER += 1;
}
//metalpick
function craftMetalPick(){
	CraftedItems.IRONBAR -= 1;
	MiscItems.STICK -= 1;
	MiscItems.VINE -= 1;
	CraftedItems.CHARCOAL -= 3;
	Tools.METALPICK += 1;
}
//metalaxe
function craftMetalAxe(){
	CraftedItems.IRONBAR -= 1;
	MiscItems.STICK -= 1;
	MiscItems.VINE -= 1;
	CraftedItems.CHARCOAL -= 3;
	Tools.METALAXE += 1;
}
//metalknife
function craftMetalKnife(){
	CraftedItems.IRONBAR -= 1;
	MiscItems.STICK -= 1;
	MiscItems.VINE -= 1;
	CraftedItems.CHARCOAL -= 3;
	Tools.METALKNIFE += 1;
}

function craftFishingRod(){
	MiscItems.ROCK -= 2;
	MiscItems.STICK -= 2;
	MiscItems.VINE -= 3;
	Tools.FISHINGROD += 1;
}

function craftWoodHook(){
	CraftedItems.BOARDS -= 1;
	Tools.WOODENFISHHOOK += 1;
}

function craftMetalHook(){
	CraftedItems.IRONBAR -= 1;
	Tools.METALFISHHOOK += 1;
}


//fishing pole, fish hooks

//-------------------------------------
//Items you can craft
//-------------------------------------
//rope
function craftRope(){
	MiscItems.VINE -= 3;
	CraftedItems.ROPE += 1;
}
//boards
function craftBoards(){
	MiscItems.LOG -= 1;
	CraftedItems.BOARDS += 5;
}
//charcoal
function craftCharcoal(){
	MiscItems.STICKS -= 5;
	CraftedItems.CHARCOAL += 5;
}
//ironbar
function craftIronBar(){
	MiscItems.IRONORE -= 4;
	CraftedItems.IRONBAR += 1;
}
//copperbar
function craftCopperBar(){
	MiscItems.COPPERORE -= 4;
	CraftedItems.COPPERBAR += 1;
}
//tinbar
function craftTinBar(){
	MiscItems.TINORE -= 4;
	CraftedItems.TINBAR += 1;
}
//claypot
function craftClayPot(){
	MiscItems.CLAY -= 3;
	CraftedItems.CLAYPOT += 1;
}
//clayplate
function craftClayPlate(){
	MiscItems.CLAY -= 1;
	CraftedItems.CLAYPLATE += 1;
}
//claybowl
function craftClayBowl(){
	MiscItems.CLAY -= 1;
	CraftedItems.CLAYBOWL += 1;
}
//vinebasket
function craftVineBasket(){
	MiscItems.VINE -= 5;
	CraftedItems.VINEBASKET += 1;
}
function craftNails(){
	CraftedItems.IRONBAR -= 1;
	CraftedItems.NAILS += 5;
}

//-------------------------------------
//Items you can craft that show up on
//the game map or in the players house
//-------------------------------------
//shack
function craftShack(){
	STICK -= 15;
	VINE -= 5;
	PALMLEAF -= 10;
	//display shack
	SHACK = true;
}
//campfire
function craftCampFire(){
	STICK -= 10;
	ROCK -= 10;
	//display campfire
	CAMPFIRE = true;
}
//house
function buildHouse(){
	BOARDS -= 30;
	ROCK -= 20;
	ROPE -= 5;
	NAIL -= 15;
	//display basic house
	HOUSE = true;
} 
//extra room1
function buildExtraRoom1(){
	BOARDS -= 20;
	ROCK -= 10;
	NAIL -= 10;
	//display room 1
	EXTRAROOM1 = true;
}
//extra room2
function buildExtraRoom2(){
	BOARDS -= 25;
	ROCK -= 5;
	NAIL -= 10;
	//display room 2
	EXTRAROOM2 = true;
}
//extra room3
function buildExtraRoom3(){
	BOARDS -= 15;
	ROCK -= 20;
	NAIL -= 15;
	COPPERBAR -= 2;
	//display room 3
	EXTRAROOM3 = true;
}
//extra room4
function buildExtraRoom4(){
	BOARDS -= 40;
	ROCK -= 10;
	NAIL -= 20;
	//display room 4
	EXTRAROOM4 = true;
}
//a dock
function buildDock(){
	BOARDS -= 20;
	ROPE -= 4;
	NAIL -= 10;
	LOG -= 2;
	//display dock
	DOCK = true
}
//a garden
function buildGarden(){
	BOARDS -= 4;
	ROCKS -= 20;
	//display garden
	GARDEN = true;
}
//improved kitchen
function buildKitchen(){
	BOARDS -= 10;
	IRONBAR -= 4;
	COPPERBAR -= 4;
	TINBAR -= 4;
	NAIL -= 10;
	//display kitchen
	KITCHEN = true;
}
//a charcoal house
function buildCharcoalHouse(){
	CLAY -= 20;
	//display charcoal house
	CHARCOALHOUSE = true;
}
//forge/furnace
function buildForge(){
	CLAY -= 20;
	STICK -= 10;
	IRONORE -= 2;
	//display forge
	FORGE = true;
}
//cookingstove
function buildCookStove(){
	IRONBAR -= 2;
	STICK -= 10;
	ROCK -= 15;
	//display cookstove
	COOKSTOVE = true;
}