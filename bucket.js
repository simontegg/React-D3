/**
 * @jsx React.DOM
 */

var update = require('./update');
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

    console.log(segmentArc)
     return (
      <g>
        <path
          className='allocated'
          transform={this.state.translate}
          d={segmentArc}
          fill={this.state.fill} >
        </path>
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

  animate: function(attr, targetValue, duration, ease) {
    var cmp = this;
    var interpolator;
    if (_.isFunction(targetValue)) {
      interpolator = targetValue;
    } else {
      interpolator = d3.interpolate(this.state[attr], targetValue);
    }
    var ease = d3.ease(ease || 'cubic-in-out');
    var start = null;
    var duration = duration ? duration : 500;

    var tick = function(timeStamp) {
      var t0,t1,value; 
      if (start === null) start = timeStamp;
      t0 = (timeStamp - start)/duration;
      t1 = ease(t0);
      cmp.setState(_.object([attr], [interpolator(t1)]));
      if (t0 < 1) {
        requestAnimationFrame(tick)
      }
    }
    
    requestAnimationFrame(tick);

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