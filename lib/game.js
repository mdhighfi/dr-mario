(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Game = Mario.Game = function () {
    this.viruses = [];
    this.pills = [];
    this.destroyedObjects = [];
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
    return [].concat(this.viruses, this.pills, this.destroyedObjects);
  };

  Game.prototype.step = function () {
    var currentPill = this.pills[this.pills.length -1];
    var deltaY = currentPill.gridPos[1];
    this.moveObjects();
    deltaY -= currentPill.gridPos[1];
    if (deltaY) {
      this.destroyedObjects = [];
      var that = this;
      var objects = this.allObjects();
      objects.forEach(function(object) {
        if (that.pillLandedOn(object)) {
          that.stopPill(currentPill);
          that.destroyAnyFoursInARow(currentPill);
          that.pills = that.pills.concat(new Mario.Pill({}));
        }
      });
    }
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };


  Game.prototype.stopPill = function (currentPill) {
    currentPill.vel = 0;
    var gridPos = currentPill.gridPos;
    this.grid.squares[gridPos[0]][gridPos[1]] = currentPill.leftColor;
    this.grid.squares[gridPos[0] + 1][gridPos[1]] = currentPill.rightColor;
  };

  Game.prototype.pillLandedOn = function(object) {
    var landCondition = true;
    var currentPill = this.pills[this.pills.length -1];
    var square = Mario.Constants.SCALE * Mario.Constants.SQUARE_LENGTH;
    landCondition = (
      currentPill.gridPos[1] + 1 === Mario.Constants.NUM_SQUARES_TALL ||
      (currentPill.pos[0] === object.pos[0] ||
      currentPill.pos[0] + square === object.pos[0]) &&
      currentPill.pos[1] + square === object.pos[1]
    );
    return landCondition;
  };

  Game.prototype.destroyAnyFoursInARow = function(currentPill) {
    var gridPos = currentPill.gridPos;
    var objectsToDestroy = this.grid.findObjectsToDestroy(gridPos);
    objectsToDestroy.concat(
      this.grid.findObjectsToDestroy([gridPos[0]+1, gridPos[1]])
    );
    this.destroyedObjects.concat(objectsToDestroy);
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
