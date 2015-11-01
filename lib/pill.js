(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Pill = Mario.Pill = function (options) {
    var leftColor = options.leftColor || Mario.Util.randomColor();
    var rightColor = options.rightColor || Mario.Util.randomColor();
    var pos = [3,0];
    var vel = .03;

    this.left = new Mario.Half({
      pos: pos,
      vel: vel,
      color: leftColor
    })

    this.right = new Mario.Half({
      pos: [pos[0] + 1, pos[1]],
      vel: vel,
      color: rightColor
    })
  };

  Pill.prototype.draw = function (ctx) {
    this.left.draw(ctx);
    this.right.draw(ctx);
  };

  Pill.prototype.move = function () {
    this.left.move();
    this.right.move();
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
