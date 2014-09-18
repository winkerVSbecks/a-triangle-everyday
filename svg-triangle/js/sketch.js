window.onload = function() {
  var points = '0,' + -120/1.73205080757 + ' ' + -120/2 + ',' + 120*0.5/1.73205080757 + ' ' + 120/2 + ',' + 120*0.5/1.73205080757;
  var svg = document.getElementById('triangle');
  var poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  poly.setAttribute('points', points);
  poly.setAttribute('fill', '#FFFFC6');
  svg.appendChild(poly);
};