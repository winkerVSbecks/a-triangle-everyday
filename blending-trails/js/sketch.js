paper.install(window);
var SQRT_3 = Math.pow(3, 0.5);
var TRIANGLE_COUNT = 8;
var colors = [ '#E7E581', '#90E7A1', '#93E8D5' ];
var triangles = [];

window.onload = function() {
  paper.setup('blending-trails');
  // Set BG
  var background = new Path.Rectangle(view.bounds);
      background.fillColor = '#2F3E56';
  // Build triangles
  for (var i = 0; i < TRIANGLE_COUNT; i++) {
    triangles.push(new Triangle(calcA(), '#F2AD9D', i * 2));
  };
  // DRAW!
  paper.view.draw();
  // Animate
  paper.view.onFrame = function(event) {
    for (var i = 0; i < TRIANGLE_COUNT; i++) {
      triangles[i].update();
    };
    if (triangles[7].complete) {
      reset();
    }
  };
};

var reset = function() {
  project.clear();
  var background = new Path.Rectangle(view.bounds);
      background.fillColor = '#2F3E56';
  for (var i = 0; i < TRIANGLE_COUNT; i++) {
    triangles[i].reset(calcA());
  };
}

window.onresize = reset;

var calcA = function() {
  return Math.max(250, Math.min(paper.view.size.width, paper.view.size.height) - 400);
};



// ---------------------------------------------------
//  Triangle
// ---------------------------------------------------
var Triangle = function(a, col, offset, log) {
  this.col = col;
  this.delta = -offset;
  this.theta = this.delta;
  this.resize(a);
};

Triangle.prototype.reset = function(a) {
  this.theta = this.delta;
  this.complete = false;
  this.resize(a);
};

Triangle.prototype.resize = function(a) {
  // Offset
  this.x_off = paper.view.center.x;
  this.y_off = paper.view.center.y;
  // The points of the triangle
  this.pts = [
    new paper.Point(0 + this.x_off, -a / SQRT_3 + this.y_off),
    new paper.Point(-a/2 + this.x_off, a * 0.5 / SQRT_3 + this.y_off),
    new paper.Point(a/2 + this.x_off, a * 0.5 / SQRT_3 + this.y_off)
  ];
  this.draw();
};

Triangle.prototype.draw = function() {
  // Draw the sides of the triangle
  this.path = new Path({
    segments: [[ this.pts[0] ],
               [ this.pts[1] ],
               [ this.pts[2] ]],
    closed: true,
    fillColor: this.col,
    blendMode: 'overlay'
  });
};

Triangle.prototype.update = function() {
  if (this.theta < 0)
    this.theta++;
  else if (this.theta >= 0 && this.theta < 119.99) {
    this.rotating = true;
    this.omega = (120 - this.theta) / 20;
    this.path.rotate(this.omega, paper.view.center);
    this.theta += this.omega;
  } else if (this.theta >= 119.99)
    this.complete = true;
};

var randomNumber = function (minimum, maximum) {
  return Math.round(Math.random() * (maximum - minimum) + minimum);
};