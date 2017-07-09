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

var stage = document.getElementById("gameCanvas");
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");
ctx.fillStyle = "grey";
ctx.font = GAME_FONTS;
var game, mouseX, mouseY, isClicked, boxArray, score, facing, currX, currY, charX, charY, isMoving, clock;
isClicked = false;
gamePaused = false;
score = 0;
clock = 0;
timer = 0;
messageForFlash = "";
map = 1;

//---------------
//Preloading ...
//---------------
//Preload Art Assets
// - Sprite Sheet
var charImage = new Image();
var bgImage = new Image();
var playImage = new Image();
var instructImage = new Image();
var settingsImage = new Image();
var creditsImage = new Image();

charImage.ready = false;
charImage.onload = setAssetReady;
charImage.src = PATH_CHAR;

bgImage.ready = false;
bgImage.onload = setAssetReady;
bgImage.src = PATH_BAKG;

playImage.ready = false;
playImage.onload = setAssetReady;
playImage.src = PATH_PLAY;

instructImage.ready = false;
instructImage.onload = setAssetReady;
instructImage.src = PATH_INST;

settingsImage.ready = false;
settingsImage.onload = setAssetReady;
settingsImage.src = PATH_SETT;

creditsImage.ready = false;
creditsImage.onload = setAssetReady;
creditsImage.src = PATH_CRED;

function setAssetReady()
{
	this.ready = true;
}

//Display Preloading
ctx.fillRect(0,0,stage.width,stage.height);
ctx.fillStyle = "#000";
ctx.fillText(TEXT_PRELOADING, TEXT_PRELOADING_X, TEXT_PRELOADING_Y);
var preloader = setInterval(preloading, TIME_PER_FRAME);

function preloading()
{	
	if (charImage.ready && bgImage.ready && playImage.ready && 
		instructImage.ready && settingsImage.ready && creditsImage.ready)
	{
		clearInterval(preloader);
		
		//Initialise game
		facing = "E"; //N = North, E = East, S = South, W = West
		isMoving = false;
		inMenu = false;
		
		//game = setInterval(updateGame, TIME_PER_FRAME);
		document.addEventListener("keydown",keyDownHandler, false);	
		document.addEventListener("keyup",keyUpHandler, false);
		stage.addEventListener("click", canvasClick, false);
		startMenu();
	}
}

//------------
//Key Handlers
//------------
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

//stage.addEventListener("click", canvasClick, false);

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
}	

//------------
//Game Loop
//------------
function startGame(){
	game = setInterval(updateGame, TIME_PER_FRAME);
}

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
function drawMenu(){
	ctx.drawImage(bgImage, 0, 0);
	ctx.drawImage(playImage, buttonX[0], buttonY[0]);
	ctx.drawImage(instructImage, buttonX[1], buttonY[1]);
	ctx.drawImage(settingsImage, buttonX[2], buttonY[2]);
	ctx.drawImage(creditsImage, buttonX[3], buttonY[3]);
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
	//Create the renderer
var renderer = PIXI.autoDetectRenderer(256, 256);

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new PIXI.Container();

//Tell the `renderer` to `render` the `stage`
renderer.render(stage);



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

	
	