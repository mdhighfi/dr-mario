(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var GameView = Mario.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.renderID = null;
    this.state = Mario.Constants.MENU;
  };

  GameView.MOVES = {
    "j": [ -1, 0],
    "k": [ 1,  0]
  };

  GameView.prototype.handleSpace = function () {
    switch (this.state) {
      case Mario.Constants.MENU:
        this.state = Mario.Constants.STARTED;
        break;
      case Mario.Constants.STARTED:
        this.state = Mario.Constants.PAUSED;
        break;
      case Mario.Constants.PAUSED:
        this.state = Mario.Constants.STARTED;
        break;
      case Mario.Constants.OVER:
        this.state = Mario.Constants.MENU;
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

    key("space", this.game.handleSpace.bind(this.game, this.ctx));
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.renderID = setInterval(
      function () {
        gameView.game.draw(gameView.ctx);

        if (gameView.game.gameOver) {
          gameView.gameOver();
        }
      }, 1000 / Mario.Constants.FPS
    );

    this.bindKeyHandlers();
  };

  GameView.prototype.gameOver = function () {
    this.stop()
    this.game.endGame();
    this.game.draw(this.ctx);
  };

  GameView.prototype.stop = function () {
    clearInterval(this.renderID);
  };
})();
