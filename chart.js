/**
 * @jsx React.DOM
 */

var React = require('react');
var Allocation = require('./allocation');
var Bucket = require('./bucket');
var _ = require('lodash');



module.exports = React.createClass({
  getInitialState: function() {
    return {
      dragging: false,
      dragKey: null
    };
  },

  render: function() {

    return (
      <svg 
        width={this.props.width} 
        height={this.props.height}
        onMouseUp={this.dragEnd}
        onMouseMove={this.onDrag}>
        {this.props.data.map(function(d){
          switch (d.type) {
            case 'allocation':
              return <Allocation 
                ref='allocation' 
                dragStart={this.dragStart}
                key={d.id} 
                ox={d.ox} 
                oy={d.oy} 
                cx={d.x} 
                cy={d.y} 
                r={d.r} 
                color={d.color} />
              break;
            case 'bucket':
              return <Bucket ref='bucket' key={d.id} ox={d.ox} oy={d.oy} cx={d.x} cy={d.y} r={d.r} color={d.color} />
              break;
          };
        }.bind(this))}
      </svg>
    );
  },

  onDrag: function() {
    if (!this.state.dragging) {
      return;
    } else {
      this.refs.allocation.onDrag()
    }
  },

  dragStart: function(e) {

    this.setState({dragging: true, dragKey: e.dispatchMarker.slice(4)})
  },

  dragEnd: function() {
    this.setState({dragging: false})
  }

});


