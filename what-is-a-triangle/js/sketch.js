paper.install(window);
var SQRT_3 = Math.pow(3, 0.5);
var red = '#DF6B6A';
var black = '#333';
var grey = '#999';
var blue = '#38B8D2';

window.onload = function() {
  paper.setup('what-is-a-triangle');
  document.getElementById('what-is-a-triangle').style.backgroundColor = '#F5F5F5';
  bootstrap();
  paper.view.draw();
};

window.onresize = function() {
  project.clear();
  bootstrap();
};

var bootstrap = function() {
  var center = new Path.Circle(new Point(paper.view.center), 0.5 );
  center.strokeColor = red;
  var centerLabel = new PointText(paper.view.center.x, paper.view.center.y + 15);
  centerLabel.content = '(0,0)';
  centerLabel.fillColor = grey;
  centerLabel.justification = 'center';

  drawTriangle(Math.max(200, Math.min(paper.view.size.width, paper.view.size.height) - 400));
};


var drawTriangle = function(a) {
  var x_off = paper.view.center.x;
  var y_off = paper.view.center.y;

  var p1 = new paper.Point(0 + x_off, -a / SQRT_3 + y_off);
  var p2 = new paper.Point(-a/2 + x_off, a * 0.5 / SQRT_3 + y_off);
  var p3 = new paper.Point(a/2 + x_off, a * 0.5 / SQRT_3 + y_off);

  sideVector(p1, p3, '(0, -' + a + '/√3)', [0, -20]);
  sideVector(p3, p2, '(-' + a + '/2, ' + a + '/2√3)', [50, -20]);
  sideVector(p2, p1, '(' + a + '/2, ' + a + '/2√3)', [0, 25]);
};


// ------------------------------------------------------------------
//    Vector Drawing Code is a modified version of:
//    http://paperjs.org/tutorials/geometry/vector-geometry
// ------------------------------------------------------------------
function sideVector(vectorStart, e, coord_label, coord_offset) {
  var vectorItem, items, dashedItems;
  var vector = e.subtract(vectorStart);

  if (items) {
    for (var i = 0, l = items.length; i < l; i++) {
      items[i].remove();
    }
  }

  items = [];
  var arrowVector = vector.normalize(10);
  var end = vectorStart.add(vector);
  vectorItem = new Group([
    new Path([vectorStart, end]),
    new Path([
      end.add(arrowVector.rotate(150)),
      end,
      end.add(arrowVector.rotate(-150))
    ])
  ]);
  vectorItem.strokeWidth = 1;
  vectorItem.strokeColor = black;
  // Display:
  dashedItems = [];
  // Draw Labels
  drawAngle(vectorStart, vector);
  drawLength(vectorStart, end, vector.angle < 0 ? -1 : 1, true);
  drawCoordinates(vectorStart, coord_label, coord_offset);

  var quadrant = vector.quadrant;

  for (var i = 0, l = dashedItems.length; i < l; i++) {
    var item = dashedItems[i];
    item.strokeColor = blue;
    item.dashArray = [1, 2];
    items.push(item);
  }


  function drawAngle(center, vector) {
    var radius = 25, threshold = 10;
    if (vector.length < radius + threshold || Math.abs(vector.angle) < 15)
      return;
    var from = new Point(radius, 0);
    var through = from.rotate(vector.angle / 2);
    var to = from.rotate(vector.angle);
    var end = center.add(to);
    dashedItems.push(new Path.Line(center,
        center.add(new Point(radius + threshold, 0))));
    dashedItems.push(new Path.Arc(center.add(from), center.add(through), end));
    var arrowVector = to.normalize(7.5).rotate(vector.angle < 0 ? -90 : 90);
    dashedItems.push(new Path([
      end.add(arrowVector.rotate(135)),
      end,
      end.add(arrowVector.rotate(-135))
    ]));
    // Angle Label
    var text = new PointText((center.add(through.normalize(radius + 10))).add( new Point(0, 3)));
    text.content = Math.ceil(Math.floor(vector.angle * 100) / 100) + '°';
    text.fillColor = grey;
    items.push(text);
  }

  function drawLength(from, to, sign, label, value, prefix) {
    var lengthSize = 5;
    if (to.subtract(from).length < lengthSize * 4)
      return;
    var vector = to.subtract(from);
    var awayVector = vector.normalize(lengthSize).rotate(90 * sign);
    var upVector = vector.normalize(lengthSize).rotate(45 * sign);
    var downVector = upVector.rotate(-90 * sign);
    var lengthVector = vector.normalize(
        vector.length / 2 - lengthSize * Math.sqrt(2));
    var line = new Path();
    line.add(from.add(awayVector));
    line.lineBy(upVector);
    line.lineBy(lengthVector);
    line.lineBy(upVector);
    var middle = line.lastSegment.point;
    line.lineBy(downVector);
    line.lineBy(lengthVector);
    line.lineBy(downVector);
    dashedItems.push(line);
    if (label) {
      // Length Label
      var textAngle = Math.abs(vector.angle) > 90
          ? textAngle = 180 + vector.angle : vector.angle;
      // Label needs to move away by different amounts based on the
      // vector's quadrant:
      var away = (sign >= 0 ? [1, 4] : [2, 3]).indexOf(vector.quadrant) != -1
          ? 8 : 0;
      value = value || vector.length;
      var text = new PointText({
        point: middle.add(awayVector.normalize(away + lengthSize)),
        content: (prefix || '') + Math.floor(value * 1000) / 1000,
        fillColor: grey,
        justification: 'center'
      });
      text.rotate(textAngle);
      items.push(text);
    }
  }

  function drawCoordinates(at, title, offset) {
    var text = new PointText(at.x + offset[0], at.y + offset[1]);
    text.content = title;
    text.fillColor = red;
    text.justification = 'center';
    items.push(text);
  }
}