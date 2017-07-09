//-----------------
//Browser Detection
//-----------------
navigator.sayswho= (function(){
    var N= navigator.appName, ua= navigator.userAgent, tem;
    var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M= M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];

    return M;
})();

var browser;
if (navigator.sayswho[0] == "Firefox")
	browser="f";
else if (navigator.sayswho[0] == "Chrome")
	browser="c";
else if (navigator.sayswho[0] == "Safari")
	browser="s";
else  if (navigator.sayswho[0] == "Microsoft")
	browser="m";
else
	browser="f";

//------------
//System Vars
//------------

//var stage = document.getElementById("gameCanvas");
//stage.width = STAGE_WIDTH;
//stage.height = STAGE_HEIGHT;

//Aliases
var Container = PIXI.Container,
	autoDetectRenderer = PIXI.autoDetectRenderer,
	loader = PIXI.loader,
	resources = PIXI.loader.resources,
	Sprite = PIXI.Sprite,
	Texture = PIXI.Texture,
	TextureCache = PIXI.utils.TextureCache;

//Create the PIXI stage and renderer and add the
//renderer.view to the DOM
var stage = new Container(),
	renderer = autoDetectRenderer(STAGE_WIDTH, STAGE_HEIGHT);
document.body.appendChild(renderer.view);

//make the default background a bluish color
renderer.backgroundColor = 0x061639;

/*
var ctx = stage.getContext("2d");
ctx.fillStyle = "grey";
ctx.font = GAME_FONTS;
*/
var game, mouseX, mouseY, isClicked, boxArray, score, facing, currX, currY, charX, charY, isMoving, clock, state;
var bgImage, charImage, playImage, instructImage, settingsImage, creditsImage;
var mc00, mc01, mc02, mc03, mc04, mc05, mc06, mc07, mc08, mc08, mc09, mc10, mc11, 
//var keyObject = keyboard(asciiKeyCodeNumber);
isClicked = false;
gamePaused = false;
score = 0;
clock = 0;
timer = 0;
messageForFlash = "";
map = 1;
var spritenumber = 1;

charX = CHAR_START_X;
charY = CHAR_START_Y;

//currX = IMAGE_START_X;
//currY = IMAGE_START_EAST_Y;

var buttonX = [292,210,249,260];
var buttonY = [100,140,180,220];
var buttonWidth = [96,260,182,160];
var buttonHeight = [40,40,40,40];

var speed = 1;
var frames = 30;
var menu = 0;
var fadeId = 0;
var time = 0.0;

//Move this somewhere else.
isRock = true;
isClay = true;
isStick = true;
isPalmLeaf = true;
isLog = true;
isVine  =true;

//Tell the `renderer` to `render` the `stage`
//renderer.render(stage);

//---------------
//Preloading ...
//---------------
//Preload Art Assets
// - Sprite Sheet
loader
  .add(PATH_BAKG)
  .add("/img/mainCharacter.json")
  .add(PATH_PLAY)
  .add(PATH_INST)
  .add(PATH_SETT)
  .add(PATH_CRED)
  .load(setupMenu);

function setupMenu() {
  bgImage = new Sprite(
    loader.resources[PATH_BAKG].texture
  );
  playImage = new Sprite(
    loader.resources[PATH_PLAY].texture
  );
  instructImage = new Sprite(
    loader.resources[PATH_INST].texture
  );
  settingsImage = new Sprite(
    loader.resources[PATH_SETT].texture
  );
  creditsImage = new Sprite(
    loader.resources[PATH_CRED].texture
  );

  charImage = PIXI.loader.resources["/img/mainCharacter.json"].textures;
  //mc01 = new Sprite(charImage["mainChar_0.png"]);
  //stage.addChild(mc01);

  drawMenu();

  renderer.render(stage);
}

function drawMenu(){
	/*
	ctx.drawImage(bgImage, 0, 0);
	ctx.drawImage(playImage, buttonX[0], buttonY[0]);
	ctx.drawImage(instructImage, buttonX[1], buttonY[1]);
	ctx.drawImage(settingsImage, buttonX[2], buttonY[2]);
	ctx.drawImage(creditsImage, buttonX[3], buttonY[3]);*/
	bgImage.x = 0;
	bgImage.y = 0;

	playImage.x = buttonX[0];
	playImage.y = buttonY[0];
	playImage.interactive = true;
	playImage.on("mousedown", function(e){
		console.log("play pressed");

		//change bg color
		renderer.backgroundColor = 0xBB8FCE;
		
		//hide the other sprites
		playImage.visible = false;
		bgImage.visible = false;
		instructImage.visible = false;
		settingsImage.visible = false;
		creditsImage.visible = false;

		//rerender stage
		renderer.render(stage);
		//var state = play;
		//gameLoop();
		setupGame();

	})

	instructImage.x = buttonX[1];
	instructImage.y = buttonY[1];
	instructImage.interactive = true;
	instructImage.on("mousedown", function(e){
		console.log("instruct pressed");
		//do something
	})


	settingsImage.x = buttonX[2];
	settingsImage.y = buttonY[2];
	settingsImage.interactive = true;
	settingsImage.on("mousedown", function(e){
		console.log("settings pressed");
		//do something
	})

	creditsImage.x = buttonX[3];
	creditsImage.y = buttonY[3];
	creditsImage.interactive = true;
	creditsImage.on("mousedown", function(e){
		console.log("credits pressed");
		//do something
	})

	stage.addChild(bgImage);
 	stage.addChild(playImage);
  	stage.addChild(instructImage);
 	stage.addChild(settingsImage);
  	stage.addChild(creditsImage);
}

function setupGame() {

	charImage = PIXI.loader.resources["/img/mainCharacter.json"].textures;
  	mc00 = new Sprite(charImage["mainChar_0.png"]);
  	mc01 = new Sprite(charImage["mainChar_1.png"]);
  	mc02 = new Sprite(charImage["mainChar_2.png"]);
  	mc03 = new Sprite(charImage["mainChar_3.png"]);
  	mc04 = new Sprite(charImage["mainChar_4.png"]);
  	mc05 = new Sprite(charImage["mainChar_5.png"]);
  	mc06 = new Sprite(charImage["mainChar_6.png"]);
  	mc07 = new Sprite(charImage["mainChar_7.png"]);
  	mc08 = new Sprite(charImage["mainChar_8.png"]);
  	mc09 = new Sprite(charImage["mainChar_9.png"]);
  	mc10 = new Sprite(charImage["mainChar_10.png"]);
  	mc11 = new Sprite(charImage["mainChar_11.png"]);
  
  	mc07.x = CHAR_START_X;
  	mc07.y = CHAR_START_Y;

  	mc00.vx = 0;
  	mc00.vy = 0;
  	mc01.vx = 0;
  	mc01.vy = 0;
  	mc02.vx = 0;
  	mc02.vy = 0;
  	mc03.vx = 0;
  	mc03.vy = 0;

  	charX = CHAR_START_X;
  	charY = CHAR_START_Y;

  	stage.addChild(mc00);
 	stage.addChild(mc01);
 	stage.addChild(mc02);
 	stage.addChild(mc03);
 	stage.addChild(mc04);
 	stage.addChild(mc05);
 	stage.addChild(mc06);
 	stage.addChild(mc07);
 	stage.addChild(mc08);
 	stage.addChild(mc09);
 	stage.addChild(mc10);
 	stage.addChild(mc11);

 	mc00.visible = false;
 	mc01.visible = false;
 	mc02.visible = false;
 	mc03.visible = false;
 	mc04.visible = false;
 	mc05.visible = false;
 	mc06.visible = false;
 	mc08.visible = false;
 	mc09.visible = false;
 	mc10.visible = false;
 	mc11.visible = false;

  //Capture the keyboard arrow keys
  	var left = keyboard(37),
   		up = keyboard(38),
      	right = keyboard(39),
      	down = keyboard(40);

  	left.press = function(){
  		console.log("left pressed");
  		facing = "W";
  		//isMoving = true;
  	}
  	up.press = function(){
  		console.log("up pressed");
  		facing = "N";
  		//isMoving = true;
  		
  		switch(spritenumber){
			case 1:
				setCharSpritesToFalse();
				mc00.visible = true;
				//mc00.y = charY;
				//mc00.x = charX;
				spritenumber = 2;
				mc00.vy = -5;
				mc00.vx = 0;
				charY -= 5;
				break;
			case 2:
				setCharSpritesToFalse();
				mc01.visible = true;
				//mc01.y = charY;
				//mc01.x = charX;
				spritenumber = 3;
				mc01.vy = -5;
				mc01.vx = 0;
				charY -= 5;
				break;
			case 3:
				setCharSpritesToFalse();
				mc02.visible = true;
				//mc02.y = charY;
				//mc02.x = charX;
				spritenumber = 1;
				mc02.vy = -5;
				mc02.vx = 0;
				charY -= 5;
		}


  	}
  	right.press = function(){
  		console.log("right pressed");
  		facing = "E";
  		//isMoving = true;
  	}
  	down.press = function(){
  		console.log("down pressed");
  		facing = "S";
  		//isMoving = true;
  	}
  	left.release = function(){
  		console.log("left released");
  		//isMoving = false;
  	}
  	up.release = function(){
  		console.log("up released");
  		//isMoving = false;
  	}
  	right.release = function(){
  		console.log("right released");
  		//isMoving = false;
  	}
  	down.release = function(){
  		console.log("down released");
  		//isMoving = false;
  	}

  	state = play;
  	gameLoop();
  	//renderer.render(stage);

}

function play(){
	//do something
	console.log("play called");
}

function gameLoop() {

  //Loop this function at 60 frames per second
  requestAnimationFrame(gameLoop);

  //update game state
  state();

  mc00.y = charY;
  mc00.x = charX;
  mc01.y = charY;
  mc01.x = charX;
  mc02.y = charY;
  mc02.x = charX;
  mc03.y = charY;
  mc03.x = charX;
  //if (isMoving)
	//{
		/*
		if (facing == "N")
		{
			if(charY > 0){
				charY -= CHAR_SPEED;
			}

  			switch(spritenumber){
  				case 1:
  					setCharSpritesToFalse();
  					mc00.visible = true;
  					mc00.y = charY;
  					mc00.x = charX;
  					spritenumber = 2;
  					break;
  				case 2:
  					setCharSpritesToFalse();
  					mc01.visible = true;
  					mc01.y = charY;
  					mc01.x = charX;
  					spritenumber = 3;
  					break;
  				case 3:
  					setCharSpritesToFalse();
  					mc02.visible = true;
  					mc02.y = charY;
  					mc02.x = charX;
  					spritenumber = 1;
  			}
 			//mc00.visible = true;
			//currY = IMAGE_START_NORTH_Y;
			//mc0, mc1, mc2
		}
		else if (facing == "E")
		{
			if(charX < STAGE_WIDTH - CHAR_WIDTH + 1){
				charX += CHAR_SPEED;
			}

			switch(spritenumber){
  				case 1:
  					setCharSpritesToFalse();
  					mc03.visible = true;
  					mc03.y = charY;
  					mc03.x = charX;
  					spritenumber = 2;
  					break;
  				case 2:
  					setCharSpritesToFalse();
  					mc04.visible = true;
  					mc04.y = charY;
  					mc04.x = charX;
  					spritenumber = 3;
  					break;
  				case 3:
  					setCharSpritesToFalse();
  					mc05.visible = true;
  					mc05.y = charY;
  					mc05.x = charX;
  					spritenumber = 1;
  			}

			//currY = IMAGE_START_EAST_Y;
			//mc3, mc4, mc5
		}
		else if (facing == "S")
		{
			if(charY < STAGE_HEIGHT - CHAR_HEIGHT - 1){
				charY += CHAR_SPEED;
			}

			switch(spritenumber){
  				case 1:
  					setCharSpritesToFalse();
  					mc06.visible = true;
  					mc06.y = charY;
  					mc06.x = charX;
  					spritenumber = 2;
  					break;
  				case 2:
  					setCharSpritesToFalse();
  					mc07.visible = true;
  					mc07.y = charY;
  					mc07.x = charX;
  					spritenumber = 3;
  					break;
  				case 3:
  					setCharSpritesToFalse();
  					mc08.visible = true;
  					mc08.y = charY;
  					mc08.x = charX;
  					spritenumber = 1;
  			}

			//currY = IMAGE_START_SOUTH_Y;
			//mc6, mc7, mc8
		}
		else if (facing == "W")
		{
			if(charX > - 3){
				charX -= CHAR_SPEED;
			}

			switch(spritenumber){
  				case 1:
  					setCharSpritesToFalse();
  					mc09.visible = true;
  					mc09.y = charY;
  					mc09.x = charX;
  					spritenumber = 2;
  					break;
  				case 2:
  					setCharSpritesToFalse();
  					mc10.visible = true;
  					mc10.y = charY;
  					mc10.x = charX;
  					spritenumber = 3;
  					break;
  				case 3:
  					setCharSpritesToFalse();
  					mc11.visible = true;
  					mc11.y = charY;
  					mc11.x = charX;
  					spritenumber = 1;
  			}

			//currY = IMAGE_START_WEST_Y;
			//mc9, mc10, mc11
		}
		
		//currX += CHAR_WIDTH;
		//if (currX >= SPRITE_WIDTH)
		//	currX = 0;
		//rotate between the 1st 2nd and 3rd sprite for the walking animation
	//} */


  //Render the stage to see the animation
  renderer.render(stage);
}

function setCharSpritesToFalse(){
	mc00.visible = false;
	mc01.visible = false;
	mc02.visible = false;
	mc03.visible = false;
	mc04.visible = false;
	mc05.visible = false;
	mc06.visible = false;
	mc07.visible = false;
	mc08.visible = false;
	mc09.visible = false;
	mc10.visible = false;
	mc11.visible = false;
}

//custom keyboard handler taken from https://github.com/kittykatattack/learningPixi
function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

//------------
//Key Handlers
//------------
/*
function keyDownHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);
	console.log(keyPressed);
	if (keyPressed == "W" || keyPressed == "&")
	{
		facing = "N";
		isMoving = true;
	}
	else if (keyPressed == "D" || keyPressed == "'")
	{	
		facing = "E";
		isMoving = true;		
	}
	else if (keyPressed == "S" || keyPressed == "(")
	{	
		facing = "S";
		isMoving = true;		
	}
	else if (keyPressed == "A" || keyPressed == "%")
	{	
		facing = "W";
		isMoving = true;
	}
	else if(keyPressed == "P"){
		pauseGame();
	}
}

function keyUpHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);
	//console.log(keyPressed);
	
	if ((keyPressed == "W") || (keyPressed == "A") || 
		(keyPressed == "S") || (keyPressed == "D") ||
		(keyPressed == "&") || (keyPressed == "'") ||
		(keyPressed == "(") || (keyPressed == "%")){
		
		isMoving = false;
	}
	//if space is pressed.
	if(keyPressed == " "){
		//console.log(keyPressed);
		pauseGame();
	}


}
*/
//stage.addEventListener("click", canvasClick, false);
/*
function canvasClick(event)
{	
	if (browser == "f" || browser == "m")
	{
		mouseX = event.clientX - stage.offsetLeft + document.documentElement.scrollLeft;
		mouseY = event.clientY - stage.offsetTop + document.documentElement.scrollTop;

		if(inMenu){
			for(i = 0; i < buttonX.length; i++){
				if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]){
					if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i]){
						console.log('button clicked')
						fadeId = setInterval(fadeOut, 1000/TIME_PER_FRAME);
						clearInterval(menu);
						inMenu = false;
						//stage.removeEventListener("click", canvasClick);
					}
				}
			}
		}

	}
	else //"s" or "c"
	{
		mouseX = event.clientX - stage.offsetLeft + document.body.scrollLeft;
		mouseY = event.clientY - stage.offsetTop + document.body.scrollTop;

		if(inMenu){
			for(i = 0; i < buttonX.length; i++){
				if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]){
					if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i]){
						console.log('button clicked')
						fadeId = setInterval(fadeOut, 1000/TIME_PER_FRAME);
						clearInterval(menu);
						inMenu = false;
						//stage.removeEventListener("click", canvasClick);
					}
				}
			}
		}

	}
	isClicked = true;
}	*/

//------------
//Game Loop
//------------
function startGame(){
	game = setInterval(updateGame, TIME_PER_FRAME);
}
/*
charX = CHAR_START_X;
charY = CHAR_START_Y;

currX = IMAGE_START_X;
currY = IMAGE_START_EAST_Y;

var buttonX = [192,110,149,160];
var buttonY = [100,140,180,220];
var buttonWidth = [96,260,182,160];
var buttonHeight = [40,40,40,40];

var speed = 1;
var frames = 30;
var menu = 0;
var fadeId = 0;
var time = 0.0;

//Move this somewhere else.
isRock = true;
isClay = true;
isStick = true;
isPalmLeaf = true;
isLog = true;
isVine  =true;
*/
function updateGame()
{		
	console.log('updateGame called');
	updateClock();
	//Clear Canvas
	ctx.fillStyle = "grey";
	ctx.fillRect(0, 0, stage.width, stage.height);
	
	if (isMoving)
	{
		if (facing == "N")
		{
			if(charY > 0){
				charY -= CHAR_SPEED;
			}
			currY = IMAGE_START_NORTH_Y;
		}
		else if (facing == "E")
		{
			if(charX < STAGE_WIDTH - CHAR_WIDTH + 1){
				charX += CHAR_SPEED;
			}
			else if(charX > STAGE_WIDTH - CHAR_WIDTH){
				if(map == 1){
					map = 2;
					charX = 0;
				}
			}
			currY = IMAGE_START_EAST_Y;
		}
		else if (facing == "S")
		{
			if(charY < STAGE_HEIGHT - CHAR_HEIGHT - 1){
				charY += CHAR_SPEED;
			}
			currY = IMAGE_START_SOUTH_Y;
		}
		else if (facing == "W")
		{
			if(charX > - 3){
				charX -= CHAR_SPEED;
			}
			else if(charX < -2){
				if(map == 2){
					map = 1;
					charX = 575;
				}
			}
			currY = IMAGE_START_WEST_Y;
		}
		
		currX += CHAR_WIDTH;
		
		if (currX >= SPRITE_WIDTH)
			currX = 0;
	}

	if(map == 1){
		drawItems();
	}
	//drawBuiltItems();
	
	isClicked = false;
	
	//Update Text
	ctx.fillStyle = "white";
	if(updateHunger()){
		HUNGER = HUNGER - 1;
	}
	if(updateThirst()){
		THIRST = THIRST - 1;
	}
	var Health = 'Health: ' + HEALTH.toString();
	var Hunger = 'Hunger: ' + HUNGER.toString();
	var Thirst = 'Thirst: ' + THIRST.toString();
	ctx.fillText(score, 10, 20);
	ctx.fillText(Health, 10, 40);
	ctx.fillText(Hunger, 10, 60);
	ctx.fillText(Thirst, 10, 80);
	
	//Draw Image
	ctx.drawImage(charImage,currX,currY,CHAR_WIDTH,CHAR_HEIGHT,
					charX,charY,CHAR_WIDTH,CHAR_HEIGHT);

	if(timer > 0){
		flashMessage(messageForFlash);
		timer -= 1;
	}

}

//Takes in a message and prints it onto the middle of the screen
function messageScreen(message){
	ctx.beginPath();
	//ctx.rect(300,100, STAGE_WIDTH/2 - STAGE_WIDTH/4, STAGE_HEIGHT/2 - STAGE_HEIGHT/4);
	//ctx.fillStyle = "white";
	//ctx.fill();
	ctx.strokeStyle = 'black';
	ctx.stroke();
	ctx.fillStyle = "white";
	ctx.fillText(message, STAGE_WIDTH/2 - STAGE_WIDTH/4 + 20, STAGE_HEIGHT/2 - STAGE_HEIGHT/4 + 20);

	/*
	if (isClicked) {
		//Check for collision
		if (hitTestPoint(300, 100, STAGE_WIDTH/2, STAGE_HEIGHT/2, mouseX, mouseY)){
				alert('This was clicked');
				pauseGame();
			}
	}
	*/
}

//Takes in a message and prints it onto the screen for a set amount of time
//this might not work
function flashMessage(message){
	ctx.beginPath();
	//ctx.rect(300,100, STAGE_WIDTH/2 - STAGE_WIDTH/4, STAGE_HEIGHT/2 - STAGE_HEIGHT/4);
	//ctx.fillStyle = "white";
	//ctx.fill();
	ctx.strokeStyle = 'black';
	ctx.stroke();
	ctx.fillStyle = "white";
	ctx.fillText(message, STAGE_WIDTH/2 - STAGE_WIDTH/4 + 20, STAGE_HEIGHT/2 - STAGE_HEIGHT/4 + 20);
}




function startMenu(){
	console.log('startMenu called');
	menu = setInterval(updateMenu, TIME_PER_FRAME);
	inMenu = true;
	//stage.addEventListener("click", canvasClick, false);
}

function pauseGame() {
	console.log("pauseGame called!")
  	if (!gamePaused) {
    	game = clearInterval(game);
    	gamePaused = true;
  	} else if (gamePaused) {
    	game = setInterval(updateGame, TIME_PER_FRAME);
    	gamePaused = false;
  	}
}

function updateClock(){
	clock++;
	if(clock == 34){
		clock = 0;
	}
}
function checkClock(){
	if(clock == 33){
		console.log('1 second');
		return true;
	}
	return false;
}
function updateThirst(){
	if(clock == 33){
		console.log('1 second');
		return true;
	}
	return false;
}

function updateHunger(){
	if(clock == 33){
		console.log('1 second');
		return true;
	}
	return false;
}


function drawRect(xPos, yPos, color)
{
	ctx.beginPath();
	ctx.rect(xPos,yPos, BOX_WIDTH, BOX_HEIGHT);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.strokeStyle = 'black';
	ctx.stroke();
}

function hitTestPoint(x1, y1, w1, h1, x2, y2)
{
	//x1, y1 = x and y coordinates of object 1
	//w1, h1 = width and height of object 1
	//x2, y2 = x and y coordinates of object 2 (usually midpt)
	if ((x1 <= x2 && x1+w1 >= x2) &&
		(y1 <= y2 && y1+h1 >= y2))
			return true;
	else
		return false;
}

//------------
//Menu Loop
//------------
function updateMenu() {
	console.log('updateMenu called');
	clearMenu();
	drawMenu();
}

//------------
//Menu Functions
//------------
function clearMenu() {
	ctx.clearRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
}

function fadeOut(){
	ctx.fillStyle = "rgba(0,0,0, 0.2)";
	ctx.fillRect (0, 0, STAGE_WIDTH, STAGE_HEIGHT);
	time += 0.1;
	if(time >= 2){
		console.log('fadeout called');
		clearInterval(fadeId);
		//clearInterval(menu);
		clearMenu();
		time = 0;
		startGame();

	}
}

function drawCraftingMenu(){

	/*
	console.log("drawCraftingMenu");
	ctx.fillRect(0, 0, stage.width, stage.height);

	ctx.fillRect(25, 25, stage.width - 50, stage.height - 50);
	/*
	ctx.beginPath();
	ctx.rect(25, 25, 500, 350);
	ctx.fillStyle = 'white';
	ctx.fill();
	ctx.strokeStyle = 'black';
	ctx.stroke();*/
/*
	var toolsToCraft = 8;
	for(var i = 1; toolsToCraft > i; i++){
		console.log("drew tool craft button");
		ctx.beginPath();
		ctx.rect(50, 45 * i, 300, 42);
		ctx.fillStyle = 'yellow';
		ctx.fill();
		ctx.strokeStyle = 'black';
		ctx.stroke();
	}*/

}

function drawItems(){
	
	//Draw Crafting Table
	drawRect(250, 250, "purple");
	if (isClicked) {
		//Check for collision
		if (hitTestPoint(250, 250, BOX_WIDTH, BOX_HEIGHT, mouseX, mouseY)){
				//alert('This was clicked');
				pauseGame();
				drawCraftingMenu();
			}
	}

	//Draw Box1
	/*
	drawRect(250, 250, "white");
	if (isClicked) {
		//Check for collision
		if (hitTestPoint(250, 250, BOX_WIDTH, BOX_HEIGHT, mouseX, mouseY)){
				alert('This was clicked');
				pauseGame();
				thirstmessage = "You drank some water!"
				THIRST = 100;
				messageScreen(thirstmessage);
			}
	}
	*/

	//Draw Box2
	drawRect(200, 200, "white");
	//Check for collision
	if (hitTestPoint(200, 200, BOX_WIDTH, BOX_HEIGHT, charX+10, charY+19)){
		score++;
		if(updateHunger()){
			HUNGER = HUNGER + 2;
		}
	}

	if(isRock){
		drawRect(170, 50, "gray");
		if(hitTestPoint(170, 50, BOX_WIDTH, BOX_HEIGHT, charX+10, charY+19)){
			console.log("picked up rock called");
			timer = FLASH_MESSAGE_TIMER;
			messageForFlash = "Picked Up 3 Rocks"
			//crafting.pickUpRock();
			pickUpRock();
			isRock = false;
		}
	}

	if(isClay){
		drawRect(410, 55, "red");
		if(hitTestPoint(410, 55, BOX_WIDTH, BOX_HEIGHT, charX+10, charY+19)){
			console.log("picked up clay");
			timer = FLASH_MESSAGE_TIMER;
			messageForFlash = "Picked Up 1 Clay"
			//crafting.pickUpRock();
			pickUpClay();
			isClay = false;
		}
	}

	if(isStick){
		drawRect(210, 355, "brown");
		if(hitTestPoint(210, 355, BOX_WIDTH, BOX_HEIGHT, charX+10, charY+19)){
			console.log("picked up stick");
			timer = FLASH_MESSAGE_TIMER;
			messageForFlash = "Picked Up 4 Stick"
			//crafting.pickUpRock();
			pickUpStick();
			isStick = false;
		}
	}

	if(isPalmLeaf){
		drawRect(510, 355, "green");
		if(hitTestPoint(510, 355, BOX_WIDTH, BOX_HEIGHT, charX+10, charY+19)){
			console.log("picked up palm leaf");
			timer = FLASH_MESSAGE_TIMER;
			messageForFlash = "Picked Up 3 Palm Leaves"
			//crafting.pickUpRock();
			pickUpPalmLeaf();
			isPalmLeaf = false;
		}
	}

	if(isVine){
		drawRect(560, 215, "green");
		if(hitTestPoint(560, 215, BOX_WIDTH, BOX_HEIGHT, charX+10, charY+19)){
			console.log("picked up vine");
			timer = FLASH_MESSAGE_TIMER;
			messageForFlash = "Picked Up 2 Vines"
			//crafting.pickUpRock();
			pickUpVine();
			isVine = false;
		}
	}

	if(isLog){
		drawRect(110, 195, "brown");
		if(hitTestPoint(110, 195, BOX_WIDTH, BOX_HEIGHT, charX+10, charY+19)){
			console.log("picked up log");
			timer = FLASH_MESSAGE_TIMER;
			messageForFlash = "Picked Up 2 Logs"
			//crafting.pickUpRock();
			pickUpLog();
			isLog = false;
		}
	}

}