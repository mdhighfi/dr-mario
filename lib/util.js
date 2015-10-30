(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Util = Mario.Util = {};

  var inherits = Util.inherits = function (ChildClass, BaseClass) {
    function Surrogate () { this.constructor = ChildClass };
    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  };
})();
