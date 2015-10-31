(function () {
  if (typeof Mario === "undefined") {
    window.Mario = {};
  }

  var Game = Mario.Game = function () {
    this.viruses = [];
    this.pills = [];
    this.ships = [];

    this.addViruses();
  };
})();
