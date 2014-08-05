/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var domready = require('domready');
var _ = require('lodash');
var data = require('./innerData');
var bubble = require('./bubble');
var setOrigin = require('./setOrigin');
var Chart = require('./chart');
var svgData = require('./svgData');

var allocation = {value: 50, color: 'grey'}

bubble.size([svgData.width, svgData.height])

buckets = bubble({children: data});
console.log('1', buckets)
buckets = setOrigin(buckets);


blobs = bubble({children:[{children: data}, allocation]})
console.log('2', blobs)
blobs = setOrigin(blobs)
console.log(buckets, blobs)


domready(function() {

  React.renderComponent(<Chart width={svgData.width} height={svgData.height} data={blobs}/>, document.body);

})

