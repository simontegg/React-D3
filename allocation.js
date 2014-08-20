/**
 * @jsx React.DOM
 */

var update = require('./update');
var d3 = require('d3');
var React = require('react/addons');
var drag = require('./drag');
var initCircle = require('./initCircle');
var mousePosition = require('mouse-position');
var mouse = mousePosition();

module.exports = React.createClass({

  getInitialState: function() {
    return {
      cx: this.props.datum.x,
      cy: this.props.datum.y,
      r: this.props.datum.r,
      fill: this.props.datum.color,
      dragStart: this.props.dragStart
    }
  },

  render: function() {
    var onDrag = this.state.dragging ? this.onDrag : null;
    console.log(this.props.key, 'key')
     return (
     	<circle 
        onMouseDown={this.state.dragStart}
     		cx={this.state.cx} 
     		cy={this.state.cy} 
     		r={this.state.r} 
     		fill={this.state.fill} >
     	</circle>
     	);
  },

  compontWillRecieveProps: function(nextProps) {

  },

  onDrag: function() {
    var dx = mouse.x - mouse.prevX;
    var dy = mouse.y - mouse.prevY;
    
    this.setState({
      cx: this.state.cx + dx,
      cy: this.state.cy + dy
    })

  }

});