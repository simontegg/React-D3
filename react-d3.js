/** @jsx React.DOM */

// d3 chart function
//   note that this is a higher-order function to
//   allowing passing in the component properties/state
update = function(props) {
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

// react component
var MyCircle = React.createClass({
    render: function() {
        return <svg width="200" height="200"></svg>;
    },
    componentDidMount: function () {
        d3.select(this.getDOMNode())
            .call(update(this.props));
    },
    shouldComponentUpdate: function(props) {
        d3.select(this.getDOMNode())
            .call(update(props));
        
        // always skip React's render step
        return false;
    }
});

function randomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

function randomRadius() {
    return 25 + randomInt(75);
}

function randomColor() {
    return "rgb(" + randomInt(255) + "," +
                    randomInt(255) + "," +
                    randomInt(255) + ")";
}

React.renderComponent(<MyCircle r={25} color="blue" />, document.body);

window.setInterval(function(){
  React.renderComponent(<MyCircle r={randomRadius()} color={randomColor()} />, document.body);
},1000);