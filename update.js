module.exports = function(props) {
    updateCircle = function(me) {
        me
            .attr("r", function(d) { return d.r; })
            .attr("cx", function(d) { return 3 + d.r; })
            .attr("cy", function(d) { return 3 + d.r; })
            .attr("fill", function(d) { return d.color; });
    };

    return function(me) {
        circle = me.selectAll("circle")
            .data([props]);
        circle
            .enter().append("circle")
            .call(updateCircle);
        circle
            .transition()
            .call(updateCircle);
    };
}