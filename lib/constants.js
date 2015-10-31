(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Constants = Mario.Constants = function() {};

  var width = Mario.Constants.CANVAS_WIDTH = 320;
  var height = Mario.Constants.CANVAS_HEIGHT = 640;
  var wide = Mario.Constants.NUM_SQUARES_WIDE = 8;
  var tall = Mario.Constants.NUM_SQUARES_TALL = 16;

  Mario.Constants.SQUARE_LENGTH = width / wide;

})();
