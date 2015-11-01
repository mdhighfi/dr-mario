(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Pill = Mario.Pill = function (options) {
    this.leftColor = options.leftColor || Mario.Util.randomColor();
    this.rightColor = options.rightColor || Mario.Util.randomColor();
    this.pos = [3,0];
  };

  Pill.prototype.draw = function (ctx) {
    var length = Mario.Constants.SQUARE_LENGTH

    // refactor to half-pill object
    ctx.fillStyle = this.leftColor;
    ctx.fillRect (this.pos[0]*length, this.pos[1]*length, length, length);

    // refactor to half-pill object
    ctx.fillStyle = this.rightColor;
    ctx.fillRect ((this.pos[0]+1)*length, this.pos[1]*length, length, length);
  };
})();
