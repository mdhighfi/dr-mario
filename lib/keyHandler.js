(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var KeyHandler = Mario.KeyHandler = function (view) {
    this.view = view;
  };

  var MOVES = {
    "up": [ 0, -1],
    "down": [ 0,  1],
    "left": [ -1, 0],
    "right": [ 1,  0]
  };

  var ROTATIONS = {
    "1": -1,
    "2": 1
  };

  KeyHandler.prototype.bindKeyHandlers = function () {
    var scale = Mario.Constants.SCALE * Mario.Constants.SQUARE_LENGTH;
    var game = this.view.game;
    var menu = this.view.message.menu;
    var that = this;

    Object.keys(ROTATIONS).forEach(function (k) {
      var dir = ROTATIONS[k];
      key(k, function () {
        var currentPill = game.currentPill();
        currentPill.rotate(dir);
      });
    });

    Object.keys(MOVES).forEach(function (k) {
      var dir = MOVES[k];
      key(k, function () {
        if (that.view.state === Mario.Constants.MENU) {
          menu.move(dir);
        }
        else if (that.view.state === Mario.Constants.STARTED) {
          var currentPill = that.view.game.currentPill();
          currentPill.userMove(dir);
        }
      });
    });

    key("space", this.handleSpace.bind(this));
  };

  KeyHandler.prototype.handleSpace = function () {
    var view = this.view;
    var game = view.game;

    if (view.state === Mario.Constants.OVER) {
      view.resetGame();
    }
    else {
      switch (view.state) {
        case Mario.Constants.MENU:
          view.state = Mario.Constants.STARTED;
          break;
        case Mario.Constants.STARTED:
          view.state = Mario.Constants.PAUSED;
          break;
        case Mario.Constants.PAUSED:
          view.state = Mario.Constants.STARTED;
          break;
      }

      view.curtain.toggle();
      game.toggle();
    }
  };


})();
