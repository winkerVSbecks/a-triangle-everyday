paper.install(window);
var SQRT_3 = Math.pow(3, 0.5);
var blue = '#104BFB';
var triangle;

window.onload = function() {
  paper.setup('flight-of-the-triangle');
  triangle = new Triangle(calcA());

  paper.view.draw();

  paper.view.onFrame = function() {
    triangle.fly();
  };
};

window.onresize = function() {
  project.clear();
  triangle.init(calcA());
};

var calcA = function() {
  return Math.max(250, Math.min(paper.view.size.width, paper.view.size.height) - 400);
};


// ---------------------------------------------------
//  Triangle
// ---------------------------------------------------
var Triangle = function(a) {
  this.init(a);
};

Triangle.prototype.init = function(a) {
  a = a/2;
  // Offset
  var x_off = paper.view.center.x;
  var y_off = paper.view.size.height - a/3;
  // The points of the triangle
  this.pts = [new Point(0 + x_off, -a / SQRT_3 + y_off),
              new Point(-a/2 + x_off, a * 0.5 / SQRT_3 + y_off),
              new Point(a/2 + x_off, a * 0.5 / SQRT_3 + y_off)];

  this.path = new Path({
    segments: this.pts,
    fillColor: blue,
    strokeColor: blue,
    strokeWidth: 2,
    strokeJoin: 'round',
    closed: true
  });

  this.destinations = [this.pts[1].add(new Point(-a, 0)),
                       this.pts[2].add(new Point(a, 0)),
                       this.pts[1],
                       this.pts[2],
                       this.pts[0].add(new Point(0, -2*a)),
                       new Point(x_off, -3*paper.view.size.height)];

  this.state = 'expand';
};

Triangle.prototype.fly = function() {
  if (this.state === 'expand') {
    this.path.segments[1].point = this.anim(this.path.segments[1].point,
                                            this.destinations[0],
                                            20);
    this.path.segments[2].point = this.anim(this.path.segments[2].point,
                                            this.destinations[1],
                                            20, true);
  } else if (this.state === 'thrust') {
    this.path.segments[1].point = this.anim(this.path.segments[1].point,
                                            this.destinations[2],
                                            20);
    this.path.segments[2].point = this.anim(this.path.segments[2].point,
                                            this.destinations[3],
                                            20, true);
    this.path.segments[0].point = this.anim(this.path.segments[0].point,
                                            this.destinations[4],
                                            20);
    this.path.position = this.anim(this.path.position,
                                   this.destinations[5],
                                   50);
  }
};

Triangle.prototype.anim = function(pt, dest, ease, changeState) {
  var vector = dest.subtract(pt);
  pt = pt.add(vector.divide(ease));

  if (this.state === 'expand' && vector.length < 1 && changeState) {
    this.state = 'thrust';
  } else if (this.state === 'thrust' && Math.abs(pt.x - dest.x) < 2 && changeState) {
    project.clear();
    this.init(calcA());
  }

  return pt;
};