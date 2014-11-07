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
    strokeColor: darkBlue
  });
  // Assign styles to this path
  for (var prop in style) {
    if( style.hasOwnProperty(prop) ) {
      this.path[prop] = style[prop];
    }
  }
  // If position is available
  // move the triangle to that position
  if (pos) this.path.position = pos;
};


Triangle.prototype.getPoints = function() {

  var points = [];

  this.path.segments.forEach(function(segment) {
    points.push(segment.point);
  });

  return points;
};