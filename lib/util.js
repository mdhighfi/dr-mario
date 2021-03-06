(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Util = Mario.Util = {};

  Util.randomColor = function() {
    var num = Math.random();
    if (num < 0.3333) {
      return Mario.Constants.YELLOW;
    } else if (num < 0.6666) {
      return Mario.Constants.RED;
    } else {
      return Mario.Constants.BLUE;
    }
  };

  Util.randomPillType = function() {
    return Math.floor(Math.random() * 9);
  };

  Util.isMixed = function(num) {
    return (num > 2);
  };

  Util.includesCoords = function(arr, coords) {
    includes = false;
    arr.forEach(function(el) {
      if (coords[0] === el[0] && coords[1] === el[1]) {
        includes = true;
      }
    });
    return includes;
  };

  Util.randomPosition = function(used) {
    var scale = Mario.Constants.SCALE * Mario.Constants.SQUARE_LENGTH;
    var top = Mario.Constants.VIRUS_DIST_FROM_TOP;
    var width =
      Math.floor(
        Math.random() *
        Mario.Constants.CANVAS_WIDTH /
        scale
      );
    var height =
      Math.floor(
        Math.random() *
        (Mario.Constants.CANVAS_HEIGHT - top * scale) /
        scale
      );
    var pos = [width * scale, (height + top) * scale];
    if (this.includesCoords(used, pos)) {
      return this.randomPosition(used);
    }
    return pos;
  };

  Util.gridLocation = function(coords) {
    var scale = Mario.Constants.SCALE * Mario.Constants.SQUARE_LENGTH;
    return [Math.floor(coords[0]/scale), Math.floor(coords[1]/scale)];
  };

  Util.pixelLocation = function(coords) {
    var scale = Mario.Constants.SCALE * Mario.Constants.SQUARE_LENGTH;
    return [Math.floor(coords[0]*scale), Math.floor(coords[1]*scale)];
  };

  var inherits = Util.inherits = function (ChildClass, BaseClass) {
    function Surrogate () { this.constructor = ChildClass; }
    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Util.getLandPos = function(gridPos) {

  };

  Util.moveOneDown = function(gridPos) {
    return [gridPos[0], gridPos[1] + 1];
  };

  Util.moveOneUp = function(gridPos) {
    return [gridPos[0], gridPos[1] - 1];
  };

  Util.moveOneLeft = function(gridPos) {
    return [gridPos[0] - 1, gridPos[1]];
  };

  Util.moveOneRight = function(gridPos) {
    return [gridPos[0] + 1, gridPos[1]];
  };
})();
