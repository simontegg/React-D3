// based on http://bl.ocks.org/mbostock/3081153
var d3 = require('d3');

module.exports = function(options) {
  var circle = [],
      length = 0,
      lengths = [length],
      coordinates = options.coordinates || null,
      n = coordinates ? coordinates.length : 40,
      p0,
      p1,
      x,
      y,
      i = 0;

  var area, radius, centroid, polygon, circumference;
      
  if (coordinates) {
    p0 = coordinates[0];
    polygon = d3.geom.polygon(coordinates);
    area = polygon.area();
    radius = Math.sqrt(Math.abs(area) / Math.PI);
    centroid = polygon.centroid() //polygon.centroid(-1 / (6 * area));

    while (++i < n) {
      p1 = coordinates[i];
      x = p1[0] - p0[0];
      y = p1[1] - p0[1];
      lengths.push(length += Math.sqrt(x * x + y * y));
      p0 = p1;
    };

    console.log(lengths)

  } else {
    radius = options.radius;
    circumference = 2*Math.PI*radius;
    centroid = options.centroid;
    circumferenceOffset = circumference/n;
    while (++i < n) {
      length += circumferenceOffset
      lengths.push(length)
    }

  }
  // Compute the distances of each coordinate.
  var angleOffset = -Math.PI / 2, // TODO compute automatically
      angle,
      i = -1,
      k = 2 * Math.PI / lengths[lengths.length - 1],
      angleIncrement = (2 * Math.PI) / n;

  var test = [];
  var a = angleOffset;

  // Compute points along the circle’s circumference at equivalent distances.

  //TODO tidy this up
  while (++i < n) {

    test.push([
      centroid[0] + radius * Math.cos(a),
      centroid[1] + radius * Math.sin(a)
      ])
    a = angleOffset + (angleIncrement * i)
   


    angle = angleOffset + lengths[i] * k;
     console.log(a, angle, Math.cos(a))
    circle.push([
      centroid[0] + radius * Math.cos(angle),
      centroid[1] + radius * Math.sin(angle)
    ]);
    console.log(centroid[0] + radius * Math.sin(angle), 'y')
    console.log(centroid[0] + radius * Math.sin(a), 'testy')

  };

  console.log(test, 'test', circle)

  return test;

}