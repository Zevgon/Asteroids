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
