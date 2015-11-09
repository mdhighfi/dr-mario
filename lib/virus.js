(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var positions = [];

  var Virus = Mario.Virus = function (options) {
    this.color = options.color || Mario.Util.randomColor();
    this.pos = Mario.Util.randomPosition(positions);
    this.frame = 0;
    this.frameTick = 0;

    positions = positions.concat([this.pos]);
  };


  Virus.prototype.move = function () {
    this.frameTick++;
    if (this.frameTick == Mario.Constants.VIRUS_MOVE_SPEED) {
      this.frame = (this.frame + 1) % 2;
      this.frameTick = 0;
    }
  };

  Virus.prototype.draw = function (ctx) {
    var virus = this;
    var img = drMarioSprites;
    var color = this.color;
    var frame = this.frame;
    var v = Mario.Constants.viruses;
    var size = Mario.Constants.VIRUS_SIZE;
    var scale = Mario.Constants.SCALE;

    ctx.drawImage(
      img, v[color][frame][0], v[color][frame][1],
      size, size, virus.pos[0], virus.pos[1], scale*size, scale*size
    );
  };
})();
