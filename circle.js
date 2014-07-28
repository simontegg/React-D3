/**
 * @jsx React.DOM
 */

var update = require('./update');
var svg = require('./svg');
var d3 = require('d3');
var React = require('react/addons');

module.exports = React.createClass({
    render: function() {
        return <svg width={svg.width} height={svg.height}></svg>;
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