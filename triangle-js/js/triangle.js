'use strict';

// ---------------------------------------------------
//  Triangle
// ---------------------------------------------------
/*
  - Scale
  - Circles
  - Normals
  - Bisectors
*/

var Triangle = function(arg, style, pos) {

  if (Array.isArray(arg)) {
    // Init a triangle based on points
    this._init(arg, pos);

  } else if (typeof arg === 'number') {
    // Init an equilateral triangle
    var SQRT_3 = Math.pow(3, 0.5);

    var segments = [[0, -arg / SQRT_3],
                    [-arg/2, arg * 0.5 / SQRT_3],
                    [arg/2, arg * 0.5 / SQRT_3]];

    this._init(segments, style, pos);

  } else if (arg === 'random') {
    // Generate random points
    var segments = [Point.random().multiply(view.size),
                    Point.random().multiply(view.size),
                    Point.random().multiply(view.size)];

    this._init(segments, style, pos);

  } else {
    // If in-correct data is passed warn the user
    console.warn('To initiate a triangle you can provide:\n' +
      '- an array of exactly 3 points eg: [ [1,2], [3,4], [5,6] ]\n' +
      '- or the length of the side for an equilateral triangle\n' +
      '- or \'random\' to generate a random triangle');
  }
};


Triangle.prototype._init = function(segments, style, pos) {
  // Generate a random id for this triangle
  var id = makeId();
  console.log(id);
  triangleRemote.ids.push(id);
  // Build the path
  this.path = new Path({
    segments: segments,
    closed: true,
    name: id
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


Triangle.prototype.getSideLengths = function() {

  var lengths = [];

  this.path.curves.forEach(function(curve) {
    lengths.push(curve.length);
  });

  return lengths;
};


Triangle.prototype.getSides = function() {

  var sides = [];

  this.path.curves.forEach(function(curve) {
    sides.push(curve);
  });

  return sides;
};


Triangle.prototype.getAngles = function(inRadians) {

  var pts = this.getPoints();

  var angles = [];

  angles.push(this._getAngle(pts[0], pts[1], pts[2], inRadians));
  angles.push(this._getAngle(pts[1], pts[2], pts[0], inRadians));
  angles.push(this._getAngle(pts[2], pts[0], pts[1], inRadians));

  return angles;

};


Triangle.prototype._getAngle = function(cp, p1, p2, inRadians) {
  // Do you want the angle in degrees or radians
  var unit = inRadians ? 'angleInRadians' : 'angle';

  var d1 = p1.subtract(cp);
  var d2 = p2.subtract(cp);

  var theta = Math.abs( Math.acos( d1.dot(d2)/(d1.length * d2.length) ) );

  if (theta > Math.PI) theta = Math.PI - theta;

  if (inRadians) theta = Math.round(theta * 180 * 10 / Math.PI) / 10;

  return theta;
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
//  Triangle Remote
// ---------------------------------------------------
var triangleRemote = {
  ids: [],
  selectTriangle: function(pt) {

    for (var i = this.ids.length - 1; i >= 0; i--) {
      var p = project.getItem({ name: this.ids[i] });

      if (p.contains(pt))
        p.selected = true;
    };

  }
};


// ---------------------------------------------------
//  Event Handlers
// ---------------------------------------------------
window.addEventListener('load', function(id) {

  var tool = new Tool();
  var segment;

  tool.onMouseDown = function(event) {
    segment = null;
    var hitResult = project.hitTest(event.point, {
      segments: true,
      tolerance: 25
    });

    if (!hitResult) return;
    // else if (hitResult.segment.path.name === id)
    segment = hitResult.segment;
  };

  tool.onMouseDrag = function(event) {
    segment.point = segment.point.add(event.delta);
  };

  tool.onMouseMove = function(event) {
    project.activeLayer.selected = false;
    triangleRemote.selectTriangle(event.point);

    var hitResult = project.hitTest(event.point, {
      segments: true,
      tolerance: 25
    });

    if (!hitResult) return;

    hitResult.segment.selected = true;
  };

}, false);


// ---------------------------------------------------
//  Utilities
// ---------------------------------------------------
var makeId = function() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for(var i=0; i < 12; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text + '-triangle';
};