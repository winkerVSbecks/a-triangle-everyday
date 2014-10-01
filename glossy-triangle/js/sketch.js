paper.install(window);
var SQRT_3 = Math.pow(3, 0.5);
var darkRed = '#ecf0f1';
var red = '#e74c3c';
var triangle, w, h;

window.onload = function() {
  paper.setup('glossy-triangle');
  triangle = new Triangle(calcA());
  triangle.draw();
  paper.view.draw();

  paper.view.onFrame = function(event) {
    project.clear();
    triangle.draw();
  };
};

window.onresize = function() {
  project.clear();
  triangle.resize(calcA());
};

var calcA = function() {
  return Math.max(250, Math.min(paper.view.size.width, paper.view.size.height) - 400);
};


// ---------------------------------------------------
//  Triangle
// ---------------------------------------------------
var Triangle = function(a) {
  this.resize(a);
};

Triangle.prototype.resize = function(a) {
  // Offset
  var x_off = paper.view.center.x;
  var y_off = 1.25 * paper.view.center.y;
  // The points of the triangle
  this.pts = [new paper.Point(0 + x_off, -a / SQRT_3 + y_off),
              new paper.Point(-a/2 + x_off, a * 0.5 / SQRT_3 + y_off),
              new paper.Point(a/2 + x_off, a * 0.5 / SQRT_3 + y_off)];
  // Make the gloss
  this.gloss = new Gloss(0.75 * a, x_off, y_off, this.pts);
};

Triangle.prototype.draw = function() {
  // Draw Sides
  this.path = new Path();
  this.path.fillColor = red;
  this.path.strokeColor = red;
  this.path.strokeWidth = 12;
  this.path.strokeJoin = 'round';
  this.path.add(new Point(this.pts[0], this.pts[2]));
  this.path.add(new Point(this.pts[2], this.pts[1]));
  this.path.add(new Point(this.pts[1], this.pts[0]));
  this.path.closed = true;
  // Draw the gloss
  this.gloss.draw();
};



// ---------------------------------------------------
//  Triangle Gloss
// ---------------------------------------------------
var Gloss = function(a, x_off, y_off, pts) {
  w = paper.view.getSize().width;
  h = paper.view.getSize().height;

  // The points of the triangle
  this.top = new paper.Point(0 + x_off, -a / SQRT_3 + y_off);
  this.left = new paper.Point(-a/2 + x_off, a * 0.5 / SQRT_3 + y_off);
  this.right = new paper.Point(a/2 + x_off, a * 0.5 / SQRT_3 + y_off);

  this.limits = {
    upper: pts[0].y,
    lower: pts[1].y,
    middle: w / 2,
    left: pts[1].x,
    right: pts[1].x
  };

  this.base = new Path({
    segments: [this.top, this.right, this.left],
    closed: true
  });

  this.l = this.base.length;

  this.update(w, h/2);
};

Gloss.prototype.update = function(m_x, m_y) {
  // Get the centroid of the triangle
  var center = new Point( (this.top.x +this.left.x + this.right.x)/3,
                          (this.top.y + this.left.y + this.right.y)/3);

  // Calculate the direction and spread of light
  var dir = this.m = new Point(m_x, m_y);
  var l = dir.subtract(center).length;

  var spread = Math.min(map(l, 0, 0.25*w, 5, 90), 90);

  var minL = Math.abs(center.y - this.limits.upper);
  var theta = Math.PI * dir.subtract(center).angle / 180;

  var _dir = center.add(new Point(minL * 2 * Math.cos(theta),
                                   minL * 2 * Math.sin(theta)));
  // Segments that will be used to generate the light
  this.pts = [center,
    _dir.rotate(-spread/2, center),
    _dir.rotate(spread/2, center)
  ];
};

Gloss.prototype.draw = function() {
  var light = new Path({
    segments: this.pts,
    closed: true
  });

  var pts = [];
  var intersections = light.getIntersections(this.base);

  // Build the specular
  pts.push(intersections[0]);
  if (light.contains(this.top)) {
    pts.push(this.top);
  } else if (light.contains(this.left)) {
    pts.push(this.left);
  } else if (light.contains(this.right)) {
    pts.push(this.right);
  }
  pts.push(intersections[1]);

  // Draw the specular gloss
  var specular = new Path({
    segments: pts,
    strokeColor: 'white',
    strokeWidth: 12,
    strokeJoin: 'round',
    strokeCap: 'round'
  });

  // Draw the light
  var path = new Path.Circle({
    center: this.m,
    radius: 30,
    fillColor: '#ffee33',
    blendMode: 'multiply'
  });
};


window.onmousemove = function(event) {
  triangle.gloss.update(event.x, event.y);
};

var map = function (n, start1, stop1, start2, stop2) {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
};