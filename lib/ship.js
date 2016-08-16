const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');
const Bullet = require('./bullet.js');


function Ship (options) {
  options.vel = [0,0];

  options.color = "blue";
  options.rad = 12;
  // console.log(options);
  MovingObject.call(this, options);

}

Util.inherits(MovingObject, Ship);

Ship.prototype.relocate = function () {

  this.pos = this.game.randomPosition();
  this.vel = [0,0];
};

Ship.prototype.power = function () {
  this.vel[0] += 1;
  this.vel[1] += 1;
};

Ship.prototype.fire = function () {
  let pos1 = Array.from(this.pos);
  let options = {pos: pos1, game: this.game};
  let bullet = new Bullet(options);
  bullet.vel = Array.from(this.vel);
  bullet.vel[0] += 5;
  bullet.vel[1] += 5;
  this.game.bullets.push(bullet);
};

module.exports = Ship;
