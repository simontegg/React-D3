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
var pathTween = require('./lib/pathCoordsTween')

module.exports = React.createClass({

  getInitialState: function() {

    var centroid = [this.props.datum.x, this.props.datum.y],
        radius = this.props.datum.r,
        coordinates = this.circle({centroid: centroid, radius: radius });

    return {
      shape: 'circle',
      radius: radius,
      centroid: centroid,
      translate: [0,0],
      coordinates: coordinates,
      fill: this.props.datum.color,
      dragStart: this.props.dragStart
    };
  },

  animate: require('./lib/animate'),
  circle: require('./lib/circleGenerator'),
  arc: require('./lib/arcGenerator'),

  render: function() {

    // console.log(this.state.coordinates, 'on render ')
    var d = 'M' + this.state.coordinates.join('L') + 'Z'
    var translate = 'translate(' + this.state.translate[0] + ',' + this.state.translate[1] + ')'
    return (
      <path
        onMouseDown={this.state.dragStart}
        d={d}
        fill={this.state.fill} 
        transform={translate}
        >
      </path>        
     );
  },

  compontWillRecieveProps: function(nextProps) {

  },

  arcForm: function(options) {
    console.log('test arcForm', options)
    var arcCoords = this.arc(options);

    console.log(this.state.coordinates, arcCoords)

    var interpolator = pathTween(this.state.coordinates, arcCoords)();

    console.log(interpolator, 'interpolator')

    this.animate('coordinates', interpolator, 500);




  }, 

  circleForm: function() {
    console.log('test circleForm')
  },

  onDrag: function() {
    var dx = mouse.x - mouse.prevX;
    var dy = mouse.y - mouse.prevY;

    this.setState({
      translate: [
        this.state.translate[0] + dx,
        this.state.translate[1] + dy
      ]
    })

  }

});