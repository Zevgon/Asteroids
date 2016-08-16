const Game = require('./game.js');

//still need to add game somewhere
function GameView (ctx) {
  this.ctx = ctx;
  let width = window.innerWidth;
  let height = window.innerHeight;
  const NUM_ASTEROIDS = 20;
  this.game = new Game(ctx, NUM_ASTEROIDS, width, height);
}

GameView.prototype.start = function() {
  setInterval(() => {
    this.game.step();
    this.game.draw();
  }, 40);
};

module.exports = GameView;
