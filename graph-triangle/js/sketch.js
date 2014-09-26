paper.install(window);
var SQRT_3 = Math.pow(3, 0.5);
var black = '#505A78';
var darkGrey = '#707890'
var grey = '#C2C5D0';
var red = '#F79C82';

window.onload = function() {
  paper.setup('graph-triangle');
  draw(paper.view.getSize().width, paper.view.getSize().height);
  paper.view.draw();
};

window.onresize = function() {
  project.clear();
  draw(paper.view.getSize().width, paper.view.getSize().height);
};

// The main draw
var draw = function(_w, _h) {
  var w = Math.min(600, 0.75 * _w);
  var h = 0.75 * _h;
  var xC = _w / 2;
  var yC = _h / 2;
  var triangleHeight = Math.pow(3, 0.5) * w / 2;

  // Draw the x axis
  var xAxis = new Path.Line({
    from: [xC - w / 2, yC + h / 2],
    to: [xC + w / 2, yC + h / 2],
    strokeColor: black
  });
  var xLabel = new PointText({
    point: [xC + w / 2 - 10, yC + h / 2 + 15],
    content: 'Horizontal Position on the Page',
    fillColor: darkGrey,
    fontSize: 12,
    justification: 'right'
  });

  // Draw the y axis
  var xAxis = new Path.Line({
    from: [xC - w / 2, yC + h / 2],
    to: [xC - w / 2, yC - h / 2],
    strokeColor: black
  });
  var yLabel = new PointText({
    point: [xC - w / 2 - 5, yC - h / 2 + 10],
    content: 'Number of Triangles',
    fillColor: darkGrey,
    fontSize: 12,
    justification: 'right'
  });
  var yLabelPivot = yLabel.bounds.bottomRight;
  yLabel.rotate(-90, yLabelPivot);

  // Draw scale
  var scale = new Path.Line({
    from: [xC - w / 2, yC + h / 2 - triangleHeight],
    to: [xC + w / 2, yC + h / 2 - triangleHeight],
    strokeColor: red,
    dashArray: [10, 4]
  });
  var scaleLabel = new PointText({
    point: [xC + w / 2 - 10, yC + h / 2 - triangleHeight - 5],
    content: '1',
    fillColor: red,
    fontSize: 12,
    justification: 'right'
  });

  // Draw the graph
  var graph = new Path({
    segments: [[xC - w / 2, yC + h / 2],
               [xC, yC + h / 2 - triangleHeight],
               [xC + w / 2, yC + h / 2]],
    strokeColor: grey
  });
};