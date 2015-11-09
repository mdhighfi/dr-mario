(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Util = Mario.Util = {};

  Util.randomColor = function() {
    var num = Math.random();
    if (num < .3333) {
      return Mario.Constants.YELLOW;
    } else if (num < .6666) {
      return Mario.Constants.RED;
    } else {
      return Mario.Constants.BLUE;
    }
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
  }

  var inherits = Util.inherits = function (ChildClass, BaseClass) {
    function Surrogate () { this.constructor = ChildClass };
    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  };
})();
