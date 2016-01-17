(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Game = Mario.Game = function (view) {
    this.view = view;
    var grid = this.grid = new Mario.Grid();

    this.viruses = [];
    this.pills = [];
    this.destroyedObjects = [];
    this.running = false;
    this.tickID = null;

    var testPill = new Mario.Pill({});
    this.pills = this.pills.concat(testPill);
    this.addViruses();

    this.landPos = grid.furthestEmptyBelow(testPill.gridPos);
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

  Game.prototype.currentPill = function () {
    return this.pills[this.pills.length -1];
  };

// see if pill is one step (non-grid) past landPos
// then stop
  Game.prototype.step = function () {
    var currentPill = this.currentPill();
    this.moveObjects();
    if (currentPill.vel === 0) {
      currentPill = new Mario.Pill({});
      this.pills = this.pills.concat(currentPill);
    }
    else if (currentPill.gridPos[1] >= this.landPos[1]) {
      this.stopPill(currentPill);
      var pixelLand = Mario.Util.pixelLocation(this.landPos);
      currentPill.setPos(pixelLand);
      if (currentPill.isWherePillsStartFalling()) {
        this.endGame();
      }
    }
    this.landPos = this.findLandPos();
  };

  Game.prototype.findLandPos = function () {
    var util = Mario.Util;
    var currentPill = this.currentPill();
    var left, right, bottom;
    var empty1, empty2;
    left = currentPill.gridPos;
    if (currentPill.isVertical()) {
      bottom = util.moveOneDown(left);
      empty1 = empty2 = this.grid.furthestEmptyBelow(bottom);
    }
    else {
      right = util.moveOneRight(left);
      empty1 = this.grid.furthestEmptyBelow(left);
      empty2 = this.grid.furthestEmptyBelow(right);
    }
    if (empty1[1] > empty2[1]) {
      return [left[0], empty2[1]];
    } else {
      return [left[0], empty1[1]];
    }
  };

  Game.prototype.pillOverlaps = function (currentPill, otherPill) {
    return (
      currentPill.justStartedFalling() &&
      otherPill.isWherePillsStartFalling()
    );
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };


  Game.prototype.stopPill = function (currentPill) {
    currentPill.stopPill();
    var gridPos = currentPill.gridPos;
    this.grid.squares[gridPos[0]][gridPos[1]] = currentPill.leftColor;
    this.grid.squares[gridPos[0] + 1][gridPos[1]] = currentPill.rightColor;
  };

  Game.prototype.pillLandedOn = function(object) {
    var landCondition = true;
    var currentPill = this.currentPill();
    var square = Mario.Constants.SCALE * Mario.Constants.SQUARE_LENGTH;
    landCondition = (
      this.atTheBottom(currentPill) ||
      (
        (
          (object instanceof Mario.Pill) &&
          (currentPill.pos[0] === object.pos[0] + square)
        ) ||
        (
          currentPill.pos[0] === object.pos[0] ||
          currentPill.pos[0] + square === object.pos[0]
        )
      ) &&
      (
        currentPill.pos[1] < object.pos[1] &&
        currentPill.pos[1] + square >= object.pos[1]
      )
    );
    return landCondition;
  };

  Game.prototype.atTheBottom = function(currentPill) {
    return (currentPill.gridPos[1] + 1 >= Mario.Constants.NUM_SQUARES_TALL);
  };

  Game.prototype.destroyAnyFoursInARow = function(currentPill) {
    var gridPos = currentPill.gridPos;
    var objectsToDestroy = [];
    // var objectsToDestroy = this.grid.findObjectsToDestroy(gridPos);
    // objectsToDestroy.concat(
    //   this.grid.findObjectsToDestroy([gridPos[0]+1, gridPos[1]])
    // );
    this.destroyedObjects.concat(objectsToDestroy);
  };

  Game.prototype.draw = function (ctx) {
    if (this.running) {
      ctx.clearRect(0, 0, Mario.Constants.CANVAS_WIDTH, Mario.Constants.CANVAS_HEIGHT);
      ctx.fillStyle = Mario.Constants.BG_COLOR;
      ctx.fillRect(0, 0, Mario.Constants.CANVAS_WIDTH, Mario.Constants.CANVAS_HEIGHT);

      this.allObjects().forEach(function (object) {
        object.draw(ctx);
      });
    }
  };

  Game.prototype.toggle = function () {
    if (this.running) {
      this.tickID = clearInterval(this.tickID);
    }
    else {
      this.tickID = setInterval(
        this.step.bind(this), 1000 / Mario.Constants.TICK_RATE
      );
    }
    this.running = !this.running;
  };

  Game.prototype.endGame = function () {
    var that = this;
    this.step();
    this.toggle();
    setTimeout(function() {
      that.view.state = Mario.Constants.OVER;
    }, 500);
  };
})();
