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
var max = require('./max')

var allocation = {type: 'allocation', value: 50, color: 'grey'}

bubble.size([svgData.width, svgData.height])
buckets = max(buckets, 'target', 'allocated');
blobs = bubble({children:[{children: buckets}, allocation]})
blobs = setOrigin(blobs);
console.log(blobs)


domready(function() {

  React.renderComponent(<Chart width={svgData.width} height={svgData.height} data={blobs}/>, document.body);

})

