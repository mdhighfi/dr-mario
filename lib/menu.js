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

  Menu.prototype.move = function (dir) {
    var option = this.currentMenuOption;
    option += dir[1] + MENU_CHOICES.length;
    option %= MENU_CHOICES.length;
    this.currentMenuOption = option;
  };
})();
