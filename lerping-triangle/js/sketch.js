var triangles = [];
var count = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(212, 127, 148, 100);
  strokeWeight(2);
  noFill();

  for (var i = 0; i < count; i++) {
    triangles.push(new Triangle(4*i));
  }
}


function draw() {
  background(233,186,186);
  push();
    translate(width/4, height/4);
    for (var i = 0; i < count; i++) {
      triangles[i].draw();
    }
  pop();
}


var lerpSide = function(u, v) {
  var points = [];

  for (var i = 0; i <= 12; i++) {
    var k = u.lerp(v, i/12);
    points.push(new p5.Vector(k.x, k.y));
  };

  return points;
};

var Triangle = function(s) {
  var a = new p5.Vector(-s, 0);
  var b = new p5.Vector(s, 0);
  var c = new p5.Vector(0, -s * 0.5 * Math.pow(3, 1/2));
  this.sideA = lerpSide(a.get(), b.get());
  this.sideB = lerpSide(b.get(), c.get());
  this.sideC = lerpSide(c.get(), a.get());
  this.thetaA = Math.PI;
  this.thetaB = Math.PI/4.4;
  this.thetaC = -Math.PI/4.4;
  this.speed = 0.05;
};


Triangle.prototype.drawLines = function(side, theta) {

  for (var i = side.length - 1; i >= 1; i--) {
    var r = dist(side[i].x,
                 side[i].y,
                 side[i-1].x,
                 side[i-1].y);
    line(side[i].x,
         side[i].y,
         side[i].x + r * Math.cos(theta),
         side[i].y + r * Math.sin(theta));
  }
};

Triangle.prototype.draw = function() {
  this.drawLines(this.sideA, this.thetaA);
  this.drawLines(this.sideB, this.thetaB);
  this.drawLines(this.sideC, this.thetaC);
  this.thetaA = this.thetaA + this.speed;
  this.thetaB = this.thetaB + this.speed;
  this.thetaC = this.thetaC + this.speed;
};