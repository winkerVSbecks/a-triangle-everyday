// ---------------------------------------------------
//  Arc
// ---------------------------------------------------
var Arc = function(center, delta, start, end, r) {
  this.center = center;
  this.delta = delta;
  this.start = start;
  this.end = end;
  this.arcSpan = this.start;
  this.r = r;
  this.drawComplete = false;
};

Arc.prototype.reset = function() {
  this.arcSpan = this.start;
  this.drawComplete = false;
};

Arc.prototype.draw = function() {
  var angle = this.delta + this.arcSpan;
  var start = this.delta + this.start;
  var end = this.delta + this.end;

  var s = Math.PI * start / 180;
  var now = Math.PI * angle / 180;
  var now_half = s + (now - s)/2;

  var from = this.center.add(new Point(this.r * Math.cos(s),
                                       this.r * Math.sin(s)));
  var through = this.center.add(new Point(this.r * Math.cos(now_half),
                                          this.r * Math.sin(now_half)));
  var to = this.center.add(new Point(this.r * Math.cos(now),
                                     this.r * Math.sin(now)));
  this.path = new Path.Arc({
    from: from,
    through: through,
    to: to,
    strokeWidth: 1,
    strokeColor: lightRed
  });
  if (angle < end)
    this.arcSpan += Math.abs(this.end - this.start)/10;
  if(Math.abs(angle - end) < 1)
    this.drawComplete = true;
};