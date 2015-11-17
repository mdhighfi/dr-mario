(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var GameView = Mario.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.viruses = this.game.addViruses();
    this.intervalId = null;
    this.paused = false;
  };

  GameView.MOVES = {
    "j": [ -1, 0],
    "k": [ 1,  0]
  };

  GameView.prototype.bindKeyHandlers = function () {
    var currentPill = this.game.pills[this.game.pills.length - 1];
    // debugger;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var dir = GameView.MOVES[k];
      key(k, function () { currentPill.move(dir); });
    });

    var that = this;

    key("space", function () {
      if (that.paused) {
        that.paused = false;
        debugger;
      }
      else {
        that.paused = true;
        debugger;
      }
    });
  };

  GameView.prototype.start = function () {
    // debugger;
    var gameView = this;
    this.intervalId = setInterval(
      function () {
        var over = gameView.game.step();
        gameView.game.draw(gameView.ctx);

        if (over) {
          gameView.gameOver();
        }
      }, 1000 / Mario.Constants.FPS
    );

    this.bindKeyHandlers();
  };

  GameView.prototype.gameOver = function () {
    this.stop()
    this.ctx.fillStyle = 'rgba(0,0,0,0.6)';
    this.ctx.fillRect(0, 0, Mario.Constants.CANVAS_WIDTH, Mario.Constants.CANVAS_HEIGHT);
    this.ctx.fillStyle = 'rgba(255,255,255,1)';
    this.ctx.font = "48px serif";
    this.ctx.fillText("Game", 10, 50);
    this.ctx.fillText("Over", 10, 100);
  };

  GameView.prototype.stop = function () {
    clearInterval(this.intervalId);
  };
})();
