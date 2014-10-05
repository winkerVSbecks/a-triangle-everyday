paper.install(window);
var SQRT_3 = Math.pow(3, 0.5);
var triangle, slash, playTriangleAnimation, playSlashAnimation;

window.onload = function() {
  paper.setup('triangle-ninja');

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
  // Draw the BG
  var background = new Path.Rectangle(view.bounds);
      background.fillColor = '#212232';
  // How to text
  var text = new PointText(new Point(paper.view.size.width - 10, paper.view.size.height - 20));
      text.justification = 'right';
      text.fillColor = '#FE5900';
      text.content = 'swipe or click and drag across the triangle';
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
    fillColor: '#3F2BD1',
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
    fillColor: '#76E1FA',
    closed: true
  });

  this.calcDestination(this.splitTriangle, dir);
};

Triangle.prototype.buildSplitQuad = function(u, v, q, dir) {

  this.splitQuad = new Path({
    segments: [u, v, q[0], q[1]],
    fillColor: '#FE5900',
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
    strokeColor: '#FE5900'
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

  if (vector.length < 1) {
    playSlashAnimation = false;
    this.path.remove();
  }
};

// ---------------------------------------------------
//  Mouse/Touch Events
// ---------------------------------------------------
var isMouseDown = false;
var onmousedown = function(e) {
  isMouseDown = true;
  e.preventDefault()
  if (!playSlashAnimation && !playTriangleAnimation)
    slash.init(e.x, e.y);
};
var onmousemove = function(e) {
  if (!isMouseDown)
    return;
  e.preventDefault()
  if (!playSlashAnimation && !playTriangleAnimation)
    slash.drag(e.x, e.y);
};
var onmouseup = function(e) {
  isMouseDown = false;
  e.preventDefault()
  if (!playTriangleAnimation)
    slash.itUp(e.x, e.y);
};

document.addEventListener("mousedown", onmousedown, true);
document.addEventListener("mousemove", onmousemove, true);
document.addEventListener("mouseup", onmouseup, true);


var ontouchstart  = function(e) {
  e.preventDefault()
  var touch = e.changedTouches[0];
  if (!playSlashAnimation && !playTriangleAnimation)
    slash.init(touch.clientX, touch.clientY);
};
var ontouchmove  = function(e) {
  e.preventDefault()
  var touch = e.changedTouches[0];
  if (!playSlashAnimation && !playTriangleAnimation)
    slash.drag(touch.clientX, touch.clientY);
};
var ontouchend = function(e) {
  e.preventDefault()
  var touch = e.changedTouches[0];
  if (!playTriangleAnimation)
    slash.itUp(touch.clientX, touch.clientY);
};

document.addEventListener("touchstart", ontouchstart, true);
document.addEventListener("touchmove", ontouchmove, true);
document.addEventListener("touchend", ontouchend, true);

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
  return intersections;
}