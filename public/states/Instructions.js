var Instructions = function(game) {};

Instructions.prototype = {

  //No Idea what this is for
  menuConfig: {
    className: "inverse",
    startY: 100,
    startX: 'center'
  },

  init: function () {

    //Setup Text for 'Instructions' Title
    this.titleText = game.make.text(game.world.centerX, 100, "Instructions", {
      font: 'bold 60pt',
      fill: '#000000',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;

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
    game.add.sprite(0, 0, 'settingsbgImage');
    game.add.existing(this.titleText);

    this.addMenuOption('Back', function () {
      game.state.start("GameMenu");
    });

    var optionStyle = { font: '30pt', fill: 'white', align: 'left', stroke: 'black', strokeThickness: 4};
    var txt = game.add.text(40, 150, "WASD to move", optionStyle);
    var txt = game.add.text(40, 250, "E to Interact", optionStyle);
    var txt = game.add.text(40, 350, "Y to activate farm mode", optionStyle);
    var txt = game.add.text(40, 450, "Q to mine/cut", optionStyle);

  }

};

Phaser.Utils.mixinPrototype(Options.prototype, mixins);