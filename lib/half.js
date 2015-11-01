(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Half = Mario.Half = function (options) {
    this.color = options.color || Mario.Util.randomColor();
    this.pos = options.pos || [3,0];
    this.vel = options.vel || .03;
  };

  Half.prototype.draw = function (ctx) {
    var length = Mario.Constants.SQUARE_LENGTH

    ctx.fillStyle = this.color;
    ctx.fillRect (this.pos[0]*length, this.pos[1]*length, length, length);
  };

  Half.prototype.move = function () {
    this.pos = [this.pos[0], this.pos[1] + this.vel];
  };

  Half.prototype.moveRight = function () {
    this.pos = [
      this.pos[0] + Mario.Constants.SQUARE_LENGTH,
      this.pos[1] + this.vel
    ];
  };

  Half.prototype.moveLeft = function () {
    this.pos = [
      this.pos[0] - Mario.Constants.SQUARE_LENGTH,
      this.pos[1] + this.vel
    ];
  };
})();
