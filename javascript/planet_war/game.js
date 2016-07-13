const Map = require('./map');

function Game() {
  this.map = new Map;
  this.run();
}

Game.prototype.run = function () {
  this.map.nextFrame();

  requestAnimationFrame(this.run.bind(this));
};

module.exports = Game;
