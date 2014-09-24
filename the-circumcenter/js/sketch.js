paper.install(window);
var SQRT_3 = Math.pow(3, 0.5);
var red = '#F79C82';
var lightRed = '#FDE6E0';
var grey = '#8A90A4';
var blue = '#89C2EF';
var green = '#95D9AD';
var lightGrey = '#969CAE';
var triangle;

var randomNumber = function(minimum, maximum) {
  return Math.random() * (maximum - minimum) + minimum;
};

window.onload = function() {
  paper.setup('what-is-a-circumcenter');
  triangle = new Triangle(calcA());
  paper.view.draw();

  paper.view.onFrame = function (event) {
    project.clear();
    triangle.update();
  };
};

window.onresize = function() {
  project.clear();
  console.log(calcA());
  triangle.resize(calcA());
};

var calcA = function() {
  return Math.max(250, Math.min(paper.view.size.width, paper.view.size.height) - 400);
};



// ---------------------------------------------------
//  Triangle
// ---------------------------------------------------
var Triangle = function(a) {
  var center = new Path.Circle(new Point(paper.view.center), 0.5);
      center.strokeColor = red;
  var centerLabel = new PointText(paper.view.center.x, paper.view.center.y + 15);
      centerLabel.content = '(0,0)';
      centerLabel.fillColor = grey;
      centerLabel.justification = 'center';
  this.resize(a);
  this.a = a;
  this.counter = 0;
};

Triangle.prototype.resize = function(a) {
  // Offset
  var x_off = paper.view.center.x;
  var y_off = paper.view.center.y;
  this.circumcenter = new Point(x_off, y_off);
  // The points of the triangle
  this.pts = [new paper.Point(0 + x_off, -a / SQRT_3 + y_off),
              new paper.Point(-a/2 + x_off, a * 0.5 / SQRT_3 + y_off),
              new paper.Point(a/2 + x_off, a * 0.5 / SQRT_3 + y_off)];
  // Labels
  this.labels = ['(0, -a/√3)',
                 '(-a/2, /2√3)',
                 '(a/2, a/2√3)'];
  this.AnimatedCircle = new AnimatedCircle(new Point(x_off, y_off),
                                                     a / SQRT_3);
  this.reset(a);
};

Triangle.prototype.reset = function(a) {
  // To track state of lines to animate them
  this.s_now = [this.pts[0], this.pts[2], this.pts[1]];
  this.b_now = [this.pts[0], this.pts[2], this.pts[1]];
  this.counter = 0;
  this.AnimatedCircle.reset();
  // Bisecting arcs and lines
  this.bisectors = [];
  this.buildBisectors(a);
};

Triangle.prototype.buildBisectors = function(a) {
  for (var i = 0; i < 2; i++) {
    this.bisectors.push(new Bisector(i===2 ? true : false));
  };
  var a1 = a * randomNumber(0.51, 0.55);
  var a2 = a * randomNumber(0.51, 0.55);
  var a3 = a * randomNumber(0.51, 0.55);
  this.bisectors[0].addArc(this.pts[0], this.pts[2].subtract(this.pts[0]).angle, -27, 27, a1);
  this.bisectors[0].addArc(this.pts[2], this.pts[0].subtract(this.pts[2]).angle, -27, 27, a1);
  this.bisectors[1].addArc(this.pts[1], this.pts[0].subtract(this.pts[1]).angle, -27, 27, a3);
  this.bisectors[1].addArc(this.pts[0], this.pts[1].subtract(this.pts[0]).angle, -27, 27, a3);
  // this.bisectors[2].addArc(this.pts[2], this.pts[1].subtract(this.pts[2]).angle, -27, 27, a2);
  // this.bisectors[2].addArc(this.pts[1], this.pts[2].subtract(this.pts[1]).angle, -27, 27, a2);
};

Triangle.prototype.update = function(time) {
  // Draw Sides
  this.sideVector(this.pts[0], this.pts[2], this.labels[0], [0, -20], 0);
  this.sideVector(this.pts[2], this.pts[1], this.labels[1], [0, 25], 1);
  this.sideVector(this.pts[1], this.pts[0], this.labels[2], [0, 25], 2);
  // Animation Timeline
  if (this.counter >= 180)
    this.bisectors[0].draw();
  if (this.counter >= 220)
    this.bisectors[1].draw();
  if (this.counter >= 255)
    this.drawCircumcenter();
  if (this.counter >= 260)
    this.AnimatedCircle.draw();
  // if (this.counter >= 300)
  //   this.AnimatedCircle.draw();
  if (this.counter >= 500)
    this.reset(this.a);
  this.counter++;
};

Triangle.prototype.sideVector = function(vectorStart, e, coord_label, coord_offset, i) {
  var vector = e.subtract(vectorStart);
  var end = vectorStart.add(vector);
  // Draw Side
  var path = this.animateSide(vectorStart, end, this.s_now, i);
      path.strokeWidth = 1;
      path.selected = true;
      path.selectedColor = blue;
  // Draw Labels
  var text = new PointText(vectorStart.x + coord_offset[0], vectorStart.y + coord_offset[1]);
      text.content = coord_label;
      text.fillColor = grey;
      text.justification = 'center';
};

Triangle.prototype.animateSide = function(u, v, now, i) {
  var delta = v.subtract(now[i]);
  now[i] = now[i].add(delta.divide(20));
  return new Path([u, now[i]]);
};

Triangle.prototype.drawCircumcenter = function() {
  var rectangle = new Path.Rectangle(this.circumcenter, 5);
      rectangle.strokeColor = red;
      rectangle.fillColor = '#fff';
      rectangle.position = this.circumcenter;
  // Label BG
  var rectangle = new Path.Rectangle(this.circumcenter, [150, 40]);
      rectangle.fillColor = '#fff';
      rectangle.position = new Point(this.circumcenter.x, this.circumcenter.y + 30);
  // Draw Label
  var text = new PointText(new Point(this.circumcenter.x, this.circumcenter.y + 25));
      text.content = 'The Circumcenter \n (0,0)';
      text.fillColor = grey;
      text.justification = 'center';
};



// ---------------------------------------------------
//  Bisector
// ---------------------------------------------------
var Bisector = function(track) {
  this.arcs = [];
  this.intersections = [];
  this.uniqueId = Math.round(Math.random()*10000);
  this.track = track;
};

Bisector.prototype.addArc = function(center, delta, start, end, r) {
  this.arcs.push(new Arc(center, delta, start, end, r));
};

Bisector.prototype.reset = function() {
  for (var i = this.arcs.length - 1; i >= 0; i--) {
    this.arcs[i].reset();
  };
  this.animatedLine && this.animatedLine.reset();
};

Bisector.prototype.draw = function() {
  this.arcs[0].draw();
  if (this.arcs[0].drawComplete) {
    this.arcs[1].draw();
    // Get the intersection points of the two curves
    this.intersections = this.getIntersections();
    // If there are 2 intersections, draw a line between them
    if (this.intersections.length == 2 && !this.animatedLine) {
      this.offsetIntersections();
    }
    // The animated line is defined, draw it
    if (this.animatedLine) {
      var path = this.animatedLine.draw();
      path.strokeWidth = 1;
      path.strokeColor = red;
    }
    // Draw the intersection points
    this.drawIntersections();
    if (this.track)
      console.log(this.intersections.length)
  }
};

Bisector.prototype.offsetIntersections = function() {
  var alpha = Math.PI * this.intersections[1].point.subtract(this.intersections[0].point).angle / 180;
  var beta = Math.PI * this.intersections[0].point.subtract(this.intersections[1].point).angle / 180;
  var a = this.intersections[1].point.add(new Point(100 * Math.cos(alpha),
                                                    100 * Math.sin(alpha)));
  var b = this.intersections[0].point.add(new Point(100 * Math.cos(beta),
                                                    100 * Math.sin(beta)));
  this.animatedLine = new AnimatedLine(b, a, 10);
};

Bisector.prototype.getIntersections = function() {
  return this.arcs[0].path.getIntersections(this.arcs[1].path);
};

Bisector.prototype.drawIntersections = function() {
  for (var i = 0; i < this.intersections.length; i++) {
    new Path.Circle({
      center: this.intersections[i].point,
      radius: 2,
      strokeColor: lightGrey,
      fillColor: '#fff'
    });
  }
};



// ---------------------------------------------------
//  Arc
// ---------------------------------------------------
var Arc = function(center, delta, start, end, r) {
  this.center = center;
  this.delta = delta;
  this.start = start;
  this.end = end;
  this.arcSpan = this.start;
  this.r = r;
  this.drawComplete = false;
};

Arc.prototype.reset = function() {
  this.arcSpan = this.start;
  this.drawComplete = false;
};

Arc.prototype.draw = function() {
  var angle = this.delta + this.arcSpan;
  var start = this.delta + this.start;
  var end = this.delta + this.end;

  var s = Math.PI * start / 180;
  var now = Math.PI * angle / 180;
  var now_half = s + (now - s)/2;

  var from = this.center.add(new Point(this.r * Math.cos(s),
                                       this.r * Math.sin(s)));
  var through = this.center.add(new Point(this.r * Math.cos(now_half),
                                          this.r * Math.sin(now_half)));
  var to = this.center.add(new Point(this.r * Math.cos(now),
                                     this.r * Math.sin(now)));
  this.path = new Path.Arc({
    from: from,
    through: through,
    to: to,
    strokeWidth: 1,
    strokeColor: lightRed
  });
  if (angle < end)
    this.arcSpan += Math.abs(this.end - this.start)/10;
  if(Math.abs(angle - end) < 1)
    this.drawComplete = true;
};



// ---------------------------------------------------
//  Animated Line
// ---------------------------------------------------
var AnimatedLine = function(u, v, decc) {
  this.u = u;
  this.v = v;
  this.now = u;
  this.decc = decc;
};

AnimatedLine.prototype.reset = function() {
  this.now = this.u;
};

AnimatedLine.prototype.draw = function() {
  var delta = this.v.subtract(this.now);
  this.now = this.now.add(delta.divide(this.decc));
  return new Path([this.u, this.now]);
};



// ---------------------------------------------------
//  Animated Circle
// ---------------------------------------------------
var AnimatedCircle = function(center, r) {
  this.center = center;
  this.r = r;
  this.angle = 0;
};

AnimatedCircle.prototype.reset = function() {
  this.angle = 0;
};

AnimatedCircle.prototype.draw = function() {
  var from = this.center.add(new Point(this.r * Math.cos(0),
                                       this.r * Math.sin(0)));
  var now = Math.PI * this.angle / 180;
  var now_half = Math.PI * (this.angle - Math.abs(this.angle / 2)) / 180;
  now_half = now_half <= 0 ? 0 : now_half;
  var through = this.center.add(new Point(this.r * Math.cos(now_half),
                                          this.r * Math.sin(now_half)));
  var to = this.center.add(new Point(this.r * Math.cos(now),
                                     this.r * Math.sin(now)));
  if (this.angle >= 360) {
    var path = new Path.Circle(center, this.r);
        path.strokeColor = green;
  } else {
    var path = new Path.Arc(from, through, to);
        path.strokeColor = green;
  }
  this.angle += (360 - this.angle) / 10;
};