/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var AnimateMixin = ('react-animate');
var d3 = require('d3');
var Arc = d3.svg.arc();
var _ = require('lodash');

module.exports = React.createClass({

  getInitialState: function() {
    var target = this.props.datum.target;
    var scale = this.props.scale;
    var allocated = this.props.datum.allocated;
    var target = this.props.datum.target;
    var targetR = scale(target);
    var initAngle = 2*Math.PI*(allocated/target);
    var arc = Arc.innerRadius(0).startAngle(0)

    return {
      targetR: targetR,
      allocated: this.props.datum.allocated,
      x: this.props.datum.x,
      y: this.props.datum.y,
      fill: this.props.datum.color,
      arcAngle: 0,
      initAngle: initAngle,
      arc: arc,
      translate: "translate("+this.props.datum.x+','+this.props.datum.y+')'
    }
  },

  render: function() {
    var arc = this.state.arc
      .endAngle(this.state.arcAngle)
      .outerRadius(this.state.targetR);

    var segmentArc = arc();

     return (
      <g>
        <circle
          className="target"
          cx={this.state.x}
          cy={this.state.y}
          r={this.state.targetR}
          fill='white'
          stroke={this.state.fill} >
        </circle>
        <path
          className='allocated'
          transform={this.state.translate}
          d={segmentArc}
          fill={this.state.fill} >
        </path>

      </g>
      );
  },

  animate: require('./lib/animate'),

  activate: function() {
    console.log('activating')
  },


  animateArc: function() {
    this.animate('arcAngle', this.state.initAngle, 700)

  },

  componentDidMount: function() {
    var cmp = this;
    var delay = 500;
    window.setTimeout(function() {
      cmp.animateArc();
    }, delay)

  }

});