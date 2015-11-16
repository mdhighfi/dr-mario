(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var GameView = Mario.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.viruses = this.game.addViruses();
    this.intervalId = null;
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.intervalId = setInterval(
      function () {
        var over = gameView.game.step();
        gameView.game.draw(gameView.ctx);

        if (over) {
          debugger;
          gameView.gameOver();
        }
      }, 1000 / Mario.Constants.FPS
    );
  };

  GameView.prototype.gameOver = function () {
    this.stop()
    this.ctx.clearRect(0, 0, Mario.Constants.CANVAS_WIDTH, Mario.Constants.CANVAS_HEIGHT);
    this.ctx.font = "48px serif";
    this.ctx.fillText("Game", 10, 50);
    this.ctx.fillText("Over", 10, 100);
  };

  GameView.prototype.stop = function () {
    clearInterval(this.intervalId);
  };
})();
