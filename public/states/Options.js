var Options = function(game) {};

Options.prototype = {

  init: function () {

    //Setup Text for 'Settings' Title
    this.titleText = game.make.text(game.world.centerX, 100, "Settings", {
      font: 'bold 60pt',
      fill: 'white',
      align: 'left',
      stroke: 'black', 
      strokeThickness: 4
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;

  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt', fill: 'white', align: 'left', stroke: 'black', strokeThickness: 4};
    var txt = game.add.text(475, (this.optionCount * 80) + 100, text, optionStyle);

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

    var playSound = gameOptions.playSound,
        playMusic = gameOptions.playMusic;

    game.add.sprite(0, 0, 'settingsbgImage');
    game.add.existing(this.titleText);

    this.addMenuOption(playMusic ? 'Mute Music' : 'Play Music', function (target) {
      //playMusic = !playMusic;
      target.text = playMusic ? 'Mute Music' : 'Play Music';
      target.text
      //music.volume = playMusic ? 1 : 0;
    });
    this.addMenuOption(playSound ? 'Mute Sound' : 'Play Sound', function (target) {
      //playSound = !playSound;
      target.text = playSound ? 'Mute Sound' : 'Play Sound';
    });
    this.addMenuOption('Back', function () {
      game.state.start("GameMenu");
    });
  }

};
