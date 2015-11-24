(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var GameView = Mario.GameView = function (ctx) {
    this.ctx = ctx;
    this.curtain = new Mario.Curtain();
    this.message = new Mario.MessageScreen();
    this.game = new Mario.Game(this);
    this.renderID = null;
    this.state = Mario.Constants.MENU;
  };

  GameView.MOVES = {
    "up": [ 0, -1],
    "down": [ 0,  1],
    "left": [ -1, 0],
    "right": [ 1,  0],
  };

  GameView.prototype.handleSpace = function () {
    // debugger;
    switch (this.state) {
      case Mario.Constants.MENU:
        this.state = Mario.Constants.STARTED;
        this.curtain.raiseCurtain;
        break;
      case Mario.Constants.STARTED:
        this.state = Mario.Constants.PAUSED;
        this.curtain.lowerCurtain;
        break;
      case Mario.Constants.PAUSED:
        this.state = Mario.Constants.STARTED;
        this.curtain.raiseCurtain;
        break;
      case Mario.Constants.OVER:
        this.state = Mario.Constants.MENU;
        this.curtain.lowerCurtain;
        this.game = new Mario.Game(this);
        break;
    }
    this.game.toggle();
  };

  GameView.prototype.bindKeyHandlers = function () {
    var currentPill = this.game.pills[this.game.pills.length - 1];

    Object.keys(GameView.MOVES).forEach(function (k) {
      var dir = GameView.MOVES[k];
      key(k, function () { currentPill.move(dir); });
    });

    var that = this;

    // key("space", this.game.handleSpace.bind(this.game, this.ctx));

    key("space", this.handleSpace.bind(this));
  };

  GameView.prototype.draw = function () {
    switch (this.state) {
      case Mario.Constants.STARTED:
        this.message.menuOn = false;
        this.message.on = false;
        this.game.draw(this.ctx);
        break;
      case Mario.Constants.MENU:
        this.message.menuOn = true;
      case Mario.Constants.PAUSED:
      case Mario.Constants.OVER:
        this.message.on = true;
        this.curtain.draw(this.ctx);
        this.message.draw(this.ctx, this.state);
        this.gameOver();
        break;
    }
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.renderID = setInterval(
      gameView.draw.bind(gameView),
      1000 / Mario.Constants.FPS
    );
      // function () {
        // gameView.game.draw(gameView.ctx);
        // if (gameView.state === Mario.Constants.OVER) {
        //   gameView.gameOver();
        // }
      // }, 1000 / Mario.Constants.FPS

    this.bindKeyHandlers();
  };

  GameView.prototype.gameOver = function () {
    this.stop()
    this.game.endGame();
    // this.game.draw(this.ctx);
  };

  GameView.prototype.stop = function () {
    clearInterval(this.renderID);
  };

})();
