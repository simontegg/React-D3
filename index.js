/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var domready = require('domready');
var _ = require('lodash');
var data = require('./innerData');
var Chart = require('./chart');
var svgData = require('./svgData');



domready(function() {

  React.renderComponent(<Chart width={svgData.width} height={svgData.height} data={data}/>, document.body);

})

