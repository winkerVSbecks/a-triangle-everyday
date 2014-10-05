paper.install(window);
var SQRT_3 = Math.pow(3, 0.5);
var triangle, w;
var bumpkit = new Bumpkit();

window.onload = function() {
  paper.setup('noisy-triangle');

  triangle = new Triangle(calcA());
  paper.view.draw();

  paper.view.onFrame = function(event) {
    triangle.animatePulse();
  };
};

// ---------------------------------------------------
//  Triangle
// ---------------------------------------------------
var Triangle = function(a) {
  this.init(a);
};

Triangle.prototype.init = function(a) {
  // Get Bounds
  w = paper.view.size.width
  // Draw the BG
  var background = new Path.Rectangle(view.bounds);
      background.fillColor = '#45AEDE';
  // Offset
  var x_off = this.x_off = paper.view.center.x;
  var y_off = this.y_off = 1.1 * paper.view.center.y;
  // The points of the triangle
  this.pts = [new paper.Point(0 + x_off, -a / SQRT_3 + y_off),
              new paper.Point(-a/2 + x_off, a * 0.5 / SQRT_3 + y_off),
              new paper.Point(a/2 + x_off, a * 0.5 / SQRT_3 + y_off)];
  // Draw the triangle
  this.path = new Path({
    segments: this.pts,
    fillColor: '#fff',
    closed: true
  });

  this.buildPulse();
};

Triangle.prototype.buildPulse = function() {
  // Draw the pulse
  this.pulse = new Path({
    segments: this.pts,
    strokeColor: '#9AF17E',
    strokeWidth: 2,
    closed: true
  });

  this.ping = false;

  this.pulse.scale(0.1, [this.x_off, this.y_off]);
};

Triangle.prototype.animatePulse = function() {
  this.pulse.scale(1.06, [this.x_off, this.y_off]);

  if (Math.abs(this.pulse.bounds.width - this.path.bounds.width) < 20 && !this.ping) {
    bumpkit.createBeep().frequency(1024).play();
    bumpkit.createBeep({
      duration: .5,
      frequency: 200, //randomNumber(512, 1024)
    }).play()

    this.ping = true;
  }

  if (this.pulse.bounds.width > this.path.bounds.width) {
    this.pulse.strokeColor.alpha -= 0.05;
  }

  if (this.pulse.bounds.width > 12*w) {
    this.pulse.remove();
    this.buildPulse();
  }
}


// ---------------------------------------------------
//  Helpers
// ---------------------------------------------------
window.onresize = function() {
  project.clear();
  triangle.init(calcA());
};

var map = function(n, start1, stop1, start2, stop2) {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
};

var randomNumber = function(minimum, maximum) {
  return Math.round(Math.random() * (maximum - minimum) + minimum);
}

var calcA = function() {
  return Math.max(250, Math.min(paper.view.size.width, paper.view.size.height) - 400);
};