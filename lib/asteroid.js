const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');
const Ship = require('./ship.js');


//new Asteroid (pos, vel, rad, color)
function Asteroid (options) {
  options.vel = Util.randomVel(5);

  options.color = "green";
  options.rad = 20;
  MovingObject.call(this, options);
}

Util.inherits(MovingObject, Asteroid);

Asteroid.prototype.collideWith = function(otherObject) {
  
  if (otherObject instanceof Ship) {
    console.log("collided with ship!!");
    otherObject.relocate();
  }
};



module.exports = Asteroid;
