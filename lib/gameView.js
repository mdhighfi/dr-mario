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
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
      }, 1000 / Mario.Constants.FPS
    );
  };

  GameView.prototype.stop = function () {
    clearInterval(this.intervalId);
  };
})();
