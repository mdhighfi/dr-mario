(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Message = Mario.MessageScreen = function () {
    // this.menu = new Menu();
  };

  Message.prototype.draw = function (ctx) {
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.font = "32px serif";
      ctx.fillText('Game Over', 10, 50);
  };

})();
