//based on https://gist.github.com/mbostock/3916621

var d3 = require('d3');

module.exports = function (coords0, coords1) {
  if (coords0.length !== coords1.length) return; //error

  return function() {
    // Compute point-interpolators at each distance.
    var points = coords0.map(function(pair0, i) {
      return d3.interpolate([pair0[0], pair0[1]], [coords1[i][0], coords1[i][1]]);
    });
 
    return function(t) {
      return points.map(function(p) { return p(t); });
    };
  };
}