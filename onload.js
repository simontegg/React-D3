/** @jsx React.DOM */

var React = require('react/addons');
var domready = require('domready');
var Circle = require('./circle');

domready(function() {

React.renderComponent(<Circle r={25} color="blue" />, document.body);

})

