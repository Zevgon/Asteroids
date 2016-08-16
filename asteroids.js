const GameView = require('./lib/game_view.js');

document.addEventListener("DOMContentLoaded", function () {
  const canvasElement = document.getElementsByTagName("canvas")[0];
  canvasElement.height = window.innerHeight;
  canvasElement.width = window.innerWidth;
  const ctx = canvasElement.getContext('2d');
  let gameView = new GameView(ctx);
  gameView.start();

});
