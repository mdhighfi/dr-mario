(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var MENU_CHOICES = ['Play', 'Speed', 'Level', 'Instructions'];

  var Menu = Mario.Menu = function () {
    this.state = Mario.Constants.MENU;
    this.currentMenuOption = 0;
  };

  Menu.prototype.draw = function (ctx) {
    var that = this;
    var vSpace = 50;
    var i = 0;
    ctx.font = "24px serif";
    for (i = 0; i < MENU_CHOICES.length; i++) {
      if (that.currentMenuOption === i) {
        ctx.fillStyle = "green";
      }
      ctx.fillText(MENU_CHOICES[i], 10, (i+2)*vSpace);
      ctx.fillStyle = "white";
    }
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
