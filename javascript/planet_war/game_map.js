const Planet = require('./planet');
const Unit = require('./unit');

function GameMap() {
  this.unitId = 0;
  this.units = [];
  this.planets = [];
  this.generatePlanets();
  this.generateUnits();
}

GameMap.SIZE = [1000, 600];
GameMap.PLANET_POS = [[100, 100], [900, 500], [100, 500], [900, 100]];

GameMap.prototype.generatePlanets = function () {
  this.planets = GameMap.PLANET_POS.map((index, planetPos) => {
    return new Planet(planetPos, index);
  });
};

GameMap.prototype.generateUnits = function () {
  [0, 1].forEach(planetIdx => {
    for (let i = 0; i < 5; i++) {
      this.units.push(
        new Unit(this.unitId, planetIdx, GameMap.PLANET_POS[planetIdx])
      );
      this.unitId += 1;
    }
  });
};

GameMap.prototype.nextFrame = function () {

  this.attackMove(this.planets[0], this.planets[1]);
  // console.log("next frame");
  this.units.forEach(unit => unit.nextFrame());
  this.resolveCollisions(this.checkCollisions());
};

GameMap.prototype.checkCollisions = function () {
  const collisions = [];
  this.units.forEach(unit => {
    this.planets.forEach(planet => {
      let dx = unit.xPos - planet.xPos;
      let dy = unit.yPos - planet.yPos;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < unit.radius + planet.radius) {
        // collision detected
        collisions.push([unit, planet]);
      }
    });
  });
  this.resolveCollisions(collisions);
};

GameMap.prototype.resolveCollisions = function (collisions = []) {
  collisions.forEach(collision => {
    let unit = collision[0];
    let planet = collision[1];
    if (planet.owner === unit.owner) {
      planet.reinforce(1);
      this.deleteUnit(unit);
    }
    else {
      planet.defend(1);
      this.deleteUnit(unit);
    }
  });
};

GameMap.prototype.deleteUnit = function (unit) {
  this.units.splice(this.units.indexOf(unit), 1);
};

GameMap.prototype.attackMove = function (fromPlanet, toPlanet) {
  // debugger;
  for (let i = 0; i < fromPlanet.moveOut(); i++) {
    let pos = [fromPlanet.xPos + fromPlanet.radius * 2, fromPlanet.yPos];
    let unit = new Unit(this.unitId, -1, pos);
    this.units.push(unit);
    this.unitId += 1;
    unit.owner = fromPlanet.owner;
  }
};

module.exports = GameMap;
