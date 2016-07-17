const Planet = require('./planet');
const Unit = require('./unit');

const Victor = require('victor');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function GameMap() {
  this.unitId = 0;
  this.units = [];
  this.planets = [];
  this.generatePlanets();
  this.generateUnits();
}

GameMap.SIZE = [1000, 600];
GameMap.PLANET_POS = [[100, 300], [900, 300], [500, 500], [500, 100]];

GameMap.prototype.isOver = function (gameOverCallback) {
  if (this.planets.some(planet => planet.owner === "playerOne")) {
    if (this.planets.some(planet => planet.owner === "playerTwo")) {
      return false;
    }
    else {
      gameOverCallback("You win!");
      return true;
    }
  }
  else if (this.planets.some(planet => planet.owner === "playerTwo")) {
    gameOverCallback("You lose.");
    return true;
  }
};

GameMap.prototype.generatePlanets = function () {
  this.planets = GameMap.PLANET_POS.map((index, planetPos) => {
    return new Planet(planetPos, index);
  });
};

GameMap.prototype.generateUnits = function () {
  [0, 1].forEach(planetIdx => {
    for (let i = 0; i < 10; i++) {
      this.units.push(
        new Unit(this.unitId, planetIdx, GameMap.PLANET_POS[planetIdx])
      );
      this.unitId += 1;
    }
  });
};

GameMap.prototype.unitCounts = function () {
  const counts = { playerOne: 0, playerTwo: 0, neutral: 0 };
  this.units.forEach(unit => {
    counts[unit.owner] += 1;
  });
  this.planets.forEach(planet => {
    counts[planet.owner] += planet.friendlyUnits;
  });
  return counts;
};

GameMap.prototype.nextFrame = function () {
  this.units.forEach(unit => unit.nextFrame());
  this.planets.forEach(planet => {
    planet.nextFrame();
    if (planet.owner === "playerTwo" && planet.friendlyUnits >= 9) {
      let planets = this.planets.filter(enemyPlanet => {
        return enemyPlanet.owner !== "playerTwo";
      });
      let target = planets.reduce((prev, curr) => {
        return prev.friendlyUnits <= curr.friendlyUnits ? prev : curr;
      });
      this.attackMove(planet, target);
    }
  });
  this.resolveCollisions(this.checkCollisions());
  this.ensureInBounds();
};

GameMap.prototype.ensureInBounds = function () {
  this.units.forEach(unit => {
    if (unit.xPos >= GameMap.SIZE[0] || unit.xPos <= 0) {
      unit.velocity.invert();
      unit.changeDeltaV(0, 0);
    }
    else if (unit.yPos >= GameMap.SIZE[1] || unit.yPos <= 0) {
      unit.velocity.invert();
      unit.changeDeltaV(0, 0);
    }
  });
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
    this.units.forEach(otherUnit => {
      if (unit.owner === otherUnit.owner) return;
      let dx = unit.xPos - otherUnit.xPos;
      let dy = unit.yPos - otherUnit.yPos;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < unit.radius + otherUnit.radius) {
        this.deleteUnit(unit);
        this.deleteUnit(otherUnit);
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
      if (planet.friendlyUnits >= 50) {
        unit.velocity.invert();
        unit.changeDeltaV(0, 0);
      } else {
        planet.reinforce(1);
        this.deleteUnit(unit);
      }
    }
    else {
      planet.defend(1, unit.owner);
      this.deleteUnit(unit);
    }
  });
};

GameMap.prototype.deleteUnit = function (unit) {
  this.units.splice(this.units.indexOf(unit), 1);
};

GameMap.prototype.attackMove = function (fromPlanet, toPlanet) {
  // debugger;
  let pos = () => [];
  if (fromPlanet.yPos >= toPlanet.yPos && fromPlanet.xPos >= toPlanet.xPos) {
      pos = () => {
        let vector = new Victor(0, fromPlanet.radius + 10);
        vector.rotateDeg(getRandomInt(-180, -270));
        return new Victor(fromPlanet.xPos, fromPlanet.yPos).add(vector).toArray();
      };
  }
  else if (
    fromPlanet.yPos < toPlanet.yPos && fromPlanet.xPos >= toPlanet.xPos
  ) {
      pos = () => {
        let vector = new Victor(0, fromPlanet.radius + 10);
          vector.rotateDeg(getRandomInt(-270, -360));
        return new Victor(fromPlanet.xPos, fromPlanet.yPos).add(vector).toArray();
      };
  }
  else if (
    fromPlanet.yPos >= toPlanet.yPos && fromPlanet.xPos < toPlanet.xPos
  ) {
    pos = () => {
      let vector = new Victor(0, fromPlanet.radius + 10);
      vector.rotateDeg(getRandomInt(-90, -180));
      return new Victor(fromPlanet.xPos, fromPlanet.yPos).add(vector).toArray();
    };
  }
  else if (
    fromPlanet.yPos < toPlanet.yPos && fromPlanet.xPos < toPlanet.xPos
  ) {
      pos = () => {
        let vector = new Victor(0, fromPlanet.radius + 10);
          vector.rotateDeg(getRandomInt(0, -90));
        return new Victor(fromPlanet.xPos, fromPlanet.yPos).add(vector).toArray();
      };
  }

  if (fromPlanet.owner === toPlanet.owner && toPlanet.friendlyUnits >= 50) {
    return;
  }

  const num = fromPlanet.moveOut();
  for (let i = 0; i < num ; i++) {
    let unit = new Unit(this.unitId, -1, pos());
    this.units.push(unit);
    this.unitId += 1;
    unit.owner = fromPlanet.owner;
    unit.moveOut(fromPlanet, toPlanet);
  }
};

module.exports = GameMap;
