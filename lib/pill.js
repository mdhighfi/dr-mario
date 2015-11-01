(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Pill = Mario.Pill = function (options) {
    this.leftColor = options.leftColor || Mario.Util.randomColor();
    this.rightColor = options.rightColor || Mario.Util.randomColor();
  };

  Pill.prototype.draw = function (ctx) {
    var length = Mario.Constants.SQUARE_LENGTH

    ctx.fillStyle = this.leftColor;
    ctx.fillRect (2*length, 5*length, length, length);

    ctx.fillStyle = this.rightColor;
    ctx.fillRect (3*length, 5*length, length, length);
  };
})();
