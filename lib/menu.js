(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }


  var Menu = Mario.Menu = function () {
    this.over = false;
  };

  Menu.prototype.draw = function (ctx) {
    var message;
    this.setMessageStyle(ctx);
    if (this.over) {
      message = "Game Over";
      ctx.font = "32px serif";
      ctx.fillText(message, 10, 50);
      ctx.font = "18px serif";
      window.setTimeout(function() {
        ctx.fillText("(Press Space)", 10, 400);
      }, 1000);
    }
    else {
      message = "Pause";
      ctx.font = "18px serif";
    }
    this.over = !this.over;
  };

  Menu.prototype.setMessageStyle = function (ctx) {
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(0, 0, Mario.Constants.CANVAS_WIDTH, Mario.Constants.CANVAS_HEIGHT);
    ctx.fillStyle = 'rgba(255,255,255,1)';
  };


})();
