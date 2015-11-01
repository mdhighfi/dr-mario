(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Util = Mario.Util = {};

  Util.randomColor = function() {
    var num = Math.random();
    if (num < .3333) {
      return Mario.Constants.YELLOW;
    } else if (num < .6666) {
      return Mario.Constants.RED;
    } else {
      return Mario.Constants.BLUE;
    }
  };

  var inherits = Util.inherits = function (ChildClass, BaseClass) {
    function Surrogate () { this.constructor = ChildClass };
    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  };
})();
