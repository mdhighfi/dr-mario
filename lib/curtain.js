(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Curtain = Mario.Curtain = function () {
    this.down = true;
    this.opacity = 1;
  };

  Curtain.prototype.draw = function (ctx) {
    if (this.down) {
      ctx.fillStyle = 'rgba(0,0,0,' + this.opacity + ')';
      ctx.fillRect(0, 0, Mario.Constants.CANVAS_WIDTH, Mario.Constants.CANVAS_HEIGHT);
    }
  };

})();
