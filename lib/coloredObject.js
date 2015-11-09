(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var ColoredObject = Mario.ColoredObject = function (options) {
    this.color = options.color || Mario.Util.randomColor();
    this.pos = options.pos || [3,0];
    this.vel = options.vel || 0;
  };

})();
