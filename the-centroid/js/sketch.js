paper.install(window);
var SQRT_3 = Math.pow(3, 0.5);
var red = '#F79C82';
var lightRed = '#FDE6E0';
var grey = '#8A90A4';
var blue = '#89C2EF';
var triangle;

window.onload = function() {
  paper.setup('what-is-a-triangle');
  triangle = new Triangle(Math.max(200, Math.min(paper.view.size.width, paper.view.size.height) - 400), event.time);
  paper.view.draw();

  paper.view.onFrame = function (event) {
    project.clear();
    triangle.update();
  };
};

window.onresize = function() {
  project.clear();
  triangle.resize(Math.max(200, Math.min(paper.view.size.width, paper.view.size.height) - 400));
};

var Triangle = function(a) {
  var center = new Path.Circle(new Point(paper.view.center), 0.5 );
      center.strokeColor = red;
  var centerLabel = new PointText(paper.view.center.x, paper.view.center.y + 15);
      centerLabel.content = '(0,0)';
      centerLabel.fillColor = grey;
      centerLabel.justification = 'center';

  this.resize(a);
  this.counter = 0;
};

Triangle.prototype.resize = function(a) {
  // Offset
  var x_off = paper.view.center.x;
  var y_off = paper.view.center.y;
  this.centroid = new Point(x_off, y_off);
  // The points of the triangle
  this.pts = [new paper.Point(0 + x_off, -a / SQRT_3 + y_off),
              new paper.Point(-a/2 + x_off, a * 0.5 / SQRT_3 + y_off),
              new paper.Point(a/2 + x_off, a * 0.5 / SQRT_3 + y_off)];
  // Labels
  this.labels = ['(0, -a/√3)',
                 '(-a/2, /2√3)',
                 '(a/2, a/2√3)'];
  this.reset();
  this.r = a / SQRT_3;
};

Triangle.prototype.reset = function() {
  // To track state of lines to animate them
  this.s_now = [this.pts[0], this.pts[2], this.pts[1]];
  this.b_now = [this.pts[0], this.pts[2], this.pts[1]];
  this.counter = 0;
};

Triangle.prototype.update = function(time) {
  // Draw Sides
  this.sideVector(this.pts[0], this.pts[2], this.labels[0], [0, -20], 0);
  this.sideVector(this.pts[2], this.pts[1], this.labels[1], [0, 25], 1);
  this.sideVector(this.pts[1], this.pts[0], this.labels[2], [0, 25], 2);
  // Draw Bisect Lines
  if (this.counter >= 180) {
    this.bisect(this.pts[0], this.pts[2], 0);
    this.bisect(this.pts[2], this.pts[1], 1);
    this.bisect(this.pts[1], this.pts[0], 2);
  }
  // Animation Timeline
  if (this.counter >= 800)
    this.reset();
  else if (this.counter >= 205)
    this.drawCentroid();
  this.counter++;
};

Triangle.prototype.sideVector = function(vectorStart, e, coord_label, coord_offset, i) {
  var vector = e.subtract(vectorStart);
  var end = vectorStart.add(vector);
  // Draw Side
  var path = this.animateLine(vectorStart, end, this.s_now, i);
      path.strokeWidth = 1;
      path.selected = true;
      path.selectedColor = blue;
  // Draw Labels
  var text = new PointText(vectorStart.x + coord_offset[0], vectorStart.y + coord_offset[1]);
      text.content = coord_label;
      text.fillColor = grey;
      text.justification = 'center';
};

Triangle.prototype.bisect = function(u, v, i) {
  var path = this.animateLine(u, v, this.b_now, i);
      path.rotate(30, u);
      path.strokeWidth = 1;
      path.strokeColor = red;
  this.drawCircle(u, this.b_now[i].getDistance(u));
};

Triangle.prototype.drawCircle = function(pt, _r) {
  var r = Math.min(this.r, _r);
  var path = new Path.Circle(pt, r);
      path.strokeWidth = 1;
      path.strokeColor = lightRed;
};

Triangle.prototype.animateLine = function(u, v, now, i) {
  var delta = v.subtract(now[i]);
  now[i] = now[i].add(delta.divide(30));
  return new Path([u, now[i]]);
};

Triangle.prototype.drawCentroid = function() {
  var rectangle = new Path.Rectangle(this.centroid, 5);
      rectangle.strokeColor = red;
      rectangle.fillColor = '#fff';
      rectangle.position = this.centroid;
  // Label BG
  var rectangle = new Path.Rectangle(this.centroid, [100, 40]);
      rectangle.fillColor = '#fff';
      rectangle.position = new Point(this.centroid.x, this.centroid.y + 30);
  // Draw Label
  var text = new PointText(new Point(this.centroid.x, this.centroid.y + 25));
      text.content = 'The Centroid \n (0,0)';
      text.fillColor = grey;
      text.justification = 'center';
};