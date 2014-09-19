window.onload = function() {
  var starts = ['#FFA398', '#FF7465', '#FF5C4D', '#FF4633'];
  var stops = ['#FF8EAC', '#FF5681', '#FF3B6C', '#FF1F58'];

  var svg = document.getElementById('triangle');

  for (var i = 0; i < 4; i++) {
    var g = createGradient(svg, 'g' + i, [
      { offset:'0%', 'stop-color': starts[i] },
      { offset:'100%', 'stop-color': stops[i] }
    ]);

    makeTrianlge(svg, 120 - 20 * i, 'g' + i, 'tri' + i);
  };
};

var makeTrianlge = function(svg, s, grad, id) {
  var SQRT_3 = 1.73205080757;

  var points = '0,' + -s / SQRT_3 + ' ' +
               -s/2 + ',' + s * 0.5 / SQRT_3 + ' ' +
               s/2 + ',' + s * 0.5 / SQRT_3;

  var poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  poly.setAttribute('id', id);
  poly.setAttribute('points', points);
  poly.setAttribute('fill', 'url(#' + grad + ')');
  svg.appendChild(poly);
};


var createGradient = function(svg, id, stops){
  var svgNS = svg.namespaceURI;
  var grad  = document.createElementNS(svgNS, 'linearGradient');

  grad.setAttribute('id', id);

  for(var i = 0; i < stops.length; i++) {
    var attrs = stops[i];
    var stop = document.createElementNS(svgNS, 'stop');
    for (var attr in attrs){
      if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr, attrs[attr]);
    }
    grad.appendChild(stop);
  }

  grad.setAttribute('x1', '0%');
  grad.setAttribute('y1', '0%');
  grad.setAttribute('x2', '100%');
  grad.setAttribute('y2', '100%');

  var defs = svg.querySelector('defs') ||
    svg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild);
  return defs.appendChild(grad);
}