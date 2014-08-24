var d3 = require('d3');

module.exports = function(mapCoords, trnsltCoords) {
//TODO translate and map coords to avoid the 'switch around' affect

  var polygon0 = d3.geom.polygon(mapCoords),
      polygon1 = d3.geom.polygon(trnsltCoords);

  var centroid0 = polygon0.centroid(),
      centroid1 = polygon1.centroid(),
      diff = [
        centroid1[0] - centroid0[0],
        centroid1[1] - centroid0[1]
      ];


}