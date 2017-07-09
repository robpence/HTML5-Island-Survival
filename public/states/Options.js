var Options = function(game) {};

Options.prototype = {

  //No Idea what this is for
  menuConfig: {
    className: "inverse",
    startY: 100,
    startX: 500
  },

  init: function () {

    //Setup Text for 'Settings' Title
    this.titleText = game.make.text(game.world.centerX, 100, "Settings", {
      font: 'bold 60pt',
      fill: '#000000',
      align: 'left'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;

  },

  create: function () {

    var playSound = gameOptions.playSound,
        playMusic = gameOptions.playMusic;

    game.add.sprite(0, 0, 'settingsbgImage');
    game.add.existing(this.titleText);

    this.addMenuOption(playMusic ? 'Mute Music' : 'Play Music', function (target) {
      playMusic = !playMusic;
      target.text = playMusic ? 'Mute Music' : 'Play Music';
      music.volume = playMusic ? 1 : 0;
    });
    this.addMenuOption(playSound ? 'Mute Sound' : 'Play Sound', function (target) {
      playSound = !playSound;
      target.text = playSound ? 'Mute Sound' : 'Play Sound';
    });
    this.addMenuOption('<- Back', function () {
      game.state.start("GameMenu");
    });
  }

};

Phaser.Utils.mixinPrototype(Options.prototype, mixins);
