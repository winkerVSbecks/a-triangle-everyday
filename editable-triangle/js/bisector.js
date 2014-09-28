// ---------------------------------------------------
//  Bisector
// ---------------------------------------------------
var Bisector = function(track) {
  this.arcs = [];
  this.intersections = [];
  this.uniqueId = Math.round(Math.random()*10000);
  this.track = track;
};

Bisector.prototype.addArc = function(center, delta, start, end, r) {
  this.arcs.push(new Arc(center, delta, start, end, r));
};

Bisector.prototype.reset = function() {
  for (var i = this.arcs.length - 1; i >= 0; i--) {
    this.arcs[i].reset();
  };
  this.animatedLine && this.animatedLine.reset();
};

Bisector.prototype.draw = function() {
  this.arcs[0].draw();
  if (this.arcs[0].drawComplete) {
    this.arcs[1].draw();
    // Get the intersection points of the two curves
    this.intersections = this.getIntersections();
    // If there are 2 intersections, draw a line between them
    if (this.intersections.length == 2 && !this.animatedLine) {
      this.offsetIntersections();
    }
    // The animated line is defined, draw it
    if (this.animatedLine) {
      var path = this.animatedLine.draw();
          path.strokeWidth = 1;
          path.strokeColor = red;
    }
    // Draw the intersection points
    this.drawIntersections();
    if (this.track)
      console.log(this.intersections.length)
  }
};

Bisector.prototype.offsetIntersections = function() {
  var alpha = Math.PI * this.intersections[1].point.subtract(this.intersections[0].point).angle / 180;
  var beta = Math.PI * this.intersections[0].point.subtract(this.intersections[1].point).angle / 180;
  var off = Math.max(paper.view.getSize().width / 2, paper.view.getSize().height / 2);
  var a = this.intersections[1].point.add(new Point(off * Math.cos(alpha),
                                                    off * Math.sin(alpha)));
  var b = this.intersections[0].point.add(new Point(off * Math.cos(beta),
                                                    off * Math.sin(beta)));
  this.animatedLine = new AnimatedLine(b, a, 10);
};

Bisector.prototype.getIntersections = function() {
  return this.arcs[0].path.getIntersections(this.arcs[1].path);
};

Bisector.prototype.drawIntersections = function() {
  for (var i = 0; i < this.intersections.length; i++) {
    new Path.Circle({
      center: this.intersections[i].point,
      radius: 2,
      strokeColor: lightGrey,
      fillColor: '#fff'
    });
  }
};