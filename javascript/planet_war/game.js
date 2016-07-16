const GameMap = require('./game_map');

function Game() {
  this.gameMap = new GameMap;
}

Game.prototype.run = function (screenState) {
  this.gameMap.nextFrame();
  screenState.setState({ gameMap: this.gameMap });
  if (this.gameMap.isOver()) return;

  requestAnimationFrame(this.run.bind(this, screenState));
};

module.exports = Game;
