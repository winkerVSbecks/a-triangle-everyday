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

  // RIGHT OF TRIANGLE
  var P_R = triangle.path.segments[0].point;
  var J_1 = P_R.add([20, 0]);

  // Bridge
  wires.push(new Wire(50, 'right', P_R));
  wires.push(new Wire(100, 'down', J_1, true));
  wires.push(new Wire(50, 'left', J_1.add([0, 100]) ));
  bits.push(new Resistance(J_1.add([-50, 100]), 'left'));
  wires.push(new Wire(30, 'left', J_1.add([-65, 100]) ));
  wires.push(new Wire(85, 'up', J_1.add([-95, 100]), true, true));

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


  // LEFT OF TRIANGLE

  // Bottom track
  var J_6 = J_1.add([-72, 15]);
  wires.push(new Wire(60, 'left', J_6));
  wires.push(new Wire(60, 'down', J_6.add([-60, 0]) ));
  wires.push(new Wire(15, 'left', J_6.add([-60, 60]) ));
  bits.push(new Resistance(J_6.add([-75, 60]), 'left'));
  wires.push(new Wire(15, 'left', J_6.add([-90, 60]) ));

  // Top track
  var J_7 = J_6.add([0, -30]);
  wires.push(new Wire(180, 'left', J_7));
  bits.push(new Resistance(J_7.add([-180, 0]), 'left'));
  wires.push(new Wire(15, 'left', J_7.add([-195, 0]) ));
  arrows.push(new Arrow(J_7.add([-210, 0]), 30, 'up'));

  // First vertical
  var J_8 = J_7.add([-85, 0]);
  wires.push(new Wire(15, 'down', J_8 ));
  bits.push(new Resistance(J_8.add([0, 15]), 'down'));
  arrows.push(new Arrow(J_8.add([0, 30]), 40));

  // Second vertical
  var J_9 = J_7.add([-115, 0]);
  wires.push(new Wire(15, 'down', J_9 ));
  // bits.push(new Resistance(J_8.add([0, 15]), 'down'));
  arrows.push(new Arrow(J_9.add([0, 25]), 40));
};