(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Game = Mario.Game = function () {
    this.viruses = [];
    this.pills = [];
    this.grid = new Mario.Grid();

    var testPill = new Mario.Pill({});
    this.pills = this.pills.concat(testPill);
  };

  Game.prototype.addVirusesToGrid = function() {
    var squares = this.grid.squares;
    var virus;
    for (i = 0; i < this.viruses.length; i++) {
      virus = this.viruses[i];
      squares[virus.gridPos[0]][virus.gridPos[1]] = virus.color;
    }
  };

  Game.prototype.addViruses = function () {
    var num = Mario.Constants.NUM_VIRUSES;
    var virus;
    for (var i = 0; i < num; i++) {
      virus = new Mario.Virus({});
      this.viruses = this.viruses.concat([virus]);
    }
    this.addVirusesToGrid();
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.viruses, this.pills);
  };

  Game.prototype.step = function () {
    this.moveObjects();
    if (this.pillIsLanded()) {
      this.stopPill();
      this.destroyAnyFoursInARow();
      this.generateNewPill();
    }
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.pillIsLanded = function() {
    var landCondition = true;
    landCondition = ((currentPill.pos[0] === object.pos[0] || currentPill.pos[0] === object.pos[0]) &&
      currentPill.pos[1] + Mario.Constants.SCALE * Mario.Constants.SQUARE_LENGTH === object.pos[1])
    return landCondition;
  };

  Game.prototype.stopPill = function () {
    var that = this;
    var objects = this.allObjects();
    var currentPill = this.pills[this.pills.length -1];
    objects.forEach(function(object) {
      if (this.isLanded()) {
        currentPill.vel = 0;
        var gridPos = currentPill.gridPos = Mario.Util.gridLocation(currentPill.pos);
        that.grid.squares[gridPos[0]][gridPos[1]] = currentPill.leftColor;
        that.grid.squares[gridPos[0] + 1][gridPos[1]] = currentPill.rightColor;
        that.pills = that.pills.concat(nextPill);
        debugger;
        var nextPill = new Mario.Pill({});
      }
    });
    this.checkFourInARow();
  };

  Game.prototype.destroyAnyFoursInARow = function() {
    var currentPill = this.pills[this.pills.length -1];
    var gridPos = currentPill.gridPos = Mario.Util.gridLocation(currentPill.pos);
    var objectsToDestroy = this.grid.findObjectsToDestroy(gridPos);
    objectsToDestroy.concat(this.grid.findObjectsToDestroy([gridPos[0]+1, gridPos[1]]));
    debugger;
  };

  Game.prototype.checkFourInARow = function () {

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
