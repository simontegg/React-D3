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
      data: this.props.data,
      dragElement: null
    };
  },

  render: function() {

    return (
      <svg 
        width={this.props.width} 
        height={this.props.height}
        onMouseUp={this.dragEnd}
        onMouseMove={this.onDrag}>
        <g>
          {this.props.data.map(function(d){
            console.log(this.activate)
            switch (d.type) {
              case 'allocation':
                return <Allocation 
                  ref={d.ref} 
                  dragStart={this.dragStart}
                  key={d.id} 
                  datum={d} />
                break;
              case 'bucket':
                return <Bucket
                  ready={this.state.dragging}
                  ref={d.ref} 
                  key={d.id} 
                  datum={d} 
                  scale={this.props.scale} />
                break;
            };
          }.bind(this))}
        </g>
        <g>
          {this.state.dragging ? this.props.data.map(function(d) {

            var mouseOver = this.state.dragging ? this.activate : null;
            var mouseLeave = this.state.dragging ? this.deActivate : null;


            if (d.type === 'bucket') {   
              return <circle
                className='collisionDetection'
                key={d.id + '$-over'}
                onMouseOver={mouseOver}
                onMouseLeave={mouseLeave}
                cx={d.x}
                cy={d.y}
                r={d.r}
                style={{opacity:0}} >
              </circle>
            } else {
              return;
            }
          }.bind(this)) : null }
        </g>
      </svg>
    );
  },

  activate: function(e) {
    //extract data from elements and send to allocation arcform function

    var key = e.dispatchMarker.split("$")[1],
        dropDatum = _.find(this.state.data, {id: key}),
        dragDatum = _.find(this.state.data, {id: this.state.dragElement}),
        startAngle = (dropDatum.allocated / dropDatum.target)*Math.PI*2,
        endAngle = (dragDatum.value/dropDatum.target)*Math.PI*2 + startAngle,
        midAngle = endAngle - startAngle,
        radius = this.props.scale(dropDatum.target),
        //offset center based on arc's computed centroid
        center = [
          dragDatum.x - (radius/2)*Math.cos(midAngle),
          dragDatum.y - (radius/2)*Math.sin(midAngle)
        ];

    this.refs.dragElement.arcForm({
      startAngle: startAngle, 
      endAngle: endAngle, 
      radius: radius,
      center: center,
      value: dragDatum.value,
      proportion: (dragDatum.value / dropDatum.target)
    });

  },

  deActivate: function(e) {
    var key = e.dispatchMarker.split("$")[1];
    var coordinates = this.refs.dragElement.state.coordinates
    this.refs.dragElement.circleForm({coordinates: coordinates});

  },

  onDrag: function(e) {
    if (!this.state.dragging) {
      return;
    } else {
      this.refs.dragElement.onDrag()
    }
  },

  dragUpdate: function(key, bool) {
    var dragElement = bool ? key : null
    var updateData = this.state.data.map(function(d) {
      if (d.id === key) {
        d.ref = bool ? 'dragElement' : d.type;
      }
      return d;
    });


    this.setState({data: updateData, dragging: bool, dragElement: dragElement})

  },

  dragStart: function(e) {
    var key = e.dispatchMarker.split("$")[1];
    this.dragUpdate(key, true)

  },

  dragEnd: function(e) {
    var key = e.dispatchMarker.split("$")[1];
    this.dragUpdate(key, false)
  }

});

