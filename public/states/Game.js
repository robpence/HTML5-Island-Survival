var Game = function() {};

var game, mouseX, mouseY, isClicked, boxArray, score, facing, currX, currY, charX, charY, isMoving, clock, state;
var bgImage, charImage, playImage, instructImage, settingsImage, creditsImage;
var mc00, mc01, mc02, mc03, mc04, mc05, mc06, mc07, mc08, mc08, mc09, mc10, mc11;

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

Game.prototype = {
	
	preload() {
		console.log("preloader called");
	},

	create() {
		//order matters, first is in back.
		//animations.add(name, frames, frameRate, loop, useNumericIndex)
		game.add.sprite(0, 0, 'ground1');
		mainChar = game.add.sprite(100, 200, 'mainCharacter', 7);
		mainChar.animations.add('walkNorth', [0, 1, 2], 15);
		mainChar.animations.add('walkEast', [3, 4, 5], 15);
		mainChar.animations.add('walkSouth', [6, 7, 8], 15);
		mainChar.animations.add('walkWest', [9, 10, 11], 15);
		//mainChar.animations.play('walk', 50, true);
		//mainChar.add.tween(sprite).to({ x: game.width }, 10000, Phaser.Easing.Linear.None, true);


		this.stage.disableVisibilityChange = false;

	},

	update() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			mainChar.animations.play('walkWest', 15, true);
			mainChar.x -= 4;
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			mainChar.animations.play('walkEast', 15, true);
			mainChar.x += 4;
		}

		if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
			mainChar.animations.play('walkNorth', 15, true);
			mainChar.y -= 4;
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
			mainChar.animations.play('walkSouth', 15, true);
			mainChar.y += 4;
		}
		game.input.keyboard.onUpCallback = function( e ){ 
			if(e.keyCode == Phaser.Keyboard.LEFT){ 
				//stop left animation
				mainChar.animations.stop('walkWest');               
	        }
	        if(e.keyCode == Phaser.Keyboard.RIGHT){ 
				//stop right animation
				mainChar.animations.stop('walkEast');                 
	        }
	        if(e.keyCode == Phaser.Keyboard.UP){ 
				//stop up animation
				mainChar.animations.stop('walkNorth');                 
	        }
	        if(e.keyCode == Phaser.Keyboard.DOWN){ 
				//stop down animation
				mainChar.animations.stop('walkSouth');                 
	        }
		}

		if(game.input.keyboard.isDown(Phaser.Keyboard.P) || game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			//if P or ESC is pressed we pause the game
			game.paused = true;

			//display the inventory menu
			inventorymenu = game.add.sprite(800/2, 600/2, 'inventory1');
			inventorymenu2 = game.add.sprite(400, 385, 'inventory2');
			inventorymenu.anchor.setTo(0.5, 0.5);
			inventorymenu2.anchor.setTo(0.5, 0.5);

			//display a button to resume the game
			resume_label = game.add.text(400, 500, 'Resume', { font: '24px', fill: '#fff', stroke: 'black', strokeThickness: 4});
			resume_label.anchor.setTo(0.5, 0.5);
			resume_label.inputEnabled = true;
			resume_label.events.onInputDown.add(function(){
				unpause(game);
			});

		}

		//function to unpause the game
		function unpause(event) {
			//remove the menus and labels
			inventorymenu.destroy();
			inventorymenu2.destroy();
			resume_label.destroy();

			//unpause the game
			game.paused = false;
		}


	}, //end update

};

function updateGame()
{		
	console.log('updateGame called');
	updateClock();
	
	/*
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
	}*/

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