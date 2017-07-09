var Splash = function () {};

Splash.prototype = {

  loadScripts: function () {
    game.load.script('mainmenu',  'states/MainMenu.js');
    game.load.script('game',      'states/Game.js');
    game.load.script('style',     'lib/style.js');
    game.load.script('mixins',    'lib/mixins.js');
    game.load.script('WebFont',   'lib/webfontloader.js');
    game.load.script('gameover',  'states/GameOver.js');
    game.load.script('credits',   'states/Credits.js');
    game.load.script('options',   'states/Options.js');
  },

  loadBgm: function () {
    //example of how to load music
    //game.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
  },

  loadImages: function () {
    game.load.image('bgImage', PATH_BAKG);
    game.load.image('settingsbgImage', PATH_STBG);
    game.load.image('playImage', PATH_PLAY);
    game.load.image('instructImage', PATH_INST);
    game.load.image('settingsImage', PATH_SETT);
    game.load.image('creditsImage', PATH_CRED);
  },

  
  loadFonts: function () {
    //How to add a font
    //WebFontConfig = {
    //  custom: {
    //    families: ['TheMinion'],
    //    urls: ['assets/style/theminion.css']
    //  }
    //}
  },

  init: function () {
    this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loading");
    //this.logo       = game.make.sprite(game.world.centerX, 200, 'brand');
    this.status     = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
    utils.centerGameObjects([this.status]);
  },

  preload: function () {
    //how to make a logo
    //game.add.existing(this.logo).scale.setTo(0.5);
    game.add.existing(this.loadingBar);
    game.add.existing(this.status);
    this.load.setPreloadSprite(this.loadingBar);

    this.loadScripts();
    this.loadImages();
    this.loadFonts();
    this.loadBgm();

  },

  addGameStates: function () {
    game.state.add("GameMenu",  GameMenu);
    game.state.add("Game",      Game);
    game.state.add("GameOver",  GameOver);
    game.state.add("Credits",   Credits);
    game.state.add("Options",   Options);
  },

  
  addGameMusic: function () {
    //How to add music
    //music = game.add.audio('dangerous');
    //music.loop = true;
    //music.play();
  },
  

  create: function() {
    this.status.setText('Ready!');
    this.addGameStates();
    this.addGameMusic();

    setTimeout(function () {
      game.state.start("GameMenu");
    }, 1000);
  }
};