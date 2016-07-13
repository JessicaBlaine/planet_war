var Victor = require('victor');

function Unit(id, ownerId, position) {
  this.owner = ownerId === 0 ? "player-one" : "player-two";
  this.id = id;
  this.xPos = position[0];
  this.yPos = position[1];
  this.radius = 5;
  // deltaX and deltaY
  this.velocity = new Victor(0, 0);
}

Unit.prototype.nextFrame = function () {
  this.xPos += this.velocity.x;
  this.yPos += this.velocity.y;
};

Unit.prototype.rotation = function() {
  return this.velocity.verticalAngleDeg();
};

Unit.prototype.changeVelocity = function (deltaX, deltaY) {
  this.velocity = new Victor(deltaX, deltaY);
};

module.exports = Unit;
