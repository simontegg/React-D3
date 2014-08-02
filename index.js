/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var domready = require('domready');
var _ = require('lodash');
var data = require('./innerData');
var bubble = require('./bubble');

var Chart = require('./chart');
var svgData = require('./svgData');

bubble.size([svgData.width, svgData.height])

buckets = bubble({children: data})
buckets = _.rest(buckets, function(node) { return node.depth === 0})

console.log(buckets)


domready(function() {

  React.renderComponent(<Chart width={svgData.width} height={svgData.height} data={buckets}/>, document.body);

})

