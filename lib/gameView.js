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

    this.start();
  };

  GameView.MOVES = {
    "up": [ 0, -1],
    "down": [ 0,  1],
    "left": [ -1, 0],
    "right": [ 1,  0],
  };

  GameView.prototype.handleSpace = function () {
    if (this.state === Mario.Constants.OVER) {
      this.state = Mario.Constants.MENU;
      this.game = new Mario.Game(this);
      this.start();
    }
    else {
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
      }
      this.curtain.toggle();
      this.game.toggle();
    }
  };

  GameView.prototype.bindKeyHandlers = function () {
    var currentPill = this.game.pills[this.game.pills.length - 1];

    Object.keys(GameView.MOVES).forEach(function (k) {
      var dir = GameView.MOVES[k];
      key(k, function () { currentPill.move(dir); });
    });

    key("space", this.handleSpace.bind(this));
  };

  GameView.prototype.draw = function () {
    switch (this.state) {
      case Mario.Constants.STARTED:
        this.message.menuOn = false;
        this.message.on = false;
        this.game.draw(this.ctx);
        break;
      case Mario.Constants.OVER:
        this.stop();
      case Mario.Constants.MENU:
        this.message.menuOn = true;
      case Mario.Constants.PAUSED:
        this.message.on = true;
        this.curtain.draw(this.ctx);
        this.message.draw(this.ctx, this.state);
        break;
    }
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.renderID = setInterval(
      gameView.draw.bind(gameView),
      1000 / Mario.Constants.FPS
    );

    this.bindKeyHandlers();
  };

  GameView.prototype.stop = function () {
    clearInterval(this.renderID);
  };

})();
