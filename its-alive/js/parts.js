// ---------------------------------------------------
//  Capacitor
// ---------------------------------------------------
var Capacitor = function(pos, dir, style) {

  // Build the path
  var path = new Path.Line({
    from: pos.add([0, 10]),
    to: pos.add([0, -10])
  });

  var segments = [
    [ pos.add([10, 10]), null, [-5, -5] ],
    [ pos.add([10, -10]), [-5, 5], null ]
  ];

  var arc = new Path({
    segments: segments
  });

  this.group = new Group({
    children: [path, arc],
    strokeColor: darkBlue
  });

  if (dir === 'down')
    this.group.rotate(90, pos);

  // Assign styles to this path
  for (var prop in style) {
    if( style.hasOwnProperty(prop) ) {
      this.group[prop] = style[prop];
    }
  }
};
Capacitor.prototype.glow = function() {
  this.group.strokeColor = 'white';
};
Capacitor.prototype.reset = function() {
  this.group.strokeColor = darkBlue;
};



// ---------------------------------------------------
//  Non Polarized Capacitor
// ---------------------------------------------------
var NonPolCapacitor = function(pos, dir, style) {

  // Build the path
  var path1 = new Path.Line({
    from: pos.add([0, 10]),
    to: pos.add([0, -10])
  });

  var path2 = new Path.Line({
    from: pos.add([-5, 10]),
    to: pos.add([-5, -10])
  });

  this.group = new Group({
    children: [path1, path2],
    strokeColor: darkBlue
  });

  if (dir === 'down')
    this.group.rotate(90, pos);

  // Assign styles to this path
  for (var prop in style) {
    if( style.hasOwnProperty(prop) ) {
      this.group[prop] = style[prop];
    }
  }
};
NonPolCapacitor.prototype.glow = function() {
  this.group.strokeColor = 'white';
};
NonPolCapacitor.prototype.reset = function() {
  this.group.strokeColor = darkBlue;
};


// ---------------------------------------------------
//  Diode
// ---------------------------------------------------
var Diode = function(pos, h, dir, style) {

  // Build the path
  var path = new Path.Line({
    from: pos.add([h, 10]),
    to: pos.add([h, -10])
  });

  var segments = [
    [pos.x, pos.y - 20/2],
    [pos.x + h, pos.y],
    [pos.x, pos.y + 20/2]
  ];

  var arc = new Path({
    segments: segments,
    closed: true
  });

  this.group = new Group({
    children: [path, arc],
    strokeColor: darkBlue
  });

  if (dir === 'down') {
    this.group.rotate(90, pos);
    this.group.rotate(180);
  }

  // Assign styles to this path
  for (var prop in style) {
    if( style.hasOwnProperty(prop) ) {
      this.group[prop] = style[prop];
    }
  }
};
Diode.prototype.glow = function() {
  this.group.strokeColor = 'white';
};
Diode.prototype.reset = function() {
  this.group.strokeColor = darkBlue;
};


// ---------------------------------------------------
//  Tag
// ---------------------------------------------------
var Tag = function(pos, text, dir, style) {

  var segments = [
    pos,
    [pos.x + 7, pos.y - 7],
    [pos.x + 100, pos.y - 7],
    [pos.x + 100, pos.y + 7],
    [pos.x + 7, pos.y + 7]
  ];

  var path = new Path({
    segments: segments,
    closed: true
  });

  this.text = new PointText({
    point: [pos.x + 10, pos.y + 3],
    content: text,
    fillColor: darkBlue,
    fontFamily: 'Courier New',
    fontSize: 10
  });

  if (dir === 'reverse') {
    path.rotate(180, pos);
    this.text.position.x = this.text.position.x - 105;
  }

  this.group = new Group({
    children: [path],
    strokeColor: darkBlue
  });

  // Assign styles to this path
  for (var prop in style) {
    if( style.hasOwnProperty(prop) ) {
      this.group[prop] = style[prop];
    }
  }
};
Tag.prototype.glow = function() {
  this.text.strokeColor = '#E1F5F7';
};
Tag.prototype.reset = function() {
  this.text.strokeColor = darkBlue;
};


// ---------------------------------------------------
//  Arrow
// ---------------------------------------------------
var Arrow = function(pos, b, dir) {

  var SQRT_3 = Math.pow(3, 0.5);
  var a = 10;
  var l = b ? pos.y + b : pos.y + a;

  var segments = [
    [pos.x, l],
    [pos.x + a/2, l],
    [pos.x, l + SQRT_3 * a/2],
    [pos.x - a/2, l]
  ];

  this.head = new Path({
    segments: segments,
    closed: true,
    strokeColor: darkBlue,
    strokeWidth: 0.5
  });

  this.shaft = new Path({
    segments: [pos, [pos.x, l] ],
    closed: true,
    strokeColor: darkBlue,
    strokeWidth: 0.5
  });

  this.group = new Group({
    children: [this.head, this.shaft],
  });

  if (dir === 'up') {
    this.group.rotate(180, pos);
    var k = b ? pos.y - b : pos.y - a;
  } else {
    var k = b ? pos.y + b : pos.y + a;
  }
  // Build live wire animation
  this.live = new AnimatedLine(pos, new Point(pos.x, k), 10);
};
Arrow.prototype.glow = function() {
  this.head.strokeColor = 'white';
};
Arrow.prototype.reset = function() {
  this.head.strokeColor = darkBlue;
};


// ---------------------------------------------------
//  Resistance
// ---------------------------------------------------
var Resistance = function(pos, dir) {

  var SQRT_3 = Math.pow(3, 0.5);
  var a = 5;

  var segments = [
    pos,
    [pos.x - a, pos.y + a/2],
    [pos.x + a, pos.y + a],
    [pos.x - a, pos.y + 1.5*a],
    [pos.x + a, pos.y + 2*a],
    [pos.x - a, pos.y + 2.5*a],
    [pos.x, pos.y + 3*a]
  ];

  this.path = new Path({
    segments: segments,
    strokeColor: darkBlue,
    strokeWidth: 0.75
  });

  if (dir === 'left')
    this.path.rotate(90, pos);
};
Resistance.prototype.glow = function() {
  this.path.strokeColor = 'white';
};
Resistance.prototype.reset = function() {
  this.path.strokeColor = darkBlue;
};

// ---------------------------------------------------
//  Wire
// ---------------------------------------------------
var Wire = function(length, dir, pos, joint, atEnd, style) {

  var segments = [pos];

  if (dir === 'left')
    segments.push(pos.add(new Point(-length, 0)));
  if (dir === 'right')
    segments.push(pos.add(new Point(length, 0)));
  if (dir === 'up')
    segments.push(pos.add(new Point(0, -length)));
  if (dir === 'down')
    segments.push(pos.add(new Point(0, length)));

  // Build the path
  this.path = new Path({
    segments: segments,
    closed: true,
    strokeWidth: 0.5,
    strokeColor: darkBlue
  });

  // Build live wire animation
  this.live = new AnimatedLine(segments[0], segments[1], 10);

  // Assign styles to this path
  for (var prop in style) {
    if( style.hasOwnProperty(prop) ) {
      this.path[prop] = style[prop];
    }
  }

  // Add a joint
  if (joint) {

    if (atEnd)
      this.joint = new Path.Circle({
        center: segments[1],
        radius: 2,
        fillColor: darkBlue,
        strokeColor: darkBlue
      })
    else
      this.joint = new Path.Circle({
        center: pos,
        radius: 2,
        fillColor: darkBlue,
        strokeColor: darkBlue
      })

    // Assign styles to this path
    for (var prop in style) {
      if( style.hasOwnProperty(prop) ) {
        this.joint[prop] = style[prop];
      }
    }
  }
};
Wire.prototype.glow = function() {
  if (this.joint) {
    this.joint.strokeColor = lightBlue;
    this.joint.fillColor = lightBlue;
  }
};
Wire.prototype.reset = function() {
  if (this.joint) {
    this.joint.strokeColor = darkBlue;
    this.joint.fillColor = darkBlue;
  }
};