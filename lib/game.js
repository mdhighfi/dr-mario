(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Game = Mario.Game = function () {
    this.viruses = [];
    this.pills = [];

    var testPill = new Mario.Pill({});
    this.pills.concat(testPill);

    this.addViruses();
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkLanded();
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.viruses, this.pills);
  };

  Game.prototype.moveObjects = function () {

  };

  Game.prototype.checkLanded = function () {
    this.checkFourInARow();
  };

  Game.prototype.checkFourInARow = function () {

  };

  Game.prototype.addViruses = function () {

  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Mario.Constants.CANVAS_WIDTH, Mario.Constants.CANVAS_HEIGHT);
    ctx.fillStyle = Mario.Constants.BG_COLOR;
    ctx.fillRect(0, 0, Mario.Constants.CANVAS_WIDTH, Mario.Constants.CANVAS_HEIGHT);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };
})();
