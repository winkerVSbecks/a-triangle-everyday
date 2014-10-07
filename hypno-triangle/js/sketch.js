var stripesTriangle, stripesBG, reset;
var t = 0;

window.onload = function() {
  stripes1 = document.getElementById('Stripes1');
  stripesTriangle = document.getElementById('StripesTriangle');
  stripesBG = document.getElementById('StripesBG');

  reset = random(10, 40);
  window.requestAnimationFrame(step);
};

var step = function() {
  stripesTriangle.setAttribute('y', map(t, 0, 50, 0, 5) + '%');
  stripesBG.setAttribute('y', map(t, 0, 50, 0, 5) + '%');

  t++;
  if(t > reset) {
    t = random(0, 300);
    reset = random(10, 80);
  }
  window.requestAnimationFrame(step);
}

var map = function (n, start1, stop1, start2, stop2) {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
};

var random = function(minimum, maximum) {
  return Math.round(Math.random() * (maximum - minimum) + minimum);
};