(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }
  
  var Curtain = Mario.Curtain = function () {
    this.opacity = 1;
  };

  Curtain.prototype.draw = function (ctx) {
    ctx.fillStyle = 'rgba(0,0,0,' + this.opacity + ')';
    ctx.fillRect(0, 0, Mario.Constants.CANVAS_WIDTH, Mario.Constants.CANVAS_HEIGHT);
  };

  Curtain.prototype.raiseCurtain = function () {
    this.opacity = 0;
  };

  Curtain.prototype.lowerCurtain = function () {
    this.opacity = 1;
  };

  Curtain.prototype.fadeCurtain = function () {
    this.opacity += 0.01;
  };

  Curtain.prototype.toggle = function () {
    if (this.opacity < 0.01) {
      this.opacity = 1;
    }
    else {
      this.opacity = 0;
    }
  };

})();
