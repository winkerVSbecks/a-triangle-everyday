// ---------------------------------------------------
//  HUD
// ---------------------------------------------------
var grey = '#46737C';
var _red = '#FF5A3D';
var _blue = '#BAF5EC';

var Hud = function() {

  var SQRT_3 = Math.pow(3, 0.5);
  var c = new Point(100, 75);
  this.c = c;
  this.rot = 0;
  this.rotTarget = randomNumber(-15, 15);

  this.group = new Group();
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

  this.group.addChild(this.triangle);

  this.buildDaytums(c);
  this.buildScale(c);
  this.buildTag(c);

  this.group.opacity = 0;
};

Hud.prototype.buildTag = function(c) {
  this.tag = new PointText({
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
    children: [this.tag, rec],
    position: [c.x + 25, c.y - 50]
  });

  this.text = new PointText({
    point: [c.x, c.y - 18],
    content: '360º',
    fillColor: grey,
    fontSize: 7,
    justification: 'center'
  });

  this.group.addChildren([group, this.text]);
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
  var arc2 = new Path.Arc({
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

  this.zone = new Group({
    children: [arc1, arc2, l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, b1, b2]
  });

  this.group.addChild(this.zone);
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

  this.group.addChildren([this.daytums, circle, arc1, arc2, j1, j2]);
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

  var levels = new Group();

  for (var i = 10; i >= 1; i--) {
    levels.addChild(new Path({
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

  this.group.addChildren([v1, v2, levels, rect]);
};

Hud.prototype.reset = function() {
  this.group.opacity = 0;
};

Hud.prototype.draw = function(t) {
  if (this.group.opacity < 1)
    this.group.opacity += 0.05;

  if (this.group.opacity >= 1) {

    if (this.rot > this.rotTarget) {
      this.zone.rotate(-1, this.c);
      this.rot--;
    } else {
      this.zone.rotate(1, this.c);
      this.rot++;
    }

    this.text.content = map(this.rot, -15, 15, 0, 360).toFixed(1) + 'º';

    if (Math.abs(this.rot - this.rotTarget) < 1)
      this.rotTarget = randomNumber(-15, 15);
  }

  if (t % 3 === 0)
    this.daytums.opacity = this.daytums.opacity === 0 ? 1 : 0;
  if (t % 24 === 0)
    this.tag.opacity = this.tag.opacity === 0.5 ? 1 : 0.5;
};

var randomNumber = function (minimum, maximum) {
  return Math.round(Math.random() * (maximum - minimum) + minimum);
};

var map = function (n, start1, stop1, start2, stop2) {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
};