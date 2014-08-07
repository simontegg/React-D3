/**
 * @jsx React.DOM
 */

var React = require('react');
var Allocation = require('./allocation');
var _ = require('lodash');



module.exports = React.createClass({
  getInitialState: function() {
    return {data:this.props.data};
  },
  render: function() {
    return (
      <svg width={this.props.width} height={this.props.height}>
        {this.state.data.map(this.renderChartElement)}
      </svg>
    );
  },
  renderChartElement: function(d) {
    switch (d.type) {
      case 'allocation':
        return <Allocation ox={d.ox} oy={d.oy} cx={d.x} cy={d.y} r={d.r} color={d.color} />
        break;
      case 'bucket':
        null
        break;
    }
  }

});


