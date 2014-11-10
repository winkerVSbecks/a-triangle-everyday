// ---------------------------------------------------
//  Levels
// ---------------------------------------------------
var Levels = function(pos) {

  var rec = new Path.Rectangle({
    point: [-50, -20],
    size: [100, 20],
    radius: 2,
    strokeColor: grey,
  });

  var l1 = new Path.Line({
    from: [-50, -10],
    to: [-70, -10],
    strokeColor: grey,
  });
  var l2 = new Path.Line({
    from: [50, -10],
    to: [70, -10],
    strokeColor: grey,
  });

  var t1 = new Path({
    segments: [
      [-20, -25],
      [0, -25],
      [0, -35],
      [0, -25],
      [20, -25]
    ],
    strokeColor: grey,
  });
  var t2 = new Path({
    segments: [
      [-20, 5],
      [0, 5],
      [0, 15],
      [0, 5],
      [20, 5]
    ],
    strokeColor: grey,
  });

  this.fill = new Path({
    segments: [
      [-47.5, -10],
      [47.5, -10]
    ],
    strokeWidth: 15,
    strokeColor: lightBlue
  });

  this.text = new PointText({
    point: [0, -6],
    justification: 'center',
    fontSize: 10,
    fillColor: 'white'
  });

  this.group = new Group({
    children: [rec, l1, l2, t1, t2, this.fill, this.text],
  });
  this.group.position = pos;
  this.group.opacity = 0;

  this.newDest();
  this.s = this.fill.segments[0].point.x;
  this.e = this.fill.segments[1].point.x;
};

Levels.prototype.draw = function() {

  if (this.group.opacity < 1) {
    this.group.opacity += 0.05;
  }


  if (Math.abs(this.dest - this.fill.segments[1].point.x) > 0.5) {

    if (this.dest < this.fill.segments[1].point.x)
      this.fill.segments[1].point.x--;
    else
      this.fill.segments[1].point.x++;

    this.text.content = Math.round(this.fill.segments[1].point.x);

  } else {
    this.newDest();
  }
};

Levels.prototype.newDest = function() {
  this.dest = randomNumber(this.s, this.e);
};