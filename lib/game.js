(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Game = Mario.Game = function (view) {
    this.view = view;
    this.viruses = [];
    this.pills = [];
    this.destroyedObjects = [];
    this.grid = new Mario.Grid();
    this.running = false;
    this.tickID = null;

    var testPill = new Mario.Pill({});
    this.pills = this.pills.concat(testPill);
    this.addViruses();
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
    virus = new Mario.Virus({pos: [72, 96]});
    this.viruses = this.viruses.concat([virus]);
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
    if (currentPill.vel === 0) {
      currentPill = new Mario.Pill({});
      this.pills = this.pills.concat(currentPill);
    }
    var deltaY = currentPill.gridPos[1];
    this.moveObjects();
    deltaY -= currentPill.gridPos[1];
    if (deltaY || currentPill.gridPos[1] === 0) {
      this.destroyedObjects = [];
      var that = this;
      var objects = this.allObjects();
      var overlap = false;
      objects.forEach(function(object) {
        if (that.pillLandedOn(object)) {
          that.destroyAnyFoursInARow(currentPill);
          if (that.pillOverlaps(currentPill, object)) {
            that.view.state = Mario.Constants.OVER;
          }
          that.stopPill(currentPill);

        }
      });
    }
  };

  Game.prototype.pillOverlaps = function (currentPill, object) {
    return (
      (
        currentPill.gridPos[1] === 0
      ) &&
      (
        currentPill.gridPos[0] ===
        Math.floor(Mario.Constants.NUM_SQUARES_WIDE / 2) ||
        currentPill.gridPos[0] ===
        Math.floor(Mario.Constants.NUM_SQUARES_WIDE / 2) - 1
      )
    )
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
      currentPill.pos[1] < object.pos[1] &&
      currentPill.pos[1] + square >= object.pos[1]
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
    if (this.running) {

    }
    else if (this.gameState.started) {
      ctx.clearRect(0, 0, Mario.Constants.CANVAS_WIDTH, Mario.Constants.CANVAS_HEIGHT);
      ctx.fillStyle = Mario.Constants.BG_COLOR;
      ctx.fillRect(0, 0, Mario.Constants.CANVAS_WIDTH, Mario.Constants.CANVAS_HEIGHT);

      this.allObjects().forEach(function (object) {
        object.draw(ctx);
      });
    } else {
      this.setMessageStyle(ctx, 18);
      ctx.fillText("space - play/pause", 10, 100);
      ctx.fillText("j - move left", 10, 150);
      ctx.fillText("k - move right", 10, 200);
    }
  };

  Game.prototype.setMessageStyle = function (ctx, fontSize) {
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(0, 0, Mario.Constants.CANVAS_WIDTH, Mario.Constants.CANVAS_HEIGHT);
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.font = String(fontSize) + "px serif";
  };

  Game.prototype.handleSpace = function () {
    if (this.gameState.started) {
      this.pause();
    }
    else {
      debugger;
      this.startGame();
    }
  };

  Game.prototype.startGame = function () {
    this.viruses = [];
    this.pills = [];
    this.destroyedObjects = [];
    this.grid = new Mario.Grid();
    this.gameState = {
      started: false,
      paused: false,
      over: false
    }
    this.tickID = null;

    var testPill = new Mario.Pill({});
    this.pills = this.pills.concat(testPill);
    this.addViruses();

    this.tickID = setInterval(
      this.step.bind(this), 1000 / Mario.Constants.TICK_RATE
    );
    this.gameState.started = true;
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
    this.gameState.paused = false;
    this.gameState.over = true;
    this.tickID = clearInterval(this.tickID);
  };
})();
