// ---------------------------------------------------
//  Animated Line
// ---------------------------------------------------
var AnimatedLine = function(u, v, decc) {
  this.u = u;
  this.v = v;
  this.decc = decc;
  this.reset();
};

AnimatedLine.prototype.reset = function() {
  this.now = this.u;

  if (this.path)
    this.path.remove();

  this.path = new Path({
    segments: [this.u, this.now],
    strokeColor: lightBlue,
    blendMode: 'lighten',
    strokeWidth: 0.5
  });
};

AnimatedLine.prototype.draw = function() {
  var delta = this.v.subtract(this.now);
  this.now = this.now.add(delta.divide(this.decc));

  this.path.segments[1].point = this.now;
};