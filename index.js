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
var arc = require('./lib/arcGenerator');
var d3 = require('d3');

var test = arc({startAngle:0, endAngle: Math.PI, radius: 50, center:[0,0]});

var test1 = d3.svg.line()


console.log(test, test1(test));

var allocation = {type: 'allocation', ref: 'allocation', value: 50, color: 'grey'}

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

