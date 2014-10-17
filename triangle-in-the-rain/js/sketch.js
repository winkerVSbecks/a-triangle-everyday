paper.install(window);
var SQRT_3 = Math.pow(3, 0.5);
var triangle, w, h;
var rain = [];
var dropCount = 500;


window.onload = function() {
  paper.setup('triangle-in-the-rain');
  // Draw the BG
  var background = new Path.Rectangle(view.bounds);
      background.fillColor = '#FFCA03';

  w = paper.view.getSize().width;
  h = paper.view.getSize().height;

  for (var i = 0; i < dropCount; i++) {
    rain.push(new Drop());
  }

  triangle = new Triangle(calcA());
  paper.view.draw();

  paper.view.onFrame = function(event) {
    for (var i = 0; i < rain.length; i++) {
      rain[i].update();
    }
  };
};



// ---------------------------------------------------
//  Raindrop
// ---------------------------------------------------
var Drop = function() {
  this.reset();
  this.v = new Point(0, random(4, 5));
  this.a = new Point(0, random(0.1, 1));
};

Drop.prototype.reset = function() {
  this.path = new Path.Circle({
    center: [random(0, w), random(-50, -100)],
    radius: 1.2,
    fillColor: '#1485E0'
  });
};

Drop.prototype.update = function() {
  this.path.position = this.path.position.add(this.v);
  this.v = this.v.add(this.a);

  if (this.path.position.x >= triangle.path.segments[1].point.x
        && this.path.position.x <= triangle.path.segments[2].point.x
        && this.path.position.y >= triangle.path.segments[0].point.y
        && this.path.position.y <= triangle.path.segments[1].point.y)
    this.collide();

  if (this.path.position.y > h) {
    this.path.position.x = random(0, w);
    this.path.position.y = random(-50, -100);

    this.v.x = 0;
    this.v.y = random(5, 25);
    this.a.x = 0;
    this.a.y = random(0.1, 1);
  }
};

Drop.prototype.collide = function() {
  if (triangle.path.contains(this.path.position)) {
    var l = this.v.length;
    var dir = this.path.position.x >= w/2 ? 1 : -1;
    this.v.x = dir * l * Math.cos(Math.PI / 6);
    this.v.y = l * Math.sin(Math.PI / 6);
  }
};



// ---------------------------------------------------
//  Triangle
// ---------------------------------------------------
var Triangle = function(a) {
  this.build(a);
};

Triangle.prototype.build = function(a) {
  // Offset
  var x_off = paper.view.center.x;
  var y_off = 1.1 * paper.view.center.y;
  // The points of the triangle
  var segments = [new paper.Point(0 + x_off, -a / SQRT_3 + y_off),
                  new paper.Point(-a/2 + x_off, a * 0.5 / SQRT_3 + y_off),
                  new paper.Point(a/2 + x_off, a * 0.5 / SQRT_3 + y_off)];

  this.path = new Path({
    segments: segments,
    closed: true,
    fillColor: '#FF595B'
  });

  this.ratio = this.path.segments[0].point.x/this.path.segments[0].point.y;
};



// ---------------------------------------------------
//  Helpers
// ---------------------------------------------------
var calcA = function() {
  return Math.max(250, Math.min(paper.view.size.width, paper.view.size.height) - 400);
};

var random = function(minimum, maximum) {
  return Math.round(Math.random() * (maximum - minimum) + minimum);
};

window.onresize = function() {
  project.clear();
  // Draw the BG
  var background = new Path.Rectangle(view.bounds);
      background.fillColor = '#FFCA03';
  w = paper.view.getSize().width;
  h = paper.view.getSize().height;
  triangle.build(calcA());
};