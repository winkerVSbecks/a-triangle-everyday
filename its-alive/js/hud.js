// ---------------------------------------------------
//  HUD
// ---------------------------------------------------
var grey = '#46737C';

var Hud = function() {

  var SQRT_3 = Math.pow(3, 0.5);
  var c = new Point(100, 100);

  this.path = new Path.Circle({
    center: c,
    radius: 30,
    strokeColor: grey
  });

  this.triangle = new Path({
    segments: [
      [c.x, c.y - 7 / SQRT_3],
      [c.x + 7/2, c.y + 7 * 0.5 / SQRT_3],
      [c.x - 7/2, c.y + 7 * 0.5 / SQRT_3]
    ],
    closed: true,
    strokeColor: '#F4FFC5'
  });

  // this.sf = new Path.Circle({
  //   center: c,
  //   radius: 4,
  //   strokeColor: '#F4FFC5',
  //   opacity: 0.75
  // });

  // this.diamond = new Path.Rectangle({
  //   point: c,
  //   size: [12, 12],
  //   strokeColor: '#F4FFC5',
  //   position: c,
  //   rotation: 45,
  //   strokeWidth: 0.5
  // });

  this.diamond = new Path.Rectangle({
    point: c,
    size: [20, 20],
    strokeColor: '#FF5A3D',
    position: c,
    rotation: 45,
    opacity: 0.75
  });

  this.buildDaytums(c);
  this.buildScale(c);
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

  this.daytums = new Group({
    children: [d1, d2],
    strokeColor: '#BAF5EC'
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
    fillColor: grey
  });
};
