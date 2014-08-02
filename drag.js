var d3 = require('d3');

var dragmove = function(d) {
  
  d3.select(this)
      .attr("cx", d3.event.x)
      .attr("cy", d3.event.y);
};

module.exports = d3.behavior.drag()

    .on("drag", dragmove);