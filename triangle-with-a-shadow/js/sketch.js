paper.install(window);
var SQRT_3 = Math.pow(3, 0.5);
var blue = '#1485E0';
var lightBlue = '#C4E1F7';
var triangle;

window.onload = function() {
  paper.setup('triangle-with-a-shadow');
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
  // Make the shadow
  this.shadow = new Shadow(this.pts);
};

Triangle.prototype.draw = function() {
  // Draw the shadow
  this.shadow.draw();
  // Draw Sides
  var path = new Path();
      path.fillColor = '#fff';
      path.strokeColor = blue;
      path.strokeWidth = 2;
      path.strokeJoin = 'round';
      path.add(new Point(this.pts[0], this.pts[2]));
      path.add(new Point(this.pts[2], this.pts[1]));
      path.add(new Point(this.pts[1], this.pts[0]));
      path.closed = true;
};


// ---------------------------------------------------
//  Triangle Shadow
// ---------------------------------------------------
var Shadow = function(_pts) {
  this.pts = [];
  for (var i = 0; i < _pts.length; i++) {
    this.pts.push(_pts[i].clone());
  };
  this.y = [this.pts[1].y, this.pts[0].y];
  this.x = this.pts[0].x;
  this.update();
};

Shadow.prototype.update = function(m_x, m_y) {
  if (!m_x || !m_y)
    return;
  if (m_x > paper.view.getSize().width / 2)
    this.pts[0].x = this.map(m_x,
                             paper.view.getSize().width / 2,
                             paper.view.getSize().width,
                             this.x, -this.x);
  else
    this.pts[0].x = this.map(m_x, 0,
                             paper.view.getSize().width / 2,
                             this.x * 2, this.x);
  if (m_y <= this.y[0])
    this.pts[0].y = this.map(m_y, 0, this.y[0], this.y[0], this.y[1]);
};

Shadow.prototype.map = function (n, start1, stop1, start2, stop2) {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
};

Shadow.prototype.draw = function() {
  // Draw Sides
  var path = new Path();
      path.fillColor = lightBlue;
      path.add(new Point(this.pts[0], this.pts[2]));
      path.add(new Point(this.pts[2], this.pts[1]));
      path.add(new Point(this.pts[1], this.pts[0]));
      path.closed = true;
};

window.onmousemove = function(event) {
  triangle.shadow.update(event.x, event.y);
}