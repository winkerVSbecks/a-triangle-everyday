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
  buildText();
  triangle.light.bringToFront();

  for (var i = wires.length - 1; i >= 0; i--) {
    wires[i].path.strokeColor = lightBlue;
  };

  paper.view.draw();

  // Animation
  paper.view.onFrame = function (event) {
    triangle.glow(event.time);
  };
};

// Handle re-size
window.onresize = function() {
  var background = new Path.Rectangle(view.bounds);
      background.fillColor = '#000';
  buildCircuit();
  buildText();
  triangle.light.bringToFront();
};

var buildCircuit = function() {
  var SQRT_3 = Math.pow(3, 0.5);

  // Triangle Arrows
  arrows.push(new Arrow(view.center.add([-10, 20]), 40));
  arrows.push(new Arrow(view.center.add([-10, -20]), 40, 'up'));

  // Triangle lines
  wires.push(new Wire(20, 'up', view.center.add([10, -10]) ));
  wires.push(new Wire(20, 'down', view.center.add([10, 10]) ));

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
  wires.push(new Wire(22, 'left', J_6.add([-90, 60]) ));
  bits.push(new NonPolCapacitor(J_6.add([-112, 60]) ));
  wires.push(new Wire(93, 'left', J_6.add([-117, 60]) ));

  // Top track
  var J_7 = J_6.add([0, -30]);
  wires.push(new Wire(180, 'left', J_7));
  bits.push(new Resistance(J_7.add([-180, 0]), 'left'));
  wires.push(new Wire(15, 'left', J_7.add([-195, 0]) ));
  arrows.push(new Arrow(J_7.add([-210, 0]), 30, 'up'));

  // First vertical
  var J_8 = J_7.add([-85, 0]);
  wires.push(new Wire(15, 'down', J_8, true));
  bits.push(new Resistance(J_8.add([0, 15]), 'down'));
  arrows.push(new Arrow(J_8.add([0, 30]), 30));

  // Second vertical
  var J_9 = J_7.add([-115, 0]);
  wires.push(new Wire(15, 'down', J_9, true));
  bits.push(new NonPolCapacitor(J_9.add([0, 20]), 'down'));
  arrows.push(new Arrow(J_9.add([0, 20]), 40));

  // Amp Tip tag
  tags.push(new Tag(J_6.add([-210, 60]), 'Amp "Tip"', 'reverse'));

  // Amp GND tag
  tags.push(new Tag(J_6.add([-210, 90]), 'Amp Bat GND', 'reverse'));

  // Bottom arrow
  wires.push(new Wire(15, 'right', J_6.add([-210, 90]) ));
  arrows.push(new Arrow(J_6.add([-195, 90]) ));
};


var buildText = function() {
  var c = view.center;
  var textGroup = new Group();

  textGroup.addChild(new PointText({
    point: c.add([-237, -60]),
    content: '+5v'
  }));
  textGroup.addChild(new PointText({
    point: c.add([-215, -25]),
    content: 'R3'
  }));
  textGroup.addChild(new PointText({
    point: c.add([-212, 2]),
    content: '47K'
  }));
  textGroup.addChild(new PointText({
    point: c.add([-175, 10]),
    content: '0.1 uf'
  }));
  textGroup.addChild(new PointText({
    point: c.add([-162, -3]),
    content: 'C2'
  }));
  textGroup.addChild(new PointText({
    point: c.add([-155, 70]),
    content: 'C1'
  }));
  textGroup.addChild(new PointText({
    point: c.add([-150, 95]),
    content: '0.1 uf'
  }));
  textGroup.addChild(new PointText({
    point: c.add([-110, 92]),
    content: '1K'
  }));
  textGroup.addChild(new PointText({
    point: c.add([-110, 65]),
    content: 'R1'
  }));
  textGroup.addChild(new PointText({
    point: c.add([-110, -20]),
    content: 'R4'
  }));
  textGroup.addChild(new PointText({
    point: c.add([-110, -30]),
    content: '2.5 VG'
  }));
  textGroup.addChild(new PointText({
    point: c.add([-93, 5]),
    content: '47K'
  }));
  textGroup.addChild(new PointText({
    point: c.add([-32, 12]),
    content: '2'
  }));
  textGroup.addChild(new PointText({
    point: c.add([-32, -18]),
    content: '3'
  }));
  textGroup.addChild(new PointText({
    point: c.add([-10, -75]),
    content: '+5v'
  }));
  textGroup.addChild(new PointText({
    point: c.add([-3, -22]),
    content: '7'
  }));
  textGroup.addChild(new PointText({
    point: c.add([-3, 27]),
    content: '4'
  }));
  textGroup.addChild(new PointText({
    point: c.add([15, -12]),
    content: '5'
  }));
  textGroup.addChild(new PointText({
    point: c.add([15, 17]),
    content: '1'
  }));
  textGroup.addChild(new PointText({
    point: c.add([28, -3]),
    content: '6'
  }));
  textGroup.addChild(new PointText({
    point: c.add([-12, 90]),
    content: 'R2'
  }));
  textGroup.addChild(new PointText({
    point: c.add([-12, 115]),
    content: '1 Meg'
  }));
  textGroup.addChild(new PointText({
    point: c.add([80, -15]),
    content: 'C4'
  }));
  textGroup.addChild(new PointText({
    point: c.add([80, 20]),
    content: '10 uf'
  }));
  textGroup.addChild(new PointText({
    point: c.add([122, 25]),
    content: 'D1'
  }));
  textGroup.addChild(new PointText({
    point: c.add([135, 60]),
    content: '1N4148'
  }));
  textGroup.addChild(new PointText({
    point: c.add([170, 12]),
    content: 'D2'
  }));
  textGroup.addChild(new PointText({
    point: c.add([150, -15]),
    content: '1N4148'
  }));
  textGroup.addChild(new PointText({
    point: c.add([200, 25]),
    content: 'C3'
  }));
  textGroup.addChild(new PointText({
    point: c.add([213, 55]),
    content: '0.1 uf'
  }));
  textGroup.addChild(new PointText({
    point: c.add([275, 35]),
    content: 'R5\n1 Meg'
  }));

  textGroup.style = {
    fillColor: darkBlue,
    fontFamily: 'Courier New',
    fontSize: 10,
    justification: 'center'
  };

  new PointText({
    point: c.add([180, 110]),
    content: 'C3 RC Delay Values:\n' +
      '0.1 uf @ ~ 100 msecs\n' +
      '470 nf @ ~ 0.5 secs\n' +
      '2.2 uf @ ~ 2.2 secs\n' +
      '5 uf @ ~ 5 secs\n',
    fillColor: '#2CAAA9',
    fontFamily: 'Courier New',
    fontSize: 10
  });

  new PointText({
    point: c.add([-50, 150]),
    content: 'Notes:\n' +
      'Voltage gain = R2/R1\n' +
      '1 Meg / 1K = 1000  --- 60 db gain\n\n' +
      'D1 & D2 forms a voltage doubler rectifier & peak detector\n' +
      'R5 & C3 forms a RC delay for Arduino Analog input\n',
    fillColor: '#0065B3',
    fontFamily: 'Courier New',
    fontSize: 10
  });
};