const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');


function Bullet (options) {
  this.rad = 4;
  console.log(this);
  console.log(this.vel);
  this.pos = options.pos;
  this.color = "orange";
  this.game = options.game;
}

Util.inherits(MovingObject, Bullet);

module.exports = Bullet;
