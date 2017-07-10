var Game = function() {};

var game, mouseX, mouseY, isClicked, boxArray, score, facing, currX, currY, charX, charY, isMoving, clock, state;
var bgImage, charImage, playImage, instructImage, settingsImage, creditsImage;
var mc00, mc01, mc02, mc03, mc04, mc05, mc06, mc07, mc08, mc08, mc09, mc10, mc11;

isClicked = false;
gamePaused = false;
score = 0;
clock = 0;
timer = 0;
map = 1;
var spritenumber = 1;

charX = CHAR_START_X;
charY = CHAR_START_Y;

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

		rock = game.add.sprite(400, 300, 'rock');
		rock.visible = false;
		stick = game.add.sprite(450, 350, 'stick');
		stick.visible = false;
		log = game.add.sprite(500, 350, 'log');
		log.visible = false;
		vine = game.add.sprite(200, 200, 'vine');
		vine.visible = false;
		palmleaf = game.add.sprite(650, 250, 'palmleaf');
		palmleaf.visible = false;
		clay = game.add.sprite(700, 350, 'clay');
		clay.visible = false;

		craftingtable = game.add.sprite(150, 175, 'craftingtable');


		mainChar = game.add.sprite(100, 200, 'mainCharacter', 7);
		mainChar.animations.add('walkNorth', [0, 1, 2], 15);
		mainChar.animations.add('walkEast', [3, 4, 5], 15);
		mainChar.animations.add('walkSouth', [6, 7, 8], 15);
		mainChar.animations.add('walkWest', [9, 10, 11], 15);

		this.stage.disableVisibilityChange = false;




	},

	update() {

		//----------------------------------------
		//---------- KEYBOARD INPUTS -------------
		//----------------------------------------

		if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || game.input.keyboard.isDown(Phaser.Keyboard.A)){
			mainChar.animations.play('walkWest', 15, true);
			mainChar.x -= 4;
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || game.input.keyboard.isDown(Phaser.Keyboard.D)){
			mainChar.animations.play('walkEast', 15, true);
			mainChar.x += 4;
		}

		if(game.input.keyboard.isDown(Phaser.Keyboard.UP) || game.input.keyboard.isDown(Phaser.Keyboard.W)){
			mainChar.animations.play('walkNorth', 15, true);
			mainChar.y -= 4;
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || game.input.keyboard.isDown(Phaser.Keyboard.S)){
			mainChar.animations.play('walkSouth', 15, true);
			mainChar.y += 4;
		}
		game.input.keyboard.onUpCallback = function( e ){ 
			if(e.keyCode == Phaser.Keyboard.LEFT || e.keyCode == Phaser.Keyboard.A){ 
				//stop left animation
				mainChar.animations.stop('walkWest');               
	        }
	        if(e.keyCode == Phaser.Keyboard.RIGHT || e.keyCode == Phaser.Keyboard.D){ 
				//stop right animation
				mainChar.animations.stop('walkEast');                 
	        }
	        if(e.keyCode == Phaser.Keyboard.UP || e.keyCode == Phaser.Keyboard.W){ 
				//stop up animation
				mainChar.animations.stop('walkNorth');                 
	        }
	        if(e.keyCode == Phaser.Keyboard.DOWN || e.keyCode == Phaser.Keyboard.S){ 
				//stop down animation
				mainChar.animations.stop('walkSouth');                 
	        }
		}

		//if P or ESC is pressed we pause the game
		if(game.input.keyboard.isDown(Phaser.Keyboard.P) || game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
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

		if(map == 1){
			drawItems();
			drawBuildings();
		}


	} //end update

};

//function to flash a message on the screen
function flashMessage(text){
	messageLabel = game.add.text(400, 100, text, { font: '24px', fill: '#fff', stroke: 'black', strokeThickness: 4});
	messageLabel.anchor.setTo(0.5, 0.5);
	messageTimer = game.time.create(false);
	messageTimer.loop(1000, deleteMessage, this);
	messageTimer.start();
}

//deletes the message
function deleteMessage(){
	messageLabel.destroy();
	messageTimer.destroy();
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

function checkOverlap(spriteA, spriteB){
	var boundsA = spriteA.getBounds();
	var boundsB = spriteB.getBounds();
	return Phaser.Rectangle.intersects(boundsA, boundsB);
}

function drawItems(){

	if(isRock){

		//display the rock
		rock.visible = true;
		
		//check to see if player is over rock
		if(checkOverlap(mainChar, rock)){
			console.log("picked up rock called");
			flashMessage("Picked Up 3 Rocks");
			pickUpRock(); //probably need to edit these
			isRock = false;
			rock.destroy();
		}
	}

	if(isClay){
		clay.visible = true;

		if(checkOverlap(mainChar, clay)){
			console.log("picked up clay called");
			flashMessage("Picked Up 1 clay");
			pickUpClay(); //probably need to edit these
			isClay = false;
			clay.destroy();
		}
	}

	if(isStick){
		stick.visible = true;
		if(checkOverlap(mainChar, stick)){
			console.log("picked up stick");
			flashMessage("Picked Up 4 Stick");
			pickUpStick();
			isStick = false;
			stick.destroy();
		}
	}

	if(isPalmLeaf){
		palmleaf.visible = true;
		if(checkOverlap(mainChar, palmleaf)){
			console.log("picked up palm leaf");
			flashMessage("Picked Up 3 Palm Leaves");
			pickUpPalmLeaf();
			isPalmLeaf = false;
			palmleaf.destroy();
		}
	}

	if(isVine){
		vine.visible = true;
		if(checkOverlap(mainChar, vine)){
			console.log("picked up vine");
			flashMessage("Picked Up 2 Vines");
			pickUpVine();
			isVine = false;
			vine.destroy();
		}
	}

	if(isLog){
		log.visible = true;
		if(checkOverlap(mainChar, log)){
			console.log("picked up log");
			flashMessage("Picked Up 2 Logs");
			pickUpLog();
			isLog = false;
			log.destroy();
		}
	}

}

function drawBuildings(){
	//draw the biuldings
}
function drawCraftingMenu(){
	//display the crafting menu
}


/*
function updateGame()
{		
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

}*/
