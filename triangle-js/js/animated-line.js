// ---------------------------------------------------
//  Animated Line
// ---------------------------------------------------
var AnimatedLine = function(u, v, decc) {
  this.u = u;
  this.v = v;
  this.now = u;
  this.decc = decc;
};

AnimatedLine.prototype.reset = function() {
  this.now = this.u;
};

AnimatedLine.prototype.draw = function() {
  var delta = this.v.subtract(this.now);
  this.now = this.now.add(delta.divide(this.decc));
  return new Path([this.u, this.now]);
};