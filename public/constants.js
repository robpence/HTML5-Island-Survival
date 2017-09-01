//------------
//System Values
//------------
var STAGE_WIDTH = 800,
	STAGE_HEIGHT = 600,
	TIME_PER_FRAME = 33, //this equates to 30 fps
	GAME_FONTS = "bold 20px sans-serif";
	FLASH_MESSAGE_TIMER = 100;

//Images
var PATH_CHAR = "img/mainCharacterSpriteSheet.png";
	PATH_BAKG = "img/voodoo_cactus_island.png";
	PATH_STBG = "img/voodoo_cactus_island2.png";
	PATH_CRED = "img/credits.png";
	PATH_INST = "img/instructions.png";
	PATH_PLAY = "img/play.png";
	PATH_SETT = "img/settings.png";

//character sprites
var CHAR_WIDTH = 24, //maybe 17
	CHAR_HEIGHT = 32,
	CHAR_START_X = 200,
	CHAR_START_Y = 200,
	CHAR_SPEED = 5,
	IMAGE_START_X = 0,
	IMAGE_START_NORTH_Y = 7,
	IMAGE_START_EAST_Y = 40,
	IMAGE_START_SOUTH_Y = 71,
	IMAGE_START_WEST_Y = 104,
	SPRITE_WIDTH = 72;

//preloading stuff
var TEXT_PRELOADING = "Loading ...", 
	TEXT_PRELOADING_X = 200, 
	TEXT_PRELOADING_Y = 200;

//change this
var BOX_WIDTH = 20,
	BOX_HEIGHT = 20;

//Player Character Values
var HEALTH = 100;
	HUNGER = 100;
	THIRST = 100;

	//SKILLS
	FISHING = 1;
	FARMING = 1;
	GATHERING = 1;
	SWIMMING = 1;
	HUNTING = 1;
	MINING = 1;
	CRAFTING = 1;
	BUILDING = 1;
	COOKING = 1;

	//CRAFTED PERMANENT ITEMS
	SHACK = false;
	CAMPFIRE  = false;
	HOUSE = false;
	EXTRAROOM1 = false;
	EXTRAROOM2  = false;
	EXTRAROOM3  = false;
	EXTRAROOM4  = false;
	DOCK = false;
	GARDEN  = false;
	KITCHEN  = false;
	CHARCOALHOUSE = false;
	FORGE = false;
	COOKSTOVE = false;

	var MiscItems = {
		"ROCK": 0,
		"CLAY": 0,
		"STICK": 0,
		"PALMLEAF": 0,
		"LOG": 0,
		"VINE": 0,
		"IRONORE": 0,
		"COPPERORE": 0,
		"TINORE": 0
	};

	var CraftedItems = {
		"ROPE" : 0,
		"BOARDS" : 0,
		"CHARCOAL" : 0,
		"IRONBAR" : 0,
		"COPPERBAR" : 0,
		"TINBAR" : 0,
		"CLAYPOT" : 0,
		"CLAYPLATE" : 0,
		"CLAYBOWL" : 0,
		"VINEBASKET" : 0,
	};

	var Tools = {
		"STONEPICK": 0,
		"STONEAXE": 0,
		"STONEKNIFE": 0,
		"STONEHAMMER": 0,
		"METALPICK": 0,
		"METALAXE": 0,
		"METALKNIFE": 0,
		"FISHINGROD": 0,
		"WOODFISHHOOK": 0,
		"METALFISHHOOK": 0
	};

	var FoodItems = {
		"GUAVA": 0,
		"PASSIONFRUIT": 0,
		"REDBERRIES": 0,
		"BLUEBERRIES": 0,
		"REDMUSHROOMS": 0,
		"SPOTTEDMUSHROOMS": 0,
		"BROWNMUSHROOMS": 0,
	};