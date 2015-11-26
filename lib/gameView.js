(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var GameView = Mario.GameView = function (ctx) {
    this.ctx = ctx;
    this.game = null;
    this.curtain = new Mario.Curtain();
    this.message = new Mario.MessageScreen();
    this.keyHandler = new Mario.KeyHandler(this);
    this.renderID = null;
    this.firstGame = true;

    this.resetGame();
  };

  GameView.prototype.resetGame = function () {
    this.curtain.lowerCurtain();
    this.message.resetMessageScreen();
    this.state = Mario.Constants.MENU;
    this.game = new Mario.Game(this);
    this.start();
  };

  GameView.prototype.drawGameOver = function () {
    var that = this;
    this.message.menuOn = false;
    this.message.on = true;
    var fadeID = setInterval(function() {
      if (that.curtain.opacity < 0.1) {
        that.curtain.fadeCurtain();
        that.curtain.draw(that.ctx);
      }
      else {
        clearInterval(fadeID);
        that.message.draw(that.ctx, that.state);
      }
    }, 1000 / Mario.Constants.FPS);
    this.stopRender();
  };

  GameView.prototype.draw = function () {
    if (this.state === Mario.Constants.OVER) {
      this.drawGameOver();
    }
    else {
      switch (this.state) {
        case Mario.Constants.STARTED:
          this.message.menuOn = false;
          this.message.on = false;
          this.game.draw(this.ctx);
          break;
        case Mario.Constants.MENU:
          this.curtain.lowerCurtain();
          this.message.menuOn = true;
        case Mario.Constants.PAUSED:
          this.message.on = true;
          this.curtain.draw(this.ctx);
          this.message.draw(this.ctx, this.state);
          break;
        }
    }
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.renderID = setInterval(
      gameView.draw.bind(gameView),
      1000 / Mario.Constants.FPS
    );

    if (this.firstGame) {
      this.keyHandler.bindKeyHandlers();
      this.firstGame = false;
    }
  };

  GameView.prototype.stopRender = function () {
    clearInterval(this.renderID);
  };

})();
