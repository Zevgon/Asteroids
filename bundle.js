/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(1);

	document.addEventListener("DOMContentLoaded", function () {
	  const canvasElement = document.getElementsByTagName("canvas")[0];
	  canvasElement.height = window.innerHeight;
	  canvasElement.width = window.innerWidth;
	  const ctx = canvasElement.getContext('2d');
	  let gameView = new GameView(ctx);
	  gameView.start();

	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);

	//still need to add game somewhere
	function GameView (ctx) {
	  this.ctx = ctx;
	  let width = window.innerWidth;
	  let height = window.innerHeight;
	  const NUM_ASTEROIDS = 5;
	  this.game = new Game(ctx, NUM_ASTEROIDS, width, height);
	}

	GameView.prototype.start = function() {
	  this.bindKeyHandlers();
	  setInterval(() => {
	    this.game.step();
	    this.game.draw();
	  }, 40);
	};

	GameView.prototype.bindKeyHandlers = function () {
	  let ship = this.game.ship;
	  window.key('space', function () { ship.fire(); });
	  window.key('up', function () { ship.power(); });
	};


	module.exports = GameView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);
	const Ship = __webpack_require__(6);


	function Game (ctx, numAsteroids, width, height) {
	  this.DIM_X = width;
	  this.DIM_Y = height;
	  this.NUM_ASTEROIDS = numAsteroids;
	  this.asteroids = [];
	  this.ship = new Ship({pos: this.randomPosition(), game: this});
	  this.addAsteroids();
	  this.ctx = ctx;
	  this.bullets = [];
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
	  return this.asteroids.concat([this.ship]).concat(this.bullets);
	};

	Game.prototype.randomPosition = function () {
	  let x = Math.random() * this.DIM_X;
	  let y = Math.random() * this.DIM_Y;
	  return [x, y];
	};

	Game.prototype.draw = function () {
	  this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

	  this.allObjects().forEach(object => {
	    if (object instanceof Ship) {
	      object.vel[0] *= .99;
	      object.vel[1] *= .99;
	    }
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
	  let objects = this.allObjects();
	  objects.forEach(object => object.move());
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(5);
	const MovingObject = __webpack_require__(4);
	const Ship = __webpack_require__(6);


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


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports) {

	const Util = {
	  inherits (parent, child) {
	    let Surrogate = function() {};
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate;
	    child.prototype.constructor = child;
	  },

	  randomVel (length) {
	    let xVal = Math.floor(Math.random() * length);
	    let yVal = Math.floor(Math.sqrt(Math.pow(length, 2) - Math.pow(xVal, 2)));
	    let dirs = [-1,1];
	    let idx = Math.floor(Math.random() * 2);
	    let xMult = dirs[idx];
	    idx = Math.floor(Math.random() * 2);
	    let yMult = dirs[idx];
	    return [xVal * xMult, yVal * yMult];
	  }
	};

	module.exports = Util;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(5);
	const MovingObject = __webpack_require__(4);
	const Bullet = __webpack_require__(7);


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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const Util = __webpack_require__(5);


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


/***/ }
/******/ ]);