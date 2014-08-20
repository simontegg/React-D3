module.exports = function(radius, value) {

  var obj = {};
  obj.area = Math.pow(radius, 2)*Math.PI;
  obj.ratio = obj.area/value;

  obj.radius = function(val) {
    var area = val*this.ratio;
    return Math.sqrt(area/Math.PI)
  };

  return obj;

}