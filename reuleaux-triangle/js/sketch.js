paper.install(window);
var SQRT_3 = Math.pow(3, 0.5);
var triangle;
var animTime = 60;
var tStart = 0;
var boing = new Audio('boing.wav');

window.onload = function() {
  paper.setup('reuleaux-triangle');

  triangle = new Triangle(calcA());
  paper.view.draw();
  boing.play();

  paper.view.onFrame = function(event) {
    triangle.animate(event.count);
  };
};


// ---------------------------------------------------
//  Triangle
// ---------------------------------------------------
var Triangle = function(a) {
  this.a = a;
  this.resize(a);
};

Triangle.prototype.resize = function(a) {
  // Offset
  var x_off = this.x_off = paper.view.center.x;
  var y_off = this.y_off = 1.1 * paper.view.center.y;
  // The points of the triangle
  this.top = new paper.Point(0 + x_off, -a / SQRT_3 + y_off);
  this.left = new paper.Point(-a/2 + x_off, a * 0.5 / SQRT_3 + y_off);
  this.right = new paper.Point(a/2 + x_off, a * 0.5 / SQRT_3 + y_off);

  var circle1 = new Path.Circle({
    center: this.top,
    radius: a
  });
  var circle2 = new Path.Circle({
    center: this.left,
    radius: a
  });
  var circle3 = new Path.Circle({
    center: this.right,
    radius: a
  });

  var boolPathI = circle1.intersect(circle2);
  this.reuleaux = boolPathI.intersect(circle3);
  this.reuleaux.fillColor = '#ED2E4D';
  this.getAngles();
};

Triangle.prototype.getAngles = function() {
  this.angles = [
    // Bottom
    this.reuleaux.curves[0].segment1.handleIn.angle,
    this.reuleaux.curves[3].segment2.handleOut.angle,
    // Left
    this.reuleaux.curves[1].segment1.handleOut.angle,
    this.reuleaux.curves[1].segment2.handleIn.angle,
    // Right
    this.reuleaux.curves[2].segment1.handleOut.angle,
    this.reuleaux.curves[2].segment2.handleIn.angle
  ];

  this.zero(this.angles);
};

Triangle.prototype.zero = function(angles) {
  // Calc the offset to zero state
  var offset = this.offset = [
    -angles[0],
    180 - angles[1],
    -60 - angles[2],
    180 - angles[3] - 60,
    angles[4],
    angles[5] + 60
  ];
  // Bottom Apex
  this.bottomApex = {
    start: this.reuleaux.curves[3].segment2.point.y,
    end: this.reuleaux.curves[4].segment2.point.y,
    delta: this.reuleaux.curves[4].segment2.point.y - this.reuleaux.curves[3].segment2.point.y
  };
  // Bottom
  this.reuleaux.curves[0].segment1.handleIn = this.reuleaux.curves[0].segment1.handleIn.rotate(offset[0]);
  this.reuleaux.curves[3].segment2.handleOut = this.reuleaux.curves[3].segment2.handleOut.rotate(offset[1]);
  // Move bottom apex in line with the other 2 points
  this.reuleaux.curves[4].segment2.point.y = this.reuleaux.curves[3].segment2.point.y;
  // Left
  this.reuleaux.curves[1].segment1.handleOut = this.reuleaux.curves[1].segment1.handleOut.rotate(offset[2]);
  this.reuleaux.curves[1].segment2.handleIn = this.reuleaux.curves[1].segment2.handleIn.rotate(offset[3]);
  // Right
  this.reuleaux.curves[2].segment1.handleOut = this.reuleaux.curves[2].segment1.handleOut.rotate(offset[4]);
  this.reuleaux.curves[2].segment2.handleIn = this.reuleaux.curves[2].segment2.handleIn.rotate(offset[5]);
  // Save a copy of the starting vectors
  this.startVs = [
    this.reuleaux.curves[0].segment1.handleIn.clone(),
    this.reuleaux.curves[3].segment2.handleOut.clone(),
    this.reuleaux.curves[1].segment1.handleOut.clone(),
    this.reuleaux.curves[1].segment2.handleIn.clone(),
    this.reuleaux.curves[2].segment1.handleOut.clone(),
    this.reuleaux.curves[2].segment2.handleIn.clone()
  ];
  // Save a copy of the starting angle
  this.startAs = [];
  for (var i = 0; i < this.startVs.length; i++) {
    this.startAs.push(this.startVs[i].angle);
  };
};

Triangle.prototype.resetToZero = function() {
  // Bottom
  this.reuleaux.curves[0].segment1.handleIn = this.startVs[0].rotate(0);
  this.reuleaux.curves[3].segment2.handleOut = this.startVs[1].rotate(0);
  // Bottom apex
  this.reuleaux.curves[4].segment2.point.y = this.bottomApex.start;
  // Left
  this.reuleaux.curves[1].segment1.handleOut = this.startVs[2].rotate(0);
  this.reuleaux.curves[1].segment2.handleIn = this.startVs[3].rotate(0);
  // Right
  this.reuleaux.curves[2].segment1.handleOut = this.startVs[4].rotate(0);
  this.reuleaux.curves[2].segment2.handleIn = this.startVs[5].rotate(0);
};

Triangle.prototype.animate = function(t) {
  if (t - tStart <= animTime) {
    // Bottom Apex
    this.reuleaux.curves[4].segment2.point.y = bounce(t - tStart,
                                                      this.bottomApex.start,
                                                      this.bottomApex.delta,
                                                      animTime);
    // Bottom
    this.reuleaux.curves[0].segment1.handleIn =
              this.startVs[0].rotate(bounce(t - tStart, 0,
                                            this.angles[0] - this.startAs[0],
                                            animTime));

    this.reuleaux.curves[3].segment2.handleOut =
              this.startVs[1].rotate(bounce(t - tStart, 0,
                                            this.angles[1] - this.startAs[1],
                                            animTime));
    // Left
    this.reuleaux.curves[1].segment1.handleOut =
              this.startVs[2].rotate(bounce(t - tStart, 0,
                                            this.angles[2] - this.startAs[2],
                                            animTime));
    this.reuleaux.curves[1].segment2.handleIn =
              this.startVs[3].rotate(bounce(t - tStart, 0,
                                            this.angles[3] - this.startAs[3],
                                            animTime));
    // Right
    this.reuleaux.curves[2].segment1.handleOut =
              this.startVs[4].rotate(bounce(t - tStart, 0,
                                            this.angles[4] - this.startAs[4],
                                            animTime));
    this.reuleaux.curves[2].segment2.handleIn =
              this.startVs[5].rotate(bounce(t - tStart, 0,
                                            this.angles[5] - this.startAs[5],
                                            animTime));
  } else if (t - tStart > 200 && t - tStart < 400) {
    this.resetToZero();
    boing.currentTime = 0;
  } else if (t - tStart >= 400) {
    tStart = t;
    boing.play();
  }
};

window.onresize = function() {
  project.clear();
  triangle.resize(calcA());
};


// ---------------------------------------------------
//  Helpers
// ---------------------------------------------------
var map = function(n, start1, stop1, start2, stop2) {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
};

var calcA = function() {
  return Math.max(250, Math.min(paper.view.size.width, paper.view.size.height) - 400);
};

// @t is the current time (or position) of the tween. This can be seconds or frames, steps, seconds, ms, whatever – as long as the unit is the same as is used for the total time [3].
// @b is the beginning value of the property.
// @c is the change between the beginning and destination value of the property.
// @d is the total time of the tween.
var bounce = function(t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (33 * tc * ts + -106 * ts * ts + 126 * tc + -67 * ts + 15 * t);
}