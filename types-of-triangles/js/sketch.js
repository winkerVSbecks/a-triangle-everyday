paper.install(window);
var SQRT_3 = Math.pow(3, 0.5);
var triangle;

window.onload = function() {
  paper.setup('types-of-triangles');

  triangle = new Triangle(calcA());
  paper.view.draw();

  paper.view.onFrame = function() {
    triangle.animate()
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
  // How to text
  this.typeText = new PointText({
    point: [this.x_off, this.y_off],
    content: 'Equilateral',
    fillColor: '#F79C82',
    justification: 'center',
    fontSize: 14
  });
  this.propsText = new PointText({
    point: [paper.view.size.width/2, a * 0.5 / SQRT_3 + this.y_off + 20],
    content: 'All sides and angles are equal',
    fillColor: '#A7ACBB',
    justification: 'center'
  });
  // The points of the triangle
  this.top = new paper.Point(0 + x_off, -a / SQRT_3 + y_off);
  this.left = new paper.Point(-a/2 + x_off, a * 0.5 / SQRT_3 + y_off);
  this.right = new paper.Point(a/2 + x_off, a * 0.5 / SQRT_3 + y_off);
  // Draw the triangle
  this.path = new Path({
    segments: [this.top, this.left, this.right],
    fullySelected: true,
    selectedColor: '#89C2EF',
    closed: true
  });
  // Build all the different triangles
  this.buildTypes(a);
  // Set next destination
  this.dest = null;
  this.destId = 0;
  this.nextDest();
  this.didNext = false;
};

Triangle.prototype.nextDest = function() {
  var self = this;
  self.destId = (self.destId >= self.triangles.length) ? 0 : self.destId + 1;
  self.didNext = true;
  setTimeout(function() {
    self.didNext = false;
    self.dest = self.triangles[self.destId];
    self.typeText.content = self.dest.typeText;
    self.propsText.content = self.dest.propsText;
  }, 4000);
};

Triangle.prototype.buildTypes = function(a) {
  this.triangles = [{
    pts: [new paper.Point(0 + this.x_off, -a / SQRT_3 + this.y_off),
          new paper.Point(-a/2 + this.x_off, a * 0.5 / SQRT_3 + this.y_off),
          new paper.Point(a/2 + this.x_off, a * 0.5 / SQRT_3 + this.y_off)],
    typeText: 'Equilateral',
    propsText: 'All sides and angles are equal'
  }, {
    pts: [new paper.Point(0 + this.x_off, -a / SQRT_3 - 0.25 * a + this.y_off),
          new paper.Point(-a/2 + this.x_off, a * 0.5 / SQRT_3 + this.y_off),
          new paper.Point(a/2 + this.x_off, a * 0.5 / SQRT_3 + this.y_off)],
    typeText: 'Isosceles',
    propsText: '2 Sides and the angles opposite to them are equal'
  }, {
    pts: [new paper.Point(-a/4 + this.x_off, -a / SQRT_3 + this.y_off),
          new paper.Point(-a/2 + this.x_off, a * 0.5 / SQRT_3 + this.y_off),
          new paper.Point(a/2 + this.x_off, a * 0.5 / SQRT_3 + this.y_off)],
    typeText: 'Scalene',
    propsText: 'No sides and angles are equal'
  }, {
    pts: [new paper.Point(a/4 + this.x_off, -a / SQRT_3 + 0.25 * a  + this.y_off),
          new paper.Point(-a/2 + this.x_off, a * 0.5 / SQRT_3 + this.y_off),
          new paper.Point(a/2 + this.x_off, a * 0.5 / SQRT_3 + this.y_off)],
    typeText: 'Acute Angled',
    propsText: 'All angles are less than 90º'
  }, {
    pts: [new paper.Point(-a/2 + this.x_off, -a / SQRT_3 + 0.25 * a  + this.y_off),
          new paper.Point(-a/2 + this.x_off, a * 0.5 / SQRT_3 + this.y_off),
          new paper.Point(a/2 + this.x_off, a * 0.5 / SQRT_3 + this.y_off)],
    typeText: 'Right Angled',
    propsText: 'One of the angles is 90º'
  }, {
    pts: [new paper.Point(-a + this.x_off, -a / SQRT_3 + 0.25 * a  + this.y_off),
          new paper.Point(-a/2 + this.x_off, a * 0.5 / SQRT_3 + this.y_off),
          new paper.Point(a/2 + this.x_off, a * 0.5 / SQRT_3 + this.y_off)],
    typeText: 'Obtuse Angled',
    propsText: 'One of the angles is greater than 90º'
  }];
};

Triangle.prototype.animate = function() {
  if (this.dest) {
    this.animatePoint(0, this.dest.pts[0]);
    this.animatePoint(1, this.dest.pts[1]);
    this.animatePoint(2, this.dest.pts[2]);
  }
};

Triangle.prototype.animatePoint = function(id, dest) {
  var vector = dest.subtract(this.path.segments[id].point);
  this.path.segments[id].point = this.path.segments[id].point.add(vector.divide(30));

  if (vector.length < 0.5 && !this.didNext)
    this.nextDest();
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