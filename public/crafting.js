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
	IRONORE += 1;
}
//copper
function mineCopperOre(){
	COPPERORE += 1;
}
//tin
function mineTinOre(){
	TINORE += 1;
}

//-------------------------------------
//tools you can make
//-------------------------------------
//stonepick
function craftStonePick(){
	ROCK -= 2;
	STICK -= 1;
	VINE -= 1;
	STONEPICK += 1;
}
//stoneaxe
function craftStoneAxe(){
	ROCK -= 2;
	STICK -= 1;
	VINE -= 1;
	STONEAXE += 1;
}
//stoneknife
function craftStoneKnife(){
	ROCK -= 1;
	STICK -= 1;
	VINE -= 1;
	STONEKNIFE += 1;
}
//stonehammer
function craftStoneHammer(){
	ROCK -= 2;
	STICK -= 1;
	VINE -= 1;
	STONEHAMMER += 1;
}
//metalpick
function craftMetalPick(){
	IRONBAR -= 1;
	STICK -= 1;
	VINE -= 1;
	CHARCOAL -= 3;
	METALPICK += 1;
}
//metalaxe
function craftMetalAxe(){
	IRONBAR -= 1;
	STICK -= 1;
	VINE -= 1;
	CHARCOAL -= 3;
	METALAXE += 1;
}
//metalknife
function craftMetalPick(){
	IRONBAR -= 1;
	STICK -= 1;
	VINE -= 1;
	CHARCOAL -= 3;
	METALKNIFE += 1;
}

//-------------------------------------
//Items you can craft
//-------------------------------------
//rope
function craftRope(){
	VINE -= 3;
	ROPE += 1;
}
//boards
function craftBoards(){
	LOG -= 1;
	BOARDS += 5;
}
//charcoal
function craftCharcoal(){
	STICKS -= 5;
	CHARCOAL += 5;
}
//ironbar
function craftIronBar(){
	IRONORE -= 4;
	IRONBAR += 1;
}
//copperbar
function craftCopperBar(){
	COPPERORE -= 4;
	COPPERBAR += 1;
}
//tinbar
function craftTinBar(){
	TINORE -= 4;
	TINBAR += 1;
}
//claypot
function craftClayPot(){
	CLAY -= 3;
	CLAYPOT += 1;
}
//clayplate
function craftClayPlate(){
	CLAY -= 1;
	CLAYPLATE += 1;
}
//claybowl
function craftClayBowl(){
	CLAY -= 1;
	CLAYBOWL += 1;
}
//vinebasket
function craftVineBasket(){
	VINE -= 5;
	VINEBASKET += 1;
}
function craftNails(){
	IRONBAR -= 1;
	NAILS += 5;
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