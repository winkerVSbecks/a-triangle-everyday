var stripes1, stripes2, stripes3;
var t = 0;

window.onload = function() {
  stripes1 = document.getElementById('Stripes1');
  stripes2 = document.getElementById('Stripes2');
  stripes3 = document.getElementById('Stripes3');
  step();
};

var step = function() {
  // console.log(t); //map(t, 0, 80, 0, 80)
  stripes1.setAttribute('y', map(t, 0, 80, 0, 80));
  stripes2.setAttribute('y', map(t, 0, 80, 0, -480));
  stripes3.setAttribute('x', map(t, 0, 80, 0, 100) + '%');

  t++;
  if(t > 80)
    t = 0;

  requestAnimationFrame(step);
}

var map = function (n, start1, stop1, start2, stop2) {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
};