/**
 * @jsx React.DOM
 */

var update = require('./update');
var d3 = require('d3');
var React = require('react/addons');
var initCircle = require('./initCircle');

module.exports = React.createClass({
  render: function() {
     return (
      <circle 
        cx={this.props.ox} 
        cy={this.props.oy} 
        r={0} 
        fill={this.props.color} >
      </circle>
      );
  },
  componentDidMount: function () {
      d3.select(this.getDOMNode())
          .call(initCircle(this.props))
  },
  shouldComponentUpdate: function(props) {
      d3.select(this.getDOMNode())
          .call(initCircle(props));
      
      // always skip React's render step
      return false;
  }
});