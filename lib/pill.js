(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Pill = Mario.Pill = function (options) {
    var leftColor = options.leftColor || Mario.Util.randomColor();
    var rightColor = options.rightColor || Mario.Util.randomColor();
    this.color = [leftColor, rightColor];
    this.pos = [0,0];
    this.gridPos = Mario.Util.gridLocation(this.pos);;
    this.vel = 3;
  };

  Pill.prototype.draw = function (ctx) {
    var pill = this;
    var color = this.color;
    var p = Mario.Constants.pills;
    var width = Mario.Constants.PILL_WIDTH;
    var height = Mario.Constants.PILL_HEIGHT;
    var scale = Mario.Constants.SCALE;

    ctx.drawImage(
      drMarioSprites, p[0][0][0], p[0][0][1],
      width, height, pill.pos[0], pill.pos[1], scale*width, scale*height
    );
  };

  Pill.prototype.move = function () {
    this.pos = [this.pos[0], this.pos[1] + this.vel];
    this.gridPos = Mario.Util.gridLocation(this.pos);
  };

  Pill.prototype.moveRight = function () {
    this.left.moveRight();
    this.right.moveRight();
  };

  Pill.prototype.moveLeft = function () {
    this.left.moveLeft();
    this.right.moveLeft();
  };
})();
