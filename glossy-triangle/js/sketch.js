paper.install(window);
var SQRT_3 = Math.pow(3, 0.5);
var darkRed = '#ecf0f1';
var red = '#e74c3c';
var triangle, w, h;

window.onload = function() {
  paper.setup('glossy-triangle');
  triangle = new Triangle(calcA());
  paper.view.draw();

  paper.view.onFrame = function (event) {
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

  this.path = new Path({
    segments: [this.top, this.right, this.left],
    closed: true
  });

  this.l = this.path.length;

  this.update(w, h/2);
};

Gloss.prototype.update = function(m_x, m_y) {
  this.light = new Point(m_x, m_y);
};

Gloss.prototype.draw = function() {
  var pts = [];

  // Top right quadrant
  if (this.light.x > this.limits.middle
        && this.light.y < this.limits.lower
        && this.light.y < this.limits.upper) {
    // left
    pts.push(this.path.getPointAt(map(this.light.y,
                                      0, this.limits.upper,
                                      5*this.l/6, this.l)));
    // middle
    pts.push(this.top);
    // right
    if (this.light.x > 0.75 * w)
      pts.push(this.right)
    else
      pts.push(this.path.getPointAt(map(this.light.x,
                                        w/2, 0.75*w,
                                        this.l/6, this.l/3)));
  }
  // Top left quadrant
  else if (this.light.x <= this.limits.middle
        && this.light.y < this.limits.lower
        && this.light.y < this.limits.upper) {
    // left
    if (this.light.x < 0.25*w)
      pts.push(this.left)
    else
      pts.push(this.path.getPointAt(map(this.light.x,
                                      0.25*w, 0.5*w,
                                      2*this.l/3, 5*this.l/6)));
    // middle
    pts.push(this.top);
    // right
    pts.push(this.path.getPointAt(map(this.light.y,
                                      this.limits.upper, 0,
                                      0, this.l/6)));
  }
  // Right quadrant
  else if (this.light.x > this.limits.middle
        && this.light.y < this.limits.lower
        && this.light.y >= this.limits.upper) {
    // left
    pts.push(this.top);
    // right
    pts.push(this.right);
  }
  // Left quadrant
  else if (this.light.x <= this.limits.middle
        && this.light.y < this.limits.lower
        && this.light.y >= this.limits.upper) {
    // left
    pts.push(this.left);
    // right
    pts.push(this.top);
  }

  // Draw Sides
  var path = new Path({
    segments: pts,
    strokeColor: '#fff',
    strokeWidth: 12,
    strokeJoin: 'round',
    strokeCap: 'round'
  });

  // for (var i = 0; i < pts.length; i++) {
  //   var colors = ['yellow', 'blue', 'green'];
  //   var path = new Path.Circle({
  //     center: pts[i],
  //     radius: 5,
  //     fillColor: colors[i]
  //   });
  // };
};

window.onmousemove = function(event) {
  triangle.gloss.update(event.x, event.y);
};

var map = function (n, start1, stop1, start2, stop2) {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
};