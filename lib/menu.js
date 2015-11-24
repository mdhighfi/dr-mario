(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var MENU_CHOICES = ['Play', 'Speed', 'Level', 'Instructions'];

  var Menu = Mario.Menu = function () {
    this.state = Mario.Constants.MENU;
  };

  Menu.prototype.draw = function (ctx) {
    var vSpace = 50;
    var i = 1;
    ctx.font = "24px serif";
    MENU_CHOICES.forEach(function(choice) {
      ctx.fillText(choice, 10, (++i)*vSpace);
    });
  };
  // Menu.prototype.draw = function (ctx) {
  //   var message;
  //   this.setMessageStyle(ctx);
  //   if (this.state === Mario.Constants.OVER) {
  //     message = "Game Over";
  //     ctx.font = "32px serif";
  //     ctx.fillText(message, 10, 50);
  //     ctx.font = "18px serif";
  //     window.setTimeout(function() {
  //       ctx.fillText("(Press Space)", 10, 400);
  //     }, 1000);
  //   }
  //   else {
  //     message = "Pause";
  //     ctx.font = "18px serif";
  //   }
  // };

  Menu.prototype.drawPause = function (ctx) {
    var message;
    this.setMessageStyle(ctx);
    message = "Pause";
    ctx.font = "18px serif";
    ctx.fillText(message, 10, 50);
  };

  // message = "Pause";
  // ctx.font = "18px serif";

  Menu.prototype.setMessageStyle = function (ctx) {
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(0, 0, Mario.Constants.CANVAS_WIDTH, Mario.Constants.CANVAS_HEIGHT);
    ctx.fillStyle = 'rgba(255,255,255,1)';
  };

})();
