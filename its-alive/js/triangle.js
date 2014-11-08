// ---------------------------------------------------
//  Triangle
// ---------------------------------------------------
var Triangle = function(arg, pos, style) {
  // Init an equilateral triangle
  var SQRT_3 = Math.pow(3, 0.5);

  var segments = [[0, -arg / SQRT_3],
                  [-arg/2, arg * 0.5 / SQRT_3],
                  [arg/2, arg * 0.5 / SQRT_3]];

  this._init(segments, style, pos);
};

Triangle.prototype._init = function(segments, style, pos) {
  // Build the path
  this.path = new Path({
    segments: segments,
    closed: true,
    strokeColor: darkBlue,
    fillColor: '#000'
  });
  // Assign styles to this path
  for (var prop in style) {
    if( style.hasOwnProperty(prop) ) {
      this.path[prop] = style[prop];
    }
  }
  // If position is available
  // move the triangle to that position
  if (pos)
    this.path.position = pos;

  this.light = this.path.clone();
  this.light.visible = false;
};

Triangle.prototype.getPoints = function() {

  var points = [];

  this.path.segments.forEach(function(segment) {
    points.push(segment.point);
  });

  return points;
};

Triangle.prototype.glow = function(t) {
  this.light.visible = true;
  this.light.fillColor = '#FA0B41';
  this.light.strokeColor = '#FA0B41';
  this.path.strokeColor = '#000';

  var sinus = Math.sin(t * 3);
  this.light.scale(sinus * 0.005 + 1);
};

Triangle.prototype.stopGlow = function() {
  this.light = this.path.clone();
  this.light.visible = false;
  this.path.strokeColor = darkBlue;
};