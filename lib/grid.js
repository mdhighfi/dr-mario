(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Grid = Mario.Grid = function() {
    this.squares = [];
    var empty = Mario.Constants.EMPTY;
    var emptyRow = [];
    var row, col;
    for (col = 0; col < Mario.Constants.NUM_SQUARES_WIDE; col++) {
      emptyRow = emptyRow.concat([empty]);
    }
    for (row = 0; row < Mario.Constants.NUM_SQUARES_TALL; row++) {
      this.squares = this.squares.concat([[emptyRow]]);
    }
  };

  Grid.prototype.inBounds = function(gridPos) {
    return (gridPos[0] > -1 && gridPos[0] < Mario.Constants.NUM_SQUARES_WIDE &&
            gridPos[1] > -1 && gridPos[1] < Mario.Constants.NUM_SQUARES_TALL);
  };

  Grid.prototype.sameColor = function(pos1, pos2) {
    return (
      this.squares[pos1[0]][pos1[1]] ===
      this.squares[pos2[0]][pos2[1]]
    );
  };

  Grid.prototype.isEmpty = function(pos) {
    return (!this.squares[pos[0]][pos[1]]);
  };

  Grid.prototype.furthestColorInARow = function(start, direction) {
    var pos = start;
    while (this.inBounds(pos) && this.sameColor(start, pos)) {
      pos[0] += direction[0];
      pos[1] += direction[1];
    }
    return ([pos[0]-direction[0], pos[1]-direction[1]]);
    };

  Grid.prototype.findObjectsToDestroy = function(start) {
    var squaresToDestroy = [];
    var directions = {
      up: [0, 1],
      down: [0, -1],
      left: [-1, 0],
      right: [1, 0]
    };
    var vStart = this.furthestColorInARow(start, directions.up);
    var vEnd = this.furthestColorInARow(start, directions.down);
    var hStart = this.furthestColorInARow(start, directions.left);
    var hEnd = this.furthestColorInARow(start, directions.right);
    var i;
    var vertical = [];
    var horizontal = [];
    for (i = vStart; i <= vEnd; i++) {
      vertical.concat([start[0], i]);
    }
    for (i = hStart; i <= hEnd; i++) {
      horizontal.concat([i, start[1]]);
    }
    if (vertical.length > 3) {
      squaresToDestroy.concat(vertical);
    }
    if (horizontal.length > 3) {
      squaresToDestroy.concat(horizontal);
    }
    return squaresToDestroy;
  };

  Grid.prototype.furthestEmptyBelow = function(gridPos) {
    var furthestEmpty = gridPos;
    var grid = this;
    var util = Mario.Util;
    var posToCheck = util.moveOneDown(gridPos);
    while ( grid.isEmpty(posToCheck) && (grid.inBounds(posToCheck)) ){
      var posToCheck = util.moveOneDown(gridPos);
    }
    return util.moveOneUp(furthestEmpty)
  };
})();
