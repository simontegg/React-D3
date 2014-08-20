/**
 * @jsx React.DOM
 */

var update = require('./update');
var React = require('react/addons');
var initCircle = require('./initCircle');

module.exports = React.createClass({

  getInitialState: function() {

    var scale = this.props.scale;
    var targetR = scale(this.props.datum.target);
    var allocatedR = scale(this.props.datum.allocated);


    return {
      targetR: targetR,
      allocatedR: allocatedR,
      x: this.props.datum.x,
      y: this.props.datum.y,
      fill: this.props.datum.color
    }
  },

  render: function() {
     return (
      <g>
        <circle 
          className='allocated'
          cx={this.state.x} 
          cy={this.state.y} 
          r={this.state.allocatedR} 
          fill={this.state.fill} >
        </circle>
        <circle
          className="target"
          cx={this.state.x}
          cy={this.state.y}
          r={this.state.targetR}
          fill='none'
          stroke={this.state.fill} >
        </circle>
      </g>
      );
  },

  componentDidMount: function () {

  },

  shouldComponentUpdate: function(props) {

  }
});