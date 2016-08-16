const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');

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

module.exports = Ship;
