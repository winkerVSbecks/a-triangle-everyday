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



// ---------------------------------------------------
//  Tag
// ---------------------------------------------------
var Tag = function(pos, text, style) {

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

  var text = new PointText({
    point: [pos.x + 10, pos.y + 3],
    content: text,
    fillColor: darkBlue,
    fontFamily: 'Courier New',
    fontSize: 10
  });

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


// ---------------------------------------------------
//  Arrow
// ---------------------------------------------------
var Arrow = function(pos, b, dir) {

  var SQRT_3 = Math.pow(3, 0.5);
  var a = 10;
  var l = b ? pos.y + b : pos.y + a;

  var segments = [
    pos,
    [pos.x, l],
    [pos.x + a/2, l],
    [pos.x, l + SQRT_3 * a/2],
    [pos.x - a/2, l],
    [pos.x, l]
  ];

  this.path = new Path({
    segments: segments,
    closed: true,
    strokeColor: darkBlue
  });

  if (dir === 'up')
    this.path.rotate(180, pos);
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
    strokeColor: darkBlue
  });

  if (dir === 'left')
    this.path.rotate(90, pos);
};


// ---------------------------------------------------
//  Wire
// ---------------------------------------------------
var Wire = function(length, dir, pos, joint, style) {

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
    strokeColor: darkBlue
  });

  // Assign styles to this path
  for (var prop in style) {
    if( style.hasOwnProperty(prop) ) {
      this.path[prop] = style[prop];
    }
  }

  // Add a joint
  if (joint) {

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
