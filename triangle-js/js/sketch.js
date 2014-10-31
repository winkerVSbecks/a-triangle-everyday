paper.install(window);

var red = '#F79C82';
var lightRed = '#FDE6E0';
var grey = '#8A90A4';
var blue = '#89C2EF';
var green = '#95D9AD';
var lightGrey = '#969CAE';
var triangle;

window.onload = function() {
  paper.setup('triangle-js');
  triangle = new Triangle(200, {
    strokeCap: 'round',
    strokeWidth: 1,
    selectedColor: '#89C2EF',
    strokeColor: '#89C2EF'
  }, view.center);

  triangle = new Triangle('random', {
    strokeCap: 'round',
    strokeWidth: 1,
    selectedColor: '#89C2EF',
    strokeColor: '#89C2EF'
  }, view.center);

  paper.view.draw();

  // Animation
  paper.view.onFrame = function (event) {

  };
};

// Handle re-size
window.onresize = function() {

};