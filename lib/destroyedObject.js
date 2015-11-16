(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var DestroyedObject = Mario.DestroyedObject = function (options) {
    this.color = options.color;
    this.pos = options.pos;
    this.vel = 0;
  };


  DestroyedObject.prototype.draw = function (ctx) {
    var color = this.color;
    var d = Mario.Constants.destroyed;
    var width = Mario.Constants.DESTROYED_SIZE;
    var height = Mario.Constants.DESTROYED_SIZE;
    var scale = Mario.Constants.SCALE;

    ctx.drawImage(
      drMarioSprites, d[0][0], d[0][1],
      width, height, this.pos[0], this.pos[1], scale*width, scale*height
    );
  };

})();
