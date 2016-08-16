const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');
const Bullet = require('./bullet.js');


function Ship (options) {
  options.vel = [0,0];

  options.color = "red";
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

Ship.prototype.draw = function (ctx) {
  let url = "http://static1.squarespace.com/static/50c25455e4b0ef5720704c6b/54b94ba5e4b0b5bb4be6a892/54b94d72e4b0c2c1fae545b6/1421430256503/Spaceship.png";
  ctx.fillStyle = this.color;
  ctx.drawImage(

  );

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
