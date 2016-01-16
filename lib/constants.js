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
  Mario.Constants.NUM_VIRUSES = 2;
  Mario.Constants.VIRUS_DIST_FROM_TOP = 3;
  Mario.Constants.VIRUS_SIZE = 7;
  Mario.Constants.PILL_WIDTH = 16;
  Mario.Constants.PILL_HEIGHT = 8;
  Mario.Constants.DESTROYED_SIZE = 9;

  // timing and speed
  Mario.Constants.FPS = 30;
  Mario.Constants.TICK_RATE = 30;
  Mario.Constants.VIRUS_MOVE_SPEED = 5;

  // colors
  Mario.Constants.BG_COLOR = '#000';
  Mario.Constants.BLUE = 0;
  Mario.Constants.RED = 1;
  Mario.Constants.YELLOW = 2;
  Mario.Constants.EMPTY = 3;
  Mario.Constants.COLORS = ['blue', 'red', 'yellow'];

  // game state
  Mario.Constants.MENU = "MENU";
  Mario.Constants.STARTED = "STARTED";
  Mario.Constants.PAUSED = "PAUSED";
  Mario.Constants.OVER = "OVER";
  Mario.Constants.GAME_DISPLAY = 0;
  Mario.Constants.MENU_DISPLAY = 1;

  // sprites
  Mario.Constants.viruses =
  [
    [[239, 46], [239, 66]], // blue
    [[239, 86], [239, 106]], // red
    [[239, 126], [239, 146]] // yellow
  ];

  Mario.Constants.pills = // 0, 90, 180, 270 degrees, respectively
  [
    [[255, 56], [283, 52], [255, 56], [283, 52]], // blue
    [[255, 96], [283, 92], [255, 96], [283, 92]], // red
    [[255, 136], [283, 132], [255, 136], [283, 132]], // yellow
    [[300, 36], [324, 32], [340, 36], [364, 32]], // blue / yellow
    [[300, 76], [324, 72], [340, 76], [364, 72]], // red / blue
    [[300, 116], [324, 112], [340, 116], [364, 112]], // red / yellow
    [[340, 36], [364, 32], [300, 36], [324, 32]], // yellow / blue
    [[340, 76], [364, 72], [300, 76], [324, 72]], // blue / red
    [[340, 116], [364, 112], [300, 116], [324, 112]], // yellow / red
  ];

  Mario.Constants.destroyed =
  [
    [283, 76], // blue
    [283, 116], // red
    [300, 132] // yellow
  ];


})();
