/**
 * @jsx React.DOM
 */

var React = require('react');
var Circle = require('./circle');
var _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    // React doesn't support arrays
    return _.object(_.range(this.props.data.length), this.props.data);
  },
  render: function() {
    return (
      <svg width={this.props.width} height={this.props.height}>
        {Object.keys(this.state).map(this.renderCircle)}
      </svg>
    );
  },
  renderCircle: function(key) {
    var d = this.state[key];
    return <Circle cx={d.x} cy={d.y} r={d.r} color={d.color} />
  },
});


