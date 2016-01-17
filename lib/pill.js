(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Pill = Mario.Pill = function (options) {
    var middle = (
      Math.floor( (Mario.Constants.NUM_SQUARES_WIDE - 1) / 2) *
      Mario.Constants.SCALE *
      Mario.Constants.SQUARE_LENGTH / 2
    );
    this.imageSet = Mario.Constants.pills[Mario.Util.randomPillType()];
    this.orientation = 0;
    this.pos = [24*3,-24];
    this.gridPos = Mario.Util.gridLocation(this.pos);
    this.vel = 2;
  };

  Pill.prototype.setPos = function (pos) {
    this.pos = pos;
  };

  Pill.prototype.draw = function (ctx) {
    var pill = this;
    var image = this.imageSet[this.orientation];
    var width = Mario.Constants.PILL_WIDTH;
    var height = Mario.Constants.PILL_HEIGHT;
    var scale = Mario.Constants.SCALE;
    if (this.isVertical()) {
      var temp = width;
      width = height;
      height = temp;
    }

    ctx.drawImage(
      drMarioSprites, image[0], image[1],
      width, height, pill.pos[0], pill.pos[1], scale*width, scale*height
    );
  };

  Pill.prototype.isVertical = function () {
    return (this.orientation % 2)
  };

  Pill.prototype.move = function () {
    this.pos = [this.pos[0], this.pos[1] + this.vel];
    this.gridPos = Mario.Util.gridLocation(this.pos);
  };

  Pill.prototype.rotate = function (dir) {
    var scale = Mario.Constants.SCALE * Mario.Constants.SQUARE_LENGTH;
    var orientation = 4 + this.orientation + dir;
    orientation %= 4;
    this.orientation = orientation;
    if (this.isVertical()) {
      this.pos = [this.pos[0], this.pos[1] - scale];
      this.gridPos -= 1;
    }
    else {
      this.pos = [this.pos[0], this.pos[1] + scale];
      this.gridPos += 1;
    }
  };

  Pill.prototype.stopPill = function () {
    this.vel = 0;
    this.gridPos = Mario.Util.gridLocation(this.pos);
    this.pos = this.normalizedPosition(this.pos);
  };

  Pill.prototype.normalizedPosition = function () {
    return Mario.Util.pixelLocation(this.gridPos);
  };

  Pill.prototype.userMove = function (dir) {
    var scale = Mario.Constants.SCALE * Mario.Constants.SQUARE_LENGTH;
    this.pos = [this.pos[0] + dir[0]*scale, this.pos[1]]
    if (dir[1] > 0 && this.vel < 15) {
      this.vel *= 5;
    }
    this.gridPos = Mario.Util.gridLocation(this.pos);
  };

  Pill.prototype.justStartedFalling = function () {
    return (this.gridPos[1] === 0)
  };

  Pill.prototype.isWherePillsStartFalling = function () {
    var halfWay = Math.floor(Mario.Constants.NUM_SQUARES_WIDE / 2);
    return (
      (this.gridPos[1] === 0) &&
      (this.gridPos[0] === halfWay || this.gridPos[0] === halfWay - 1)
    );
  };
})();
