// -------------------------------------------------------------------
//  Based on the work of Hakim El Hattab
//  https://github.com/hakimel/css/blob/master/checkwave/index.html
// -------------------------------------------------------------------
var w, h, triangle, checkboxes;
var SQRT_3 = Math.pow(3, 0.5);

window.onload = function() {
  triangle = document.getElementById('triangle');
  buildTriangle();
};

window.onresize = function() {
  buildTriangle();
};

var buildTriangle = function() {
  var a = calcA();
  var h = SQRT_3 * 0.5 * a;
  var s = 20;
  var RES_X = Math.round(a / s);
  var RES_Y = Math.round(h / s);

  var xOff = 0;
  // See how many cheboxes we can fit in y direction
  // before the x count becomes zero
  RES_Y = calcYCount(RES_X, RES_Y);
  checkboxes = [];

  triangle.style.width = RES_X * s + 'px';
  triangle.style.height = RES_Y * s + 'px';

  // Remove all checkboxes if re-building
  while (triangle.firstChild) {
    triangle.removeChild(triangle.firstChild);
  }

  for (var y = RES_Y-1; y >= 0; y--) {
    for (var x = 0; x < RES_X; x++) {
      buildCheckBox(x * s + xOff, y * s);
    }

    RES_X = (RES_X === 2) ? RES_X -= 1 : RES_X -= 2;
    xOff = (RES_X === 1) ? xOff += s * 0.5 : xOff += s;
  }
};

var calcYCount = function(RES_X, RES_Y) {
  var yCount = 0;
  for (var y = RES_Y-1; y >= 0; y--) {
    if (RES_X > 0) yCount++;
    RES_X = (RES_X === 2) ? RES_X -= 1 : RES_X -= 2;
  }
  return yCount;
};

var buildCheckBox = function(x, y) {
  var el = document.createElement('input');
  el.setAttribute('type', 'checkbox');
  triangle.appendChild(el);

  var checkbox = {
    el: el,
    x: x,
    y: y
  };

  el.style.left = checkbox.x + 'px';
  el.style.top = checkbox.y + 'px';
  el.addEventListener('change', this.toggle.bind(this, checkbox));

  checkboxes.push(checkbox);
};

var calcA = function() {
  w = window.innerWidth;
  h = window.innerHeight;
  return Math.min(w, h);
};

var map = function (n, start1, stop1, start2, stop2) {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
};

var toggle = function (targetCheckbox) {
  var checked = targetCheckbox.el.checked;

  checkboxes.forEach(function(checkbox) {

    var dx = targetCheckbox.x - checkbox.x;
    var dy = targetCheckbox.y - checkbox.y;
    var distance = Math.sqrt( dx * dx + dy * dy );

    setTimeout(function() {
      checkbox.el.checked = checked;

      // re-run the animation, reading offsetWidth forces reflow
      checkbox.el.className = '';
      checkbox.el.offsetWidth;
      checkbox.el.className = 'grow';
    }, Math.round( distance * 1.8 ) );
  });
};

setTimeout( function() {
  checkboxes[0].el.checked = true;
  toggle(checkboxes[0]);
}, 500);