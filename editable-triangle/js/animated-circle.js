// ---------------------------------------------------
//  Animated Circle
// ---------------------------------------------------
var AnimatedCircle = function(center, r) {
  this.center = center;
  this.r = r;
  this.angle = 0;
};

AnimatedCircle.prototype.reset = function() {
  this.angle = 0;
};

AnimatedCircle.prototype.draw = function() {
  var from = this.center.add(new Point(this.r * Math.cos(0),
                                       this.r * Math.sin(0)));
  var now = Math.PI * this.angle / 180;
  var now_half = Math.PI * (this.angle - Math.abs(this.angle / 2)) / 180;
  now_half = now_half <= 0 ? 0 : now_half;
  var through = this.center.add(new Point(this.r * Math.cos(now_half),
                                          this.r * Math.sin(now_half)));
  var to = this.center.add(new Point(this.r * Math.cos(now),
                                     this.r * Math.sin(now)));
  if (this.angle >= 360) {
    var path = new Path.Circle(center, this.r);
        path.strokeColor = green;
  } else {
    var path = new Path.Arc(from, through, to);
        path.strokeColor = green;
  }
  this.angle += (360 - this.angle) / 10;
};