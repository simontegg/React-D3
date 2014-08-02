/**
 * @jsx React.DOM
 */

var update = require('./update');
var d3 = require('d3');
var React = require('react/addons');
var drag = require('./drag')

module.exports = React.createClass({
  render: function() {
     return (
     	<circle 
     		cx={this.props.cx} 
     		cy={this.props.cy} 
     		r={this.props.r} 
     		fill={this.props.color} >
     	</circle>
     	);
  },
  componentDidMount: function () {
      d3.select(this.getDOMNode())
          .call(drag);
  },
  shouldComponentUpdate: function(props) {
      d3.select(this.getDOMNode())
          .call(update(props));
      
      // always skip React's render step
      return false;
  }
});