const Game = require('./game.js');

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
