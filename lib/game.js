const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');


function Game (ctx, numAsteroids, width, height) {
  this.DIM_X = width;
  this.DIM_Y = height;
  this.NUM_ASTEROIDS = numAsteroids;
  this.asteroids = [];
  this.ship = new Ship({pos: this.randomPosition(), game: this});
  this.addAsteroids();
  this.ctx = ctx;
}

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
    let pos2 = this.randomPosition();
    let options = {pos: pos2, game: this};
    // console.log(options.pos);
    let asteroid = new Asteroid(options);
    this.asteroids.push(asteroid);
    // console.log(asteroid.pos, asteroid.vel);
  }


};

Game.prototype.allObjects = function () {
  return this.asteroids.concat([this.ship]);
};

Game.prototype.randomPosition = function () {
  let x = Math.random() * this.DIM_X;
  let y = Math.random() * this.DIM_Y;
  return [x, y];
};

Game.prototype.draw = function () {
  this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

  this.allObjects().forEach(object => {
    // console.log(asteroid.pos, asteroid.vel);
    // asteroid.pos = this.wrap(asteroid.pos);
    object.draw(this.ctx);

  });
};

Game.prototype.remove = function (asteroid) {
  let idx = this.asteroids.indexOf(asteroid);
  this.asteroids.splice(idx, 1);
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.checkCollisions = function() {
  let objects = this.allObjects();
  objects.forEach((object, idx) => {
    let otherObjects = objects.slice(idx + 1);
    otherObjects.forEach((otherObject) => {
      if (object.isCollidedWith(otherObject)) {
        // alert("COLLISION!!!!");
        object.collideWith(otherObject);
      }
    });
  });
};

Game.prototype.moveObjects = function () {
  this.asteroids.forEach(asteroid => asteroid.move());
};

Game.prototype.wrap = function (pos) {
  if (pos[0] <= 0) {
    pos[0] = this.DIM_X - 1;
  } else if (pos[0] >= (this.DIM_X)) {
    pos[0] = 1;
  }

  if (pos[1] <= 0) {
    pos[1] = this.DIM_Y - 1;
  } else if (pos[1] >= this.DIM_Y) {
    pos[1] = 1;
  }
  return pos;
};

module.exports = Game;
