var Credits = function(game) {};


//LIST OF CREDITS TO ADD/PEOPLE TO THANK
//free game art from kenny @ www.kenney.nl

Credits.prototype = {

  preload: function () {
    this.optionCount = 1;
    this.creditCount = 0;

  },

  addCredit: function(task, author) {

    var authorStyle = { font: '40pt', fill: 'white', align: 'center', stroke: 'black', strokeThickness: 4};
    var taskStyle = { font: '30pt', fill: 'white', align: 'center', stroke: 'black', strokeThickness: 4};
    var authorText = game.add.text(game.world.centerX, 700, author, authorStyle);
    var taskText = game.add.text(game.world.centerX, 750, task, taskStyle);
    authorText.anchor.setTo(0.5);
    taskText.anchor.setTo(0.5);
    game.add.tween(authorText).to( { y: -300 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 4000);
    game.add.tween(taskText).to( { y: -250 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 4000);
    this.creditCount ++;

  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt', fill: 'white', align: 'left', stroke: 'black', strokeThickness: 4};
    var txt = game.add.text(10, (this.optionCount * 80) + 450, text, optionStyle);

    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = 'white';
      target.stroke = 'black';
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;
  },

  create: function () {
    this.stage.disableVisibilityChange = true;
    
    //if (gameOptions.playMusic) {
    //  music.stop();
    //  music = game.add.audio('exit');
    //  music.play();
    //}
    var bg = game.add.sprite(0, 0, 'settingsbgImage');

    //add credits
    this.addCredit('Robert Pence', 'Lead Developer');
    this.addCredit('Robert Pence', 'Music');
    this.addCredit('Robert Pence', 'Lead Artist');
    this.addCredit('Phaser.io', 'Powered By');
    this.addCredit('for playing', 'Thank you');

    this.addMenuOption('Back', function (e) {
      game.state.start("GameMenu");
    });

    game.add.tween(bg).to({alpha: 0}, 20000, Phaser.Easing.Cubic.Out, true, 40000);

  }

};
