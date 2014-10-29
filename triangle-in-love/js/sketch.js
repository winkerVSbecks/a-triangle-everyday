paper.install(window);
var SQRT_3 = Math.pow(3, 0.5);
var pink = '#F7E1DF';
var red = '#EF5352';
var orange = '#FF9418';
var triangle, arrow;

window.onload = function() {
  paper.setup('triangle-in-love');

  // Draw the BG
  var background = new Path.Rectangle(view.bounds);
      background.fillColor = pink;
  arrow = new Arrow(100);
  triangle = new Triangle(100);

  paper.view.draw();

  paper.view.onFrame = function(event) {
    triangle.blink();
    arrow.fly();
  };
};

window.onresize = function() {
  project.clear();
  var background = new Path.Rectangle(view.bounds);
      background.fillColor = pink;
  arrow = new Arrow(100);
  triangle = new Triangle(100);
};


// ---------------------------------------------------
//  Triangle
// ---------------------------------------------------
var Triangle = function(a) {
  this.counter = 0
  // Body
  this.body = new Path({
    segments: [new paper.Point(0, -a / SQRT_3),
               new paper.Point(-a/2, a * 0.5 / SQRT_3),
               new paper.Point(a/2, a * 0.5 / SQRT_3)],
    closed: true,
    fillColor: red
  });
  // Left Leg
  this.leftLeg = new Path({
    segments: [new paper.Point(-a/8, a * 0.5 / SQRT_3),
               new paper.Point(-a/8, a * 0.5 / SQRT_3 + 10),
               new paper.Point(-a/8 - 10, a * 0.5 / SQRT_3 + 10)],
    strokeColor: red,
    strokeWidth: 2
  });
  // Right Leg
  this.rightLeg = new Path({
    segments: [new paper.Point(a/8, a * 0.5 / SQRT_3),
               new paper.Point(a/8, a * 0.5 / SQRT_3 + 10),
               new paper.Point(a/8 + 10, a * 0.5 / SQRT_3 + 10)],
    strokeColor: red,
    strokeWidth: 2
  });
  // Left Eye
  this.leftEye = new Path.Circle({
    center: [-5, -a / SQRT_3 + 30],
    radius: 2,
    fillColor: '#fff'
  });
  // Right Eye
  this.rightEye = new Path.Circle({
    center: [5, -a / SQRT_3 + 30],
    radius: 2,
    fillColor: '#fff'
  });
  // Mouth
  this.mouth = new Path.Arc({
    from: [-10, -a / SQRT_3 + 40],
    through: [0, -a / SQRT_3 + 40],
    to: [10, -a / SQRT_3 + 40],
    strokeColor: '#fff'
  });

  this.group = new Group({
    children: [this.body, this.leftLeg, this.rightLeg, this.leftEye, this.rightEye, this.mouth],
    position: view.center
  });

  this.mouthPos = this.mouth.position;
  this.isSmiling = false;
  this.a = a;
};

Triangle.prototype.blink = function() {
  if (this.counter > 150 && this.counter <= 159) {
    this.leftEye.scale(1, 0.9);
    this.rightEye.scale(1, 0.9);
  } if (this.counter > 159) {
    this.leftEye.scale(1, 1/0.387420489);
    this.rightEye.scale(1, 1/0.387420489);
    this.counter = 0;
  }
  this.counter++;
};

Triangle.prototype.smile = function(a) {
  this.group.children[5].remove();

  this.group.addChild(new Path.Arc({
    from: [-10, -a / SQRT_3 + 40],
    through: [0, -a / SQRT_3 + 45],
    to: [10, -a / SQRT_3 + 40],
    strokeColor: '#fff'
  }));

  this.group.children[5].position = this.mouthPos;
  this.isSmiling = true;
};

Triangle.prototype.reset = function(a) {
  this.group.children[5].remove();

  this.group.addChild(new Path.Arc({
    from: [-10, -a / SQRT_3 + 40],
    through: [0, -a / SQRT_3 + 40],
    to: [10, -a / SQRT_3 + 40],
    strokeColor: '#fff'
  }));

  this.group.children[5].position = this.mouthPos;
  this.isSmiling = false;
};


// ---------------------------------------------------
//  Arrow
// ---------------------------------------------------
var Arrow = function(a) {
  var shaft = new Path({
    segments: [new paper.Point(0, 0),
               new paper.Point(0, -a*0.75)],
    strokeColor: orange
  });
  var head = new Path({
    segments: [new paper.Point(-2, -a*0.75 + 5),
               new paper.Point(0, -a*0.75 - 3),
               new paper.Point(2, -a*0.75 + 5)],
    closed: true,
    fillColor: orange
  });

  this.children = [shaft, head];
  this.buildFletchings();

  this.group = new Group({
    children: this.children
  });

  // Calculate velocity and angular velocity
  this.g = new Point(0, 0.1);
  this.reset(true);
};

Arrow.prototype.buildFletchings = function() {
  for (var i = 0; i <= 4; i++) {
    this.children.push(new Path({
      segments: [new paper.Point(0, -2 * (i+1)),
                 new paper.Point(3*Math.cos(Math.PI/4),
                                 -2*(i+1) + 3*Math.cos(Math.PI/4))],
      strokeColor: orange
    }));
    this.children.push(new Path({
      segments: [new paper.Point(0, -2 * (i+1)),
                 new paper.Point(-3*Math.cos(Math.PI/4),
                                 -2*(i+1) + 3*Math.cos(Math.PI/4))],
      strokeColor: orange
    }));
  };
};

Arrow.prototype.fly = function() {
  if(view.center.x - this.group.position.x > 40 && this.counter > 370) {
    this.group.position = this.group.position.add(this.vel);
    this.vel = this.vel.add(this.g);
    this.group.rotate(this.delta);
  } else if (view.center.x - this.group.position.x <= 40 && !triangle.isSmiling)
    triangle.smile(100);
  else if (this.counter > 900) {
    this.reset();
    triangle.reset(100);
  }
  this.counter++;
};

Arrow.prototype.reset = function(firstTime) {
  this.group.position = [-view.center.x/2, view.center.y-50]
  var range = view.center.x - this.group.position.x;
  var launchAngle = 15;
  if (firstTime)
    this.group.rotate(launchAngle);
  else
    this.group.rotate(-90 + launchAngle - 45);

  var velMag = Math.pow(range * this.g.y / Math.sin(2 * launchAngle * Math.PI/180) , 0.5) * 0.95;

  this.vel = new Point({
    length: velMag,
    angle: -launchAngle
  });
  this.delta = (90 - launchAngle + 45) * this.vel.x/range;
  this.counter = 0;
};