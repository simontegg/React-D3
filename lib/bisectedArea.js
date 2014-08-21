// http://www.mathopenref.com/segmentarea.html
/*

Area = R^2 * Cos^-1((r-h)/r) - (r-h) * sqrt(2*r*h - h^2)

A= 1/2 * θR^2 − 1/2 * R^2 * sin(θ)

 = 1/2 * θ * 4 - 1/2 * 4 * sin(θ)

 4 = 2θ - 2*sin(θ)

1/2 * θR^2 − 1/2 * R^2 * sin(θ) - A = 0


A ~ 2/3 * c * h + (h^3 / 2*c)

s ~ 


*/








var numeric = require('numeric');


module.exports = function(segmentArea, radius) {

  console.log(segmentArea, radius)

  var obj = {};
  obj.segmentArea = segmentArea;
  obj.radius = radius;

  obj.segmentHeight = function (height) {
    var r = obj.radius;
    var A = obj.segmentArea;
    var h = height;
    var segArea=r*r*Math.acos((r-h)/r) - (r-h)*Math.sqrt(2*r*h-h*h);
    var diff = Math.abs(A-segArea)
    console.log(diff)
    return diff
  };




  obj.height = numeric.uncmin(obj.segmentHeight, [radius]).solution[0];
  obj.chordLength = 2 * Math.sqrt(obj.height*((2*obj.radius)-obj.height));
  obj.angle = 2*Math.acos((obj.radius-obj.height)/obj.radius);
  obj.arcLength = obj.radius*obj.angle;

  return obj

}