var _ = require('lodash');
var uuid = require('uuid');

module.exports = function(nodes) {

children = _.rest(nodes, function(node) { return node.children });

  return children.map(function(node) {
    if (node.parent) {
      node.initialX = node.parent.x;
      node.initialY = node.parent.y;
      node.id = uuid.v4();
    }
    return node;
  })

};