paper.install(window);
var SQRT_3 = Math.pow(3, 0.5);
var red = '#F79C82';
var lightRed = '#FDE6E0';
var grey = '#8A90A4';
var blue = '#89C2EF';
var green = '#95D9AD';
var lightGrey = '#969CAE';
var triangle;
var doAnimate = true;
var segment;


var randomNumber = function(minimum, maximum) {
  return Math.random() * (maximum - minimum) + minimum;
};

window.onload = function() {
  paper.setup('editable-triangle');
  // Event handlers
  var tool = new Tool();
  tool.onMouseDown = onmousedown;
  tool.onMouseDrag = onmousedrag;
  tool.onMouseUp = onmouseup;

  triangle = new Triangle(calcA());
  paper.view.draw();

  paper.view.onFrame = function(event) {
    if (doAnimate) {
      project.clear();
      triangle.update();
    }
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
  this.timer = 0;
};

Triangle.prototype.resize = function(a) {
  // Offset
  this.x_off = paper.view.center.x;
  this.y_off = paper.view.center.y;
  this.circumcenter = new Point(this.x_off, this.y_off);
  // The points of the triangle
  this.pts = [
    new paper.Point(0 + this.x_off, -a / SQRT_3 + this.y_off),
    new paper.Point(-a/2 + this.x_off, a * 0.5 / SQRT_3 + this.y_off),
    new paper.Point(a/2 + this.x_off, a * 0.5 / SQRT_3 + this.y_off)
  ];
  // Labels
  this.labels = ['(0, -a/√3)',
                 '(-a/2, /2√3)',
                 '(a/2, a/2√3)'];
  this.reset();
};

Triangle.prototype.reset = function(a) {
  // To track state of lines to animate them
  this.s_now = [this.pts[0], this.pts[2], this.pts[1]];
  this.b_now = [this.pts[0], this.pts[2], this.pts[1]];
  this.timer = 0;
  // The circumcenter
  this.getCircumcenter();
  this.AnimatedCircle = new AnimatedCircle(this.circumcenter, this.circumRad);
  // The Centroid
  this.getCentroid();
  // Bisecting arcs and lines
  this.bisectors = [];
  this.buildBisectors();
};

Triangle.prototype.updateShape = function() {
  for (var i = this.path.segments.length - 1; i >= 0; i--) {
    this.pts[i] = this.path.segments[i].point;
  };
  this.reset();
};

Triangle.prototype.buildBisectors = function() {
  for (var i = 0; i < 2; i++) {
    this.bisectors.push(new Bisector());
  };
  var lengths = [this.pts[1].subtract(this.pts[0]).length,
                 this.pts[2].subtract(this.pts[1]).length,
                 this.pts[2].subtract(this.pts[0]).length];
  var a1 = lengths[0] * randomNumber(0.51, 0.55);
  var a2 = lengths[2] * randomNumber(0.51, 0.55);
  this.bisectors[0].addArc(this.pts[0], this.pts[2].subtract(this.pts[0]).angle, -27, 27, a2);
  this.bisectors[0].addArc(this.pts[2], this.pts[0].subtract(this.pts[2]).angle, -27, 27, a2);
  this.bisectors[1].addArc(this.pts[1], this.pts[0].subtract(this.pts[1]).angle, -27, 27, a1);
  this.bisectors[1].addArc(this.pts[0], this.pts[1].subtract(this.pts[0]).angle, -27, 27, a1);
};

Triangle.prototype.update = function() {
  // Animation Timeline
  this.bisectors[0].draw();
  if (this.timer >= 20)
    this.bisectors[1].draw();
  if (this.timer >= 40) {
    this.drawCentroid();
    this.drawCircumcenter();
  }
  if (this.timer >= 50)
    this.AnimatedCircle.draw();
  if (this.timer >= 200)
    this.reset();
  // draw the triangle itself
  this.draw();
  // Update time
  this.timer++;
};

Triangle.prototype.draw = function() {
  // Draw the sides of the triangle
  this.path = new Path({
    segments: [[ this.pts[0] ],
               [ this.pts[1] ],
               [ this.pts[2] ]],
    strokeCap: 'round',
    selected: true,
    strokeWidth: 1,
    selectedColor: blue,
    closed: true,
    name: 'triangle'
  });
}

Triangle.prototype.drawCircumcenter = function() {
  var rectangle = new Path.Rectangle(this.circumcenter, 5);
      rectangle.strokeColor = red;
      rectangle.fillColor = '#fff';
      rectangle.position = this.circumcenter;
  // Label BG
  var rectangle = new Path.Rectangle(this.circumcenter, [100, 40]);
      rectangle.fillColor = '#fff';
      rectangle.position = new Point(this.circumcenter.x, this.circumcenter.y + 30);
  // Draw Label
  var cx = Math.abs(this.circumcenter.x - this.x_off).toFixed(1);
  var cy = Math.abs(this.circumcenter.y - this.y_off).toFixed(1);
  var text = new PointText(new Point(this.circumcenter.x, this.circumcenter.y + 25));
      text.content = 'The Circumcenter \n (' + cx + ', ' + cy + ')';
      text.fillColor = grey;
      text.justification = 'center';
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
  var cx = Math.abs(this.centroid.x - this.x_off).toFixed(1);
  var cy = Math.abs(this.centroid.y - this.y_off).toFixed(1);
  var centerLabel = new PointText(this.centroid.x, this.centroid.y + 25);
      centerLabel.content = 'The Centroid \n (' + cx + ', ' + cy + ')';
      centerLabel.fillColor = grey;
      centerLabel.justification = 'center';
};

Triangle.prototype.getCentroid = function() {
  this.centroid =  new Point(
                      (this.pts[0].x + this.pts[1].x + this.pts[2].x) / 3,
                      (this.pts[0].y + this.pts[1].y + this.pts[2].y) / 3);
};

Triangle.prototype.getCircumcenter = function() {
  var D = 2.0 * ( this.pts[0].x * (this.pts[1].y - this.pts[2].y) +
                  this.pts[1].x * (this.pts[2].y - this.pts[0].y) +
                  this.pts[2].x * (this.pts[0].y - this.pts[1].y) );

  var AX2 = Math.pow(this.pts[0].x, 2);
  var AY2 = Math.pow(this.pts[0].y, 2);
  var BX2 = Math.pow(this.pts[1].x, 2);
  var BY2 = Math.pow(this.pts[1].y, 2);
  var CX2 = Math.pow(this.pts[2].x, 2);
  var CY2 = Math.pow(this.pts[2].y, 2);

  var AX2_AY2 = AX2 + AY2;
  var BX2_BY2 = BX2 + BY2;
  var CX2_CY2 = CX2 + CY2;

  var ux = (AX2_AY2 * (this.pts[1].y - this.pts[2].y) +
            BX2_BY2 * (this.pts[2].y - this.pts[0].y) +
            CX2_CY2 * (this.pts[0].y - this.pts[1].y)) / D;
  var uy = (AX2_AY2 * (this.pts[1].x - this.pts[2].x) +
            BX2_BY2 * (this.pts[2].x - this.pts[0].x) +
            CX2_CY2 * (this.pts[0].x - this.pts[1].x)) / D;

  this.circumcenter = new Point(ux, -uy);

  var a = this.pts[1].subtract(this.pts[0]).length;
  var b = this.pts[2].subtract(this.pts[1]).length;
  var c = this.pts[2].subtract(this.pts[0]).length;

  this.circumRad = a*b*c / Math.pow(((a+b+c)*(-a+b+c)*(a-b+c)*(a+b-c)) , 0.5);

};

// ---------------------------------------------------
//  Event Handlers
// ---------------------------------------------------
var onmousedown = function(event) {
  doAnimate = false;
  segment = null;
  var hitResult = project.hitTest(event.point, {
    segments: true,
    tolerance: 25
  });
  if (!hitResult)
    return;
  else if (hitResult.segment.path.name === 'triangle')
    segment = hitResult.segment;
};

var onmousedrag = function(event) {
  segment.point = segment.point.add(event.delta);
};

var onmouseup = function(event) {
  doAnimate = true;
  triangle.updateShape();
};