var d3 = require('d3');
var _ = require('lodash');

module.exports = function(attr, targetValue, duration, ease) {
    var cmp = this;
    var interpolator;
    if (_.isFunction(targetValue)) {
      interpolator = targetValue;
      console.log('is function', interpolator)
    } else {
      interpolator = d3.interpolate(this.state[attr], targetValue);
      console.log('not a function')
    }
    var ease = d3.ease(ease || 'cubic-in-out');
    var start = null;
    var duration = duration || 500;

    var tick = function(timeStamp) {
      var t0,t1,value; 
      if (start === null) start = timeStamp;
      t0 = (timeStamp - start)/duration;
      t1 = ease(t0);
      cmp.setState(_.object([attr], [interpolator(t1)]));
      if (t0 < 1) {
        requestAnimationFrame(tick)
      }
    }
    
    requestAnimationFrame(tick);

  }