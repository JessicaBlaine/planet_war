const Planet = require('./planet');
const Unit = require('./unit');

function Map() {
  this.unitId = 0;
  this.units = [];
  this.planets = [];
  this.generatePlanets();
  this.generateUnits();
}

Map.SIZE = [1000, 600];
Map.PLANET_POS = [[100, 100], [900, 500], [100, 500], [900, 100]];

Map.prototype.generatePlanets = function () {
  this.planets = Map.PLANET_POS.map((index, planetPos) => {
    return new Planet(planetPos, index);
  });
};

Map.prototype.generateUnits = function () {
  [0, 1].forEach(planetIdx => {
    for (let i = 0; i < 5; i++) {
      this.units.push(
        new Unit(this.unitId, planetIdx, Map.PLANET_POS[planetIdx])
      );
      this.unitId += 1;
    }
  });
};

Map.prototype.nextFrame = function () {

};

module.exports = Map;
