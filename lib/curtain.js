(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var PAUSE_OPACITY = 0.8;

  var Curtain = Mario.Curtain = function () {
    this.opacity = 1;
  };

  Curtain.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Mario.Constants.CANVAS_WIDTH, Mario.Constants.CANVAS_HEIGHT);
    ctx.fillStyle = 'rgba(0,0,0,' + this.opacity + ')';
    ctx.fillRect(0, 0, Mario.Constants.CANVAS_WIDTH, Mario.Constants.CANVAS_HEIGHT);
  };

  Curtain.prototype.raiseCurtain = function () {
    this.opacity = 0;
  };

  Curtain.prototype.lowerCurtain = function () {
    var opacity = 1;
    if (pause) {
      opacity = PAUSE_OPACITY;
    }
    this.opacity = opacity;
  };

  Curtain.prototype.toggle = function () {
    if (this.opacity < 0.1) {
      this.opacity = 1;
    }
    else {
      this.opacity = 0;
    }
  };

})();
