var _ = require('lodash');

module.exports = function(arr, prop1, prop2) {
  return _.map(arr, function(d) { 
    x = _.clone(d)
    x.value = Math.max(x[prop1], x[prop2]);
    return x
   })

}