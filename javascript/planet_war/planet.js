
function Planet(id, position) {
  this.id = id;
  this.ownerId = id;
  this.xPos = position[0];
  this.yPos = position[1];
  this.radius = 15;
}

module.exports = Planet;
