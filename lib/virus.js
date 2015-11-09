(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Virus = Mario.Virus = function (options) {
    this.color = options.color || Mario.Util.randomColor();
    this.pos = [3,7];
    this.frame = 0;
  };

  Virus.prototype.move = function () {
    this.frame = (this.frame + 1) % 2;
  };

  Virus.prototype.draw = function (ctx) {
    var img = drMarioSprites;
    var color = this.color;
    var frame = this.frame;
    var v = Mario.Constants.viruses;
    var size = Mario.Constants.VIRUS_SIZE;
    var scale = Mario.Constants.SCALE;

    ctx.drawImage(
      img, v[color][frame][0], v[color][frame][1],
      size, size, 0, 0, scale*size, scale*size
    );
  };
})();
