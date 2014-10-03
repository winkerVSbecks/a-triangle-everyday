paper.install(window);
var SQRT_3 = Math.pow(3, 0.5);
var red = '#e74c3c';
var black = '#222';
var triangle, slash, playTriangleAnimation, playSlashAnimation;

window.onload = function() {
  paper.setup('triangle-ninja');

  // Event handlers
  var tool = new Tool();
  tool.onMouseDown = onmousedown;
  tool.onMouseDrag = onmousedrag;
  tool.onMouseUp = onmouseup;

  slash = new Slash();
  triangle = new Triangle(calcA());
  paper.view.draw();

  paper.view.onFrame = function(event) {
    if (playTriangleAnimation)
      triangle.animateSplits();
    if (playSlashAnimation)
      slash.animate();
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
  var x_off = paper.view.center.x;
  var y_off = 1.1 * paper.view.center.y;
  // The points of the triangle
  this.top = new paper.Point(0 + x_off, -a / SQRT_3 + y_off);
  this.left = new paper.Point(-a/2 + x_off, a * 0.5 / SQRT_3 + y_off);
  this.right = new paper.Point(a/2 + x_off, a * 0.5 / SQRT_3 + y_off);
  // Draw the triangle
  this.path = new Path({
    segments: [this.top, this.left, this.right],
    fillColor: black,
    closed: true
  });
  // Reset animations
  playTriangleAnimation = false;
  playSlashAnimation = false;
};

Triangle.prototype.split = function(u, v) {
  var pts = [];
  var anchor, q, dirs;

  for (var i = this.path.curves.length - 1; i >= 0; i--) {
    if (this.path.curves[i].getLocationOf(u) !== null)
      pts.push(i)
    if (this.path.curves[i].getLocationOf(v) !== null)
      pts.push(i)
  };

  // Top
  if (pts.indexOf(1) === -1) {
    anchor = this.top;
    dirs = ['up', 'down'];

    if (u.x > v.x)
      q = [this.left, this.right];
    else
      q = [this.right, this.left];
  }

  // Left
  if (pts.indexOf(2) === -1) {
    anchor = this.left;
    dirs = ['left', 'right'];

    if (u.y > v.y)
      q = [this.top, this.right];
    else
      q = [this.right, this.top];
  }

  // Right
  if (pts.indexOf(0) === -1) {
    anchor = this.right;
    dirs = ['right', 'left'];

    if (u.y < v.y)
      q = [this.left, this.top];
    else
      q = [this.top, this.left];
  }

  this.buildSplitTriangle(u, v, anchor, dirs[0]);
  this.buildSplitQuad(u, v, q, dirs[1]);
  this.path.remove();
};

Triangle.prototype.buildSplitTriangle = function(u, v, anchor, dir) {

  this.splitTriangle = new Path({
    segments: [u, v, anchor],
    fillColor: black,
    closed: true
  });

  this.calcDestination(this.splitTriangle, dir);
};

Triangle.prototype.buildSplitQuad = function(u, v, q, dir) {

  this.splitQuad = new Path({
    segments: [u, v, q[0], q[1]],
    fillColor: black,
    closed: true,
  });

  this.calcDestination(this.splitQuad, dir);
  playTriangleAnimation = true;
};

Triangle.prototype.calcDestination = function(path, dir) {
  if (dir === 'up')
    path.destination = new Point(random(path.position.x),
                                 path.position.y - 200);
  if (dir === 'down')
    path.destination = new Point(random(path.position.x),
                                 path.position.y + 200);
  if (dir === 'right')
    path.destination = new Point(path.position.x + 200,
                                 random(path.position.y));
  if (dir === 'left')
    path.destination = new Point(path.position.x - 200,
                                 random(path.position.y));
};

Triangle.prototype.animateSplits = function() {
  this.animate(this.splitTriangle);
  this.animate(this.splitQuad);
};

Triangle.prototype.animate = function(path) {
  var vector = path.destination.subtract(path.position);

  path.position = path.position.add(vector.divide(20));

  if (vector.length < 5) {
    playTriangleAnimation = false;
    project.clear();
    this.resize(this.a);
  }
};


// ---------------------------------------------------
//  Slash
// ---------------------------------------------------
var Slash = function() {
  this.intersections = [];
};

Slash.prototype.init = function(x, y) {
  // Draw the triangle
  this.path = new Path({
    segments: [[x, y], [x, y]],
    strokeColor: red
  });
};

Slash.prototype.drag = function(x, y) {
  this.path.segments[0].point.x = x;
  this.path.segments[0].point.y = y;

  this.intersections = getIntersections(this.path, triangle.path);
};

Slash.prototype.itUp = function(x, y) {
  this.destination = new Point(x, y);

  if (this.intersections.length == 2)
    triangle.split(this.intersections[0].point,
                   this.intersections[1].point);

  this.intersections = [];
  playSlashAnimation = true;
};

Slash.prototype.animate = function() {
  var vector = this.destination.subtract(this.path.segments[1].point);

  this.path.segments[1].point = this.path.segments[1].point
                                              .add(vector.divide(5));

  if (vector.length === 0) {
    playSlashAnimation = false;
    this.path.remove();
  }
};

// ---------------------------------------------------
//  Mouse/Touch Events
// ---------------------------------------------------
onmousedown = function(event) {
  if (!playSlashAnimation && !playTriangleAnimation)
    slash.init(event.x, event.y);
};
onmousedrag = function(e) {
  if (!playSlashAnimation && !playTriangleAnimation)
    slash.drag(e.event.x, e.event.y);
};
onmouseup = function(e) {
  if (!playTriangleAnimation)
    slash.itUp(e.event.x, e.event.y);
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

var random = function(o) {
  var minimum = o - 100;
  var maximum = o + 100;
  return Math.round(Math.random() * (maximum - minimum) + minimum);
}

var calcA = function() {
  return Math.max(250, Math.min(paper.view.size.width, paper.view.size.height) - 400);
};

function getIntersections(path1, path2) {
  var intersections = path1.getIntersections(path2);
  // for (var i = 0; i < intersections.length; i++) {
  //   new Path.Circle({
  //     center: intersections[i].point,
  //     radius: 5,
  //     fillColor: '#009dec'
  //   }).removeOnDrag()
  //     .removeOnUp();
  // }
  return intersections;
}