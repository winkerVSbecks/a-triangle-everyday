paper.install(window);

var darkBlue = '#006680';
var lightBlue = '#00CCFF';
var triangle;
var triangles = [];
var wires = [];
var bits = [];
var tags = [];
var arrows = [];

window.onload = function() {
  paper.setup('its-alive');
  // Background
  var background = new Path.Rectangle(view.bounds);
      background.fillColor = '#000';

  buildCircuit();

  paper.view.draw();

  // Animation
  paper.view.onFrame = function (event) {

  };
};

// Handle re-size
window.onresize = function() {

};

var buildCircuit = function() {
  var SQRT_3 = Math.pow(3, 0.5);

  // Triangle Arrows
  arrows.push(new Arrow(view.center.add([-10, 20]), 40));
  arrows.push(new Arrow(view.center.add([-10, -20]), 40, 'up'));

  // Main triangle
  triangle = new Triangle(60, view.center, {
    rotation: 90
  });

  var P_R = triangle.path.segments[0].point;
  var J_1 = P_R.add([20, 0]);

  // Bridge
  wires.push(new Wire(50, 'right', P_R));
  wires.push(new Wire(100, 'down', J_1, true));

  // Capacitor
  var J_2 = J_1.add([30, 0]);
  bits.push(new Capacitor(J_2));
  wires.push(new Wire(60, 'right', J_2.add([6, 0]) ));

  // Left most vertical
  var diodeLength = SQRT_3 * 20 / 2;
  wires.push(new Wire(30, 'down', J_2.add([36, 0]), true));
  bits.push(new Diode(J_2.add([36, 30]), diodeLength, 'down'));
  arrows.push(new Arrow(J_2.add([36, 30 + diodeLength]), 28));

  // Diode
  var J_3 = J_2.add([66, 0]);
  bits.push(new Diode(J_3, diodeLength));

  // Long Wire
  var J_4 = J_3.add([diodeLength, 0]);
  wires.push(new Wire(150, 'right', J_4));

  // Middle Vertical
  wires.push(new Wire(30, 'down', J_4.add([30, 0]), true));
  bits.push(new Capacitor(J_4.add([30, 30]), 'down'));
  arrows.push(new Arrow(J_4.add([30, 36]), 39));

  // Right most vertical
  wires.push(new Wire(30, 'down', J_4.add([90, 0]), true));
  bits.push(new Resistance(J_4.add([90, 30]), 'down'));
  arrows.push(new Arrow(J_4.add([90, 30 + 15]), 30));

  // Arduino Tags
  var J_5 = J_4.add([150, 0]);
  tags.push(new Tag(J_5, 'Arduino A0-5'));
  tags.push(new Tag(J_5.add([0, 60]), 'Arduino GND'));

  // Arrow
  wires.push(new Wire(15, 'right', J_5.add([-15, 60]) ));
  var k = SQRT_3 * 15 / 2;
  arrows.push(new Arrow(J_5.add([-15, 60]) ));
};