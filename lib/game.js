(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Game = Mario.Game = function () {
    this.viruses = [];
    this.pills = [];

    var testPill = new Mario.Pill({});
    this.pills = this.pills.concat(testPill);
  };

  Game.prototype.initializeGrid = function() {
    var grid = [];
    for (var i = 0; i < Mario.Constants.NUM_SQUARES_WIDE; i++) {
      for (var j = 0; i < Mario.Constants.NUM_SQUARES_TALL; j++) {
        grid.concat();
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkLanded();
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.viruses, this.pills);
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.checkLanded = function () {
    var that = this;
    var objects = this.allObjects();
    var currentPill = this.pills[this.pills.length -1];
    objects.forEach(function(object) {
      if (currentPill.pos[0] === object.pos[0] &&
        currentPill.pos[1] + Mario.Constants.SCALE * Mario.Constants.SQUARE_LENGTH === object.pos[1]) {
        currentPill.vel = 0;
        var gridPos = currentPill.gridPos = Util.gridLocation(currentPill.pos);
        that.grid[gridPos[0]][gridPos[1]] = currentPill.leftColor;
        that.pills = that.pills.concat(nextPill);
        
        var nextPill = new Mario.Pill({});
      }
    });
    this.checkFourInARow();
  };

  Game.prototype.checkFourInARow = function () {

  };

  Game.prototype.addViruses = function () {
    var num = Mario.Constants.NUM_VIRUSES;
    var virus;
    for (var i = 0; i < num; i++) {
      virus = new Mario.Virus({});
      this.viruses = this.viruses.concat([virus]);
    }
    this.grid = initializeGrid();
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
