var _ = require('lodash');

module.exports = function(nodes) {

children = _.rest(nodes, function(node) { return node.children });

  return children.map(function(node) {
    if (node.parent) {
      node.ox = node.parent.x;
      node.oy = node.parent.y
    }
    return node;
  })

};