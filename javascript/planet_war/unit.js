var Victor = require('victor');

function Unit(id, ownerId, position) {
  this.owner = ownerId === 0 ? "playerOne" : "playerTwo";
  this.id = id;
  this.xPos = position[0];
  this.yPos = position[1];
  this.radius = 10;
  // deltaX and deltaY
  this.velocity = new Victor(0, 0);
  this.deltaV = new Victor(0, 0);
  this.angle = 0;
}

Unit.prototype.getAngle = function () {
  return 0 - (this.velocity.clone().horizontalAngleDeg() + 90);
};

Unit.prototype.nextFrame = function () {
  this.xPos += this.velocity.x;
  this.yPos += this.velocity.y;
  if (this.velocity.length() < 18) {
    this.velocity = this.velocity.add(this.deltaV);
  }
  else if (this.velocity.length() >= 18.1) {
    this.velocity.norm().multiplyScalar(18);
  }
  this.angle = this.getAngle();
};

Unit.prototype.rotation = function() {
  return this.velocity.verticalAngleDeg();
};

Unit.prototype.changeVelocity = function (deltaX, deltaY) {
  this.velocity = new Victor(deltaX, deltaY);
};

Unit.prototype.changeDeltaV = function(x, y) {
  this.deltaV = new Victor(x, y);
};

Unit.prototype.moveOut = function (fromPlanet, toPlanet) {
  const vector = new Victor(this.xPos, this.yPos)
    .subtract(new Victor(fromPlanet.xPos, fromPlanet.yPos)).norm();
  this.velocity = vector.clone().multiplyScalar(6);
  this.deltaV = vector.clone().invert().multiplyScalar(0.2);
  // debugger;

  setTimeout(() => this.attack(toPlanet), 500);
};

Unit.prototype.attack = function (planet) {
  let attackVector = new Victor(planet.xPos, planet.yPos)
    .subtract(new Victor(this.xPos, this.yPos));
  this.velocity = attackVector.clone().norm().multiplyScalar(4);
  this.deltaV = attackVector.clone().norm().multiplyScalar(0.2);
  this.angle = 0 - (attackVector.clone().horizontalAngleDeg() + 90);
};

module.exports = Unit;
