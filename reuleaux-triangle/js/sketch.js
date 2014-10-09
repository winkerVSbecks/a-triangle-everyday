paper.install(window);
var SQRT_3 = Math.pow(3, 0.5);
var triangle;

window.onload = function() {
  paper.setup('types-of-triangles');

  triangle = new Triangle(calcA());
  paper.view.draw();

  paper.view.onFrame = function() {
    // triangle.animate();
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
  // Draw the triangle
  this.path = new Path({
    segments: [this.top, this.left, this.right],
    // fullySelected: true,
    selectedColor: '#89C2EF',
    closed: true
  });

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
  this.reuleaux.fillColor = '#eee';
  this.getAngles();
  this.reuleaux.fullySelected = true;
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
  // Bottom
  this.reuleaux.curves[0].segment1.handleIn = this.reuleaux.curves[0].segment1.handleIn.rotate(-angles[0]);
  this.reuleaux.curves[3].segment2.handleOut = this.reuleaux.curves[3].segment2.handleOut.rotate(180-angles[1]);
  // Move bottom middle point in line with the other 2 points
  this.reuleaux.curves[4].segment2.point.y = this.reuleaux.curves[3].segment2.point.y;
  // Left
  this.reuleaux.curves[1].segment1.handleOut = this.reuleaux.curves[1].segment1.handleOut.rotate(-60 - angles[2]);
  this.reuleaux.curves[1].segment2.handleIn = this.reuleaux.curves[1].segment2.handleIn.rotate(180-angles[3]-60);
  // // Right
  this.reuleaux.curves[2].segment1.handleOut = this.reuleaux.curves[2].segment1.handleOut.rotate(angles[4]);
  this.reuleaux.curves[2].segment2.handleIn = this.reuleaux.curves[2].segment2.handleIn.rotate(angles[5] + 60);
};

Triangle.prototype.animate = function() {
  // Bottom
  this.reuleaux.curves[0].segment1.handleIn = this.reuleaux.curves[0].segment1.handleIn.rotate(-1);
  this.reuleaux.curves[3].segment2.handleOut = this.reuleaux.curves[3].segment2.handleOut.rotate(1);
  // Left
  this.reuleaux.curves[1].segment1.handleOut = this.reuleaux.curves[1].segment1.handleOut.rotate(1);
  this.reuleaux.curves[1].segment2.handleIn = this.reuleaux.curves[1].segment2.handleIn.rotate(-1);
  // Right
  this.reuleaux.curves[2].segment1.handleOut = this.reuleaux.curves[2].segment1.handleOut.rotate(1);
  this.reuleaux.curves[2].segment2.handleIn = this.reuleaux.curves[2].segment2.handleIn.rotate(-1);
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

function bounce(t, b, c, d) {
  var ts=(t/=d)*t;
  var tc=ts*t;
  return b+c*(33*tc*ts + -106*ts*ts + 126*tc + -67*ts + 15*t);
}