// ---------------------------------------------------
//  HUD
// ---------------------------------------------------
var grey = '#46737C';
var _red = '#FF5A3D';
var _blue = '#BAF5EC';

var Hud = function() {

  var SQRT_3 = Math.pow(3, 0.5);
  var c = new Point(100, 75);

  this.buildZone(c);

  this.triangle = new Path({
    segments: [
      [c.x, c.y - 7 / SQRT_3],
      [c.x + 7/2, c.y + 7 * 0.5 / SQRT_3],
      [c.x - 7/2, c.y + 7 * 0.5 / SQRT_3]
    ],
    closed: true,
    fillColor: '#F4FFC5'
  });

  this.buildDaytums(c);
  this.buildScale(c);
  this.buildTag(c);
};

Hud.prototype.buildTag = function(c) {
  var text = new PointText({
    point: [0, 0],
    content: 'RECEIVING ANALYTICS',
    fillColor: _blue,
    fontSize: 8,
    justification: 'center'
  });

  var rec = new Path.Rectangle({
    topLeft: [-50, -10],
    bottomRight: [50, 4],
    radius: 2,
    strokeColor: darkBlue,
  });

  var group = new Group({
    children: [text, rec],
    position: [c.x + 25, c.y - 50]
  });

  var text = new PointText({
    point: [c.x, c.y - 18],
    content: '360º',
    fillColor: grey,
    fontSize: 7,
    justification: 'center'
  });
};

Hud.prototype.buildZone = function(c) {
  var r = 50;
  var theta = Math.PI/5;

  var p1 = new Point(c.x + r * Math.cos(-theta), c.y + r * Math.sin(-theta));
  var p2 = new Point(c.x + r * Math.cos(theta), c.y + r * Math.sin(theta));
  var p3 = new Point(c.x - r * Math.cos(-theta), c.y + r * Math.sin(-theta));
  var p4 = new Point(c.x - r * Math.cos(theta), c.y + r * Math.sin(theta));

  var arc1 = new Path.Arc({
    from: p1,
    through: [c.x + r, c.y],
    to: p2,
    strokeColor: grey
  });
  var arc1 = new Path.Arc({
    from: p3,
    through: [c.x - r, c.y],
    to: p4,
    strokeColor: grey
  });

  var l1 = new Path.Line({
    from: p1,
    to: p1.add([-20, 0]),
    strokeColor: grey
  });
  var l2 = new Path.Line({
    from: p2,
    to: p2.add([-20, 0]),
    strokeColor: grey
  });
  var l3 = new Path.Line({
    from: p3,
    to: p3.add([20, 0]),
    strokeColor: grey
  });
  var l4 = new Path.Line({
    from: p4,
    to: p4.add([20, 0]),
    strokeColor: grey
  });
  var l5 = new Path.Line({
    from: [c.x - 68, c.y],
    to: [c.x - 20, c.y],
    strokeColor: grey
  });
  var l6 = new Path.Line({
    from: [c.x + 61, c.y],
    to: [c.x + 20, c.y],
    strokeColor: grey
  });

  var l7 = new Path.Line({
    from: [c.x + 50, c.y + 20],
    to: [c.x + 30, c.y + 20],
    strokeColor: green,
    opacity: 0.5,
    strokeWidth: 0.5
  });
  var l8 = new Path.Line({
    from: [c.x - 50, c.y + 20],
    to: [c.x - 30, c.y + 20],
    strokeColor: green,
    opacity: 0.5,
    strokeWidth: 0.5
  });
  var l9 = new Path.Line({
    from: [c.x + 50, c.y - 20],
    to: [c.x + 30, c.y - 20],
    strokeColor: green,
    opacity: 0.5,
    strokeWidth: 0.5
  });
  var l10 = new Path.Line({
    from: [c.x - 50, c.y - 20],
    to: [c.x - 30, c.y - 20],
    strokeColor: green,
    opacity: 0.5,
    strokeWidth: 0.5
  });

  var l11 = new Path.Line({
    from: [c.x-2, c.y + 40],
    to: [c.x-2, c.y + 43],
    strokeColor: green,
    strokeWidth: 0.5
  });
  var l12 = new Path.Line({
    from: [c.x+2, c.y + 40],
    to: [c.x+2, c.y + 43],
    strokeColor: _blue,
    strokeWidth: 0.5
  });


  var b1 = new Path({
    segments: [
      [c.x + 18, c.y - 10],
      [c.x + 20, c.y - 10],
      [c.x + 20, c.y + 10],
      [c.x + 18, c.y + 10],
    ],
    strokeColor: _red
  });
  var b2 = new Path({
    segments: [
      [c.x - 18, c.y - 10],
      [c.x - 20, c.y - 10],
      [c.x - 20, c.y + 10],
      [c.x - 18, c.y + 10],
    ],
    strokeColor: _red
  });
};

Hud.prototype.buildDaytums = function(c) {
  var d1 = new Path({
    segments: [
      [c.x + 70, c.y],
      [c.x + 75, c.y],
      [c.x + 75, c.y - 5],
      [c.x + 75, c.y + 5]
    ]
  });

  var d2 = new Path({
    segments: [
      [c.x - 70, c.y],
      [c.x - 75, c.y],
      [c.x - 75, c.y - 5],
      [c.x - 75, c.y + 5]
    ]
  });

  var circle = new Path.Circle({
    center: [c.x + 74, c.y],
    radius: 10,
    strokeWidth: 2,
    strokeColor: grey
  });

  var r1 = 75;
  var r2 = r1 - 5;

  var p1 = [c.x + r1 * Math.cos(2.5*Math.PI/4), c.y + r1 * Math.sin(2.5*Math.PI/4)];
  var p2 = [c.x + r2 * Math.cos(2.5*Math.PI/4), c.y + r2 * Math.sin(2.5*Math.PI/4)];
  var p3 = [c.x + r2 * Math.cos(Math.PI/5), c.y + r2 * Math.sin(Math.PI/5)];
  var p4 = [c.x + r1 * Math.cos(Math.PI/5), c.y + r1 * Math.sin(Math.PI/5)];

  var arc1 = new Path.Arc({
    from: [c.x + 74, c.y + 10],
    through: [c.x + r1 * Math.cos(Math.PI/4), c.y + r1 * Math.sin(Math.PI/4)],
    to: p1,
    strokeColor: grey
  });

  var arc2 = new Path.Arc({
    from: p2,
    through: [c.x + r2 * Math.cos(Math.PI/4.5), c.y + r2 * Math.sin(Math.PI/4.5)],
    to: p3,
    strokeColor: grey
  });

  var j1 = new Path.Arc({
    segments: [p1, p2],
    strokeColor: grey
  });

  var j2 = new Path.Arc({
    segments: [p3, p4],
    strokeColor: grey
  });

  this.daytums = new Group({
    children: [d1, d2],
    strokeColor: _blue
  });
};

Hud.prototype.buildScale = function(c) {
  var v1 = new Path({
    segments: [
      [c.x - 75, c.y - 10],
      [c.x - 75, c.y - 50],
      [c.x - 70, c.y - 50]
    ],
    strokeColor: grey
  });

  var v2 = new Path({
    segments: [
      [c.x - 75, c.y + 10],
      [c.x - 75, c.y + 50],
      [c.x - 70, c.y + 50]
    ],
    strokeColor: grey
  });

  var levels = [];

  for (var i = 10; i >= 1; i--) {
    levels.push(new Path({
      segments: [
        [c.x - 77, c.y + 50 - i * 3],
        [c.x - 80, c.y + 50 - i * 3]
      ],
      strokeColor: grey
    }))
  };

  var rect = new Path.Rectangle({
    point: [c.x - 82, c.y - 50],
    size: [5, 20],
    fillColor: lightBlue
  });
};
