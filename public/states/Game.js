var Game = function() {};

var game, isClicked, boxArray, score, facing, currX, currY, charX, charY, isMoving, clock, state;

isClicked = false;
gamePaused = false;
isInventoryMenu = false;
map = 1;
day = 1;
time = 8;
var spritenumber = 1;
var invCounter = 0;

charX = CHAR_START_X;
charY = CHAR_START_Y;

var menu = 0;

//Move this somewhere else.
isRock = true;
isClay = true;
isStick = true;
isPalmLeaf = true;
isLog = true;
isVine  =true;

var mainChar;
var cursors;

Game.prototype = {
	
	preload() {
		console.log("preloader called");
	},

	create() {
		//order matters, first is in back.
		game.add.tileSprite(0, 0, 1920, 1920, 'ground1');
		game.world.setBounds(0, 0, 1920, 1920);

		createPickUps();
		createBuildings();
		

		//
		mainChar = game.add.sprite(100, 200, 'mainCharacter', 7);
		mainChar.animations.add('walkNorth', [0, 1, 2], 15);
		mainChar.animations.add('walkEast', [3, 4, 5], 15);
		mainChar.animations.add('walkSouth', [6, 7, 8], 15);
		mainChar.animations.add('walkWest', [9, 10, 11], 15);
		//game.physics.p2.enable(mainChar);
		game.camera.follow(mainChar);

		dayLabel = game.add.text(25, 25, 'Day: 1', {font: "16px Arial", fill: 'black'});
		timeLabel = game.add.text(95, 25, 'Time: 8:00', {font: "16px Arial", fill: 'black'});
		game.time.events.loop(Phaser.Timer.SECOND, updateTime, this);

		this.stage.disableVisibilityChange = false;

		messageLabel = game.add.text(400, 100, 'text', { font: '24px', fill: '#fff', stroke: 'black', strokeThickness: 4});
		messageLabel.anchor.setTo(0.5, 0.5);
		messageLabel.visible = false;
		messageLabel.fixedToCamera = true;

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
		/*
		window.onkeydown = function(event) {
			console.log(event.keyCode);
			if (event.keyCode == 80){       
				if(game.paused){
					unpause(game);
				} else {
					//display a button to resume the game
					resumeLabel = game.add.text(400, 550, 'Resume', { font: '24px', fill: '#fff', stroke: 'black', strokeThickness: 4});
					resumeLabel.anchor.setTo(0.5, 0.5);
					resumeLabel.inputEnabled = true;
					resumeLabel.fixedToCamera = true;
					resumeLabel.events.onInputDown.add(function(){
						unpause(game);
					});

					game.paused = true;
				}
			}
		}*/

		if(game.input.keyboard.isDown(Phaser.Keyboard.P) || game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			if(game.paused == false){
				game.paused = true;

				//display a button to resume the game
				resumeLabel = game.add.text(400, 550, 'Resume', { font: '24px', fill: '#fff', stroke: 'black', strokeThickness: 4});
				resumeLabel.anchor.setTo(0.5, 0.5);
				resumeLabel.inputEnabled = true;
				resumeLabel.fixedToCamera = true;
				resumeLabel.events.onInputDown.add(function(){
					unpause(game);
				});
			}else{
				unpause(game);
			}
		}

		//if I is pressed open the inventory
		if(game.input.keyboard.isDown(Phaser.Keyboard.I)) {
			if(!isInventoryMenu){
				isInventoryMenu = true;
				game.paused = true;

				//display the inventory menu
				inventoryMenu = game.add.sprite(50, 25, 'inventoryMenu');
				inventoryMenu.fixedToCamera = true;

				//drawInventory();

				var object = MiscItems
				invCounter = 0;
				for(var key in object) {
					console.log(key);
					var invtext = key + " :"
					window['itemLabel' + invCounter] = game.add.text(90, 100 + invCounter * 30, invtext, { font: '16px', fill: 'black'});
					window['itemLabel' + invCounter].fixedToCamera = true;

	    			if(object.hasOwnProperty(key)) {
	        			var property = object[key];
	        			console.log(property);
	        			window['itemNumber' + invCounter] = game.add.text(200, 100 + invCounter * 30, property, { font: '16px', fill: 'black'});
	        			window['itemNumber' + invCounter].fixedToCamera = true;
	    			}

	    			invCounter++;
				}

				//display a button to resume the game
				resumeLabel = game.add.text(400, 550, 'Resume', { font: '24px', fill: '#fff', stroke: 'black', strokeThickness: 4});
				resumeLabel.anchor.setTo(0.5, 0.5);
				resumeLabel.inputEnabled = true;
				resumeLabel.fixedToCamera = true;
				resumeLabel.events.onInputDown.add(function(){
					unpauseInventory(game);
				});
			}else{
				unpauseInventory(game);
			}
		}
			

		if(map == 1){
			drawItems();
			drawBuildings();
		}


	}, //end update

	render() {
		//game.debug.cameraInfo(game.camera, 32, 32);
		//game.debug.spriteCoords(mainChar, 32, 500);
	}

};
function updateTime(){
	if(time == 12){
		time = 1;
		timeLabel.setText('Time: ' + time + ':00');
	}else{
		time += 1;
		timeLabel.setText('Time: ' + time + ':00');
	}
}

//function to flash a message on the screen
function flashMessage(text){
	if(messageLabel.visible == true){
		messageLabel.setText(text);
	}else{
		messageLabel.setText(text);
		messageLabel.visible = true;
		messageTimer = game.time.create(false);
		messageTimer.loop(1000, deleteMessage, this);
		messageTimer.start();
	}
}

//deletes the message
function deleteMessage(){
	messageLabel.visible = false;
	messageTimer.destroy();
}

//function to unpause the game
function unpause(event) {
	if(game.paused = true){
		resumeLabel.destroy();
		game.paused = false;
	}
}

//function to unpause the game
function unpauseInventory(event) {
	//remove the menus and labels
	inventoryMenu.destroy();
	resumeLabel.destroy();
	for(var i = 0; i < invCounter; i++){
		window['itemLabel' + i].destroy();
		window['itemNumber' + i].destroy();
	}

	//unpause the game
	isInventoryMenu = false;
	game.paused = false;
}

function checkOverlap(spriteA, spriteB){
	var boundsA = spriteA.getBounds();
	var boundsB = spriteB.getBounds();
	return Phaser.Rectangle.intersects(boundsA, boundsB);
}

//eventually make items spawn in different locations and spawn them based on a algorithm
function createPickUps(){
	rock = game.add.sprite(400, 300, 'rock');
	stick = game.add.sprite(450, 350, 'stick');
	log = game.add.sprite(500, 350, 'log');
	vine = game.add.sprite(200, 200, 'vine');
	palmleaf = game.add.sprite(650, 250, 'palmleaf');
	clay = game.add.sprite(700, 350, 'clay');

	rock.visible = false;
	stick.visible = false;
	log.visible = false;
	vine.visible = false;
	palmleaf.visible = false;
	clay.visible = false;
}

function createBuildings(){
	craftingtable = game.add.sprite(160, 255, 'craftingtable');
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
	if(checkOverlap(mainChar, craftingtable)){
		drawCraftingMenu();
	}
}
function drawCraftingMenu(){

	game.paused = true;

	//display the crafting menu
	inventoryMenu = game.add.sprite(50, 25, 'inventoryMenu');
	inventoryMenu.fixedToCamera = true;


	//Add Crafting Menu Buttons
	craftStonePickButton = game.add.button(90, 100, 'baseButton', craftStonePick, this);
	craftStonePickButton.onInputOver.add(over, this);

	craftStoneAxeButton = game.add.button(90, 140, 'baseButton', craftStoneAxe, this);
	craftStoneAxeButton.onInputOver.add(over, this);

	craftStoneKnifeButton = game.add.button(90, 180, 'baseButton', craftStoneKnife, this);
	craftStoneKnifeButton.onInputOver.add(over, this);

	craftStoneHammerButton = game.add.button(90, 220, 'baseButton', craftStoneHammer, this);
	craftStoneHammerButton.onInputOver.add(over, this);

	craftMetalPickButton = game.add.button(90, 260, 'baseButton', craftMetalPick, this);
	craftMetalPickButton.onInputOver.add(over, this);

	craftMetalAxeButton = game.add.button(90, 300, 'baseButton', craftMetalAxe, this);
	craftMetalAxeButton.onInputOver.add(over, this);

	craftMetalKnifeButton = game.add.button(90, 340, 'baseButton', craftMetalKnife, this);
	craftMetalKnifeButton.onInputOver.add(over, this);

	craftFishingRodButton = game.add.button(90, 380, 'baseButton', craftFishingRod, this);
	craftFishingRodButton.onInputOver.add(over, this);

	craftWoodHookButton = game.add.button(90, 420, 'baseButton', craftWoodHook, this);
	craftWoodHookButton.onInputOver.add(over, this);

	craftMetalHookButton = game.add.button(90, 460, 'baseButton', craftMetalHook, this);
	craftMetalHookButton.onInputOver.add(over, this);
	//Stop Adding Crafting Menu Buttons


	doneLabel = game.add.text(400, 550, 'Done', { font: '24px', fill: '#fff', stroke: 'black', strokeThickness: 4});
	doneLabel.anchor.setTo(0.5, 0.5);
	doneLabel.inputEnabled = true;
	doneLabel.fixedToCamera = true;
	doneLabel.events.onInputDown.add(function(){
		leaveCraftingMenu(game);
	});
}
function over(){
	console.log('button over');
}

function leaveCraftingMenu(event) {
	//remove the menus and labels
	inventoryMenu.destroy();
	doneLabel.destroy();

	craftStonePickButton.destroy();
	craftStoneAxeButton.destroy();
	craftStoneKnifeButton.destroy();
	craftStoneHammerButton.destroy();
	craftMetalPickButton.destroy();
	craftMetalAxeButton.destroy();
	craftMetalKnifeButton.destroy();
	craftFishingRodButton.destroy();
	craftWoodHookButton.destroy();
	craftMetalHookButton.destroy();
	//for(var i = 0; i < invCounter; i++){
	//	window['itemLabel' + i].destroy();
	//	window['itemNumber' + i].destroy();
	//}

	//unpause the game
	mainChar.x = 175;
	mainChar.y = 300;
	game.paused = false;
}

