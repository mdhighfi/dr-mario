(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Constants = Mario.Constants = function() {};

  // sizes and amounts
  // var width = Mario.Constants.CANVAS_WIDTH = 296;
  // var height = Mario.Constants.CANVAS_HEIGHT = 592;
  var wide = Mario.Constants.NUM_SQUARES_WIDE = 8;
  var tall = Mario.Constants.NUM_SQUARES_TALL = 16;
  var slen = Mario.Constants.SQUARE_LENGTH = 8;
  var scale = Mario.Constants.SCALE = 3;
  var width = Mario.Constants.CANVAS_WIDTH = wide * scale * slen;
  var height = Mario.Constants.CANVAS_HEIGHT = tall * scale * slen;
  Mario.Constants.NUM_VIRUSES = 84;
  Mario.Constants.VIRUS_DIST_FROM_TOP = 2;

  // timing and speed
  Mario.Constants.FPS = 30;
  Mario.Constants.VIRUS_MOVE_SPEED = 5;

  // colors
  Mario.Constants.BG_COLOR = '#000';
  // Mario.Constants.YELLOW = '#CC0';
  // Mario.Constants.RED = '#C00';
  // Mario.Constants.BLUE = '#00C';
  Mario.Constants.BLUE = 0;
  Mario.Constants.RED = 1;
  Mario.Constants.YELLOW = 2;

  Mario.Constants.COLORS = ['blue', 'red', 'yellow'];

  // sprites
  Mario.Constants.viruses =
  [
    [[239, 46], [239, 66]], // blue
    [[239, 86], [239, 106]], // red
    [[239, 126], [239, 146]] // yellow
  ];

  Mario.Constants.VIRUS_SIZE = 7;

})();
