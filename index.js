/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var domready = require('domready');
var _ = require('lodash');
var buckets = require('./bucketData');
var bubble = require('./bubble');
var setOrigin = require('./setOrigin');
var Chart = require('./chart');
var svgData = require('./svgData');
var max = require('./max');
var Scale = require('d3-scale').scale;

var allocation = {type: 'allocation', value: 50, color: 'grey'}

bubble.size([svgData.width, svgData.height]);
var buckets = max(buckets, 'target', 'allocated');
var blobs = bubble({children:[{children: buckets}, allocation]});

blobs = setOrigin(blobs);
var scale = Scale.sqrt()
  .domain([0, blobs[0].value])
  .range([0, blobs[0].r])


domready(function() {

  React.renderComponent(<Chart scale={scale} width={svgData.width} height={svgData.height} data={blobs}/>, document.body);

})

