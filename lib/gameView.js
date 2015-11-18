(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var GameView = Mario.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.viruses = this.game.addViruses();
    this.renderID = null;

    // this.drawInstructions;
  };

  GameView.MOVES = {
    "j": [ -1, 0],
    "k": [ 1,  0]
  };

  // GameView.prototype.drawInstructions = function () {
  //   var ctx = this.ctx;
  //   ctx.fillStyle = 'rgba(0,0,0,0.6)';
  //   ctx.fillRect(0, 0, Mario.Constants.CANVAS_WIDTH, Mario.Constants.CANVAS_HEIGHT);
  //   ctx.fillStyle = 'rgba(255,255,255,1)';
  //   ctx.font = "12px serif";
  //   ctx.fillText("space - play/pause", 10, 50);
  //   ctx.fillText("j - move left", 10, 100);
  //   ctx.fillText("k - move right", 10, 150);
  // };

  GameView.prototype.bindKeyHandlers = function () {
    var currentPill = this.game.pills[this.game.pills.length - 1];
    // debugger;

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
