
module.exports = function(options) {
  var coordinates = options.coordinates || null,
      n = coordinates ? coordinates.length : 40;

  var center = options.center,
      startAngle = options.startAngle,
      endAngle = options.endAngle,
      radius = options.radius,
      theta = endAngle - startAngle,
      arcLength = theta * radius,
      angleIncrement = theta / (n-2),
      angleOffset = -Math.PI/2,
      angle = startAngle;

  var arc = [[center[0], center[1]]]  ;
  
  for (var i = 0; i < (n-1); i++) {
    arc.push([
      center[0] + radius*Math.cos(angle+angleOffset),
      center[1] + radius*Math.sin(angle+angleOffset)
    ]);
    angle += angleIncrement
  };

  return arc;


}
