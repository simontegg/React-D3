module.exports = function(props) {
    updateCircle = function(me) {
        me
            .attr("r", function(d) { return d.r; })
            .attr("cx", function(d) { return d.cx; })
            .attr("cy", function(d) { return d.cy; })
            .attr("fill", function(d) { return d.color; });
    };

    return function(me) {
        circle = me
            .data([props]);
        circle
            .enter().append("circle")
            .call(updateCircle);
        circle
            .transition()
            .call(updateCircle);
    };
}