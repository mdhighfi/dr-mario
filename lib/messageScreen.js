(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var MESSAGES = {};
  MESSAGES[Mario.Constants.MENU] = 'Dr. Mario';
  MESSAGES[Mario.Constants.PAUSED] = 'Pause';
  MESSAGES[Mario.Constants.OVER] = 'Game Over';

  var Message = Mario.MessageScreen = function () {
    this.menu = new Mario.Menu();
    this.on = false;
    this.menuOn = true;
    this.message = 0;
  };

  Message.prototype.draw = function (ctx, msg) {
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.font = "32px serif";
    if (this.on) {
      ctx.fillText(MESSAGES[msg], 10, 50);
    }
    if (this.menuOn) {
      this.menu.draw(ctx);
    }
  };

  Message.prototype.toggle = function (ctx) {
    this.on = !this.on;
    if (this.on) {
      this.next();
    }
  };

  Message.prototype.next = function (ctx) {
    this.message++;
    this.message %= 3;
  };

})();
