function MovingObject (options) {
  // console.log(options);
  this.pos = options.pos;
  this.vel = options.vel;
  this.rad = options.rad;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.rad,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.pos = this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  // Collided if distance between < sum of radii
  let sumRadii = otherObject.rad + this.rad;
  let dist = this.distanceBetween(this.pos, otherObject.pos);
  return (dist < sumRadii) ? true : false;
};

MovingObject.prototype.collideWith = function () {
};

MovingObject.prototype.distanceBetween = function(centerA, centerB) {
  let x = Math.pow(Math.abs(centerA[0] - centerB[0]), 2);
  let y = Math.pow(Math.abs(centerA[1] - centerB[1]), 2);
  return Math.sqrt(x + y);
};

module.exports = MovingObject;
